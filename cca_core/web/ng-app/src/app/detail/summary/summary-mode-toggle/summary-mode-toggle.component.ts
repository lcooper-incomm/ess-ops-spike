import { Component, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { AppState } from "../../../app-state";
import { Store } from '@ngrx/store';
import { AppStateType } from "../../../app-state-type.enum";
import { DetailState } from "../../detail-state";
import { SummaryModeType } from "../../../core/user/summary-mode-type.enum";
import { SetDetailSummaryModeAction } from "../../detail-actions";

@Component ( {
  selector: 'cca-summary-mode-toggle',
  templateUrl: './summary-mode-toggle.component.html',
  styleUrls: [ './summary-mode-toggle.component.scss' ]
} )
export class SummaryModeToggleComponent extends CcaBaseComponent implements OnInit {

  icon: string;
  tooltip: string;

  private summaryMode: SummaryModeType;

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToDetailState ();
  }

  toggleView (): void {
    let mode = this.summaryMode === SummaryModeType.TOP ? SummaryModeType.LEFT : SummaryModeType.TOP;
    this.store.dispatch ( new SetDetailSummaryModeAction ( mode ) );
  }

  private subscribeToDetailState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.DETAIL_STATE )
        .subscribe ( ( state: DetailState ) => {
          if ( state ) {
            this.summaryMode = state.summaryMode;
            this.icon        = state.summaryMode === SummaryModeType.LEFT ? 'arrow-alt-circle-up' : 'arrow-alt-circle-down';
            this.tooltip     = state.summaryMode === SummaryModeType.LEFT ? 'Change to Horizontal Mode' : 'Change to Vertical Mode';
          }
        } )
    );
  }

}
