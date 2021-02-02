import { CsCoreCurrency } from "@cscore/gringotts";

export class BalanceAdjustmentActivity {

  adjustmentsToday: number     = 0;
  creditDebitAmountsAllowed: CsCoreCurrency;
  dailyAdjustmentLimit: number = 0;
  dailyCreditAdjustmentLimit: CsCoreCurrency;
  dailyDebitAdjustmentLimit: CsCoreCurrency;
  maximumCreditOverInitialBalance: CsCoreCurrency;
  totalCreditAdjustmentsToday: CsCoreCurrency;
  totalDebitAdjustmentsToday: CsCoreCurrency;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.creditDebitAmountsAllowed ) {
        this.creditDebitAmountsAllowed = new CsCoreCurrency ( data.creditDebitAmountsAllowed );
      }
      if ( data.dailyCreditAdjustmentLimit ) {
        this.dailyCreditAdjustmentLimit = new CsCoreCurrency ( data.dailyCreditAdjustmentLimit );
      }
      if ( data.dailyDebitAdjustmentLimit ) {
        this.dailyDebitAdjustmentLimit = new CsCoreCurrency ( data.dailyDebitAdjustmentLimit );
      }
      if ( data.maximumCreditOverInitialBalance ) {
        this.maximumCreditOverInitialBalance = new CsCoreCurrency ( data.maximumCreditOverInitialBalance );
      }
      if ( data.totalCreditAdjustmentsToday ) {
        this.totalCreditAdjustmentsToday = new CsCoreCurrency ( data.totalCreditAdjustmentsToday );
      }
      if ( data.totalDebitAdjustmentsToday ) {
        this.totalDebitAdjustmentsToday = new CsCoreCurrency ( data.totalDebitAdjustmentsToday );
      }
    }
  }
}
