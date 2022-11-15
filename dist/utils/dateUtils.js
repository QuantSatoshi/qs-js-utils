"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTsBuckets = exports.snapTimestamp = exports.humanTime = exports.isTimeWithinRange = exports.getDay = void 0;
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
    if (!resolution)
        throw new Error('invalid resolution in snapTimestamp');
    let newEpoch = epoch - (epoch % (resolution * 1000));
    if (forwardRound && newEpoch < epoch)
        newEpoch += resolution * 1000;
    return new Date(newEpoch);
}
exports.snapTimestamp = snapTimestamp;
function getTsBuckets(tsStart, tsEnd, resolution) {
    const buckets = [];
    for (let t = tsStart.getTime(); t < tsEnd.getTime(); t += resolution * 1000) {
        buckets.push(t);
    }
    return buckets;
}
exports.getTsBuckets = getTsBuckets;
function timeSince(date) {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
