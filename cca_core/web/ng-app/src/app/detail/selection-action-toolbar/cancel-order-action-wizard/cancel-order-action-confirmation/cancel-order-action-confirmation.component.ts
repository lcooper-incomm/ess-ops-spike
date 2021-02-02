import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { WizardResultPage } from "../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";
import { ReplaceFsapiCardWizard } from "../../replace-fsapi-card-wizard/replace-fsapi-card-wizard";

@Component ( {
  selector: 'cca-cancel-order-action-confirmation',
  templateUrl: './cancel-order-action-confirmation.component.html',
  styleUrls: [ './cancel-order-action-confirmation.component.scss' ]
} )
export class CancelOrderActionConfirmationComponent extends WizardResultPage<ReplaceFsapiCardWizard> implements OnInit {
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
