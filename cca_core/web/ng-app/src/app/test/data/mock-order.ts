import { MaplesOrder } from "@cscore/maples-client-model";
import { CsCoreCurrencyDescription, CsCoreCurrencySymbolAlignment, CsCoreCurrencyCode } from '@cscore/gringotts';

export function mockOrder (): MaplesOrder {
  const descriptor = {
    code: CsCoreCurrencyCode.USD,
    decimalCount: 2,
    description: CsCoreCurrencyDescription.USD,
    symbol: '$',
    symbolAlignment: CsCoreCurrencySymbolAlignment.LEFT,
  };
  return new MaplesOrder ( {
    number: '100',
    totals: {
      grandTotal: {
        descriptor,
        displayValue: '$70.00',
        value: 70,
      },
      purchaseFees: {
        descriptor,
        displayValue: '$10.00',
        value: 10,
      },
      shippingFees: {
        descriptor,
        displayValue: '$10.00',
        value: 10,
      },
      subtotal: {
        descriptor,
        displayValue: '$50.00',
        value: 50,
      },
    }
  } );
}
