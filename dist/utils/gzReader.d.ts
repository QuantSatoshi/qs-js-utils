export declare class GzReader {
    unzip: any;
    fileContents: any;
    fileName: string;
    debug: boolean;
    deletePartialGz: boolean;
    constructor(fileName: string, debug?: boolean, deletePartialGz?: boolean);
    toStream(options?: {
        parseJSON: boolean;
    }): ReadableStream;
    readStream(onData: (data: string) => any): Promise<unknown>;
}
