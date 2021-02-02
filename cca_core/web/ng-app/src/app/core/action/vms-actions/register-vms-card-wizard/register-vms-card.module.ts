import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CcaCoreModule } from 'src/app/core/cca-core.module';
import { CcaCustomerAccountFormsModule } from 'src/app/detail/selection-action-toolbar/customer-account-forms/customer-account-forms.module';
import { RegisterVmsCardChallengePageComponent } from './register-vms-card-challenge-page/register-vms-card-challenge-page.component';
import { RegisterVmsCardConfirmationPageComponent } from './register-vms-card-confirmation-page/register-vms-card-confirmation-page.component';
import { RegisterVmsCardContactPageComponent } from './register-vms-card-contact-page/register-vms-card-contact-page.component';
import { RegisterVmsCardEnrollmentTypePageComponent } from './register-vms-card-enrollment-type-page/register-vms-card-enrollment-type-page.component';
import { RegisterVmsCardIdentificationPageComponent } from './register-vms-card-identification-page/register-vms-card-identification-page.component';
import { RegisterVmsCardPersonalPageComponent } from './register-vms-card-personal-page/register-vms-card-personal-page.component';
import { RegisterVmsCardResultPageComponent } from './register-vms-card-result-page/register-vms-card-result-page.component';
import { RegisterVmsCardValidationPageComponent } from './register-vms-card-validation-page/register-vms-card-validation-page.component';

@NgModule ( {
  declarations: [
    RegisterVmsCardChallengePageComponent,
    RegisterVmsCardConfirmationPageComponent,
    RegisterVmsCardContactPageComponent,
    RegisterVmsCardEnrollmentTypePageComponent,
    RegisterVmsCardIdentificationPageComponent,
    RegisterVmsCardPersonalPageComponent,
    RegisterVmsCardResultPageComponent,
    RegisterVmsCardValidationPageComponent,
  ],
  entryComponents: [
    RegisterVmsCardChallengePageComponent,
    RegisterVmsCardConfirmationPageComponent,
    RegisterVmsCardContactPageComponent,
    RegisterVmsCardEnrollmentTypePageComponent,
    RegisterVmsCardIdentificationPageComponent,
    RegisterVmsCardPersonalPageComponent,
    RegisterVmsCardResultPageComponent,
    RegisterVmsCardValidationPageComponent,
  ],
  imports: [
    CcaCoreModule,
    CcaCustomerAccountFormsModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
  ]
} )
export class CcaRegisterVmsCardModule {
}
