import { firstLine } from './textUtils';

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
