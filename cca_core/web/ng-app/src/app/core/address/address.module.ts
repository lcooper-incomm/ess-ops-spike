import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule ( {
  declarations: [ AddressComponent ],
  exports: [ AddressComponent ],
  imports: [
    CommonModule,
    FlexLayoutModule,
  ]
} )
export class CcaAddressModule {
}
