"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUtils = exports.isTimeWithinRange = exports.getDay = exports.GzReader = void 0;
var gzReader_1 = require("./utils/gzReader");
Object.defineProperty(exports, "GzReader", { enumerable: true, get: function () { return gzReader_1.GzReader; } });
var dateUtils_1 = require("./utils/dateUtils");
Object.defineProperty(exports, "getDay", { enumerable: true, get: function () { return dateUtils_1.getDay; } });
Object.defineProperty(exports, "isTimeWithinRange", { enumerable: true, get: function () { return dateUtils_1.isTimeWithinRange; } });
const _searchUtils = __importStar(require("./utils/searchUtils"));
exports.searchUtils = _searchUtils;
