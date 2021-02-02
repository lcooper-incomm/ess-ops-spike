import { SessionStatusType } from "../../core/session/model/session-status-type.enum";
import { SessionTypeType } from "../../core/session/session-type-type.enum";

export class EditCaseRequest {
  id: number;
  categoryId: number;
  queueId: number;
  sessionType: SessionTypeType;
  status: SessionStatusType;
  teamId: number;
  userId: number;
  wrapUpCodeId: number;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );

    }
  }
}
