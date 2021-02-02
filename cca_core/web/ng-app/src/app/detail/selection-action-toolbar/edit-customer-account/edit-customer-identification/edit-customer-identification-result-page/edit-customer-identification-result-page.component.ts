import { Component } from '@angular/core';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { EditCustomerIdentificationWizard } from '../edit-customer-identification-wizard';

@Component ( {
  selector: 'cca-edit-customer-identification-result-page',
  templateUrl: './edit-customer-identification-result-page.component.html',
  styleUrls: [ './edit-customer-identification-result-page.component.scss' ]
} )
export class EditCustomerIdentificationResultPageComponent extends WizardResultPage<EditCustomerIdentificationWizard> {

  constructor () {
    super ();
  }

  isSuccess (): boolean {
    return !this.wizard.model.isFailed;
  }
}
