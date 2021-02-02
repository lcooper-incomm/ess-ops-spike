import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CcaCoreModule } from '../../cca-core.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CcaRequestFsapiC2cTransferModule } from "../../../detail/selection-action-toolbar/request-fsapi-c2c-transfer/cca-request-fsapi-c2c-transfer.module";
import { ResetOnlinePasswordConfirmPageComponent } from "./fsapi-change-status/reset-online-password-wizard/reset-online-password-confirm-page/reset-online-password-confirm-page.component";
import { ResetOnlinePasswordResultsPageComponent } from "./fsapi-change-status/reset-online-password-wizard/reset-online-password-results-page/reset-online-password-results-page.component";
import { TransactionSummaryComponent } from './transaction-summary/transaction-summary.component';
import { ReportTransactionFraudResultPageComponent } from './report-transaction-fraud-wizard/report-transaction-fraud-result-page/report-transaction-fraud-result-page.component';
import { ReportTransactionFraudConfirmationPageComponent } from './report-transaction-fraud-wizard/report-transaction-fraud-confirmation-page/report-transaction-fraud-confirmation-page.component';
import { SimpleTransactionTableModule } from '../../simple-transaction-table/simple-transaction-table.module';
import { UpdateDeviceStatusConfirmationPageComponent } from './update-device-status-wizard/update-device-status-confirmation-page/update-device-status-confirmation-page.component';
import { UpdateDeviceStatusResultPageComponent } from './update-device-status-wizard/update-device-status-result-page/update-device-status-result-page.component';
import { FsapiReleasePreauthConfirmationPageComponent } from './fsapi-release-preauth-wizard/fsapi-release-preauth-confirmation-page/fsapi-release-preauth-confirmation-page.component';
import { FsapiReleasePreauthFormPageComponent } from './fsapi-release-preauth-wizard/fsapi-release-preauth-form-page/fsapi-release-preauth-form-page.component';
import { FsapiReleasePreauthResultPageComponent } from './fsapi-release-preauth-wizard/fsapi-release-preauth-result-page/fsapi-release-preauth-result-page.component';
import { FsapiReverseFeeFormPageComponent } from './fsapi-reverse-fee-wizard/fsapi-reverse-fee-form-page/fsapi-reverse-fee-form-page.component';
import { FsapiReverseFeeConfirmationPageComponent } from './fsapi-reverse-fee-wizard/fsapi-reverse-fee-confirmation-page/fsapi-reverse-fee-confirmation-page.component';
import { FsapiReverseFeeResultPageComponent } from './fsapi-reverse-fee-wizard/fsapi-reverse-fee-result-page/fsapi-reverse-fee-result-page.component';
import { EnableTokenProvisioningFormPageComponent } from './enable-token-provisioning-wizard/enable-token-provisioning-form-page/enable-token-provisioning-form-page.component';
import { EnableTokenProvisioningConfirmationPageComponent } from './enable-token-provisioning-wizard/enable-token-provisioning-confirmation-page/enable-token-provisioning-confirmation-page.component';
import { EnableTokenProvisioningResultPageComponent } from './enable-token-provisioning-wizard/enable-token-provisioning-result-page/enable-token-provisioning-result-page.component';
import { VmsUploadDocumentConfirmationPageComponent } from './vms-upload-document-wizard/vms-upload-document-confirmation-page/vms-upload-document-confirmation-page.component';
import { VmsUploadDocumentFormPageComponent } from './vms-upload-document-wizard/vms-upload-document-form-page/vms-upload-document-form-page.component';
import { VmsUploadDocumentResultPageComponent } from './vms-upload-document-wizard/vms-upload-document-result-page/vms-upload-document-result-page.component';
import { CcaFileModule } from '../../file/cca-file.module';
import { CcaRegisterVmsCardModule } from './register-vms-card-wizard/register-vms-card.module';
import { CcaRaiseDisputeModule } from './raise-dispute/raise-dispute.module';
import { CcaViewDisputeModule } from './view-dispute/view-dispute.module';
import {CcaFsapiAdjustBalanceModule} from './fsapi-adjust-balance/fsapi-adjust-balance.module';
import { CcaKycFailureModule } from './kyc-failure/kyc-failure.module';

@NgModule ( {
  declarations: [
    EnableTokenProvisioningFormPageComponent,
    EnableTokenProvisioningConfirmationPageComponent,
    EnableTokenProvisioningResultPageComponent,
    ReportTransactionFraudConfirmationPageComponent,
    ReportTransactionFraudResultPageComponent,
    ResetOnlinePasswordConfirmPageComponent,
    ResetOnlinePasswordResultsPageComponent,
    UpdateDeviceStatusConfirmationPageComponent,
    UpdateDeviceStatusResultPageComponent,
    FsapiReleasePreauthConfirmationPageComponent,
    FsapiReleasePreauthFormPageComponent,
    FsapiReleasePreauthResultPageComponent,
    FsapiReverseFeeConfirmationPageComponent,
    FsapiReverseFeeFormPageComponent,
    FsapiReverseFeeResultPageComponent,
    VmsUploadDocumentConfirmationPageComponent,
    VmsUploadDocumentFormPageComponent,
    VmsUploadDocumentResultPageComponent,
    TransactionSummaryComponent,
  ],
  entryComponents: [
    EnableTokenProvisioningFormPageComponent,
    EnableTokenProvisioningConfirmationPageComponent,
    EnableTokenProvisioningResultPageComponent,
    ReportTransactionFraudConfirmationPageComponent,
    ReportTransactionFraudResultPageComponent,
    ResetOnlinePasswordConfirmPageComponent,
    ResetOnlinePasswordResultsPageComponent,
    UpdateDeviceStatusConfirmationPageComponent,
    UpdateDeviceStatusResultPageComponent,
    FsapiReleasePreauthConfirmationPageComponent,
    FsapiReleasePreauthFormPageComponent,
    FsapiReleasePreauthResultPageComponent,
    FsapiReverseFeeConfirmationPageComponent,
    FsapiReverseFeeFormPageComponent,
    FsapiReverseFeeResultPageComponent,
    VmsUploadDocumentConfirmationPageComponent,
    VmsUploadDocumentFormPageComponent,
    VmsUploadDocumentResultPageComponent,
  ],
  imports: [
    CcaCoreModule,
    CcaFileModule,
    CcaKycFailureModule,
    CcaRaiseDisputeModule,
    CcaRegisterVmsCardModule,
    CcaRequestFsapiC2cTransferModule,
    CcaViewDisputeModule,
    CommonModule,
    FlexLayoutModule,
    CcaFsapiAdjustBalanceModule,
    FormsModule,
    SimpleTransactionTableModule,
  ]
} )
export class VmsActionsModule {
}
