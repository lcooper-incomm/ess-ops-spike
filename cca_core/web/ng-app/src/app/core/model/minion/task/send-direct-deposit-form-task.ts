import { TaskSendableForm } from "./task-sendable-form";
import { MinionTaskType } from "./task";

export class SendDirectDepositFormTask extends TaskSendableForm {


  constructor ( data: any = null ) {
    super ( data );
    if ( data ) {
      Object.assign ( this, data );
    }
    this.taskType = MinionTaskType.SEND_DIRECT_DEPOSIT_FORM;
  }

}
