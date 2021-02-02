import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NumericFormatDirective} from './numeric-format.directive';
import {DateFormatDirective} from './date-format.directive';
import {CurrencyFormatDirective} from './currency-format.directive';
import {AlphaNumericFormatDirective} from './alpha-numeric-format.directive';
import {CcExpirationFormatDirective} from './cc-expiration-format.directive';

@NgModule ( {
  declarations: [
    AlphaNumericFormatDirective,
    CurrencyFormatDirective,
    DateFormatDirective,
    NumericFormatDirective,
    CcExpirationFormatDirective
  ],
  exports: [
    AlphaNumericFormatDirective,
    CurrencyFormatDirective,
    DateFormatDirective,
    NumericFormatDirective,
    CcExpirationFormatDirective
  ],
  imports: [
    CommonModule
  ]
} )
export class CcaFormattersModule {
}
