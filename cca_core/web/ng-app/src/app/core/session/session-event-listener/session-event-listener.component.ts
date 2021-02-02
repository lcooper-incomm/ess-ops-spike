import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { CcaBaseComponent } from "../../cca-base-component";
import { WebSocketService } from "../../web-socket/web-socket.service";
import { WebSocketEvent, WebSocketEventType } from "../../web-socket/event/web-socket-event";
import { SessionService } from "../session.service";
import { SessionState } from '../session-state';
import { AppStateType } from "../../../app-state-type.enum";
import { AddSessionToWorkspaceAction, AutoWrapCallRemoteAction, DisconnectCallAction } from "../action/session-actions";
import { ToastFactory } from "../../../toast/toast-factory.service";
import { Session } from "../model/session";
import { Workflow } from "../../workflow/workflow.service";
import { flatMap } from "rxjs/operators";
import {Logger} from '../../../logging/logger.service';

@Component ( {
  selector: 'cca-session-event-listener',
  template: ''
} )
export class SessionEventListenerComponent extends CcaBaseComponent implements OnInit {

  private sessionState: SessionState;

  constructor ( private sessionService: SessionService,
                private store: Store<AppState>,
                private logger: Logger,
                private toastFactory: ToastFactory,
                private webSocketService: WebSocketService,
                private workflow: Workflow ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
    this.subscribeToWebSocketEvents ();
  }

  private handleCallConnectEvent ( session: Session ): void {
    this.logger.debug('SessionEventListenerComponent: handleCallConnectEvent');

    //Add the new session to the workspace
    this.store.dispatch ( new AddSessionToWorkspaceAction ( session ) );

    //Only load the session if we are not already in the middle of another
    if ( !this.sessionState.session ) {
      this.workflow.loadSessionFromId ( session.id, true )
        .subscribe ();
    }
  }

  private handleCallDisconnectEvent ( session: Session ): void {
    this.sessionService.postProcessSession ( session );
    this.store.dispatch ( new DisconnectCallAction ( session ) );
  }

  private handleAutoWrappedEvent ( session: Session ): void {
    this.sessionService.postProcessSession ( session );
    this.store.dispatch ( new AutoWrapCallRemoteAction ( session ) );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE ).subscribe ( {
        next: sessionState => this.sessionState = sessionState
      } )
    );
  }

  private subscribeToWebSocketEvents (): void {
    this.addSubscription (
      this.webSocketService.events$.subscribe ( {
        next: ( event: WebSocketEvent<any> ) => {
          switch ( event.type ) {
            case WebSocketEventType.AUTO_WRAPPED:
              this.handleAutoWrappedEvent ( event.content );
              break;
            case WebSocketEventType.CALL_CONNECT:
              this.handleCallConnectEvent ( event.content );
              break;
            case WebSocketEventType.CALL_DISCONNECT:
              this.handleCallDisconnectEvent ( event.content );
              break;
          }
        }
      } )
    );
  }
}
