import { CsCoreStatus } from "../model/cs-core-status";
import { CsCoreTimestamp } from "@cscore/core-client-model";

export class CardAccountHistory {

  id: string;
  application: CsCoreStatus;
  date: CsCoreTimestamp;
  description: string;
  event: CsCoreStatus;
  ipAddress: string;
  note: string;
  object: string;
  shippedStatus: string;
  username: string;
  updateType: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.application ) {
        this.application = new CsCoreStatus ( data.application );
      }
      if ( data.date ) {
        this.date = new CsCoreTimestamp ( data.date );
      }
      if ( data.event ) {
        this.event = new CsCoreStatus ( data.event );
      }
    }
  }
}
