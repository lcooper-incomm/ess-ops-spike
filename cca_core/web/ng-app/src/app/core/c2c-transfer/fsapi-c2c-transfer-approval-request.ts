import { PlatformType } from "../platform/platform-type.enum";

export class FsapiC2cTransferApprovalRequest {
  amount: number;
  comment: string
  decision: string;
  fromCardholder: string;
  fromCustomerId: number;
  fromPan: string;
  id: number;
  platform: PlatformType;
  reason: string;
  sessionId: number;
  status: string;
  toCardholder: string;
  toCustomerId: number;
  toPan: string;
  transferFee: number;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.platform ) {
        this.platform = PlatformType[ <string>data.platform ];
      }

    }
  }
}
