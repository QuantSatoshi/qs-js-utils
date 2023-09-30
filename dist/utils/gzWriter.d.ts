export declare function autoStringify(row: any): string;
export declare class GzWriter {
    gz: any;
    writing: boolean;
    finished: boolean;
    debug: boolean;
    constructor(fileName: string, debug?: boolean);
    writeOne(data: any): Promise<void>;
    writeMany(data: any[]): Promise<void>;
    waitForFinish(): Promise<void>;
    end(): void;
}
