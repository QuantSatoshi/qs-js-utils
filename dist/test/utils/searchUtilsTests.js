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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const searchUtils = __importStar(require("../../utils/searchUtils"));
const ob = {
    bids: [
        { a: 3, r: 7002 },
        { a: 21, r: 7001 },
        { a: 26, r: 7000.5 },
        { a: 5, r: 7000 },
    ],
    asks: [
        { a: 3, r: 7002.5 },
        { a: 21, r: 7009 },
        { a: 26, r: 7010.5 },
        { a: 5, r: 7011 },
    ],
};
(0, ava_1.default)('sortedFindFirstGreater', (t) => {
    t.is(searchUtils.sortedFindFirstGreater(ob.asks, 7010, (ob) => ob.r), 2);
    t.is(searchUtils.sortedFindFirstGreater(ob.asks, 7009, (ob) => ob.r), 2);
    t.is(searchUtils.sortedFindFirstGreater(ob.asks, 7020, (ob) => ob.r), -1);
    const error = t.throws(() => {
        searchUtils.sortedFindFirstGreater(ob.bids, 7000, (ob) => ob.r);
    });
    t.is(error.message, 'sortedFindFirstGreater requires data to be sorted ascending');
});
(0, ava_1.default)(`sortedFindFirstGreaterEqual found equal index`, (t) => {
    t.is(searchUtils.sortedFindFirstGreaterEqual(ob.asks, 7009, (ob) => ob.r), 1);
});
(0, ava_1.default)(`sortedFindFirstGreaterEqual last index`, (t) => {
    t.is(searchUtils.sortedFindFirstGreaterEqual([
        { r: 152.48, a: 8.18084404 },
        { r: 152.49, a: 14.31512963 },
        { r: 152.5, a: 25.52159388 },
        { r: 152.51, a: 6 },
        { r: 152.53, a: 70 },
    ], 152.52, (ob) => ob.r), 4);
});
(0, ava_1.default)(`sortedFindFirstSmaller`, (t) => {
    t.is(searchUtils.sortedFindFirstSmaller(ob.bids, 7001.5, (ob) => ob.r), 1);
    t.is(searchUtils.sortedFindFirstSmaller(ob.bids, 7001, (ob) => ob.r), 2);
    t.is(searchUtils.sortedFindFirstSmaller(ob.bids, 6555, (ob) => ob.r), -1);
    const err = t.throws(() => {
        searchUtils.sortedFindFirstSmaller(ob.asks, 7000, (ob) => ob.r);
    });
    t.truthy(err.message);
});
(0, ava_1.default)(`sortedFindFirstSmallerEqual found equal index`, (t) => {
    t.is(searchUtils.sortedFindFirstSmallerEqual(ob.bids, 7001, (ob) => ob.r), 1);
});
(0, ava_1.default)(`sortedFindFirstSmallerEqual found one match equal`, (t) => {
    t.is(searchUtils.sortedFindFirstSmallerEqual([{ r: 7001, a: 1 }], 7001, (ob) => ob.r), 0);
});
(0, ava_1.default)(`sortedFindFirstSmallerEqual found one match smaller`, (t) => {
    t.is(searchUtils.sortedFindFirstSmallerEqual([{ r: 7001, a: 1 }], 7002, (ob) => ob.r), 0);
});
(0, ava_1.default)(`sortedFindFirstSmallerEqual found one no match`, (t) => {
    t.is(searchUtils.sortedFindFirstSmallerEqual([{ r: 7001, a: 1 }], 7000, (ob) => ob.r), -1);
});
(0, ava_1.default)(`sortedFindFirstSmallerEqual last index`, (t) => {
    t.is(searchUtils.sortedFindFirstSmallerEqual([
        { r: 152.5, a: 8.18084404 },
        { r: 152.4, a: 14.31512963 },
        { r: 152.3, a: 25.52159388 },
        { r: 152.2, a: 6 },
        { r: 152.15, a: 70 },
    ], 152.18, (ob) => ob.r), 4);
});
