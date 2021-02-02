import {Component} from '@angular/core';
import {WizardResultPage} from '../../../../wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import {ChangeAccountStatusWizard} from '../change-account-status-wizard';

@Component({
  selector: 'cca-change-account-status-result-page',
  templateUrl: './change-account-status-result-page.component.html',
  styleUrls: ['./change-account-status-result-page.component.scss']
})
export class ChangeAccountStatusResultPageComponent extends WizardResultPage<ChangeAccountStatusWizard> {

  constructor() {
    super();
  }

  isSuccess(): boolean {
    return this.wizard.model.success === 0;
  }
}
