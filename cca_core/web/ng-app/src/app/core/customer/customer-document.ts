import { CsCoreTimestamp } from "@cscore/core-client-model";

export class CustomerDocument {

  id: string;
  date: CsCoreTimestamp;
  file: string;
  mimeType: string;
  name: string;
  type: CustomerDocumentType;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.date ) {
        this.date = new CsCoreTimestamp ( data.date );
      }
      if ( data.type ) {
        this.type = CustomerDocumentType[ <string> data.type ];
      }
    }
  }
}

export enum CustomerDocumentType {
  KYC                = 'KYC',
  DISPUTE            = 'DISPUTE',
  AUTHORIZEUSERPROOF = 'AUTHORIZEUSERPROOF',
  PREAUTH            = 'PREAUTH',
  DISPUTEPROCESS     = 'DISPUTEPROCESS',
  PROOFOFID          = 'PROOFOFID',
  ADDRESSOVERRIDE    = 'ADDRESSOVERRIDE'
}
