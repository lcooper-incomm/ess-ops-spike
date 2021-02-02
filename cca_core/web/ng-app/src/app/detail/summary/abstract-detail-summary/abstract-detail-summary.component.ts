import { Component } from '@angular/core';
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { AppStateType } from "../../../app-state-type.enum";
import { SessionState } from "../../../core/session/session-state";
import { Selection } from "../../../core/session/model/selection";
import { SelectionType } from "../../../core/session/model/selection-type.enum";

@Component ( {
  selector: 'cca-abstract-detail-summary',
  template: ''
} )
export class AbstractDetailSummaryComponent extends CcaBaseComponent {

  description: string;
  selection: Selection<any>;

  constructor ( protected store: Store<AppState> ) {
    super ();
  }

  init () {
    this.subscribeToSessionState ();
  }

  private buildDescription (): void {
    if ( this.selection ) {
      this.description = this.selection.description;
      if ( this.selection.type === SelectionType.CUSTOMER && this.selection.selectedCard ) {
        this.description += ` (**${this.selection.selectedCard.identifiers.pan.slice ( -4 )})`;
      }
    } else {
      this.description = null;
    }
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.selection = state.selection;
            this.buildDescription ();
          }
        } )
    );
  }

}
