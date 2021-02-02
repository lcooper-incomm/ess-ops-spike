import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCustomerIdentificationFormPageComponent } from './edit-customer-identification-form-page/edit-customer-identification-form-page.component';
import { EditCustomerIdentificationConfirmationPageComponent } from './edit-customer-identification-confirmation-page/edit-customer-identification-confirmation-page.component';
import { EditCustomerIdentificationResultPageComponent } from './edit-customer-identification-result-page/edit-customer-identification-result-page.component';
import { CcaCustomerAccountFormsModule } from '../../customer-account-forms/customer-account-forms.module';
import { CcaEditCustomerConfirmationFormModule } from '../confirmation-form/edit-customer-confirmation-form.module';

@NgModule ( {
  declarations: [
    EditCustomerIdentificationConfirmationPageComponent,
    EditCustomerIdentificationFormPageComponent,
    EditCustomerIdentificationResultPageComponent,
  ],
  entryComponents: [
    EditCustomerIdentificationConfirmationPageComponent,
    EditCustomerIdentificationFormPageComponent,
    EditCustomerIdentificationResultPageComponent,
  ],
  imports: [
    CcaCustomerAccountFormsModule,
    CcaEditCustomerConfirmationFormModule,
    CommonModule
  ]
} )
export class CcaEditCustomerIdentificationModule {
}
