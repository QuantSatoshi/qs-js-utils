"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64ToHexStr = exports.base64ToBuffer = exports.hexStrToBase64 = exports.bufferToHex = exports.bufferToBase64 = exports.hexStrToBuffer = void 0;
function hexStrToBuffer(hexStr) {
    const hexStrRaw = hexStr.match(/^0x/) ? hexStr.substring(2) : hexStr;
    return Buffer.from(hexStrRaw, 'hex');
}
exports.hexStrToBuffer = hexStrToBuffer;
function bufferToBase64(buf) {
    return buf.toString('base64');
}
exports.bufferToBase64 = bufferToBase64;
function bufferToHex(buf) {
    return buf.toString('hex');
}
exports.bufferToHex = bufferToHex;
function hexStrToBase64(hexStr) {
    return bufferToBase64(hexStrToBuffer(hexStr));
}
exports.hexStrToBase64 = hexStrToBase64;
function base64ToBuffer(base64) {
    return Buffer.from(base64, 'base64');
}
exports.base64ToBuffer = base64ToBuffer;
function base64ToHexStr(base64) {
    return bufferToHex(base64ToBuffer(base64));
}
exports.base64ToHexStr = base64ToHexStr;
