import { CsCoreCurrency } from "@cscore/gringotts";

export class FeeDetail {

  id: string;
  amount: CsCoreCurrency;
  description: string;
  isClawbackEnabled: boolean = false;
  minAmount: CsCoreCurrency;
  percentage: string;
  type: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.amount ) {
        this.amount = new CsCoreCurrency ( data.amount );
      }
      if ( data.minAmount ) {
        this.minAmount = new CsCoreCurrency ( data.minAmount );
      }
    }
  }
}
