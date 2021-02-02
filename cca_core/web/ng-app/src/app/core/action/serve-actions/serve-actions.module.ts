import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CsCoreTableModule} from '@cscore/components';
import {CcaCoreModule} from '../../cca-core.module';
import {ServeUploadDocumentFormPageComponent} from './serve-upload-document-wizard/serve-upload-document-form-page/serve-upload-document-form-page.component';
import {ServeUploadDocumentConfirmationPageComponent} from './serve-upload-document-wizard/serve-upload-document-confirmation-page/serve-upload-document-confirmation-page.component';
import {ServeUploadDocumentResultPageComponent} from './serve-upload-document-wizard/serve-upload-document-result-page/serve-upload-document-result-page.component';
import {CcaFileModule} from '../../file/cca-file.module';
import {ServeAdjustBalanceFormPageComponent} from './serve-adjust-balance-wizard/serve-adjust-balance-form-page/serve-adjust-balance-form-page.component';
import {ServeAdjustBalanceConfirmationPageComponent} from './serve-adjust-balance-wizard/serve-adjust-balance-confirmation-page/serve-adjust-balance-confirmation-page.component';
import {ServeAdjustBalanceResultPageComponent} from './serve-adjust-balance-wizard/serve-adjust-balance-result-page/serve-adjust-balance-result-page.component';
import {AccountAmountComponent} from './serve-adjust-balance-wizard/serve-adjust-balance-confirmation-page/account-amount/account-amount.component';
import {ViewBlockedMerchantsWizardModule} from './serve-view-blocked-merchants-wizard/view-blocked-merchants-wizard.module';
import {CcaServeRaiseDisputeModule} from './serve-raise-dispute/serve-raise-dispute.module';

const components = [
  ServeUploadDocumentFormPageComponent,
  ServeUploadDocumentConfirmationPageComponent,
  ServeUploadDocumentResultPageComponent,
  ServeAdjustBalanceFormPageComponent,
  ServeAdjustBalanceConfirmationPageComponent,
  ServeAdjustBalanceResultPageComponent,
  AccountAmountComponent
];

@NgModule({
  declarations: components,
  exports: components,
  entryComponents: components,
  imports: [
    CcaCoreModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CcaFileModule,
    CsCoreTableModule,
    ViewBlockedMerchantsWizardModule,
    CcaServeRaiseDisputeModule
  ]
})
export class ServeActionsModule {
}
