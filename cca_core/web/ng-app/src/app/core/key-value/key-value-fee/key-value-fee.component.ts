import { Component, Input } from '@angular/core';
import { CsCoreCurrency } from "@cscore/gringotts";

/**
 *
 * @usageNotes
 * The intention here is to provide a convenient component that handles the logic of displaying applicable fees or a default "some fees may apply" message
 * in a consistent manner and using a consistent color scheme.
 *
 *
 * @Input() key: string;
 * This value will display as a label next to the fee amount or default message
 *
 * @Input() value: CsCoreCurrencyField;
 *  This property represents the fee amount that will be displayed for the CSR. If fees are being waived, this value should be a $0.00 CsCoreCurrencyField
 *  If no value is provided, the HTML component will display the message assigned to to noFeeAmountDisplay.
 *
**/


@Component ( {
  selector: 'cca-key-value-fee',
  templateUrl: './key-value-fee.component.html',
  styleUrls: [ './key-value-fee.component.scss' ]
} )
export class KeyValueFeeComponent {

  @Input ()
  alignment: string       = 'start start';
  @Input ()
  value: CsCoreCurrency;
  @Input ()
  key: string;
  @Input ()
  keyWidthPercent: number = 40;

  noFeeAmountDisplay: string = 'Fees may apply. See Fee Plan for details.';

  constructor () {
  }
}
