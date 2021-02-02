import { Component } from '@angular/core';
import { ActivateGreencardGiftCardWizard } from "../activate-greencard-gift-card-wizard";
import { WizardFailurePage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-failure-page';

@Component({
  selector: 'cca-activate-greencard-gift-card-fail-page',
  template: WizardFailurePage.template,
} )
export class ActivateGreencardGiftCardFailPageComponent extends WizardFailurePage<ActivateGreencardGiftCardWizard> {
  isBackable: boolean               = true;
  key: string                       = 'fail-page';

  constructor() {
    super();
  }
}
