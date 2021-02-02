import { Component } from '@angular/core';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { FsapiReverseFeeWizard } from '../fsapi-reverse-fee-wizard';

@Component ( {
  selector: 'cca-fsapi-reverse-fee-result-page',
  templateUrl: './fsapi-reverse-fee-result-page.component.html',
  styleUrls: [ './fsapi-reverse-fee-result-page.component.scss' ]
} )
export class FsapiReverseFeeResultPageComponent extends WizardResultPage<FsapiReverseFeeWizard> {

  constructor () {
    super ();
  }

  isSuccess (): boolean {
    return this.wizard.model.success;
  }
}
