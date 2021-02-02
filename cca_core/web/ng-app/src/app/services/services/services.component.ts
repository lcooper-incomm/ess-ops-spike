import { Component, OnInit } from '@angular/core';
import { AppStateType } from "../../app-state-type.enum";
import { CcaBaseComponent } from "../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { ServicePanelType } from "../../core/service/service-panel-type.enum";
import { ServiceState } from "../service-state";
import { snapshot } from "../../core/store-utils/store-utils";
import { ActivatedRoute } from "@angular/router";
import { ServicePanelTypeAction } from "../../core/service/action/service-panel-type-action";

@Component ( {
  selector: 'cca-service',
  templateUrl: './services.component.html',
  styleUrls: [ './services.component.scss' ]
} )
export class ServicesComponent extends CcaBaseComponent implements OnInit {
  servicePanelType: ServicePanelType;

  constructor ( private route: ActivatedRoute,
                private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToServicePanelState ();
    this.subscribeToQueryChange ()
  }

  private subscribeToServicePanelState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SERVICE_STATE ).subscribe ( {
        next: ( servicePanelState: ServiceState ) => {
          if ( servicePanelState ) {
            this.servicePanelType = servicePanelState.selectedServiceType;
          }
        }
      } )
    );
  }

  private subscribeToQueryChange () {
    this.route.queryParams.subscribe ( params => {
      let serviceState: ServiceState = snapshot ( this.store, AppStateType.SERVICE_STATE );
      if ( !serviceState.selectedServiceType && params[ 'services-panel-type' ] ) {
        this.store.dispatch ( new ServicePanelTypeAction ( params[ 'services-panel-type' ] ) );
      }
    } )
  }
}
