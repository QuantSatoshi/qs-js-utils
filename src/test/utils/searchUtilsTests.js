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
const searchUtils = __importStar(require("../../src/utils/searchUtils"));
const ob = {
    bids: [{ a: 3, r: 7002 }, { a: 21, r: 7001 }, { a: 26, r: 7000.5 }, { a: 5, r: 7000 }],
    asks: [{ a: 3, r: 7002.5 }, { a: 21, r: 7009 }, { a: 26, r: 7010.5 }, { a: 5, r: 7011 }],
};
(0, ava_1.default)("sortedFindFirstGreater", (t) => {
    t.is(searchUtils.sortedFindFirstGreater(ob.asks, 7010, ob => ob.r), 2);
    t.is(searchUtils.sortedFindFirstGreater(ob.asks, 7009, ob => ob.r), 2);
    t.is(searchUtils.sortedFindFirstGreater(ob.asks, 7020, ob => ob.r), -1);
    const error = t.throws(() => {
        searchUtils.sortedFindFirstGreater(ob.bids, 7000, ob => ob.r);
    });
    console.log(`error`, error);
    // t.truthy(err);
});
//
// test("verifyJwtToken ok", (t) => {
//   const token = jwtHelper.genJwtToken({ uid: "123" });
//   const decoded = jwtHelper.verifyJwtToken(token);
//   t.is(decoded.uid, "123");
// });
//
// test("verifyJwtToken fail", (t) => {
//   const badToken =
//     "eyJhbGciOiJSUzI1NiIsInR4cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMyIsImlhdCI6MTY2NDkwMTYwOCwibXNzIjoiY20tc3NvIn0.P5US_W-JnANyKXB9ToXqJqrpKqIMolBEGwa34pxug8pod6TVHS5iDc9Dg_XussdzGBPlMkseJf69jUqG3ZR-1kYAqdl0f7kKogbL9UKmjaf3_qrR0mCMXx6r_3DeSi6zMvoZrxM6gayPxNLRZdsHdNjnqKPi6NabuwGt9lRwAvZRs1UHZHe7F0Fs-54veIBV3kStugEBXaRm00dZqbY9ZD9gj5eb6B16WQzDidnXENFSj2vfWeQTjEAGdktBJJNAuqRmvk1l_kSA10EP1CiQIbqUj1SdMZOshHL6znNZ01lIeuLLxGrTKz0lGOXUD8LsBd1Y7Hlw3JBbKVwfVxtH8dhQeNlo_CY6gLyJTUeUP0OUJlVMjAXERuqRmdcIbUqZGSQ6nQatoSX9V-qJlSjYJ74wuIHdthBSosJAFGmBLXDmOOAR5oZ_zeHySx2PhidjpTT4wfc3e11uDFwxJfZrjqpHZPL6oCOit-WRX0V_XxOPvQXUdvFxLv-poSndxadF";
//   const error: any = t.throws(() => {
//     jwtHelper.verifyJwtToken(badToken);
//   });
//   t.is(error.message, "invalid signature");
// });
