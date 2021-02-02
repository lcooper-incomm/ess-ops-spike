import { CsCoreAddress, CsCoreTimestamp } from "@cscore/core-client-model";
import { CsCoreCurrency } from "@cscore/gringotts";

export class RefundRequestComponent {

  id: number;
  address: CsCoreAddress;
  amount: CsCoreCurrency;
  ani: string;
  approvedDate: CsCoreTimestamp;
  name: string;
  requestedDate: CsCoreTimestamp;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.address ) {
        this.address = new CsCoreAddress ( data.address );
      }
      if ( data.amount ) {
        this.amount = new CsCoreCurrency ( data.amount );
      }
      if ( data.approvedDate ) {
        this.approvedDate = new CsCoreTimestamp ( data.approvedDate );
      }
      if ( data.requestedDate ) {
        this.requestedDate = new CsCoreTimestamp ( data.requestedDate );
      }
    }
  }
}
