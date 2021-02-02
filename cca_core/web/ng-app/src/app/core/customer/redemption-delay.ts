import { CsCoreTimestamp } from "@cscore/core-client-model";
import { CsCoreCurrency } from "@cscore/gringotts";

export class RedemptionDelay {

  availableDate: Date;
  availableTime: number;

  date: CsCoreTimestamp;
  delayPeriod: string;
  loadAmount: CsCoreCurrency;
  merchantId: string;
  merchantName: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.date ) {
        this.date = new CsCoreTimestamp ( data.date );
        //Calculate time remaining
        this.availableDate = new Date ();
        this.availableDate.setTime ( this.date.value.getTime () + (Number ( this.delayPeriod ) * 1000 * 60) );
        this.availableTime = this.availableDate.getTime () - new Date ().getTime ();
      }
      if ( data.loadAmount ) {
        this.loadAmount = new CsCoreCurrency ( data.loadAmount );
      }
    }
  }
}
