import { AccountBalanceDetail } from "./account-balance-detail";
import { CsCoreCurrency } from "@cscore/gringotts";

export class CustomerAccountInfo {

  savings: AccountBalanceDetail;
  spending: AccountBalanceDetail;
  initialLoadAmount: CsCoreCurrency;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.savings ) {
        this.savings = new AccountBalanceDetail ( data.savings );
      }
      if ( data.spending ) {
        this.spending = new AccountBalanceDetail ( data.spending );
      }
      if ( data.initialLoadAmount ) {
        this.initialLoadAmount = new CsCoreCurrency ( data.initialLoadAmount );
      }
    }
  }
}
