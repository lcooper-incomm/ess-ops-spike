import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CcaMaterialModule} from '../../../core/material/cca-material.module';
import {CcaKeyValueModule} from '../../../core/key-value/key-value.module';
import {CcaAddressModule} from '../../../core/address/address.module';
import {CcaButtonsModule} from '../../../core/buttons/buttons.module';
import {CcaFormsModule} from '../../../core/form/forms.module';
import {RefundAccountConfirmationPageComponent} from './refund-account-confirmation-page/refund-account-confirmation-page.component';
import {RefundAccountFormPageComponent} from './refund-account-form-page/refund-account-form-page.component';
import {RefundAccountResultPageComponent} from './refund-account-result-page/refund-account-result-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CcaMaterialModule,
    CcaKeyValueModule,
    CcaAddressModule,
    CcaButtonsModule,
    CcaFormsModule
  ],
  declarations: [
    RefundAccountConfirmationPageComponent,
    RefundAccountFormPageComponent,
    RefundAccountResultPageComponent
  ],
  entryComponents: [
    RefundAccountConfirmationPageComponent,
    RefundAccountFormPageComponent,
    RefundAccountResultPageComponent
  ],
  providers: []
})
export class RefundAccountWizardModule {
}
