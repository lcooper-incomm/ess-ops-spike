import { CsCoreTimestamp } from "@cscore/core-client-model";

export class Token {

  id: string;
  expirationDate: string;
  provisionDate: CsCoreTimestamp;
  status: string;
  type: string;
  walletId: string;

  rules: TokenFraudRule[] = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.rules = [];

      if ( data.provisionDate ) {
        this.provisionDate = new CsCoreTimestamp ( data.provisionDate );
      }
      if ( data.rules ) {
        data.rules.forEach ( rule => this.rules.push ( new TokenFraudRule ( rule ) ) );
      }
    }
  }
}

export class TokenFraudRule {

  description: string;
  executionDate: CsCoreTimestamp;
  name: string;
  status: boolean;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.executionDate ) {
        this.executionDate = new CsCoreTimestamp ( data.executionDate );
      }
    }
  }
}
