import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CcaMaterialModule} from '../../../core/material/cca-material.module';
import {CcaKeyValueModule} from '../../../core/key-value/key-value.module';
import {CcaAddressModule} from '../../../core/address/address.module';
import {CcaButtonsModule} from '../../../core/buttons/buttons.module';
import {CcaFormsModule} from '../../../core/form/forms.module';
import {AlderResendEmailConfirmationComponent} from './confirmation-page/confirmation-page.component';
import {AlderResendEmailFormComponent} from './form-page/form-page.component';
import {AlderResendEmailResultComponent} from './result-page/result-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CcaMaterialModule,
    CcaKeyValueModule,
    CcaAddressModule,
    CcaButtonsModule,
    CcaFormsModule
  ],
  declarations: [
    AlderResendEmailConfirmationComponent,
    AlderResendEmailFormComponent,
    AlderResendEmailResultComponent
  ],
  entryComponents: [
    AlderResendEmailConfirmationComponent,
    AlderResendEmailFormComponent,
    AlderResendEmailResultComponent
  ],
  providers: []
})
export class AlderResendEmailWizardModule {}
