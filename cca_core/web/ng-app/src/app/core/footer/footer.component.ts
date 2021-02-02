import { Component, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from '../../app-state';
import { AppStateType } from "../../app-state-type.enum";
import { DatePipe } from "@angular/common";
import { DetailState } from "../../detail/detail-state";
import { RoutingService } from "../routing/routing.service";
import { RoutePath } from "../routing/route-path.enum";
import { SummaryModeType } from "../user/summary-mode-type.enum";
import { SessionState } from "../session/session-state";
import { snapshot } from "../store-utils/store-utils";
import { SupportState } from "../support/support-state";

@Component ( {
  selector: 'cca-footer',
  templateUrl: './footer.component.html',
  styleUrls: [ './footer.component.scss' ],
  providers: [ DatePipe ]
} )
export class FooterComponent extends CcaBaseComponent implements OnInit {

  color: string                     = '';
  currentYear: string;
  isVerticalSummaryPresent: boolean = false;
  version: string                   = 'UNKNOWN';

  constructor ( private date: DatePipe,
                private routingService: RoutingService,
                private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.setCurrentYear ();
    this.subscribeToDetailState ();
    this.subscribeToSessionState ();
    this.subscribeToSupportState ();
  }

  private setCurrentYear (): void {
    this.currentYear = this.date.transform ( new Date (), 'yyyy' );
  }

  private setIsVerticalSummaryPresent ( detailState: DetailState, sessionState: SessionState ): void {
    this.isVerticalSummaryPresent = this.routingService.isOn ( RoutePath.DETAIL )
      && sessionState.selection
      && sessionState.selection.data
      && detailState.summaryMode === SummaryModeType.LEFT;
  }

  private subscribeToDetailState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.DETAIL_STATE )
        .subscribe ( ( state: DetailState ) => {
          let sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
          this.setIsVerticalSummaryPresent ( state, sessionState );
        } )
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          let detailState: DetailState = snapshot ( this.store, AppStateType.DETAIL_STATE );
          this.setIsVerticalSummaryPresent ( detailState, state );
        } )
    );
  }

  private subscribeToSupportState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SUPPORT_STATE ).subscribe ( {
        next: ( state: SupportState ) => {
          if ( state && state.canaryInfo ) {
            this.version = state.canaryInfo.version;

            if ( state.canaryInfo.environment === 'GREEN' ) {
              this.color = 'green';
            } else if ( state.canaryInfo.environment === 'BLUE' ) {
              this.color = 'blue';
            }
          }
        }
      } )
    );
  }

}
