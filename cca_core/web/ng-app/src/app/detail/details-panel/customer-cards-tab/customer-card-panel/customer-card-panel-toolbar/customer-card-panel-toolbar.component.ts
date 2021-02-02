import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";
import { Selection } from "../../../../../core/session/model/selection";
import { AppStateType } from "../../../../../app-state-type.enum";
import { SessionState } from "../../../../../core/session/session-state";
import { Card } from "../../../../../core/card/card";
import { forkJoin } from "rxjs";
import { finalize } from "rxjs/operators";
import { CodexService } from "../../../../../codex/codex.service";
import { SecurityService } from "../../../../../core/security/security.service";
import { PlatformStatusValueService } from "../../../../../core/platform/platform-status-value.service";
import { CustomerActionService } from "../../../../selection-action-toolbar/customer-action.service";
import { Session } from "../../../../../core/session/model/session";
import { ActionToolbarButtonStatus } from "../../../../../core/action-toolbar/action-toolbar-button-status";

@Component ( {
  selector: 'cca-customer-card-panel-toolbar',
  templateUrl: './customer-card-panel-toolbar.component.html',
  styleUrls: [ './customer-card-panel-toolbar.component.scss' ]
} )
export class CustomerCardPanelToolbarComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  card: Card;

  actions: ActionToolbarButtonStatus[] = [];
  buildingActions: boolean             = false;
  selection: Selection<any>;

  private session: Session;

  constructor ( private codexService: CodexService,
                private customerActionService: CustomerActionService,
                private platformStatusService: PlatformStatusValueService,
                private securityService: SecurityService,
                private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.buildActions ();
    this.subscribeToSessionState ();
  }

  private buildActions (): void {
    this.buildingActions = true;

    forkJoin ([
      this.customerActionService.checkActivateCard ( this.session, this.selection, this.card ),
      this.customerActionService.checkChangeStatus ( this.session, this.selection, this.card ),
      this.customerActionService.checkRegisterCard ( this.session, this.selection, this.card ),
      this.customerActionService.checkReplaceCard ( this.session, this.selection, this.card )
    ]).pipe (
      finalize ( () => this.buildingActions = false )
    ).subscribe ( ( actions: ActionToolbarButtonStatus[] ) => {
      this.actions = actions;
    } );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.session ) {
            this.session = state.session;
          }

          if ( state && state.selection ) {
            this.selection = state.selection;

            if ( this.selection.getCustomer () ) {
              this.buildActions ();
            }
          }
        } )
    );
  }
}
