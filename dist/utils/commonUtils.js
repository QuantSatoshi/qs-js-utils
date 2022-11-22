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
exports.compact = exports.generateReverseMap = exports.handleException = exports.sha1Hash = exports.getMemoryUsage = exports.orderObjectDeep = exports.isKeyUnique = exports.isObject = exports.isArray = exports.isSymbol = exports.getTag = exports.safeJsonParse = exports.pause = void 0;
const textUtils_1 = require("./textUtils");
const crypto_1 = __importDefault(require("crypto"));
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
function isArray(a) {
    return !!a && a.constructor === Array;
}
exports.isArray = isArray;
function isObject(a) {
    return !!a && a.constructor === Object;
}
exports.isObject = isObject;
function isKeyUnique(items, key) {
    const map = {};
    for (let item of items) {
        if (map[item[key]])
            return false;
        map[item[key]] = 1;
    }
    return true;
}
exports.isKeyUnique = isKeyUnique;
function orderObjectDeep(dataFiltered) {
    const dataOrdered = {};
    Object.keys(dataFiltered)
        .sort()
        .forEach(function (key) {
        if (isObject(dataFiltered[key]) && !isArray(dataFiltered[key])) {
            dataOrdered[key] = orderObjectDeep(dataFiltered[key]);
        }
        else {
            dataOrdered[key] = dataFiltered[key];
        }
    });
    return dataOrdered;
}
exports.orderObjectDeep = orderObjectDeep;
function getMemoryUsage() {
    const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
    return Math.round(usedMemory * 100) / 100;
}
exports.getMemoryUsage = getMemoryUsage;
function sha1Hash(data) {
    const shasum = crypto_1.default.createHash('sha1');
    shasum.update(data);
    return shasum.digest('hex');
}
exports.sha1Hash = sha1Hash;
function handleException() {
    process.on('uncaughtException', (exception) => {
        const errMsg = `uncaughtException ${exception}`;
        console.error(errMsg); // to see your exception details in the console
    });
}
exports.handleException = handleException;
function generateReverseMap(mapObj) {
    const ret = {};
    for (let key in mapObj) {
        ret[mapObj[key]] = key;
    }
    return ret;
}
exports.generateReverseMap = generateReverseMap;
function compact(arr) {
    return arr.filter((a) => a !== null && a !== undefined);
}
exports.compact = compact;
