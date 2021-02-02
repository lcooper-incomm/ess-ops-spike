import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import { CcaFormsModule } from 'src/app/core/form/forms.module';
import { CcaKeyValueModule } from 'src/app/core/key-value/key-value.module';
import { SimpleTransactionTableModule } from 'src/app/core/simple-transaction-table/simple-transaction-table.module';
import { CcaDeliveryMethodModule } from '../../delivery-method/delivery-method.module';
import { RaiseDisputeConfirmationPageComponent } from './raise-dispute-confirmation-page/raise-dispute-confirmation-page.component';
import { RaiseDisputeDocumentPageComponent } from './raise-dispute-document-page/raise-dispute-document-page.component';
import { RaiseDisputeFormPageComponent } from './raise-dispute-form-page/raise-dispute-form-page.component';
import { RaiseDisputeResultPageComponent } from './raise-dispute-result-page/raise-dispute-result-page.component';
import { RaiseDisputeQuestionsPageComponent } from './raise-dispute-questions-page/raise-dispute-questions-page.component';
import { CcaCoreModule } from "../../../cca-core.module";

@NgModule ( {
  declarations: [
    RaiseDisputeConfirmationPageComponent,
    RaiseDisputeDocumentPageComponent,
    RaiseDisputeFormPageComponent,
    RaiseDisputeResultPageComponent,
    RaiseDisputeQuestionsPageComponent,
  ],
  entryComponents: [
    RaiseDisputeConfirmationPageComponent,
    RaiseDisputeDocumentPageComponent,
    RaiseDisputeFormPageComponent,
    RaiseDisputeResultPageComponent,
    RaiseDisputeQuestionsPageComponent
  ],
  imports: [
    CcaCoreModule,
    CcaDeliveryMethodModule,
    CcaFormsModule,
    CcaKeyValueModule,
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    ReactiveFormsModule,
    SimpleTransactionTableModule,
  ]
} )
export class CcaRaiseDisputeModule {
}
