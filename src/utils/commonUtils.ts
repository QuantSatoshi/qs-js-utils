import { firstLine } from './textUtils';
import crypto from 'crypto';

export async function pause(ms: number) {
  return new Promise((resolve: any) => {
    setTimeout(resolve, ms);
  });
}

export function safeJsonParse(jsonStr: string): any {
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error(`invalid json string`, firstLine(jsonStr));
    return null;
  }
}

export function getTag(value: any) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return toString.call(value);
}

export function isSymbol(value: any) {
  const type = typeof value;
  return type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]');
}

export function isArray(a: any) {
  return !!a && a.constructor === Array;
}

export function isObject(a: any) {
  return !!a && a.constructor === Object;
}

export function isKeyUnique(items: Record<string, any>[], key: string) {
  const map: Record<string, number> = {};
  for (let item of items) {
    if (map[item[key]]) return false;
    map[item[key]] = 1;
  }
  return true;
}

export function orderObjectDeep(dataFiltered: any) {
  const dataOrdered: any = {};
  Object.keys(dataFiltered)
    .sort()
    .forEach(function (key) {
      if (isObject(dataFiltered[key]) && !isArray(dataFiltered[key])) {
        dataOrdered[key] = orderObjectDeep(dataFiltered[key]);
      } else {
        dataOrdered[key] = dataFiltered[key];
      }
    });
  return dataOrdered;
}

export function getMemoryUsage() {
  const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
  return Math.round(usedMemory * 100) / 100;
}

export function sha1Hash(data: string) {
  const shasum = crypto.createHash('sha1');
  shasum.update(data);
  return shasum.digest('hex');
}

export function handleException() {
  process.on('uncaughtException', (exception) => {
    const errMsg = `uncaughtException ${exception}`;
    console.error(errMsg); // to see your exception details in the console
  });
}

export function generateReverseMap(mapObj: Record<string, string>) {
  const ret: Record<string, string> = {};
  for (let key in mapObj) {
    ret[mapObj[key]] = key;
  }
  return ret;
}

export function compact<T = any>(arr: (T | null | undefined)[]): T[] {
  return arr.filter((a) => a !== null && a !== undefined) as T[];
}

export function sampleOne<T = any>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function chunk<T = any>(array: T[], size = 1): T[][] {
  const length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  let index = 0;
  let resIndex = 0;
  const result: T[][] = new Array(Math.ceil(length / size));

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size));
  }
  return result;
}

export function isError(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Error]';
}

export function every(array: any[], predicate: (item: any, i: number, arr: any[]) => boolean) {
  let index = -1;
  const length = array.length;

  while (++index < length) {
    if (!predicate(array[index], index, array)) {
      return false;
    }
  }
  return true;
}

export function omit<T = Record<string, any>>(obj: Record<string, any>, keys: string[]) {
  if (!obj) return obj;
  const ret: any = {};
  for (let key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret as T;
}

// only key in a is compared
export function deepEqualLvOne(a: Record<string, any>, b: Record<string, any>) {
  for (let key in a) {
    if (a[key] !== b[key]) return false;
  }
  return false;
}
