import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CcaMaterialModule} from '../../../core/material/cca-material.module';
import {CcaKeyValueModule} from '../../../core/key-value/key-value.module';
import {CcaButtonsModule} from '../../../core/buttons/buttons.module';
import {CcaFormsModule} from '../../../core/form/forms.module';
import {CcaSpinnerModule} from '../../../core/spinner/cca-spinner.module';
import {ServeCancelTransactionConfirmationPageComponent} from './confirmation-page/confirmation-page.component';
import {ServeCancelTransactionFormPageComponent} from './form-page/form-page.component';
import {ServeCancelTransactionResultPageComponent} from './result-page/result-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CcaMaterialModule,
    CcaKeyValueModule,
    CcaButtonsModule,
    CcaFormsModule,
    CcaSpinnerModule
  ],
  declarations: [
    ServeCancelTransactionConfirmationPageComponent,
    ServeCancelTransactionFormPageComponent,
    ServeCancelTransactionResultPageComponent
  ],
  entryComponents: [
    ServeCancelTransactionConfirmationPageComponent,
    ServeCancelTransactionFormPageComponent,
    ServeCancelTransactionResultPageComponent
  ],
  providers: []
})
export class ServeCancelTransactionWizardModule {
}
