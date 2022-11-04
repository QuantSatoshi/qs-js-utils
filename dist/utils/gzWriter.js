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
exports.GzWriter = void 0;
const zlib = require('zlib');
const fs = require('fs');
class GzWriter {
    constructor(fileName, debug = true) {
        this.gz = zlib.createGzip();
        this.writing = false;
        this.finished = false;
        this.debug = debug;
        this.gz.on('error', function (err) {
            console.log(err);
        });
        this.gz.on('finish', () => {
            if (this.debug) {
                console.log('finished compression, now need to finish writing...', fileName);
            }
        });
        const f = fs.createWriteStream(fileName);
        f.on('error', function (err) {
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
    writeOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.writing = true;
            if (!this.gz.write(JSON.stringify(data) + '\n')) {
                yield new Promise((resolve, reject) => this.gz.once('drain', resolve));
                this.writing = false;
            }
        });
    }
    writeMany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.writing = true;
            if (!this.gz.write(data.map((row) => JSON.stringify(row)).join('\n') + '\n')) {
                yield new Promise((resolve) => this.gz.once('drain', resolve));
                this.writing = false;
            }
        });
    }
    waitForFinish() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.finished)
                return;
            let interval;
            return new Promise((r) => {
                interval = setInterval(() => {
                    if (this.finished) {
                        clearInterval(interval);
                        r();
                    }
                }, 1000);
            });
        });
    }
    end() {
        this.gz.end();
    }
}
exports.GzWriter = GzWriter;
