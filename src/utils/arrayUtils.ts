function baseFlatten(array: any[], depth: number, result?: any[]) {
  result || (result = []);

  if (array == null) {
    return result;
  }

  for (const value of array) {
    if (depth > 0 && Array.isArray(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, result);
      } else {
        result.push(...value);
      }
    }
  }
  return result;
}

export function flatten<T = any>(items: T[] | T[][]) {
  if (items.length > 0) {
    return baseFlatten(items, 1);
  }
  return items;
}

export function last<T = any>(items: T[]) {
  return items[items.length - 1];
}
