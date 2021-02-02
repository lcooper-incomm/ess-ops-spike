import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Logger } from "../../logging/logger.service";
import { RoutingService } from "../routing/routing.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";

import { RoutePath } from "../routing/route-path.enum";
import { ServicePanelTypeAction } from "./action/service-panel-type-action";

@Injectable ( {
  providedIn: 'root'
} )
export class ServicesPanelTypeService {
  constructor ( private http: HttpClient,
                private logger: Logger,
                private routingService: RoutingService,
                private store: Store<AppState> ) {
  }

  public setServicePanelType ( type ) {
    if ( type ) {
      let params                      = {};
      params[ 'services-panel-type' ] = type;
      this.store.dispatch ( new ServicePanelTypeAction ( type ) );
      this.routingService.navigateTo ( RoutePath.SERVICES, params );
    }
  }
}
