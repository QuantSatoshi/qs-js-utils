"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRangeArr = exports.last = exports.flatten = void 0;
function baseFlatten(array, depth, result) {
    result || (result = []);
    if (array == null) {
        return result;
    }
    for (const value of array) {
        if (depth > 0 && Array.isArray(value)) {
            if (depth > 1) {
                // Recursively flatten arrays (susceptible to call stack limits).
                baseFlatten(value, depth - 1, result);
            }
            else {
                result.push(...value);
            }
        }
    }
    return result;
}
function flatten(items) {
    if (items.length > 0) {
        return baseFlatten(items, 1);
    }
    return items;
}
exports.flatten = flatten;
function last(items) {
    return items[items.length - 1];
}
exports.last = last;
function getRangeArr(count) {
    const ids = [];
    for (let id = 0; id < count; id++) {
        ids.push(id);
    }
    return ids;
}
exports.getRangeArr = getRangeArr;
