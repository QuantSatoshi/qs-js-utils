export declare class GzReader {
    unzip: any;
    fileContents: any;
    fileName: string;
    debug: boolean;
    constructor(fileName: string, debug?: boolean);
    toStream(): any;
    readStream(onData: (data: string) => any): Promise<unknown>;
}
