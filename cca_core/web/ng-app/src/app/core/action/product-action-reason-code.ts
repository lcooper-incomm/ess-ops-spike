import { TransactionType } from "../transaction/transaction-type.enum";

export class ProductActionReasonCode {
  actionId: string;
  actionDescription: string;
  productReasons: ReasonCode[] = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.productReasons = [];

      if ( data.productReasons ) {
        data.productReasons.forEach ( reason => this.productReasons.push ( new ReasonCode ( reason ) ) );
      }
    }
  }

}

export class ReasonCode {
  reasonCode: string;
  reasonDescription: string;
  reasonAdjustment: TransactionType;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.reasonAdjustment ) {
        this.reasonAdjustment = TransactionType[ <string>data.reasonAdjustment ];
      }
    }
  }
}
