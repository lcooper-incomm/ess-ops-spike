import { CsCoreTimestamp } from "@cscore/core-client-model";

export class CustomerIdentification {

  country: string;
  expirationDate: CsCoreTimestamp;
  issuedBy: string;
  issuanceDate: CsCoreTimestamp;
  number: string;
  stateProvince: string;
  type: string;
  verificationDate: CsCoreTimestamp;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.expirationDate ) {
        this.expirationDate = new CsCoreTimestamp ( data.expirationDate );
      }
      if ( data.issuanceDate ) {
        this.issuanceDate = new CsCoreTimestamp ( data.issuanceDate );
      }
      if ( data.verificationDate ) {
        this.verificationDate = new CsCoreTimestamp ( data.verificationDate );
      }
    }
  }
}

export class FlatCustomerIdentification {
  country: string;
  expirationDate: string;
  issuedBy: string;
  issuanceDate: string;
  number: string;
  stateProvince: string;
  type: string;
  verificationDate: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
