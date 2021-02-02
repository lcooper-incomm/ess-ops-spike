import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyValueComponent } from './key-value.component';
import { KeyValueFeeComponent } from './key-value-fee/key-value-fee.component';
import { KeyValueAddressComponent } from './key-value-address/key-value-address.component';
import { KeyValueButterflyAlignComponent } from './key-value-butterfly-align/key-value-butterfly-align.component';
import { KeyValueWithPlaceholderComponent } from './key-value-with-placeholder/key-value-with-placeholder.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CcaAddressModule } from '../address/address.module';
import { ValueDisplayComponent } from './value-display/value-display.component';

@NgModule ( {
  declarations: [
    KeyValueComponent,
    KeyValueFeeComponent,
    KeyValueAddressComponent,
    KeyValueButterflyAlignComponent,
    KeyValueWithPlaceholderComponent,
    ValueDisplayComponent,
  ],
  exports: [
    KeyValueComponent,
    KeyValueFeeComponent,
    KeyValueAddressComponent,
    KeyValueButterflyAlignComponent,
    KeyValueWithPlaceholderComponent,
    ValueDisplayComponent,
  ],
  imports: [
    CcaAddressModule,
    CommonModule,
    FlexLayoutModule,
  ]
} )
export class CcaKeyValueModule {
}
