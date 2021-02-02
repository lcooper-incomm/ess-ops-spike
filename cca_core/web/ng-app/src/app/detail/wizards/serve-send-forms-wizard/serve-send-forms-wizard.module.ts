import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CcaMaterialModule} from '../../../core/material/cca-material.module';
import {CcaKeyValueModule} from '../../../core/key-value/key-value.module';
import {CcaButtonsModule} from '../../../core/buttons/buttons.module';
import {CcaFormsModule} from '../../../core/form/forms.module';
import {ServeSendFormsConfirmationPageComponent} from './serve-send-forms-confirmation-page/serve-send-forms-confirmation-page.component';
import {ServeSendFormsFormPageComponent} from './serve-send-forms-form-page/serve-send-forms-form-page.component';
import {ServeSendFormsPreviewPageComponent} from './serve-send-forms-preview-page/serve-send-forms-preview-page.component';
import {ServeSendFormsResultPageComponent} from './serve-send-forms-result-page/serve-send-forms-result-page.component';
import {CcaSpinnerModule} from '../../../core/spinner/cca-spinner.module';

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
    ServeSendFormsConfirmationPageComponent,
    ServeSendFormsFormPageComponent,
    ServeSendFormsPreviewPageComponent,
    ServeSendFormsResultPageComponent
  ],
  entryComponents: [
    ServeSendFormsConfirmationPageComponent,
    ServeSendFormsFormPageComponent,
    ServeSendFormsPreviewPageComponent,
    ServeSendFormsResultPageComponent
  ],
  providers: []
})
export class ServeSendFormsWizardModule {
}
