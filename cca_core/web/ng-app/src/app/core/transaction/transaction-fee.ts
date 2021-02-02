import { CsCoreCurrency } from "@cscore/gringotts";

export class TransactionFee {

  id: string;
  amount: CsCoreCurrency;
  description: string;
  feePlanId: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.amount ) {
        this.amount = new CsCoreCurrency ( data.amount );
      }
    }
  }
}
