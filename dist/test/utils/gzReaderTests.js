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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const gzReader_1 = require("../../utils/gzReader");
(0, ava_1.default)('gzReader stream pipe', (t) => __awaiter(void 0, void 0, void 0, function* () {
    function streamToString(stream) {
        const chunks = [];
        return new Promise((resolve) => {
            stream.on('data', (chunk) => chunks.push(JSON.parse(chunk.toString('utf8'))));
            stream.on('end', () => resolve(chunks));
        });
    }
    const gzReader = new gzReader_1.GzReader(`${__dirname}/../../../src/test/utils/sampleData.gz`);
    const ret = yield streamToString(gzReader.toStream());
    t.deepEqual(ret, [
        [1, 2, 3, 4, 5, 5],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 7],
        [1, 2, 3, 4, 5, 8],
        [1, 2, 3, 4, 5, 9],
    ]);
}));
(0, ava_1.default)('gzReader stream pipe with json parse', (t) => __awaiter(void 0, void 0, void 0, function* () {
    function streamToString(stream) {
        const chunks = [];
        return new Promise((resolve) => {
            stream.on('data', (chunk) => chunks.push(chunk));
            stream.on('end', () => resolve(chunks));
        });
    }
    const gzReader = new gzReader_1.GzReader(`${__dirname}/../../../src/test/utils/sampleData.gz`);
    const ret = yield streamToString(gzReader.toStream({ parseJSON: true }));
    t.deepEqual(ret, [
        [1, 2, 3, 4, 5, 5],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 7],
        [1, 2, 3, 4, 5, 8],
        [1, 2, 3, 4, 5, 9],
    ]);
}));
