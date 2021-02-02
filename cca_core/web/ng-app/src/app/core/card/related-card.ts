import { CsCoreCode, CsCoreTimestamp } from "@cscore/core-client-model";

export class RelatedCard {

  expirationDate: CsCoreTimestamp;
  issuanceDate: CsCoreTimestamp;
  pan: string;
  serialNumber: string;
  status: CsCoreCode;
  type: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.expirationDate ) {
        this.expirationDate = new CsCoreTimestamp ( data.expirationDate );
      }
      if ( data.issuanceDate ) {
        this.issuanceDate = new CsCoreTimestamp ( data.issuanceDate );
      }
      if ( data.status ) {
        this.status = new CsCoreCode ( data.status );
      }
    }
  }
}
