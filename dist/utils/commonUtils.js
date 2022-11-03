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
exports.isSymbol = exports.getTag = exports.safeJsonParse = exports.pause = void 0;
const textUtils_1 = require("./textUtils");
function pause(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    });
}
exports.pause = pause;
function safeJsonParse(jsonStr) {
    try {
        return JSON.parse(jsonStr);
    }
    catch (e) {
        console.error(`invalid json string`, (0, textUtils_1.firstLine)(jsonStr));
        return null;
    }
}
exports.safeJsonParse = safeJsonParse;
function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return toString.call(value);
}
exports.getTag = getTag;
function isSymbol(value) {
    const type = typeof value;
    return type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]');
}
exports.isSymbol = isSymbol;
