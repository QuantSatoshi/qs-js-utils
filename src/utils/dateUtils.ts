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

// snap timestamp to resolution.
// e.g. 10:01:00 should snap tp 10:00:00 for 14400 resolution
// special if it is already the exact time, it will return the same time back.
// be aware not to create infinite loops
export function snapTimestamp(ts: Date | string, resolution: number, forwardRound = false): Date {
  const epoch = new Date(ts).valueOf();
  return new Date(snapTimestampNum(epoch, resolution, forwardRound));
}

export function snapTimestampNum(ts: number, resolution: number, forwardRound = false): number {
  if (!resolution) throw new Error('invalid resolution in snapTimestamp');
  let newEpoch = ts - (ts % (resolution * 1000));
  if (forwardRound && newEpoch < ts) newEpoch += resolution * 1000;
  return newEpoch;
}

export function getTsBuckets(tsStart: Date, tsEnd: Date, resolution: number): number[] {
  const buckets = [];
  for (let t = tsStart.getTime(); t < tsEnd.getTime(); t += resolution * 1000) {
    buckets.push(t);
  }
  return buckets;
}

export function timeSince(dateFrom: Date | number | string, dateTo: Date | number | string = Date.now()) {
  const seconds = Math.floor((new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
}
