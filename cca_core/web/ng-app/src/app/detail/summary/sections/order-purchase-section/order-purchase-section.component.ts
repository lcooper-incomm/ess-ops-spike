import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { WizardRunner } from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import { OrderPaymentDetailsWizard } from './order-payment-details/order-payment-details-wizard';
import { MaplesOrder } from '@cscore/maples-client-model';

@Component ( {
  selector: 'cca-order-purchase-section',
  templateUrl: './order-purchase-section.component.html',
  styleUrls: [ './order-purchase-section.component.scss' ]
} )
export class OrderPurchaseSectionComponent extends AbstractSelectionAwareComponent<MaplesOrder> implements OnInit {

  constructor ( protected store: Store<AppState>) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }
}
