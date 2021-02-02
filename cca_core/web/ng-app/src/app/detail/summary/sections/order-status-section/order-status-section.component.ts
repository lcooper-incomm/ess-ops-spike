import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { AppStateType } from "../../../../app-state-type.enum";
import { SessionState } from "../../../../core/session/session-state";
import { PlatformType } from "../../../../core/platform/platform-type.enum";
import { MaplesOrder } from '@cscore/maples-client-model';
import { Selection } from 'src/app/core/session/model/selection';

@Component ( {
  selector: 'cca-order-status-section',
  templateUrl: './order-status-section.component.html',
  styleUrls: [ './order-status-section.component.scss' ]
} )
export class OrderStatusSectionComponent extends AbstractSelectionAwareComponent<MaplesOrder> implements OnInit {

  platformStatusKey: string = 'Order Status';

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  private setPlatformStatusKey (): void {
    if ( this.selection && this.selection.getOrder () ) {
      switch ( this.selection.platform ) {
        case PlatformType.BOL:
          this.platformStatusKey = 'BOL Status';
          break;
        case PlatformType.ECOMM:
          this.platformStatusKey = 'E-Comm Status';
          break;
        default:
          break;
      }
    } else {
      this.platformStatusKey = 'Order Status';
    }
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.selection = state.selection as Selection<MaplesOrder>;
          }
        } )
    );
  }
}
