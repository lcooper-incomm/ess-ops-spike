import {User} from "../user/user";
import {CsCoreTimestamp} from "@cscore/core-client-model";

export class AuditActivity {

  id: number;
  activityDate: CsCoreTimestamp;
  clientIpAddress: string;
  responseFailureDate: CsCoreTimestamp;
  responseSuccessDate: CsCoreTimestamp;
  selectionId: number;
  sessionId: number;
  type: string;
  user: User;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.user ) {
        this.user = new User ( data.user );
      }
      if ( data.activityDate ) {
        this.activityDate = new CsCoreTimestamp ( data.activityDate );
      }
      if ( data.responseSuccessDate ) {
        this.responseSuccessDate = new CsCoreTimestamp ( data.responseSuccessDate );
      }
      if ( data.responseFailureDate ) {
        this.responseFailureDate = new CsCoreTimestamp ( data.responseFailureDate );
      }
    }
  }
}
