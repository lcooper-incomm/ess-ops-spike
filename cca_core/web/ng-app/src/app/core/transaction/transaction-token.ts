import { CsCoreTimestamp } from "@cscore/core-client-model";

export class TransactionToken {

  id: string;
  expirationDate: CsCoreTimestamp;
  type: string;
  walletId: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.expirationDate ) {
        this.expirationDate = new CsCoreTimestamp ( data.expirationDate );
      }
    }
  }
}
