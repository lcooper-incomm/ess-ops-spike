import { DisputeProbingQuestion } from "../../action/vms-actions/raise-dispute/dispute-probing-question";
import { DisputeTransaction, FlatDisputeTransaction } from "../../action/vms-actions/models/vms-request-models";
import {FlatIdentifier, Identifier} from "./identifier";
import {DeliveryMethod} from "../../model/minion/task/delivery-method";
import {ActionReasonCodeMapping} from "../../mapping/action-reason-code-mapping";

export class DisputeComponent {

  id: number;
  identifier: Identifier;
  deliveryMethod: string | DeliveryMethod;
  reasonCode: ActionReasonCodeMapping;
  externalReasonCode: string;
  probingQuestions: DisputeProbingQuestion[] = [];
  transactions: DisputeTransaction[]         = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.probingQuestions = [];
      this.transactions     = [];

      if (data.reasonCode) {
        this.reasonCode = new ActionReasonCodeMapping(data.reasonCode);
      }
      if ( data.probingQuestions ) {
        data.probingQuestions.forEach ( ( question: any ) => this.probingQuestions.push ( new DisputeProbingQuestion ( question ) ) );
      }
      if ( data.transactions ) {
        data.transactions.forEach ( ( transaction: any ) => this.transactions.push ( new DisputeTransaction ( transaction ) ) );
      }
    }
  }
}

export class FlatDisputeComponent {

  id: number;
  deliveryMethod: string;
  identifier: FlatIdentifier;
  reasonCode: ActionReasonCodeMapping;
  externalReasonCode: string;
  probingQuestions: DisputeProbingQuestion[] = [];
  transactions: FlatDisputeTransaction[]     = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.probingQuestions = [];
      this.transactions     = [];

      if (data.reasonCode) {
        this.reasonCode = new ActionReasonCodeMapping(data.reasonCode);
      }
      if ( data.identifier ) {
        this.identifier = new FlatIdentifier ( data.identifier );
      }
      if ( data.probingQuestions ) {
        data.probingQuestions.forEach ( ( question: any ) => this.probingQuestions.push ( new DisputeProbingQuestion ( question ) ) );
      }
      if ( data.transactions ) {
        data.transactions.forEach ( ( transaction: any ) => this.transactions.push ( new FlatDisputeTransaction ( transaction ) ) );
      }
    }
  }
}
