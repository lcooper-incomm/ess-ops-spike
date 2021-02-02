import { TaskSendableForm } from "./task-sendable-form";
import { MinionDisputedTransaction } from "../minion-disputed-transaction";
import { MinionTaskType } from "./task";

export class SendDisputeDocumentTask extends TaskSendableForm {

  accountNumber: string;
  addressLine1: string;
  addressLine2: string;
  addressCity: string;
  addressState: string;
  addressPostalCode: string;
  bcc: string;
  customerName: string;
  landLinePhoneNumber: string;
  maskedPan: string;
  mobilePhoneNumber: string;
  reason: string;
  sessionId: number;

  disputedTransactions: MinionDisputedTransaction[] = [];

  constructor ( data: any = null ) {
    super ( data );
    if ( data ) {
      if ( data.disputedTransactions ) {
        this.disputedTransactions = data.disputedTransactions.map ( transaction => new MinionDisputedTransaction ( transaction ) );
      }
    }
    this.taskType = MinionTaskType.SEND_DISPUTE_DOCUMENTS;

  }

}
