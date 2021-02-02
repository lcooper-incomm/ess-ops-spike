import { Component } from '@angular/core';
import { ActivateGreencardB2bCardWizard } from "../activate-greencard-b2b-card-wizard";
import { WizardSuccessPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-success-page';

@Component({
  selector: 'cca-activate-greencard-b2b-card-success-page',
  template: WizardSuccessPage.template,
} )
export class ActivateGreencardB2bCardSuccessPageComponent extends WizardSuccessPage<ActivateGreencardB2bCardWizard> {
  constructor() {
    super();
  }

  get message (): string {
    return this.wizard.model.panLastFour ? `CCA successfully activated the card ending in ${this.wizard.model.panLastFour}` :
      'CCA successfully activated the card.';
  }
}
