export declare function pause(ms: number): Promise<unknown>;
export declare function safeJsonParse(jsonStr: string): any;
export declare function getTag(value: any): string;
export declare function isSymbol(value: any): boolean;
export declare function isArray(a: any): boolean;
export declare function isObject(a: any): boolean;
export declare function isKeyUnique(items: Record<string, any>[], key: string): boolean;
export declare function orderObjectDeep(dataFiltered: any): any;
export declare function getMemoryUsage(): number;
