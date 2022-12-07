interface HealthCheckOptions {
  timeoutMs: number; // MS
  name: string;
}

export class HealthCheck {
  private lastHeartBeat: null | Date;
  private timeoutMs: number;
  private name: string;
  public onExit?: (msg: string) => void;

  constructor(options: HealthCheckOptions) {
    this.lastHeartBeat = null;
    this.timeoutMs = options.timeoutMs;
    this.name = options.name || 'default';
    console.log(`${this.name} health check started on ${new Date().toISOString()}`);
    setInterval(this.checkHealth.bind(this), Math.min(this.timeoutMs, 60000));
  }

  setOnExit(onExit?: (msg: string) => void) {
    this.onExit = onExit;
  }

  heartBeat() {
    this.lastHeartBeat = new Date();
  }

  checkHealth() {
    // not init yet
    if (!this.lastHeartBeat) {
      this.heartBeat(); // force heart beat at beginning.
      return;
    }
    if (new Date().getTime() - this.lastHeartBeat.getTime() > this.timeoutMs) {
      console.error(`${this.name} health check no heart beat in ${this.timeoutMs}`);
      this.onExit && this.onExit('health check no heart beat, exit now');
      setTimeout(() => {
        process.exit(1);
      }, 5000);
    }
  }
}
