import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { SecurityService } from "../../../../core/security/security.service";
import { AppStateType } from "../../../../app-state-type.enum";
import { Permission } from "../../../../core/auth/permission";
import { WizardRunner } from "../../../../core/wizard/wizard-runner/wizard-runner.service";
import { OrderRiskDetailsWizard } from "./order-risk--details-wizard/order-risk-details-wizard";
import { MaplesOrderPaymentRisk, MaplesOrder } from "@cscore/maples-client-model";

@Component ( {
  selector: 'cca-order-risk-section',
  templateUrl: './order-risk-section.component.html',
  styleUrls: [ './order-risk-section.component.scss' ]
} )
export class OrderRiskSectionComponent extends AbstractSelectionAwareComponent<MaplesOrder> implements OnInit {

  hasPermission: boolean = false;

  constructor ( private securityService: SecurityService,
                protected store: Store<AppState>,
                private wizardRunner: WizardRunner ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
    this.subscribeToAuthenticationState ();
  }

  openRiskDetails ( orderPaymentRisk: MaplesOrderPaymentRisk ): void {
    let orderRiskDetailsWizard        = new OrderRiskDetailsWizard ();
    orderRiskDetailsWizard.model.risk = orderPaymentRisk;
    this.wizardRunner.run ( orderRiskDetailsWizard );
  }

  private subscribeToAuthenticationState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.AUTHENTICATION_STATE )
        .subscribe ( () => {
          this.hasPermission = this.securityService.hasPermission ( Permission.VIEW_SENSITIVE_ORDER_INFORMATION );
        } )
    );
  }
}
