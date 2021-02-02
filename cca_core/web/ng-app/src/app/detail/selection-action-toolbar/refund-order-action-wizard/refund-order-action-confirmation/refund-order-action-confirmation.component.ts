import { Component, OnInit } from '@angular/core';
import { RefundOrderActionWizard } from "../refund-order-action-wizard";
import { FormGroup } from "@angular/forms";
import { WizardResultPage } from "../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";

@Component ( {
  selector: 'cca-refund-order-action-confirmation',
  templateUrl: './refund-order-action-confirmation.component.html',
  styleUrls: [ './refund-order-action-confirmation.component.scss' ]
} )
export class RefundOrderActionConfirmationComponent extends WizardResultPage<RefundOrderActionWizard> implements OnInit {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.isCloseable     = true;
    this.closeButtonText = 'Close';
  }

  ngOnInit () {
  }

  isSuccess (): boolean {
    return !this.wizard.model.isFailed;
  }
}
