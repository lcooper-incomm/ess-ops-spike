import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewGreencardDisputeFormPageComponent} from './view-greencard-dispute-form-page/view-greencard-dispute-form-page.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CcaDeliveryMethodModule} from '../../delivery-method/delivery-method.module';
import {CcaKeyValueModule} from 'src/app/core/key-value/key-value.module';
import {MatCardModule, MatTableModule, MatButtonModule} from '@angular/material';
import {CcaSpinnerModule} from 'src/app/core/spinner/cca-spinner.module';
import { CcaSessionComponentsModule } from 'src/app/core/session/session-components/session-components.module'

@NgModule({
  declarations: [ViewGreencardDisputeFormPageComponent],
  entryComponents: [ViewGreencardDisputeFormPageComponent],
  imports: [
    CcaDeliveryMethodModule,
    CcaKeyValueModule,
    CcaSpinnerModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    CcaSessionComponentsModule
  ]
})
export class ViewGreencardDisputeModule {
}
