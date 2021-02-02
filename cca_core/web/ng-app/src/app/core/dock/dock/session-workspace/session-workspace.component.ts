import { Component, OnInit, ViewChild } from '@angular/core';
import { AppState } from "../../../../app-state";
import { Store } from '@ngrx/store';
import { SessionService } from "../../../session/session.service";
import { CcaBaseComponent } from "../../../cca-base-component";
import { AppStateType } from "../../../../app-state-type.enum";
import { Session } from "../../../session/model/session";
import * as _ from "lodash";
import { SessionStatusType } from "../../../session/model/session-status-type.enum";
import { SpinnerSize } from "../../../spinner/spinner-size.enum";
import { SpinnerComponent } from "../../../spinner/spinner.component";
import { finalize } from "rxjs/operators";
import { SessionState } from "../../../session/session-state";
import { snapshot } from "../../../store-utils/store-utils";
import { AppendToWorkspaceAction, RefreshWorkspaceAction } from "../../../session/action/session-actions";

@Component ( {
  selector: 'cca-session-workspace',
  templateUrl: './session-workspace.component.html',
  styleUrls: [ './session-workspace.component.scss' ]
} )
export class SessionWorkspaceComponent extends CcaBaseComponent implements OnInit {

  activeSession: Session;
  currentPage: number             = 0;
  incomingCallSessions: Session[] = [];
  incompleteSessions: Session[]   = [];
  SpinnerSize                     = SpinnerSize;
  totalPages: number              = 0;

  @ViewChild ( 'loadMoreSpinner' )
  loadMoreSpinner: SpinnerComponent;
  @ViewChild ( 'workspaceSpinner' )
  workspaceSpinner: SpinnerComponent;

  constructor ( private sessionService: SessionService,
                private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.loadSessions ();
    this.subscribeToSessionState ();
  }

  loadSessions ( page: number = 0, limit: number = 50 ): void {
    let sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
    if ( page !== 0 || !sessionState.workspaceSessions ) {
      if ( page === 0 ) {
        this.workspaceSpinner.start ();
      }
      this.sessionService.findWorkspaceSessions ( page, limit )
        .pipe ( finalize ( () => {
          this.workspaceSpinner.stop ();
          if ( this.loadMoreSpinner ) {
            this.loadMoreSpinner.stop ();
          }
        } ) )
        .subscribe ( {
          next: results => {
            if ( page === 0 ) {
              this.store.dispatch ( new RefreshWorkspaceAction ( results ) );
            } else {
              this.store.dispatch ( new AppendToWorkspaceAction ( results ) );
            }
          }
        } );
    }
  }

  nextPage (): void {
    this.loadMoreSpinner.start ();
    this.loadSessions ( this.currentPage + 1 );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE ).subscribe ( {
        next: sessionState => {
          if ( sessionState && sessionState.workspaceSessions ) {
            //Get handle on our active session to call it out separately
            if ( sessionState.session ) {
              this.activeSession = _.find ( sessionState.workspaceSessions.content, function ( workspaceSession: Session ) {
                return workspaceSession.id === sessionState.session.id;
              } );
            } else {
              this.activeSession = null;
            }

            //Find all queued sessions to call out separately
            this.incomingCallSessions = _.filter ( sessionState.workspaceSessions.content, function ( workspaceSession: Session ) {
              return (!sessionState.session || workspaceSession.id !== sessionState.session.id)
                && workspaceSession.status.value === SessionStatusType.QUEUED;
            } );

            //Find all other sessions to set at the bottom of the stack
            this.incompleteSessions = _.filter ( sessionState.workspaceSessions.content, function ( workspaceSession: Session ) {
              return (!sessionState.session || workspaceSession.id !== sessionState.session.id)
                && workspaceSession.status.value !== SessionStatusType.QUEUED;
            } );

            //Set pagination flags
            this.currentPage = sessionState.workspaceSessions.number;
            this.totalPages  = sessionState.workspaceSessions.totalPages;
          } else {
            this.activeSession        = null;
            this.currentPage          = 0;
            this.incomingCallSessions = [];
            this.incompleteSessions   = [];
            this.totalPages           = 0;
          }
        }
      } )
    );
  }
}
