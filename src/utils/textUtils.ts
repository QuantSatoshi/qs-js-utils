export function firstLine(str: string) {
  return String(str).slice(0, 3000).split('\n', 1)[0];
}
