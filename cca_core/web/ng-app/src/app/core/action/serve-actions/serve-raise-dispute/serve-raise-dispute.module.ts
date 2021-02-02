import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import { CcaFormsModule } from 'src/app/core/form/forms.module';
import { CcaKeyValueModule } from 'src/app/core/key-value/key-value.module';
import { SimpleTransactionTableModule } from 'src/app/core/simple-transaction-table/simple-transaction-table.module';
import { CcaDeliveryMethodModule } from '../../delivery-method/delivery-method.module';
import { ServeRaiseDisputeConfirmationPageComponent } from './serve-raise-dispute-confirmation-page/serve-raise-dispute-confirmation-page.component';
import { ServeRaiseDisputeFormPageComponent } from './serve-raise-dispute-form-page/serve-raise-dispute-form-page.component';
import { ServeRaiseDisputeResultPageComponent } from './serve-raise-dispute-result-page/serve-raise-dispute-result-page.component';
import { CcaCoreModule } from '../../../cca-core.module';

@NgModule ( {
  declarations: [
    ServeRaiseDisputeConfirmationPageComponent,
    ServeRaiseDisputeFormPageComponent,
    ServeRaiseDisputeResultPageComponent
  ],
  entryComponents: [
    ServeRaiseDisputeConfirmationPageComponent,
    ServeRaiseDisputeFormPageComponent,
    ServeRaiseDisputeResultPageComponent
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
export class CcaServeRaiseDisputeModule {
}
