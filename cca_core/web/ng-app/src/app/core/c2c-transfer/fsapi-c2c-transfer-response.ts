import { PlatformType } from "../platform/platform-type.enum";
import { CsCoreTimestamp } from "@cscore/core-client-model";
import { CsCoreCurrency } from "@cscore/gringotts";
import { User } from "../user/user";

export class FsapiC2cTransferResponse {
  id: number;
  modifiedDate: CsCoreTimestamp;
  sessionId: number;
  fromCardholder: string;
  fromCustomerId: number;
  fromPan: string;
  toCardholder: string;
  toPan: string;
  reason: string;
  status: string;
  toCustomerId: number;
  createdBy: User;
  platform: PlatformType;
  amount: CsCoreCurrency;
  transferFee: CsCoreCurrency;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.platform ) {
        this.platform = PlatformType[ <string>data.platform ];
      }
      if ( data.modifiedDate ) {
        this.modifiedDate = new CsCoreTimestamp ( data.modifiedDate );
      }
      if ( data.amount ) {
        this.amount = new CsCoreCurrency ( data.amount );
      }
      if ( data.transferFee ) {
        this.transferFee = new CsCoreCurrency ( data.transferFee );
      }
      if ( data.createdBy ) {
        this.createdBy = new User ( data.createdBy );
      }
    }
  }
}
