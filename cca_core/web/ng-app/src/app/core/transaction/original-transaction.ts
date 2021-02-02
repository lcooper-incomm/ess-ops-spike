import { CsCoreTimestamp } from "@cscore/core-client-model";

export class OriginalTransaction {

  id: string;
  date: CsCoreTimestamp;
  deliveryChannel: string;
  terminalId: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.date ) {
        this.date = new CsCoreTimestamp ( data.date );
      }
    }
  }
}
