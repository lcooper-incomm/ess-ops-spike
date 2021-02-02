import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServeAdjustTransactionFormPageComponent } from './serve-adjust-transaction-form-page/serve-adjust-transaction-form-page.component';
import { ServeAdjustTransactionConfirmationPageComponent } from './serve-adjust-transaction-confirmation-page/serve-adjust-transaction-confirmation-page.component';
import { ServeAdjustTransactionResultPageComponent } from './serve-adjust-transaction-result-page/serve-adjust-transaction-result-page.component';
import { CcaFormsModule } from 'src/app/core/form/forms.module';
import { CcaKeyValueModule } from 'src/app/core/key-value/key-value.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CsCoreFormsModule, CsCoreKeyValueModule } from '@cscore/components';
import { MatDividerModule } from '@angular/material';

@NgModule({
  declarations: [
    ServeAdjustTransactionFormPageComponent, 
    ServeAdjustTransactionConfirmationPageComponent,
    ServeAdjustTransactionResultPageComponent,
  ],
  imports: [
    CcaFormsModule, 
    CcaKeyValueModule,
    CsCoreFormsModule,
    CsCoreKeyValueModule,
    CommonModule,
    FlexLayoutModule,
    MatDividerModule,
  ],
  entryComponents: [
    ServeAdjustTransactionFormPageComponent, 
    ServeAdjustTransactionConfirmationPageComponent,
    ServeAdjustTransactionResultPageComponent,
  ]
})
export class ServeAdjustTransactionModule { }
