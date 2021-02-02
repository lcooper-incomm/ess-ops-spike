import { Component } from '@angular/core';
import { ActivateGreencardGiftCardWizard } from "../activate-greencard-gift-card-wizard";
import { WizardSuccessPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-success-page';

@Component({
  selector: 'cca-activate-greencard-gift-card-success-page',
  template: WizardSuccessPage.template,
} )
export class ActivateGreencardGiftCardSuccessPageComponent extends WizardSuccessPage<ActivateGreencardGiftCardWizard> {
  constructor() {
    super();
  }

  get message (): string {
    return this.wizard.model.panLastFour ? `CCA successfully activated the card ending in ${this.wizard.model.panLastFour}` :
      'CCA successfully activated the card.';
  }
}
