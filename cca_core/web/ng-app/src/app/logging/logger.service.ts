import {Injectable, isDevMode} from '@angular/core';
import { LogEntry } from "./log-entry";
import { LogLevel } from "./log-level.enum";
import { DatePipe } from "@angular/common";
import * as _ from "lodash";

@Injectable ( {
  providedIn: 'root'
} )
export class Logger {

  entries: LogEntry[] = [];

  constructor ( private datePipe: DatePipe ) {
  }

  debug ( ...args: any[] ): void {
    this.log ( new LogEntry ( LogLevel.DEBUG, ...args ) );
  }

  error ( ...args: any[] ): void {
    this.log ( new LogEntry ( LogLevel.ERROR, ...args ) );
  }

  info ( ...args: any[] ): void {
    this.log ( new LogEntry ( LogLevel.INFO, ...args ) );
  }

  warn ( ...args: any[] ): void {
    this.log ( new LogEntry ( LogLevel.WARN, ...args ) );
  }

  private log ( entry: LogEntry ): void {
    this.entries.push ( entry );

    let timestamp      = this.datePipe.transform ( entry.timestamp, 'HH:mm:ss' );
    let level          = _.padEnd ( entry.level, 5 );
    let message        = entry.args[ 0 ];
    let additionalArgs = [];

    if ( entry.args.length > 1 ) {
      additionalArgs = _.slice ( entry.args, 1 );
    }
    let fullMessage = `${timestamp} ${level} ${message}`;

    switch ( entry.level ) {
      case LogLevel.ERROR:
        console.error ( fullMessage, ...additionalArgs );
        break;
      case LogLevel.WARN:
        console.warn ( fullMessage, ...additionalArgs );
        break;
      case LogLevel.DEBUG:
        if (isDevMode()) {
          console.debug ( fullMessage, ...additionalArgs );
        }
        break;
      default:
        if (isDevMode()) {
          console.info(fullMessage, ...additionalArgs);
        }
        break;
    }
  }

}
