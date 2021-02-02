import { Component, OnInit } from '@angular/core';
import { ChangeFeePlanVmsWizard } from "../change-fee-plan-vms-wizard";
import { FormGroup } from "@angular/forms";
import { WizardResultPage } from "../../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";

@Component ( {
  selector: 'cca-change-fee-plan-vms-confirmation',
  templateUrl: './change-fee-plan-vms-confirmation.component.html',
  styleUrls: [ './change-fee-plan-vms-confirmation.component.scss' ]
} )
export class ChangeFeePlanVmsConfirmationComponent extends WizardResultPage<ChangeFeePlanVmsWizard> implements OnInit {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.isCloseable     = true;
    this.closeButtonText = 'Close'
  }

  ngOnInit () {
  }

  isSuccess (): boolean {
    return !this.wizard.model.isFailed;
  }

}
