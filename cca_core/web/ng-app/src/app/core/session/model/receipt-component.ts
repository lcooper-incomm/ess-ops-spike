import { CsCoreCurrency } from "@cscore/gringotts";
import { CsCoreTimestamp } from "@cscore/core-client-model";
import { FlatReceiptComponentCard, ReceiptComponentCard } from "./receipt-component-card";

export class ReceiptComponent {

  id: number;
  cards: ReceiptComponentCard[] = [];
  paymentMethod: string;
  receiptId: string;
  totalAmount: CsCoreCurrency;
  transactionAmount: CsCoreCurrency;
  transactionDate: CsCoreTimestamp;
  transactionTime: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.cards = [];

      if ( data.cards ) {
        data.cards.forEach ( card => this.cards.push ( new ReceiptComponentCard ( card ) ) );
      }
      if ( data.totalAmount ) {
        this.totalAmount = new CsCoreCurrency ( data.totalAmount );
      }
      if ( data.amount ) {
        this.transactionAmount = new CsCoreCurrency ( data.amount );
      }
      if ( data.transactionDate ) {
        this.transactionDate = new CsCoreTimestamp ( data.transactionDate );
      }
    }
  }

  flatten (): FlatReceiptComponent {
    let component = new FlatReceiptComponent ( {
      ...this,
      cards: [],
      totalAmount: this.totalAmount ? this.totalAmount.value.toFixed ( 2 ) : null,
      transactionAmount: this.transactionAmount ? this.transactionAmount.value.toFixed ( 2 ) : null,
      transactionDate: this.transactionDate ? this.transactionDate.value : null
    } );

    this.cards.forEach ( ( card: ReceiptComponentCard ) => {
      component.cards.push ( card.flatten () );
    } );

    return component;
  }
}

export class FlatReceiptComponent {

  id: number;
  cards: FlatReceiptComponentCard[] = [];
  paymentMethod: string;
  receiptId: string;
  totalAmount: string;
  transactionAmount: string;
  transactionDate: Date;
  transactionTime: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.cards = [];

      if ( data.cards ) {
        data.cards.forEach ( card => this.cards.push ( new FlatReceiptComponentCard ( card ) ) );
      }
    }
  }
}
