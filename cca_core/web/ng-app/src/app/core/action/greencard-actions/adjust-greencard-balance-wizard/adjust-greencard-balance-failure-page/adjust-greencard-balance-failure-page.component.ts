import { Component } from '@angular/core';
import { AdjustGreencardBalanceWizard } from '../adjust-greencard-balance-wizard';
import { WizardFailurePage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-failure-page';

@Component ( {
  selector: 'cca-adjust-greencard-failure-page',
  template: WizardFailurePage.template,
} )
export class AdjustGreencardBalanceFailurePageComponent extends WizardFailurePage<AdjustGreencardBalanceWizard> {
  isBackable: boolean = true;

  constructor () {
    super ();
  }

  get message(): string {
    return 'Failed to adjust the balance';
  }
}
