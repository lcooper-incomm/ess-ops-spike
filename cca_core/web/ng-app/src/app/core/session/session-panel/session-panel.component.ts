import {Component, OnInit} from '@angular/core';
import {CcaBaseComponent} from "../../cca-base-component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app-state";
import {AppStateType} from "../../../app-state-type.enum";
import {Session} from "../model/session";
import {Selection} from "../model/selection";
import {CollapseSessionPanelAction, OpenSessionPanelAction} from "../action/session-actions";
import {SessionClassType} from "../session-class-type.enum";
import {FormGroup} from "@angular/forms";
import {SessionFormBuilder} from "./session-form-builder.service";
import {SessionValidator} from "../session-validator.service";
import {SessionState} from "../session-state";
import {orderBy} from "../../utils/string-utils";

@Component ( {
  selector: 'cca-session-panel',
  templateUrl: './session-panel.component.html',
  styleUrls: [ './session-panel.component.scss' ]
} )
export class SessionPanelComponent extends CcaBaseComponent implements OnInit {

  isCollapsed: boolean  = false;
  isDockPinned: boolean = false;
  isSaving: boolean     = false;
  selection: Selection<any>;
  session: Session;
  sessionForm: FormGroup;
  SessionClassType      = SessionClassType;

  constructor ( private sessionFormBuilder: SessionFormBuilder,
                private sessionValidator: SessionValidator,
                private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
    this.subscribeToDockState ();
  }

  toggleIsCollapsed (): void {
    if ( this.isCollapsed ) {
      this.store.dispatch ( new OpenSessionPanelAction () );
    } else {
      this.store.dispatch ( new CollapseSessionPanelAction () );
    }
  }

  private subscribeToDockState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.DOCK_STATE ).subscribe ( {
        next: dockState => {
          if ( dockState ) {
            this.isDockPinned = dockState.isOpen && dockState.isPinned;
          }
        }
      } )
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.isCollapsed = state.isCollapsed;
            this.selection   = state.selection;
            this.session     = state.session;
            this.buildFormConfig ();
            this.orderSelections();
          }
        } )
    );
  }

  private buildFormConfig (): void {
    if ( this.session ) {
      this.sessionForm = this.sessionFormBuilder.build ( this.session );
      if ( this.sessionValidator.isDisabled ( this.session ) ) {
        this.sessionForm.disable ();
      } else {
        this.sessionForm.enable ();
      }
    }
  }

  private orderSelections() {
    if (this.session && this.session.selections) {
      this.session.selections = orderBy(this.session.selections, 'id');
    }
  }
}
