import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcaEditCustomerSummaryModule } from './edit-customer-summary/edit-customer-summary.module';
import { CcaEditCustomerConfirmationFormModule } from './confirmation-form/edit-customer-confirmation-form.module';
import { CcaEditCustomerContactModule } from './edit-customer-contact/edit-customer-contact.module';
import { CcaEditCustomerIdentificationModule } from './edit-customer-identification/edit-customer-identification.module';

@NgModule ( {
  imports: [
    CommonModule,
    CcaEditCustomerConfirmationFormModule,
    CcaEditCustomerContactModule,
    CcaEditCustomerIdentificationModule,
    CcaEditCustomerSummaryModule,
  ]
} )
export class CcaEditCustomerAccountModule {
}
