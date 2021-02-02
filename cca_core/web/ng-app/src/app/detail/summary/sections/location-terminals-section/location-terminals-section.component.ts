import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { AppStateType } from "../../../../app-state-type.enum";
import { SessionState } from "../../../../core/session/session-state";
import { TerminalService } from "../../../../core/node/terminal/terminal.service";
import { SpinnerComponent } from "../../../../core/spinner/spinner.component";
import { finalize } from "rxjs/operators";
import { Terminal } from "../../../../core/node/terminal/terminal";
import {
  SetSelectionSelectedTabAction,
  SetSelectionTerminalsAction
} from "../../../../core/session/action/session-actions";
import { RoutingService } from "../../../../core/routing/routing.service";
import { DetailTabType } from "../../../detail-tab-type.enum";
import { SelectionType } from "../../../../core/session/model/selection-type.enum";
import { Location } from 'src/app/core/node/location/location';

@Component ( {
  selector: 'cca-location-terminals-section',
  templateUrl: './location-terminals-section.component.html',
  styleUrls: [ './location-terminals-section.component.scss' ]
} )
export class LocationTerminalsSectionComponent extends AbstractSelectionAwareComponent<Location> implements OnInit {

  private attemptedToLoadTerminals: boolean = false;

  @ViewChild ( 'terminalsSpinner' )
  spinner: SpinnerComponent;

  constructor ( private routingService: RoutingService,
                protected store: Store<AppState>,
                private terminalService: TerminalService ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
    this.subscribeToSessionState ();
  }

  openTerminalsTab (): void {
    this.selection.selectedTab = DetailTabType.LOCATION_TERMINALS;
    this.store.dispatch ( new SetSelectionSelectedTabAction ( this.selection ) );
  }

  private loadTerminals (): void {
    if ( !this.attemptedToLoadTerminals ) {
      this.attemptedToLoadTerminals = true;
      this.spinner.start ();
      this.terminalService.findAllByLocationId ( this.selection.getLocation ().id )
        .pipe ( finalize ( () => this.spinner.stop () ) )
        .subscribe ( ( terminals: Terminal[] ) => {
          this.selection.terminals = terminals;
          this.store.dispatch ( new SetSelectionTerminalsAction ( this.selection ) );
        } );
    }
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection && state.selection.type === SelectionType.LOCATION && !state.selection.terminals.length ) {
            this.loadTerminals ();
          }
        } )
    );
  }

}
