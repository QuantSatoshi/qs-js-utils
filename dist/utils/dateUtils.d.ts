export declare function getDay(startDate: string | number | Date): string;
export declare function isTimeWithinRange(lastTs: Date | undefined, rangeMs: number): boolean | undefined;
export declare function humanTime(t: Date | string | number): string;
export declare function snapTimestamp(ts: Date | string, resolution: number, forwardRound?: boolean): Date;
export declare function getTsBuckets(tsStart: Date, tsEnd: Date, resolution: number): number[];
