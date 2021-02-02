import { MinionTaskType } from "../../core/model/minion/task/task";

export class EmailSupportRequest {
  attachFile: boolean      = false;
  body: string;
  recipient: string        = 'ccasupport@incomm.com';
  sender: string           = 'noreply@incomm.com';
  subject: string;
  taskType: MinionTaskType = MinionTaskType.SEND_EMAIL;
  type: string             = 'text/html';

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
