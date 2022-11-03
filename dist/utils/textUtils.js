"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstLine = void 0;
function firstLine(str) {
    return String(str)
        .slice(0, 3000)
        .split('\n', 1)[0];
}
exports.firstLine = firstLine;
