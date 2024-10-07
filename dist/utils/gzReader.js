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
const split = require('split2');
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
        let lineReader;
        const readStream = this.fileContents
            .on('error', (err) => {
            console.error(`pipe read error ${this.fileName}`, err);
            if (lineReader)
                lineReader.emit('error', err); // Emit the error on the final output stream
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
            if (lineReader)
                lineReader.emit('error', err); // Emit the error on the final output stream
        });
        lineReader = readStream.pipe(split());
        if (!(options === null || options === void 0 ? void 0 : options.parseJSON))
            return lineReader;
        const jsonParseTransform = new stream_1.Transform({
            objectMode: true,
            transform: (data, _, done) => {
                if (!data) {
                    return done(null, null);
                }
                try {
                    // Attempt to parse the JSON
                    const parsedData = JSON.parse(data.toString('utf8'));
                    done(null, parsedData); // Pass parsed data to next step in the stream
                }
                catch (err) {
                    // If parsing fails, pass the error to the callback
                    done(new Error(`Failed to parse JSON: ${err}`));
                }
            },
        });
        // Propagate any errors that occur in the JSON parsing stage
        jsonParseTransform.on('error', (err) => {
            console.error(`JSON parsing error in ${this.fileName}`, err);
            // lineReader.emit('error', err); // Emit the error from the JSON stream
        });
        lineReader = lineReader.pipe(jsonParseTransform);
        return lineReader;
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
