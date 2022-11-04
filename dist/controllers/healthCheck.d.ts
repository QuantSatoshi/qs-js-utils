interface HealthCheckOptions {
    timeoutMs: number;
    name: string;
}
export declare class HealthCheck {
    private lastHeartBeat;
    private timeoutMs;
    private name;
    onExit?: (msg: string) => void;
    constructor(options: HealthCheckOptions);
    heartBeat(): void;
    checkHealth(): void;
}
export {};
