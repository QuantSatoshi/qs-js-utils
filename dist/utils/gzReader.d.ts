export declare class GzReader {
    unzip: any;
    fileContents: any;
    fileName: string;
    debug: boolean;
    constructor(fileName: string, debug?: boolean);
    toStream(options?: {
        parseJSON: boolean;
    }): ReadableStream;
    readStream(onData: (data: string) => any): Promise<unknown>;
}
