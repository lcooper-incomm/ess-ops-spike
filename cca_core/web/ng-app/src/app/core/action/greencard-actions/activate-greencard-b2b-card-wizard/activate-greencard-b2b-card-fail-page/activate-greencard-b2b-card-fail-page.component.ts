import { Component } from '@angular/core';
import { ActivateGreencardB2bCardWizard } from "../activate-greencard-b2b-card-wizard";
import { WizardFailurePage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-failure-page';

@Component({
  selector: 'cca-activate-greencard-b2b-card-fail-page',
  template: WizardFailurePage.template,
} )
export class ActivateGreencardB2bCardFailPageComponent extends WizardFailurePage<ActivateGreencardB2bCardWizard> {
  isBackable: boolean               = true;
  key: string                       = 'fail-page';

  constructor() {
    super();
  }
}
