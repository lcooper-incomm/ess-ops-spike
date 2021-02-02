import { CsCoreAddressVerification } from "../model/cs-core-address-verification";
import { CsCoreCode, CsCoreTimestamp } from "@cscore/core-client-model";
import { X95Code } from "./x95-code";

export class TransactionSettlement {

  addressVerification: CsCoreAddressVerification;
  addressVerificationIndicator: boolean = false;
  approvalCode: string;
  authenticationType: string;
  completionCount: string;
  expirationDate: string;
  incrementalIndicator: boolean         = false;
  lastCompletionIndicator: boolean      = false;
  networkDescription: string;
  networkSettlementDate: CsCoreTimestamp;
  preAuthKey: string;
  preAuthReleaseDate: CsCoreTimestamp;
  settlementDate: CsCoreTimestamp;
  sic: CsCoreCode;
  x95: X95Code;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.addressVerification ) {
        this.addressVerification = new CsCoreAddressVerification ( data.addressVerification );
      }
      if ( data.networkSettlementDate ) {
        this.networkSettlementDate = new CsCoreTimestamp ( data.networkSettlementDate );
      }
      if ( data.preAuthReleaseDate ) {
        this.preAuthReleaseDate = new CsCoreTimestamp ( data.preAuthReleaseDate );
      }
      if ( data.settlementDate ) {
        this.settlementDate = new CsCoreTimestamp ( data.settlementDate );
      }
      if ( data.sic ) {
        this.sic = new CsCoreCode ( data.sic );
      }
      if ( data.x95 ) {
        this.x95 = new X95Code ( data.x95 );
      }
    }
  }
}
