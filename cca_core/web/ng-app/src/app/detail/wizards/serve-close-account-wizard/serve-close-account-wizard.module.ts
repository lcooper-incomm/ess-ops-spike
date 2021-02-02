import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CcaMaterialModule} from '../../../core/material/cca-material.module';
import {CcaKeyValueModule} from '../../../core/key-value/key-value.module';
import {CcaButtonsModule} from '../../../core/buttons/buttons.module';
import {CcaFormsModule} from '../../../core/form/forms.module';
import {CcaSpinnerModule} from '../../../core/spinner/cca-spinner.module';
import {ServeCloseAccountFormPageComponent} from './serve-close-account-form-page/serve-close-account-form-page.component';
import {ServeCloseAccountProgressPageComponent} from './serve-close-account-progress-page/serve-close-account-progress-page.component';
import {CcaStatusModule} from '../../../core/status/status.module';
import {ServeCloseAccountResultPageComponent} from './serve-close-account-result-page/serve-close-account-result-page.component';
import {ServeCloseAccountConfirmationPageComponent} from './serve-close-account-confirmation-page/serve-close-account-confirmation-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CcaMaterialModule,
    CcaKeyValueModule,
    CcaButtonsModule,
    CcaFormsModule,
    CcaSpinnerModule,
    CcaStatusModule,
    FontAwesomeModule
  ],
  declarations: [
    ServeCloseAccountConfirmationPageComponent,
    ServeCloseAccountResultPageComponent,
    ServeCloseAccountFormPageComponent,
    ServeCloseAccountProgressPageComponent
  ],
  entryComponents: [
    ServeCloseAccountConfirmationPageComponent,
    ServeCloseAccountResultPageComponent,
    ServeCloseAccountFormPageComponent,
    ServeCloseAccountProgressPageComponent
  ],
  providers: []
})
export class ServeCloseAccountWizardModule {
}
