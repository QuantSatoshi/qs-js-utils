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
const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');
class GzReader {
    constructor(fileName, debug = true) {
        this.unzip = zlib.createGunzip();
        this.fileName = fileName;
        this.debug = debug;
        if (this.debug) {
            console.log(`gunzip ${fileName}`);
        }
        this.fileContents = fs.createReadStream(fileName);
    }
    readStream(onData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.debug) {
                this.fileContents.on('pipe', (data) => {
                    console.log('ReadStream: start pip on stream...\n', data);
                });
            }
            const streamReader = this.fileContents.pipe(this.unzip);
            let lineReader = readline.createInterface({
                input: streamReader,
            });
            streamReader.on(`error`, (err) => {
                console.error(`streamReader err`, err);
                console.log(`deleting ${this.fileName}`);
                fs.unlink(this.fileName, () => { });
            });
            lineReader.on('line', (line) => {
                onData(JSON.parse(line));
            });
            return new Promise((resolve, reject) => {
                this.fileContents.on('end', () => {
                    if (this.debug) {
                        console.log(`pipe finished`);
                    }
                    resolve(this.fileName);
                });
            });
        });
    }
}
exports.GzReader = GzReader;
