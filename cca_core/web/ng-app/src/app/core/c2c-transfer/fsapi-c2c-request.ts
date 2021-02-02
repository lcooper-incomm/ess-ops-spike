import { PlatformType } from "../platform/platform-type.enum";

export class FsapiC2cRequest {

  id: number;
  fromCustomerId: string;
  toCustomerId: string;
  status;
  amount: number;
  reason: string;
  comment: string;
  sessionId: number;
  platform: PlatformType;
  selectionId: number;
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
