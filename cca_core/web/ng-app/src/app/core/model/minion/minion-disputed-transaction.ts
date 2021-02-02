import { MinionDisputedTransactionType } from "./minion-disputed-transaction-type.enum";

export class MinionDisputedTransaction {

  amount: string;
  merchantName: string;
  transactionDate: number;
  type: MinionDisputedTransactionType;

  constructor( data: any = null ) {
    if ( data ) {
      Object.assign( this, data );

      if ( data.type ) {
        this.type = MinionDisputedTransactionType[ <string>data.type ];
      }
    }
  }

}
