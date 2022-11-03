export declare class GzReader {
    unzip: any;
    fileContents: any;
    fileName: string;
    debug: boolean;
    constructor(fileName: string, debug?: boolean);
    readStream(onData: (data: string) => any): Promise<unknown>;
}
