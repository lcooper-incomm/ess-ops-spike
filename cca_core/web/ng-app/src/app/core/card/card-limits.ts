import { CsCoreCurrency } from "@cscore/gringotts";

export class CardLimits {

  dailyLimit: CsCoreCurrency;
  lifeHighAvailableBalance: CsCoreCurrency;
  overallLimit: CsCoreCurrency;
  transactionLimit: CsCoreCurrency;
  velocityLimit: CsCoreCurrency;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.dailyLimit ) {
        this.dailyLimit = new CsCoreCurrency ( data.dailyLimit );
      }
      if ( data.lifeHighAvailableBalance ) {
        this.lifeHighAvailableBalance = new CsCoreCurrency ( data.lifeHighAvailableBalance );
      }
      if ( data.overallLimit ) {
        this.overallLimit = new CsCoreCurrency ( data.overallLimit );
      }
      if ( data.transactionLimit ) {
        this.transactionLimit = new CsCoreCurrency ( data.transactionLimit );
      }
      if ( data.velocityLimit ) {
        this.velocityLimit = new CsCoreCurrency ( data.velocityLimit );
      }
    }
  }
}
