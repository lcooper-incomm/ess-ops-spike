import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Session } from "../../../../session/model/session";
import { SessionClassType } from "../../../../session/session-class-type.enum";
import { SelectionType } from "../../../../session/model/selection-type.enum";
import { CcaBaseComponent } from "../../../../cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";
import { AppStateType } from "../../../../../app-state-type.enum";
import { SessionState } from "../../../../session/session-state";
import { SessionStatusType } from "../../../../session/model/session-status-type.enum";
import { Workflow } from "../../../../workflow/workflow.service";
import { DismissSessionAction } from "../../../../session/action/session-actions";
import { CloseDockTabAction } from '../../../action/close-dock-tab-action';

@Component ( {
  selector: 'cca-session-workspace-card',
  templateUrl: './session-workspace-card.component.html',
  styleUrls: [ './session-workspace-card.component.scss' ]
} )
export class SessionWorkspaceCardComponent extends CcaBaseComponent implements OnInit, OnChanges {

  icon: string;
  isActive: boolean   = false;
  isQueued: boolean   = false;
  @Input ()
  isSelected: boolean = false;
  @Input ()
  isViewOnly: boolean = false;
  SelectionType       = SelectionType;
  @Input ()
  session: Session;
  tooltipText: string;

  constructor ( private store: Store<AppState>,
                private workflow: Workflow ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  ngOnChanges ( changes: SimpleChanges ): void {
    this.handleUpdate ();
  }

  loadSession (): void {
    this.store.dispatch ( new CloseDockTabAction () );
    if ( !this.isViewOnly && !this.isActive ) {
      this.store.dispatch ( new DismissSessionAction () );
      this.workflow.loadSessionFromId ( this.session.id )
        .subscribe ();
    }
  }

  private buildIcon (): void {
    if ( this.isViewOnly && this.isSelected ) {
      this.icon = 'chevron-circle-right';
    } else if ( this.session.sessionClassType === SessionClassType.CALL_CENTER ) {
      this.icon = 'phone';
    } else {
      this.icon = 'clipboard';
    }
  }

  private buildTooltip (): void {
    let prefix: string = '';
    let type: string   = '';

    if ( this.isActive ) {
      prefix = 'Active ';
    } else if ( this.isQueued ) {
      prefix = 'Incoming ';
    } else if ( this.session.isInClosedStatus () ) {
      prefix = 'Closed ';
    } else {
      prefix = 'Incomplete ';
    }

    switch ( this.session.sessionClassType ) {
      case SessionClassType.CALL_CENTER:
        type = 'Call';
        break;
      case SessionClassType.CASE:
        type = 'Case';
        break;
      case SessionClassType.GENERAL:
        type = 'General';
        break;
      default:
        type = '';
        break;
    }

    this.tooltipText = prefix + type + ' Session';
  }

  private handleUpdate (): void {
    this.buildIcon ();
    this.buildTooltip ();
    this.setIsQueued ();
  }

  private isCurrentSession ( currentSession: Session ): boolean {
    return currentSession && currentSession.id === this.session.id;
  }

  private setIsQueued (): void {
    this.isQueued = !this.isActive && this.session.status.value === SessionStatusType.QUEUED;
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.isActive = this.isCurrentSession ( state.session );
          }
          this.handleUpdate ();
        } )
    );
  }
}
