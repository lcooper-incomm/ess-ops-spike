import { SessionTypeType } from "../core/session/session-type-type.enum";
import { SessionStatusType } from "../core/session/model/session-status-type.enum";

export class CaseSearchRequest {

  assigneeSearchText: string;
  queueId: number;
  serialNumber: string;
  sessionType: SessionTypeType;
  sid: string;
  sortDirection: string;
  sortValue: string;
  status: SessionStatusType;
  teamId: number;
  userId: number;
  van: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.sessionType ) {
        this.sessionType = SessionTypeType[ <string>data.sessionType ];
      }
      if ( data.status ) {
        this.status = SessionStatusType[ <string>data.status ];
      }
    }
  }

}
