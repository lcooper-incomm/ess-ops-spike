import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CcaMaterialModule } from 'src/app/core/material/cca-material.module';
import { CcaCoreModule } from 'src/app/core/cca-core.module';
import { EditCustomerAccountContactFormComponent } from './customer-account-contact-form/customer-account-contact-form.component';
import { EditCustomerAccountIdentificationFormComponent } from './customer-account-identification-form/customer-account-identification-form.component';
import { EditCustomerAccountPersonalFormComponent } from './customer-account-personal-form/customer-account-personal-form.component';
import { CardholderInformationFormComponent } from './cardholder-information-form/cardholder-information-form.component';

@NgModule ( {
  declarations: [
    EditCustomerAccountContactFormComponent,
    EditCustomerAccountIdentificationFormComponent,
    EditCustomerAccountPersonalFormComponent,
    CardholderInformationFormComponent,
  ],
  imports: [
    CcaCoreModule,
    CcaMaterialModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    EditCustomerAccountContactFormComponent,
    EditCustomerAccountIdentificationFormComponent,
    EditCustomerAccountPersonalFormComponent,
    CardholderInformationFormComponent
  ]
} )
export class CcaCustomerAccountFormsModule {
}
