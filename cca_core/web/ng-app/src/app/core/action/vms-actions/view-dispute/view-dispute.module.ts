import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDisputeFormPageComponent } from './view-dispute-form-page/view-dispute-form-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CcaDeliveryMethodModule } from '../../delivery-method/delivery-method.module';
import { CcaKeyValueModule } from 'src/app/core/key-value/key-value.module';
import { MatCardModule, MatTableModule, MatButtonModule } from '@angular/material';
import { CcaSpinnerModule } from 'src/app/core/spinner/cca-spinner.module';

@NgModule ( {
  declarations: [ ViewDisputeFormPageComponent ],
  entryComponents: [ ViewDisputeFormPageComponent ],
  imports: [
    CcaDeliveryMethodModule,
    CcaKeyValueModule,
    CcaSpinnerModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
  ]
} )
export class CcaViewDisputeModule {
}
