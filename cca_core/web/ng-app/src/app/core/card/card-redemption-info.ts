import { CsCoreTimestamp } from "@cscore/core-client-model";

export class CardRedemptionInfo {

  activationCode: string;
  extendedAccountNumber: string;
  operatorExternalId: string;
  operatorVendorName: string;
  partnerVendorName: string;
  paypalAccountEmail: string;
  paypalAccountNumber: string;
  redeemableFor: string;
  redemptionAttempts: number;
  redemptionCode: string;
  redemptionDelay: number;
  updateDate: CsCoreTimestamp;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.updateDate ) {
        this.updateDate = new CsCoreTimestamp ( data.updateDate );
      }
    }
  }
}
