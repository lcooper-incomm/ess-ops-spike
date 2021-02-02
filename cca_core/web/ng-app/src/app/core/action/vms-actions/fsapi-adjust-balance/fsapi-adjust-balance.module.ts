import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FsapiAdjustBalanceConfirmationPageComponent} from './fsapi-adjust-balance-confirmation-page/fsapi-adjust-balance-confirmation-page.component';
import {FsapiAdjustBalanceResultPageComponent} from './fsapi-adjust-balance-result-page/fsapi-adjust-balance-result-page.component';
import {FsapiAdjustBalanceFormPageComponent} from './fsapi-adjust-balance-form-page/fsapi-adjust-balance-form-page.component';
import {AmountCardComponent} from './fsapi-adjust-balance-confirmation-page/amount-card/amount-card.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatCardModule } from '@angular/material';
import { CcaKeyValueModule } from 'src/app/core/key-value/key-value.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CcaFormsModule } from 'src/app/core/form/forms.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AmountCardComponent,
    FsapiAdjustBalanceConfirmationPageComponent,
    FsapiAdjustBalanceFormPageComponent,
    FsapiAdjustBalanceResultPageComponent,
  ],
  entryComponents: [
    FsapiAdjustBalanceConfirmationPageComponent,
    FsapiAdjustBalanceFormPageComponent,
    FsapiAdjustBalanceResultPageComponent,
  ],
  imports: [
    CcaFormsModule,
    CcaKeyValueModule,
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatCardModule,
    ReactiveFormsModule,
  ]
})
export class CcaFsapiAdjustBalanceModule { }
