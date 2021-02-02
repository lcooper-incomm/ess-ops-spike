import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogComplaintFormPageComponent } from './form-page/log-complaint-form-page.component';
import { LogComplaintConfirmationPageComponent } from './confirmation-page/log-complaint-confirmation-page.component';
import { LogComplaintResultsPageComponent } from './results-page/log-complaint-results-page.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CcaCoreModule } from "../../../../cca-core.module";
import { CcaLoggingModule } from "../../../../../logging/cca-logging.module";
import { CcaMaterialModule } from "../../../../material/cca-material.module";

const componentDeclarations = [
  LogComplaintConfirmationPageComponent,
  LogComplaintFormPageComponent,
  LogComplaintResultsPageComponent,
];

const entryComponentDeclarations = [
  LogComplaintConfirmationPageComponent,
  LogComplaintFormPageComponent,
  LogComplaintResultsPageComponent
];

@NgModule ( {
  declarations: componentDeclarations,
  entryComponents: entryComponentDeclarations,
  exports: componentDeclarations,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CcaCoreModule,
    CcaLoggingModule,
    CcaMaterialModule
  ]
} )
export class CcaLogComplaintModule {
}
