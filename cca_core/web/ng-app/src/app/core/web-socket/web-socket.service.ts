import { EventEmitter, Injectable } from '@angular/core';
import * as Atmosphere from "atmosphere.js";
import { WebSocketEvent, WebSocketEventType } from "./event/web-socket-event";
import { AutoWrappedEvent } from "./event/auto-wrapped-event";
import { CallConnectEvent } from "./event/call-connect-event";
import { CallDisconnectEvent } from "./event/call-disconnect-event";
import { Session } from "../session/model/session";
import { Logger } from "../../logging/logger.service";
import { RefreshCodexEvent } from "./event/refresh-codex-event";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { LoadCodexAction } from "../../codex/action/load-codex-action";
import { Codex } from "@cscore/codex";
import {RefreshDictionaryEvent} from './event/refresh-dictionary-event';
import {DictionaryService} from '../dictionary/dictionary.service';

@Injectable()
export class WebSocketService {

  public events$: EventEmitter<WebSocketEvent<any>> = new EventEmitter<WebSocketEvent<any>> ();

  private socket: typeof Atmosphere = Atmosphere;

  private subsockets: any[] = [];

  constructor ( private logger: Logger,
                private dictionaryService: DictionaryService,
                private store: Store<AppState> ) {
  }

  connect ( topic: string ): void {
    if ( !this.socket ) {
      this.socket = Atmosphere;
    }

    let config = this.buildConnection ( topic );
    this.subsockets.push ( this.socket.subscribe ( config ) );
  }

  disconnect (): void {
    this.subsockets.forEach ( ( socket: any ) => {
      socket.close ();
    } );
    this.subsockets = [];

    if ( this.socket && this.socket.close ) {
      this.socket.close ();
    }
  }

  private buildConnection ( topic: string ): any {
    let service = this;
    return {
      url: '/websocket/' + topic,
      connectTimeout: 5000, //Wait 5 seconds before failing the connection
      reconnectInterval: 3000, //Wait 3 seconds between each reconnect attempt
      timeout: 3600000, //Maximum idle connection time (1 hour)
      contentType: "application/json",
      logLevel: "error",
      transport: 'websocket',
      fallbackTransport: 'long-polling',
      trackMessageLength: true,
      maxReconnectOnClose: 100, //Attempt to reconnect up to 100 times (x3s interval = 5 min)

      onClose: function ( response ) {
        service.logger.info ( 'Closed Atmosphere Websocket Connection', response );
      },
      onError: function ( error ) {
        service.logger.error ( 'Error in Atmosphere Websocket Connection', error );
      },
      onMessage: function ( response ) {
        let message: WebSocketEvent<any> = null;

        //We only care to parse messages in the specified format
        if ( response.responseBody && response.responseBody.startsWith ( '{"event"' ) ) {
          try {
            let rawMessage = JSON.parse ( response.responseBody );
            if ( rawMessage.event ) {
              switch ( rawMessage.event ) {
                case WebSocketEventType.AUTO_WRAPPED:
                  message = new AutoWrappedEvent ( service.parseSession ( rawMessage ) );
                  break;
                case WebSocketEventType.CALL_CONNECT:
                  message = new CallConnectEvent ( service.parseSession ( rawMessage ) );
                  break;
                case WebSocketEventType.CALL_DISCONNECT:
                  message = new CallDisconnectEvent ( service.parseSession ( rawMessage ) );
                  break;
                case WebSocketEventType.REFRESH_CODEX:
                  message = new RefreshCodexEvent ( service.parseCodex ( rawMessage ) );
                  break;
                case WebSocketEventType.REFRESH_DICTIONARY:
                  message = new RefreshDictionaryEvent ();
                  break;
                default:
                //Ignore other messages
              }
            }
          } catch ( e ) {
            service.logger.error ( 'Failed to parse Atmosphere Websocket Event message', e );
          }
        }

        if ( message && message.type ) {
          service.logger.info ( 'Received Atmosphere Websocket Event', message );
          // TODO I think we can just broadcast actions straight from here, and get rid of SessionEventListener
          switch ( message.type ) {
            case WebSocketEventType.REFRESH_CODEX:
              service.store.dispatch ( new LoadCodexAction ( message.content ) );
              break;
            case WebSocketEventType.REFRESH_DICTIONARY:
              service.dictionaryService.clear();
              break;
            default:
              service.events$.emit ( message );
              break;
          }
        }
      },
      onOpen: function ( response ) {
        service.logger.info ( 'Opened Atmosphere Websocket Connection', response );
      }
    };
  }

  parseCodex ( rawMessage: any ): Codex {
    let codex = JSON.parse ( rawMessage.codex );
    return new Codex ( codex );
  }

  parseSession ( rawMessage: any ): Session {
    let session = JSON.parse ( rawMessage.session );
    return new Session ( session );
  }
}
