import { CsCoreCurrency } from "@cscore/gringotts";

export class CardStatusResponseValue {
  availableBalance: CsCoreCurrency;
  status: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.availableBalance ) {
        this.availableBalance = new CsCoreCurrency ( data.availableBalance );
      }
    }
  }
}
