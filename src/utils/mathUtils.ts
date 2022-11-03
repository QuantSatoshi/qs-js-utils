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