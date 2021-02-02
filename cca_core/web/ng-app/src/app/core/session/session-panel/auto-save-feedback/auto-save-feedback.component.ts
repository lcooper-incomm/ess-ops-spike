import { Component, Input, OnInit } from '@angular/core';
import { Session } from "../../model/session";
import { CcaBaseComponent } from "../../../cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { AppStateType } from "../../../../app-state-type.enum";

@Component ( {
  selector: 'cca-auto-save-feedback',
  templateUrl: './auto-save-feedback.component.html',
  styleUrls: [ './auto-save-feedback.component.scss' ]
} )
export class AutoSaveFeedbackComponent extends CcaBaseComponent implements OnInit {

  isSaving: boolean = false;
  lastSavedDate: Date;
  @Input ()
  session: Session;

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE ).subscribe ( {
        next: sessionState => {
          if ( sessionState ) {
            this.isSaving      = sessionState.isSaving;
            this.session       = sessionState.session;
            this.lastSavedDate = sessionState.lastSavedDate;
          }
        }
      } )
    );
  }

}
