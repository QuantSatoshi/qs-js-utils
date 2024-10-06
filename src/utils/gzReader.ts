import { Transform } from 'stream';

const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');
const byline = require('byline');

export class GzReader {
  unzip = zlib.createGunzip();
  fileContents: any;
  fileName: string;
  debug: boolean;
  deletePartialGz: boolean;

  constructor(fileName: string, debug: boolean = false, deletePartialGz = false) {
    this.fileName = fileName;
    this.deletePartialGz = deletePartialGz;
    this.debug = debug;
    if (this.debug) {
      console.log(`gunzip ${fileName}`);
    }
    this.fileContents = fs.createReadStream(fileName);
  }
  toStream(options?: { parseJSON: boolean }): ReadableStream {
    const readStream = this.fileContents
      .on('error', (err: any) => {
        console.error(`pipe read error ${this.fileName}`, err);
        throw err;
      })
      .pipe(this.unzip)
      .on('error', (err: any) => {
        console.error(`pipe unzip error ${this.fileName}`, err);
        if (err.message.includes('unexpected end of file')) {
          if (this.deletePartialGz) {
            console.warn(`Warning: Gzip error - ${err.message}. Deleting ${this.fileName}.`);
            fs.unlink(this.fileName, (unlinkErr: any) => {
              if (unlinkErr) {
                console.error(`Failed to delete file ${this.fileName}:`, unlinkErr);
              } else {
                console.log(`${this.fileName} deleted successfully due to gzip error.`);
              }
            });
          }
        } else {
          throw err;
        }
      });
    const ret = byline(readStream);
    if (!options?.parseJSON) return ret;
    const jsonParseTransform = new Transform({
      objectMode: true,
      transform: (data, _, done) => {
        done(null, JSON.parse(data.toString('utf8')));
      },
    });
    return ret.pipe(jsonParseTransform);
  }

  async readStream(onData: (data: string) => any) {
    if (this.debug) {
      this.fileContents.on('pipe', (data: any) => {
        console.log(`ReadStream: ${this.fileName} start pip on stream...`, data);
      });
    }
    return new Promise((resolve, reject) => {
      const streamReader = this.fileContents
        .on('error', (err: any) => {
          console.error(`pipe error ${this.fileName}`, err);
          reject(err);
        })
        .pipe(this.unzip);
      streamReader.on(`error`, (err: any) => {
        console.error(`streamReader err`, err);
        console.log(`deleting ${this.fileName}`);
        fs.unlink(this.fileName, () => {});
        reject(err);
      });
      // event sequence: finish, end, close

      // close is the last event
      streamReader.on(`close`, () => {
        if (this.debug) {
          console.log(`streamReader close ${this.fileName}`);
        }
        resolve(this.fileName);
      });
      const lineReader = readline.createInterface({
        input: streamReader,
      });
      lineReader.on('line', (line: string) => {
        if (onData(line) === null) {
          // early break the stream
          lineReader.close();
          streamReader.close();
        }
      });
    });
  }
}
