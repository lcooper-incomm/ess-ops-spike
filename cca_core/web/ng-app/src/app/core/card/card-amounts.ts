import { CsCoreCurrency } from "@cscore/gringotts";
import { CsCoreCode } from "@cscore/core-client-model";

export class CardAmounts {

  availableBalance: CsCoreCurrency;
  currencyCode: CsCoreCode;
  currentBalance: CsCoreCurrency;
  denomination: CsCoreCurrency;
  initialLoadAmount: CsCoreCurrency;
  pendingAmount: CsCoreCurrency;
  reloadAmount: CsCoreCurrency;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.availableBalance ) {
        this.availableBalance = new CsCoreCurrency ( data.availableBalance );
      }
      if ( data.currencyCode ) {
        this.currencyCode = new CsCoreCode ( data.currencyCode );
      }
      if ( data.currentBalance ) {
        this.currentBalance = new CsCoreCurrency ( data.currentBalance );
      }
      if ( data.denomination ) {
        this.denomination = new CsCoreCurrency ( data.denomination );
      }
      if ( data.initialLoadAmount ) {
        this.initialLoadAmount = new CsCoreCurrency ( data.initialLoadAmount );
      }
      if ( data.pendingAmount ) {
        this.pendingAmount = new CsCoreCurrency ( data.pendingAmount );
      }
      if ( data.reloadAmount ) {
        this.reloadAmount = new CsCoreCurrency ( data.reloadAmount );
      }
    }

  }
}
