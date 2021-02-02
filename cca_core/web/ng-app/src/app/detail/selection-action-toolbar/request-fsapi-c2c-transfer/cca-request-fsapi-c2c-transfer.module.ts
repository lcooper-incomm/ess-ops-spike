import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FileUploadModule } from "ng2-file-upload";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CcaCoreModule } from "../../../core/cca-core.module";
import { CcaLoggingModule } from "../../../logging/cca-logging.module";
import { CcaMaterialModule } from "../../../core/material/cca-material.module";
import { RequestFsapiC2cTransferConfirmPageComponent } from "./request-fsapi-c2c-transfer-confirm-page/request-fsapi-c2c-transfer-confirm-page.component";
import { RequestFsapiC2cTransferFormPageComponent } from "./request-fsapi-c2c-transfer-form-page/request-fsapi-c2c-transfer-form-page.component";
import { RequestFsapiC2cTransferResultsPageComponent } from "./request-fsapi-c2c-transfer-results-page/request-fsapi-c2c-transfer-results-page.component";

const componentDeclarations = [
  RequestFsapiC2cTransferConfirmPageComponent,
  RequestFsapiC2cTransferFormPageComponent,
  RequestFsapiC2cTransferResultsPageComponent
];

const entryComponentDeclarations = [
  RequestFsapiC2cTransferConfirmPageComponent,
  RequestFsapiC2cTransferFormPageComponent,
  RequestFsapiC2cTransferResultsPageComponent
];

@NgModule ( {
  declarations: componentDeclarations,
  entryComponents: entryComponentDeclarations,
  exports: componentDeclarations,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FileUploadModule,
    FontAwesomeModule,
    CcaCoreModule,
    CcaLoggingModule,
    CcaMaterialModule
  ]
} )
export class CcaRequestFsapiC2cTransferModule {
}
