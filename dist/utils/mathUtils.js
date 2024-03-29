"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffle = exports.getSharpeRatio = exports.standardDeviation = exports.minBy = exports.maxBy = exports.max = exports.min = exports.average = exports.sum = exports.median = void 0;
const commonUtils_1 = require("./commonUtils");
function median(values) {
    const sorted = values.slice(0).sort();
    if (sorted.length % 2 === 0) {
        // array with even number elements
        return (sorted[sorted.length / 2] + sorted[sorted.length / 2 - 1]) / 2;
    }
    else {
        return sorted[(sorted.length - 1) / 2]; // array with odd number elements
    }
}
exports.median = median;
function sum(values) {
    let ret = 0;
    for (let val of values) {
        ret += val;
    }
    return ret;
}
exports.sum = sum;
function average(values) {
    return sum(values) / values.length;
}
exports.average = average;
function min(values) {
    let computed = values[0];
    for (let i = 1; i < values.length; i++) {
        if (values[i] < computed) {
            computed = values[i];
        }
    }
    return computed;
}
exports.min = min;
function max(values) {
    let computed = values[0];
    for (let i = 1; i < values.length; i++) {
        if (values[i] > computed) {
            computed = values[i];
        }
    }
    return computed;
}
exports.max = max;
// lodash max by
function maxBy(array, iteratee) {
    let result;
    if (array == null) {
        return result;
    }
    let computed;
    for (const value of array) {
        const current = iteratee(value);
        if (current != null && (computed === undefined ? current === current && !(0, commonUtils_1.isSymbol)(current) : current > computed)) {
            computed = current;
            result = value;
        }
    }
    return result;
}
exports.maxBy = maxBy;
// from lodash
function minBy(array, iteratee) {
    let result;
    if (array == null) {
        return result;
    }
    let computed;
    for (const value of array) {
        const current = iteratee(value);
        if (current != null && (computed === undefined ? current === current && !(0, commonUtils_1.isSymbol)(current) : current < computed)) {
            computed = current;
            result = value;
        }
    }
    return result;
}
exports.minBy = minBy;
function standardDeviation(values, limit = 1000) {
    if (values.length === 0)
        return 0;
    let newValues = [];
    if (values.length > limit) {
        // evenly take limit values as samples
        const step = Math.round(values.length / limit);
        for (let i = 0; i < limit; i++) {
            newValues.push(values[Math.min(step * i, values.length - 1)]);
        }
    }
    else {
        newValues = values;
    }
    const avg = average(newValues);
    const squareDiffs = newValues.map((value) => {
        const diff = value - avg;
        const sqrDiff = diff * diff;
        return sqrDiff;
    });
    const avgSquareDiff = average(squareDiffs);
    return Math.sqrt(avgSquareDiff);
}
exports.standardDeviation = standardDeviation;
function getSharpeRatio(dailyBalances) {
    const dailyProfits = dailyBalances.map((b, i) => {
        if (i === 0) {
            return 0;
        }
        return b / dailyBalances[i - 1] - 1;
    });
    const dailyProfitMean = average(dailyProfits);
    const std = standardDeviation(dailyProfits);
    const sharpeRatio = std === 0 ? 0 : (Math.sqrt(365) * dailyProfitMean) / std;
    const stdNegative = standardDeviation(dailyProfits.filter((d) => d < 0));
    const sortinoRatio = !stdNegative ? 0 : (Math.sqrt(365) * dailyProfitMean) / stdNegative;
    return {
        sharpeRatio,
        sortinoRatio,
        dailyProfit: dailyProfitMean,
        std,
        days: dailyBalances.length,
    };
}
exports.getSharpeRatio = getSharpeRatio;
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap array[i] and array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
exports.shuffle = shuffle;
