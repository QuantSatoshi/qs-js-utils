"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTimeWithinRange = exports.getDay = void 0;
function getUTCDateFromTime(date) {
    return date.toISOString().substring(0, 10);
}
function getDay(startDate) {
    return getUTCDateFromTime(new Date(startDate));
}
exports.getDay = getDay;
function isTimeWithinRange(lastTs, rangeMs) {
    return lastTs && Date.now() - lastTs.getTime() < rangeMs;
}
exports.isTimeWithinRange = isTimeWithinRange;
