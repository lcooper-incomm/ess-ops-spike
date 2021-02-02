import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CcaCustomerAccountFormsModule } from '../../customer-account-forms/customer-account-forms.module';
import { CcaEditCustomerConfirmationFormModule } from '../confirmation-form/edit-customer-confirmation-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCustomerContactFormPageComponent } from './edit-customer-contact-form-page/edit-customer-contact-form-page.component';
import { EditCustomerContactConfirmationPageComponent } from './edit-customer-contact-confirmation-page/edit-customer-contact-confirmation-page.component';
import { EditCustomerContactResultPageComponent } from './edit-customer-contact-result-page/edit-customer-contact-result-page.component';
import { CcaFormsModule } from 'src/app/core/form/forms.module';

@NgModule ( {
  declarations: [
    EditCustomerContactConfirmationPageComponent,
    EditCustomerContactFormPageComponent,
    EditCustomerContactResultPageComponent,
  ],
  entryComponents: [
    EditCustomerContactConfirmationPageComponent,
    EditCustomerContactFormPageComponent,
    EditCustomerContactResultPageComponent,
  ],
  imports: [
    CcaCustomerAccountFormsModule,
    CcaEditCustomerConfirmationFormModule,
    CcaFormsModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ]
} )
export class CcaEditCustomerContactModule {
}
