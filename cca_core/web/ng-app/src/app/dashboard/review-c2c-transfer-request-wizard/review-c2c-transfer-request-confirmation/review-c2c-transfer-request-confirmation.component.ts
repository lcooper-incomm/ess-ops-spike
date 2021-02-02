import { Component, OnInit } from '@angular/core';

import { ReviewC2cTransferRequestWizard } from "../review-c2c-transfer-request-wizard";
import { FormGroup } from "@angular/forms";
import { WizardResultPage } from "../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";

@Component ( {
  selector: 'cca-review-c2c-transfer-request-confirmation',
  templateUrl: './review-c2c-transfer-request-confirmation.component.html',
  styleUrls: [ './review-c2c-transfer-request-confirmation.component.scss' ]
} )
export class ReviewC2cTransferRequestConfirmationComponent extends WizardResultPage<ReviewC2cTransferRequestWizard> implements OnInit {
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
