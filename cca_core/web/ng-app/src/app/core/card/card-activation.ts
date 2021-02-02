import { CsCoreCode, CsCoreTimestamp } from "@cscore/core-client-model";
import { Node } from "../node/node";
import { CsCoreCurrency } from "@cscore/gringotts";
import { CardActivationOrder } from "./card-activation-order";
import { CardActivationPos } from "./card-activation-pos";

export class CardActivation {

  activationDate: CsCoreTimestamp;
  entity: Node;
  fee: CsCoreCurrency;
  generalFee: CsCoreCurrency;
  order: CardActivationOrder;
  pos: CardActivationPos;
  type: CsCoreCode;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.activationDate ) {
        this.activationDate = new CsCoreTimestamp ( data.activationDate );
      }
      if ( data.entity ) {
        this.entity = new Node ( data.entity );
      }
      if ( data.fee ) {
        this.fee = new CsCoreCurrency ( data.fee );
      }
      if ( data.generalFee ) {
        this.generalFee = new CsCoreCurrency ( data.generalFee );
      }
      if ( data.order ) {
        this.order = new CardActivationOrder ( data.order );
      }
      if ( data.pos ) {
        this.pos = new CardActivationPos ( data.pos );
      }
      if ( data.type ) {
        this.type = new CsCoreCode ( data.type );
      }
    }
  }
}
