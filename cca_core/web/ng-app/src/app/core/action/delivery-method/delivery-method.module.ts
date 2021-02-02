import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryMethodFormComponent } from './delivery-method-form/delivery-method-form.component';
import { CcaFormsModule } from '../../form/forms.module';
import { CcaKeyValueModule } from '../../key-value/key-value.module';
import { CcaAddressModule } from '../../address/address.module';

@NgModule ( {
  declarations: [ DeliveryMethodFormComponent ],
  imports: [
    CcaAddressModule,
    CcaFormsModule,
    CcaKeyValueModule,
    CommonModule
  ],
  exports: [ DeliveryMethodFormComponent ]
} )
export class CcaDeliveryMethodModule {
}
