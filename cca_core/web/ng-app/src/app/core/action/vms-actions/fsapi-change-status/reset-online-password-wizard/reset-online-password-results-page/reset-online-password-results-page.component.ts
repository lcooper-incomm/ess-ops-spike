import { Component } from '@angular/core';
import { ResetOnlinePasswordWizard } from "../reset-online-password-wizard";
import { FormGroup } from "@angular/forms";
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';

@Component({
  selector: 'cca-reset-online-password-results-page',
  templateUrl: './reset-online-password-results-page.component.html',
  styleUrls: ['./reset-online-password-results-page.component.scss']
})
export class ResetOnlinePasswordResultsPageComponent extends WizardResultPage<ResetOnlinePasswordWizard> {
  key: string             = 'result-page';
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor() {
    super();
  }

  isSuccess (): boolean {
    return !this.wizard.model.actionFailed;
  }
}
