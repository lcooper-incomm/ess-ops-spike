import {MaplesOrderItemCard} from "@cscore/maples-client-model";

export class ChangeOrderCardStatusRequest {

  orderId: string;
  orderNumber: string;
  partner: string;
  platform: string;
  reason: string;
  targetStatus: string;

  cards: MaplesOrderItemCard[] = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.cards = [];

      if ( data.cards ) {
        data.cards.forEach ( card => this.cards.push ( new MaplesOrderItemCard ( card ) ) );
      }
    }
  }
}
