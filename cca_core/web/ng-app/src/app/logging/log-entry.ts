import { LogLevel } from "./log-level.enum";

export class LogEntry {

  args: any[] = [];
  level: LogLevel;
  timestamp: Date;

  constructor ( level: LogLevel, ...args: any[] ) {
    this.level     = level;
    this.timestamp = new Date ();
    this.args      = [ ...args ];
  }
}
