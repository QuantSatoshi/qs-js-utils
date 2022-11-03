import * as crypto from 'crypto';

function getUTCDateFromTime(date: Date) {
  return date.toISOString().substring(0, 10);
}

export function getDay(startDate: string | number | Date) {
  return getUTCDateFromTime(new Date(startDate));
}

export function isTimeWithinRange(lastTs: Date | undefined, rangeMs: number) {
  return lastTs && Date.now() - lastTs.getTime() < rangeMs;
}

export function humanTime(t: Date | string | number) {
  return new Date(t).toISOString();
}

export function sha1Hash(data: string) {
  const shasum = crypto.createHash('sha1');
  shasum.update(data);
  return shasum.digest('hex');
}
