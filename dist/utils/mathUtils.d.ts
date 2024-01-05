export declare function median(values: number[]): number;
export declare function sum(values: number[]): number;
export declare function average(values: number[]): number;
export declare function min(values: number[]): number;
export declare function max(values: number[]): number;
export declare function maxBy<T = any>(array: T[], iteratee: (obj: T) => number): T | undefined;
export declare function minBy<T = any>(array: T[], iteratee: (obj: T) => number): T | undefined;
export declare function standardDeviation(values: number[], limit?: number): number;
export declare function getSharpeRatio(dailyBalances: number[]): {
    sharpeRatio: number;
    sortinoRatio: number;
    dailyProfit: number;
    std: number;
    days: number;
};
export declare function shuffle<T = any>(array: T[]): T[];
