export declare function pause(ms: number): Promise<unknown>;
export declare function safeJsonParse(jsonStr: string): any;
export declare function getTag(value: any): string;
export declare function isSymbol(value: any): boolean;
export declare function isArray(a: any): boolean;
export declare function isObject(a: any): boolean;
export declare function isKeyUnique(items: Record<string, any>[], key: string): boolean;
export declare function orderObjectDeep(dataFiltered: any): any;
export declare function getMemoryUsage(): number;
export declare function sha1Hash(data: string): string;
export declare function handleException(): void;
export declare function generateReverseMap(mapObj: Record<string, string>): Record<string, string>;
export declare function compact<T = any>(arr: (T | null | undefined)[]): T[];
export declare function sampleOne<T = any>(items: T[]): T;
export declare function chunk<T = any>(array: T[], size?: number): T[][];
export declare function isError(obj: any): boolean;
export declare function every(array: any[], predicate: (item: any, i: number, arr: any[]) => boolean): boolean;
export declare function omit<T = Record<string, any>>(obj: Record<string, any>, keys: string[]): T;
export declare function deepEqualLvOne(a: Record<string, any>, b: Record<string, any>): boolean;
