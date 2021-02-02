import { Component } from '@angular/core';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { EnableTokenProvisioningWizard } from '../enable-token-provisioning-wizard';

@Component ( {
  selector: 'cca-enable-token-provisioning-result-page',
  templateUrl: './enable-token-provisioning-result-page.component.html',
  styleUrls: [ './enable-token-provisioning-result-page.component.scss' ]
} )
export class EnableTokenProvisioningResultPageComponent extends WizardResultPage<EnableTokenProvisioningWizard> {

  constructor () {
    super ();
  }

  isSuccess (): boolean {
    return this.wizard.model.success;
  }
}
