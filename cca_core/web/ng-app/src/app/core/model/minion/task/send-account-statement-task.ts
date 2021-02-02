import { MinionFormType, TaskSendableForm } from "./task-sendable-form";
import { MinionTaskType } from "./task";

export class SendAccountStatementTask extends TaskSendableForm {

  endDate: string;
  startDate: string;
  waiveFee: boolean = false;

  constructor ( data: any = null ) {
    super ( data );
    if ( data ) {
      Object.assign ( this, data );
    }
    this.taskType = MinionTaskType.SEND_ACCOUNT_STATEMENT;
    this.formType = MinionFormType.ACCOUNT_STATEMENT;
  }
}
