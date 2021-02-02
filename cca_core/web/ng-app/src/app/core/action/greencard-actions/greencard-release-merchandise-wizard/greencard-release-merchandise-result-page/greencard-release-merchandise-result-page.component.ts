import { Component } from '@angular/core';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { GreencardReleaseMerchandiseWizard } from '../greencard-release-merchandise-wizard';

@Component ( {
  selector: 'cca-greencard-release-merchandise-result-page',
  templateUrl: './greencard-release-merchandise-result-page.component.html',
  styleUrls: [ './greencard-release-merchandise-result-page.component.scss' ],
} )
export class GreencardReleaseMerchandiseResultPageComponent extends WizardResultPage<GreencardReleaseMerchandiseWizard> {
  constructor () {
    super ();
    this.isCloseable = true;
  }

  isSuccess (): boolean {
    return this.wizard.model.success;
  }
}
