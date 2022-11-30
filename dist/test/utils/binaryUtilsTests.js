"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const binaryUtils_1 = require("../../utils/binaryUtils");
(0, ava_1.default)('hexStrToBuffer', (t) => {
    t.deepEqual((0, binaryUtils_1.hexStrToBuffer)('0x0a1f').toString('hex'), '0a1f');
    t.deepEqual((0, binaryUtils_1.hexStrToBuffer)('0a1f').toString('hex'), '0a1f');
});
(0, ava_1.default)('bufferToBase64', (t) => {
    const buf = (0, binaryUtils_1.hexStrToBuffer)('0x0a1f');
    t.deepEqual((0, binaryUtils_1.bufferToBase64)(buf), 'Ch8=');
});
(0, ava_1.default)('base64ToHexStr', (t) => {
    t.deepEqual((0, binaryUtils_1.base64ToHexStr)('Ch8='), '0a1f');
});
(0, ava_1.default)('hexStrToBase64', (t) => {
    t.deepEqual((0, binaryUtils_1.hexStrToBase64)('0a1f'), 'Ch8=');
});
