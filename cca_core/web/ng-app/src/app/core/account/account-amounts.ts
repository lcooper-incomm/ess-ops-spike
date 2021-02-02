import { CsCoreCurrency } from "@cscore/gringotts";

export class AccountAmounts {

  fixedAmount: CsCoreCurrency;
  maxAmount: CsCoreCurrency;
  maxDenomination: CsCoreCurrency;
  minAmount: CsCoreCurrency;
  minDenomination: CsCoreCurrency;

  constructor ( data ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.fixedAmount ) {
        this.fixedAmount = new CsCoreCurrency ( data.fixedAmount );
      }
      if ( data.maxAmount ) {
        this.maxAmount = new CsCoreCurrency ( data.maxAmount );
      }
      if ( data.maxDenomination ) {
        this.maxDenomination = new CsCoreCurrency ( data.maxDenomination );
      }
      if ( data.minAmount ) {
        this.minAmount = new CsCoreCurrency ( data.minAmount );
      }
      if ( data.minDenomination ) {
        this.minDenomination = new CsCoreCurrency ( data.minDenomination );
      }
    }
  }

}
