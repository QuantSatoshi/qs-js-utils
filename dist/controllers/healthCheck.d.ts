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
    setOnExit(onExit?: (msg: string) => void): void;
    heartBeat(): void;
    checkHealth(): void;
}
export {};
