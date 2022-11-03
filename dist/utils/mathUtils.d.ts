export declare function median(values: number[]): number;
export declare function sum(values: number[]): number;
export declare function average(values: number[]): number;
export declare function standardDeviation(values: number[], limit?: number): number;
export declare function getSharpeRatio(dailyBalances: number[]): {
    sharpeRatio: number;
    sortinoRatio: number;
    dailyProfit: number;
    std: number;
    days: number;
};
