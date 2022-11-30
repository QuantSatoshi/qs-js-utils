"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const commonUtils_1 = require("../../utils/commonUtils");
(0, ava_1.default)('chunk', (t) => {
    t.deepEqual((0, commonUtils_1.chunk)([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});
