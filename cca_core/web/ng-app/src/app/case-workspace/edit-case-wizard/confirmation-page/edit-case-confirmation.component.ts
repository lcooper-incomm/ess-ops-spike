import { Component, OnInit } from '@angular/core';
import { EditCaseWizard } from "../edit-case-wizard";
import { FormGroup } from "@angular/forms";
import { WizardWidth } from "../../../core/wizard/wizard-width.enum";
import { WizardResultPage } from "../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";

@Component ( {
  selector: 'cca-edit-case-confirmation',
  templateUrl: './edit-case-confirmation.component.html',
  styleUrls: [ './edit-case-confirmation.component.scss' ]
} )
export class EditCaseConfirmationComponent extends WizardResultPage<EditCaseWizard> implements OnInit {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.isCloseable = true;
    this.width       = WizardWidth.MEDIUM;
  }

  ngOnInit () {
  }

  isSuccess (): boolean {
    return !this.wizard.model.isFailed;
  }
}
