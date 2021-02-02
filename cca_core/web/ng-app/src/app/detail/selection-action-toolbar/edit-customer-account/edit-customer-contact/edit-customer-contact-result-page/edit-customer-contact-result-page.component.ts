import { Component } from '@angular/core';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { EditCustomerContactWizard } from '../edit-customer-contact-wizard';

@Component ( {
  selector: 'cca-edit-customer-contact-result-page',
  templateUrl: './edit-customer-contact-result-page.component.html',
  styleUrls: [ './edit-customer-contact-result-page.component.scss' ],
} )
export class EditCustomerContactResultPageComponent extends WizardResultPage<EditCustomerContactWizard> {

  constructor () {
    super ();
  }

  isSuccess (): boolean {
    return !this.wizard.model.isFailed;
  }
}
