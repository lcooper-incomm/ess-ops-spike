import { CsCoreTimestamp } from "@cscore/core-client-model";
import { CallDisconnectType } from "./call-disconnect-type.enum";
import { PlatformType } from "../../platform/platform-type.enum";

export class CallComponent {

  id: number;
  accountNumber: string;
  accountId: string;
  ani: string;
  callerName: string;
  callbackNumber: string;
  callId: string;
  callIdKey: string;
  connectedDate: CsCoreTimestamp;
  createdDate: CsCoreTimestamp;
  disconnectedDate: CsCoreTimestamp;
  disconnectType: CallDisconnectType;
  dnis: string;
  isAutoWrapping: boolean = false;
  isCardVerified: boolean;
  isDateOfBirthVerified: boolean;
  isLastFourSsnVerified: boolean;
  lastFour: string;
  orderNumber: string;
  originalAni: string;
  originalDnis: string;
  pin: string;
  platform: PlatformType;
  proxyNumber: string;
  serialNumber: string;
  uid: string;
  van: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.connectedDate ) {
        this.connectedDate = new CsCoreTimestamp ( data.connectedDate );
      }
      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
      if ( data.disconnectedDate ) {
        this.disconnectedDate = new CsCoreTimestamp ( data.disconnectedDate );
      }
      if ( data.disconnectType ) {
        this.disconnectType = CallDisconnectType[ <string>data.disconnectType ];
      }
      if ( data.platform ) {
        this.platform = PlatformType[ <string>data.platform ];
      }
    }
  }
}
