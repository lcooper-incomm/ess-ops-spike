import { CardsComponentCard } from "./cards-component-card";
import { CardsComponentCardType } from './cards-component-card-type.enum';

export class CardsComponentCardSet {

  id: number;
  activeCard: CardsComponentCard;
  inactiveCard: CardsComponentCard;
  replacementCard: CardsComponentCard;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.activeCard ) {
        this.activeCard = new CardsComponentCard ( data.activeCard );
      }
      if ( data.inactiveCard ) {
        this.inactiveCard = new CardsComponentCard ( data.inactiveCard );
      }
      if ( data.replacementCard ) {
        this.replacementCard = new CardsComponentCard ( data.replacementCard );
      }
    }
  }

  getCardByType ( cardType: CardsComponentCardType ): CardsComponentCard {
    switch ( cardType ) {
      case CardsComponentCardType.ACTIVE:
        return this.activeCard;
      case CardsComponentCardType.INACTIVE:
        return this.inactiveCard;
      case CardsComponentCardType.REPLACEMENT:
        return this.replacementCard;
      default:
        return null;
    }
  }
}
