const zlib = require('zlib');
const fs = require('fs');

export class GzWriter {
  gz = zlib.createGzip();
  writing = false;
  finished = false;
  debug: boolean;

  constructor(fileName: string, debug: boolean = true) {
    this.debug = debug;
    this.gz.on('error', function (err: any) {
      console.log(err);
    });
    this.gz.on('finish', () => {
      if (this.debug) {
        console.log('finished compression, now need to finish writing...');
      }
    });
    const f = fs.createWriteStream(fileName);
    f.on('error', function (err: any) {
      console.log(err.stack);
    });
    f.on('finish', () => {
      if (this.debug) {
        console.log('Write success. ' + fileName);
      }
      this.finished = true;
    });
    this.gz.pipe(f);
  }

  async writeOne(data: any) {
    this.writing = true;
    if (!this.gz.write(JSON.stringify(data) + '\n')) {
      await new Promise((resolve, reject) => this.gz.once('drain', resolve));
      this.writing = false;
    }
  }

  async writeMany(data: any[]) {
    this.writing = true;
    if (!this.gz.write(data.map((row) => JSON.stringify(row)).join('\n') + '\n')) {
      await new Promise((resolve) => this.gz.once('drain', resolve));
      this.writing = false;
    }
  }

  async waitForFinish() {
    if (this.finished) return;
    let interval: any;
    return new Promise<void>((r) => {
      interval = setInterval(() => {
        if (this.finished) {
          clearInterval(interval);
          r();
        }
      }, 1000);
    });
  }

  end() {
    this.gz.end();
  }
}
