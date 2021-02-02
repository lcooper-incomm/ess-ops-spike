import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { ReplaceFsapiCardWizard } from "../replace-fsapi-card-wizard";
import { WizardWidth } from "../../../../core/wizard/wizard-width.enum";
import { WizardResultPage } from "../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";

@Component ( {
  selector: 'cca-replace-fsapi-card-confirmation',
  templateUrl: './replace-fsapi-card-confirmation.component.html',
  styleUrls: [ './replace-fsapi-card-confirmation.component.scss' ]
} )
export class ReplaceFsapiCardConfirmationComponent extends WizardResultPage<ReplaceFsapiCardWizard> implements OnInit {
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
