const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');

export class GzReader {
  unzip = zlib.createGunzip();
  fileContents: any;
  fileName: string;
  debug: boolean;

  constructor(fileName: string, debug: boolean = true) {
    this.fileName = fileName;
    this.debug = debug;
    if (this.debug) {
      console.log(`gunzip ${fileName}`);
    }
    this.fileContents = fs.createReadStream(fileName);
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
        onData(line);
      });
    });
  }
}
