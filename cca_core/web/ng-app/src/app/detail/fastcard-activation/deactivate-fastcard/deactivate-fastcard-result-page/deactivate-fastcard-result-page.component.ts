import { Component } from '@angular/core';
import { DeactivateFastcardWizard } from '../deactivate-fastcard-wizard';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { FormGroup } from '@angular/forms';

@Component ( {
  selector: 'cca-deactivate-fastcard-result-page',
  templateUrl: './deactivate-fastcard-result-page.component.html',
  styleUrls: [ './deactivate-fastcard-result-page.component.scss' ]
} )
export class DeactivateFastcardResultPageComponent extends WizardResultPage<DeactivateFastcardWizard> {
  key: string           = 'result-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  isSuccess (): boolean {
    return this.wizard.model.success;
  }
}
