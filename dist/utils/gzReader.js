"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GzReader = void 0;
const stream_1 = require("stream");
const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');
const byline = require('byline');
class GzReader {
    constructor(fileName, debug = false, deletePartialGz = false) {
        this.unzip = zlib.createGunzip();
        this.fileName = fileName;
        this.deletePartialGz = deletePartialGz;
        this.debug = debug;
        if (this.debug) {
            console.log(`gunzip ${fileName}`);
        }
        this.fileContents = fs.createReadStream(fileName);
    }
    toStream(options) {
        const readStream = this.fileContents
            .on('error', (err) => {
            console.error(`pipe read error ${this.fileName}`, err);
            throw err;
        })
            .pipe(this.unzip)
            .on('error', (err) => {
            console.error(`pipe unzip error ${this.fileName}`, err);
            if (err.message.includes('unexpected end of file')) {
                if (this.deletePartialGz) {
                    console.warn(`Warning: Gzip error - ${err.message}. Deleting ${this.fileName}.`);
                    fs.unlink(this.fileName, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error(`Failed to delete file ${this.fileName}:`, unlinkErr);
                        }
                        else {
                            console.log(`${this.fileName} deleted successfully due to gzip error.`);
                        }
                    });
                }
            }
            readStream.emit('error', err);
        });
        const ret = byline(readStream);
        if (!(options === null || options === void 0 ? void 0 : options.parseJSON))
            return ret;
        const jsonParseTransform = new stream_1.Transform({
            objectMode: true,
            transform: (data, _, done) => {
                done(null, JSON.parse(data.toString('utf8')));
            },
        });
        return ret.pipe(jsonParseTransform);
    }
    readStream(onData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.debug) {
                this.fileContents.on('pipe', (data) => {
                    console.log(`ReadStream: ${this.fileName} start pip on stream...`, data);
                });
            }
            return new Promise((resolve, reject) => {
                const streamReader = this.fileContents
                    .on('error', (err) => {
                    console.error(`pipe error ${this.fileName}`, err);
                    reject(err);
                })
                    .pipe(this.unzip);
                streamReader.on(`error`, (err) => {
                    console.error(`streamReader err`, err);
                    console.log(`deleting ${this.fileName}`);
                    fs.unlink(this.fileName, () => { });
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
                lineReader.on('line', (line) => {
                    if (onData(line) === null) {
                        // early break the stream
                        lineReader.close();
                        streamReader.close();
                    }
                });
            });
        });
    }
}
exports.GzReader = GzReader;
