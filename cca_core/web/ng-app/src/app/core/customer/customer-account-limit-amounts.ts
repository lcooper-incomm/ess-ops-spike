import { CsCoreCurrency } from "@cscore/gringotts";

export class CustomerAccountLimitAmounts {

  dailyAmount: CsCoreCurrency;
  maxAmount: CsCoreCurrency;
  minAmount: CsCoreCurrency;
  monthlyAmount: CsCoreCurrency;
  weeklyAmount: CsCoreCurrency;
  yearlyAmount: CsCoreCurrency;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.dailyAmount ) {
        this.dailyAmount = new CsCoreCurrency ( data.dailyAmount );
      }
      if ( data.maxAmount ) {
        this.maxAmount = new CsCoreCurrency ( data.maxAmount );
      }
      if ( data.minAmount ) {
        this.minAmount = new CsCoreCurrency ( data.minAmount );
      }
      if ( data.monthlyAmount ) {
        this.monthlyAmount = new CsCoreCurrency ( data.monthlyAmount );
      }
      if ( data.weeklyAmount ) {
        this.weeklyAmount = new CsCoreCurrency ( data.weeklyAmount );
      }
      if ( data.yearlyAmount ) {
        this.yearlyAmount = new CsCoreCurrency ( data.yearlyAmount );
      }
    }
  }
}
