import { Component } from '@angular/core';
import { AdjustGreencardBalanceWizard } from '../adjust-greencard-balance-wizard';
import { WizardSuccessPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-success-page';

@Component ( {
  selector: 'cca-adjust-greencard-success-page',
  template: WizardSuccessPage.template,
} )
export class AdjustGreencardBalanceSuccessPageComponent extends WizardSuccessPage<AdjustGreencardBalanceWizard> {
  constructor () {
    super ();
  }

  get message (): string {
    return 'Balance adjusted successfully!';
  }
}
