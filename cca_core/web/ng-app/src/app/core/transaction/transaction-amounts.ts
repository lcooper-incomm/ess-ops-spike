import { CsCoreCurrency } from "@cscore/gringotts";
import { CreditDebitFlagType } from "./credit-debit-flag-type.enum";

export class TransactionAmounts {

  authorizedAmount: CsCoreCurrency;
  availableBalance: CsCoreCurrency;
  balance: CsCoreCurrency;
  cashbackAmount: CsCoreCurrency;
  crdrFlag: CreditDebitFlagType;
  fxSurchargeAmount: CsCoreCurrency;
  interchangeFee: CsCoreCurrency;
  merchantFloorLimitIndicator: boolean = false;
  originalAmount: CsCoreCurrency;
  pendingAmount: CsCoreCurrency;
  preAuthBalance: CsCoreCurrency;
  requestedAmount: CsCoreCurrency;
  reversalAmount: CsCoreCurrency;
  totalAmount: CsCoreCurrency;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.authorizedAmount ) {
        this.authorizedAmount = new CsCoreCurrency ( data.authorizedAmount );
      }
      if ( data.availableBalance ) {
        this.availableBalance = new CsCoreCurrency ( data.availableBalance );
      }
      if ( data.balance ) {
        this.balance = new CsCoreCurrency ( data.balance );
      }
      if ( data.cashbackAmount ) {
        this.cashbackAmount = new CsCoreCurrency ( data.cashbackAmount );
      }
      if ( data.crdrFlag ) {
        this.crdrFlag = CreditDebitFlagType[ <string>data.crdrFlag ];
      }
      if ( data.fxSurchargeAmount ) {
        this.fxSurchargeAmount = new CsCoreCurrency ( data.fxSurchargeAmount );
      }
      if ( data.interchangeFee ) {
        this.interchangeFee = new CsCoreCurrency ( data.interchangeFee );
      }
      if ( data.originalAmount ) {
        this.originalAmount = new CsCoreCurrency ( data.originalAmount );
      }
      if ( data.pendingAmount ) {
        this.pendingAmount = new CsCoreCurrency ( data.pendingAmount );
      }
      if ( data.preAuthBalance ) {
        this.preAuthBalance = new CsCoreCurrency ( data.preAuthBalance );
      }
      if ( data.requestedAmount ) {
        this.requestedAmount = new CsCoreCurrency ( data.requestedAmount );
      }
      if ( data.reversalAmount ) {
        this.reversalAmount = new CsCoreCurrency ( data.reversalAmount );
      }
    }
  }
}
