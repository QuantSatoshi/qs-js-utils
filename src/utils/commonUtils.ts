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
