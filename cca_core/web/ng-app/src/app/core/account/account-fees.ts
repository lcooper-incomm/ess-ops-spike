import { CsCoreCurrency } from "@cscore/gringotts";

export class AccountFees {

  convenienceFee: CsCoreCurrency;
  fixedTransactionFee: CsCoreCurrency;
  percentageTransactionFee: number;
  type: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.convenienceFee ) {
        this.convenienceFee = new CsCoreCurrency ( data.convenienceFee );
      }
      if ( data.fixedTransactionFee ) {
        this.fixedTransactionFee = new CsCoreCurrency ( data.fixedTransactionFee );
      }
    }
  }
}
