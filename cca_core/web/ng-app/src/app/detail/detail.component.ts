import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../app-state";
import { SummaryModeType } from "../core/user/summary-mode-type.enum";
import { CcaBaseComponent } from "../core/cca-base-component";
import { AppStateType } from "../app-state-type.enum";
import { DetailState } from "./detail-state";
import { SessionState } from "../core/session/session-state";
import { Selection } from "../core/session/model/selection";
import { Workflow } from "../core/workflow/workflow.service";
import { SelectionType } from "../core/session/model/selection-type.enum";

@Component ( {
  selector: 'cca-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './detail.component.scss' ]
} )
export class DetailComponent extends CcaBaseComponent implements OnInit {

  selection: Selection<any>;
  SelectionType   = SelectionType;
  summaryMode: SummaryModeType;
  SummaryModeType = SummaryModeType;

  constructor ( private store: Store<AppState>,
                private workflow: Workflow ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToDetailState ();
    this.subscribeToSessionState ();
  }

  reloadSelection (): void {
    this.workflow.loadSelection ( this.selection )
      .subscribe ();
  }

  private subscribeToDetailState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.DETAIL_STATE )
        .subscribe ( ( state: DetailState ) => {
          if ( state ) {
            this.summaryMode = state.summaryMode;
          }
        } )
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.selection = state.selection;
          }
        } )
    );
  }

}
