import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditCustomerSummaryFormPageComponent } from './edit-customer-summary-form-page/edit-customer-summary-form-page.component';
import { CcaCustomerAccountFormsModule } from '../../customer-account-forms/customer-account-forms.module';
import { EditCustomerSummaryConfirmationPageComponent } from './edit-customer-summary-confirmation-page/edit-customer-summary-confirmation-page.component';
import { CcaEditCustomerConfirmationFormModule } from '../confirmation-form/edit-customer-confirmation-form.module';
import { EditCustomerSummaryDocumentsPageComponent } from './edit-customer-summary-documents-page/edit-customer-summary-documents-page.component';
import { VmsFileService } from 'src/app/core/file/vms-file.service';
import { CcaFileModule } from 'src/app/core/file/cca-file.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCustomerSummaryResultPageComponent } from './edit-customer-summary-result-page/edit-customer-summary-result-page.component';

@NgModule ( {
  declarations: [
    EditCustomerSummaryConfirmationPageComponent,
    EditCustomerSummaryDocumentsPageComponent,
    EditCustomerSummaryFormPageComponent,
    EditCustomerSummaryResultPageComponent,
  ],
  entryComponents: [
    EditCustomerSummaryConfirmationPageComponent,
    EditCustomerSummaryDocumentsPageComponent,
    EditCustomerSummaryFormPageComponent,
    EditCustomerSummaryResultPageComponent,
  ],
  imports: [
    CcaCustomerAccountFormsModule,
    CcaEditCustomerConfirmationFormModule,
    CcaFileModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  providers: [ VmsFileService ]
} )
export class CcaEditCustomerSummaryModule {
}
