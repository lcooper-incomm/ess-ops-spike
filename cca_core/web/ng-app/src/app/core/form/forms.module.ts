import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormFieldToucherDirective} from './form-field-toucher.directive';
import {CommentFieldComponent} from './comment-field/comment-field.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectFieldComponent} from './select-field/select-field.component';
import {CcaPipesModule} from '../pipes/cca-pipes.module';
import {TextFieldComponent} from './text-field/text-field.component';
import {PhoneNumberFieldComponent} from './phone-number-field/phone-number-field.component';
import {CcaFormattersModule} from '../formatters/formatters.module';
import {AddressFormComponent} from './address-form/address-form.component';
import {PostalCodeFieldComponent} from './postal-code-field/postal-code-field.component';
import {StateProvinceFieldComponent} from './state-province-field/state-province-field.component';
import {SpecifiedCountryPipe} from './state-province-field/specified-country.pipe';
import {EmailAddressFieldComponent} from './email-address-field/email-address-field.component';
import {DateFieldComponent} from './date-field/date-field.component';
import {CurrencyFieldComponent} from './currency-field/currency-field.component';
import {NumericTextFieldComponent} from './numeric-text-field/numeric-text-field.component';
import {AlderSearchTypeFieldComponent} from './alder-search-type-field/alder-search-type-field.component';
import {DateTimeFieldComponent} from './date-time-field/date-time-field.component';
import {CcExpirationDateFieldComponent} from './cc-expiration-date-field/cc-expiration-date-field.component';
import {EncorProgramFieldComponent} from './encor-program-field/encor-program-field.component';

@NgModule ( {
  declarations: [
    AddressFormComponent,
    CommentFieldComponent,
    CurrencyFieldComponent,
    DateFieldComponent,
    DateTimeFieldComponent,
    EmailAddressFieldComponent,
    FormFieldToucherDirective,
    NumericTextFieldComponent,
    PhoneNumberFieldComponent,
    PostalCodeFieldComponent,
    SelectFieldComponent,
    SpecifiedCountryPipe,
    StateProvinceFieldComponent,
    TextFieldComponent,
    AlderSearchTypeFieldComponent,
    CcExpirationDateFieldComponent,
    EncorProgramFieldComponent
  ],
  exports: [
    AddressFormComponent,
    CommentFieldComponent,
    CurrencyFieldComponent,
    DateFieldComponent,
    DateTimeFieldComponent,
    EmailAddressFieldComponent,
    FormFieldToucherDirective,
    NumericTextFieldComponent,
    PhoneNumberFieldComponent,
    PostalCodeFieldComponent,
    SelectFieldComponent,
    StateProvinceFieldComponent,
    TextFieldComponent,
    AlderSearchTypeFieldComponent,
    CcExpirationDateFieldComponent,
    EncorProgramFieldComponent
  ],
  imports: [
    CcaPipesModule,
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    // NOTE: This must be imported AFTER MatInputModule. Otherwise, inputs with these directives break.
    CcaFormattersModule,
  ]
} )
export class CcaFormsModule {
}
