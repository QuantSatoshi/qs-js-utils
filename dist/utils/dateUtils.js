"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeSince = exports.getTsBuckets = exports.snapTimestampNum = exports.snapTimestamp = exports.humanTime = exports.isTimeWithinRange = exports.getDay = void 0;
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
function humanTime(t) {
    return new Date(t).toISOString();
}
exports.humanTime = humanTime;
// snap timestamp to resolution.
// e.g. 10:01:00 should snap tp 10:00:00 for 14400 resolution
// special if it is already the exact time, it will return the same time back.
// be aware not to create infinite loops
function snapTimestamp(ts, resolution, forwardRound = false) {
    const epoch = new Date(ts).valueOf();
    return new Date(snapTimestampNum(epoch, resolution, forwardRound));
}
exports.snapTimestamp = snapTimestamp;
function snapTimestampNum(ts, resolution, forwardRound = false) {
    if (!resolution)
        throw new Error('invalid resolution in snapTimestamp');
    let newEpoch = ts - (ts % (resolution * 1000));
    if (forwardRound && newEpoch < ts)
        newEpoch += resolution * 1000;
    return newEpoch;
}
exports.snapTimestampNum = snapTimestampNum;
function getTsBuckets(tsStart, tsEnd, resolution) {
    const buckets = [];
    for (let t = tsStart.getTime(); t < tsEnd.getTime(); t += resolution * 1000) {
        buckets.push(t);
    }
    return buckets;
}
exports.getTsBuckets = getTsBuckets;
function timeSince(dateFrom, dateTo = Date.now()) {
    const seconds = Math.floor((new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + ' years';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + ' months';
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + ' days';
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + ' hours';
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + ' minutes';
    }
    return Math.floor(seconds) + ' seconds';
}
exports.timeSince = timeSince;
