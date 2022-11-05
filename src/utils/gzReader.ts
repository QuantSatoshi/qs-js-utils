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
      this.fileContents.on('error', function (err: any) {
        reject(err);
      });
      this.fileContents.on('end', () => {
        if (this.debug) {
          console.log(`pipe finished ${this.fileName}`);
        }
        resolve(this.fileName);
      });
      const streamReader = this.fileContents.pipe(this.unzip);
      let lineReader = readline.createInterface({
        input: streamReader,
      });
      streamReader.on(`error`, (err: any) => {
        console.error(`streamReader err`, err);
        console.log(`deleting ${this.fileName}`);
        fs.unlink(this.fileName, () => {});
      });
      lineReader.on('line', (line: string) => {
        onData(JSON.parse(line));
      });
    });
  }
}
