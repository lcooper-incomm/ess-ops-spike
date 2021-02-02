import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { MaplesOrderShipment, MaplesOrder } from "@cscore/maples-client-model";
import { AppStateType } from "../../../../app-state-type.enum";
import { SessionState } from "../../../../core/session/session-state";
import { SetSelectionSelectedTabAction } from "../../../../core/session/action/session-actions";
import { DetailTabType } from "../../../detail-tab-type.enum";
import { RoutingService } from "../../../../core/routing/routing.service";
import { scrollToElementById } from "../../../../core/utils/scroll-to-element-by-id";

@Component ( {
  selector: 'cca-order-shipments-section',
  templateUrl: './order-shipments-section.component.html',
  styleUrls: [ './order-shipments-section.component.scss' ]
} )
export class OrderShipmentsSectionComponent extends AbstractSelectionAwareComponent<MaplesOrder> implements OnInit {

  shipments: MaplesOrderShipment[] = [];

  private attemptedToLoadShipments: boolean = false;

  constructor ( private routingService: RoutingService,
                protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
    this.subscribeToSessionState ();
  }

  openShipmentsTab ( shipment: MaplesOrderShipment = null ): void {
    this.selection.selectedTab      = DetailTabType.ORDER_DELIVERIES;
    this.selection.selectedShipment = shipment;
    this.store.dispatch ( new SetSelectionSelectedTabAction ( this.selection ) );
    setTimeout ( () => {
      scrollToElementById ( shipment.id.toString () );
    }, 50 );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection && state.selection.data ) {
            if ( state.selection.orderShipments.length ) {
              this.shipments = state.selection.orderShipments;
            } else {
              this.shipments = [];
            }
          }
        } )
    );
  }

}
