import { Component, OnInit } from '@angular/core';
import { UpgradeCardWizard } from "../upgrade-card-wizard";
import { WizardResultPage } from "../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";
import { FormGroup } from "@angular/forms";
import { WizardWidth } from "../../../../core/wizard/wizard-width.enum";

@Component ( {
  selector: 'cca-upgrade-card-confirmation',
  templateUrl: './upgrade-card-confirmation.component.html',
  styleUrls: [ './upgrade-card-confirmation.component.scss' ]
} )
export class UpgradeCardConfirmationComponent extends WizardResultPage<UpgradeCardWizard> implements OnInit {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.isCloseable     = true;
    this.closeButtonText = 'Close';
    this.width           = WizardWidth.MEDIUM;
  }

  ngOnInit () {
  }

  isSuccess (): boolean {
    return !this.wizard.model.isFailed;
  }

}
