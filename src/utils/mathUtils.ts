import { isSymbol } from './commonUtils';

export function median(values: number[]): number {
  const sorted = values.slice(0).sort();
  if (sorted.length % 2 === 0) {
    // array with even number elements
    return (sorted[sorted.length / 2] + sorted[sorted.length / 2 - 1]) / 2;
  } else {
    return sorted[(sorted.length - 1) / 2]; // array with odd number elements
  }
}
export function sum(values: number[]) {
  let ret = 0;
  for (let val of values) {
    ret += val;
  }
  return ret;
}

export function average(values: number[]) {
  return sum(values) / values.length;
}

export function min(values: number[]): number {
  let computed = values[0];
  for (let i = 1; i < values.length; i++) {
    if (values[i] < computed) {
      computed = values[i];
    }
  }
  return computed;
}

export function max(values: number[]): number {
  let computed = values[0];
  for (let i = 1; i < values.length; i++) {
    if (values[i] > computed) {
      computed = values[i];
    }
  }
  return computed;
}

// lodash max by
export function maxBy<T = any>(array: T[], iteratee: (obj: T) => number) {
  let result;
  if (array == null) {
    return result;
  }
  let computed;
  for (const value of array) {
    const current = iteratee(value);

    if (current != null && (computed === undefined ? current === current && !isSymbol(current) : current > computed)) {
      computed = current;
      result = value;
    }
  }
  return result;
}

// from lodash
export function minBy<T = any>(array: T[], iteratee: (obj: T) => number) {
  let result;
  if (array == null) {
    return result;
  }
  let computed;
  for (const value of array) {
    const current = iteratee(value);

    if (current != null && (computed === undefined ? current === current && !isSymbol(current) : current < computed)) {
      computed = current;
      result = value;
    }
  }
  return result;
}

export function standardDeviation(values: number[], limit = 1000) {
  if (values.length === 0) return 0;
  let newValues: number[] = [];
  if (values.length > limit) {
    // evenly take limit values as samples
    const step = Math.round(values.length / limit);
    for (let i = 0; i < limit; i++) {
      newValues.push(values[Math.min(step * i, values.length - 1)]);
    }
  } else {
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

export function getSharpeRatio(dailyBalances: number[]) {
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

export function shuffle<T = any>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
