import { Component } from '@angular/core';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { EditCustomerSummaryWizard, EditCustomerSummaryPageType } from '../edit-customer-summary-wizard';

@Component ( {
  selector: 'cca-edit-customer-summary-result-page',
  templateUrl: './edit-customer-summary-result-page.component.html',
  styleUrls: [ './edit-customer-summary-result-page.component.scss' ]
} )
export class EditCustomerSummaryResultPageComponent extends WizardResultPage<EditCustomerSummaryWizard> {
  key: string = EditCustomerSummaryPageType.RESULT;

  constructor () {
    super ();
  }

  isSuccess (): boolean {
    return !this.wizard.model.isFailed;
  }
}
