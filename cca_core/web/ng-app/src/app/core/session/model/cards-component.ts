import { CardsComponentCardSet } from "./cards-component-card-set";
import { CardsComponentCard } from "./cards-component-card";
import { CardsComponentCardType } from 'src/app/core/session/model/cards-component-card-type.enum';

export class CardsComponent {

  id: number;
  cardSets: CardsComponentCardSet[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.cardSets ) {
        this.cardSets = data.cardSets.map ( cardSet => new CardsComponentCardSet ( cardSet ) );
      }
    }
  }

  addCard ( card: CardsComponentCard ): void {
    this.removeCard ( card.id );

    // Find or create card set
    const cardSet = this.findOrCreateCardSet ( card.cardSet );

    // Set the card in its proper place
    switch ( card.cardType ) {
      case CardsComponentCardType.ACTIVE:
        cardSet.activeCard = card;
        break;
      case CardsComponentCardType.INACTIVE:
        cardSet.inactiveCard = card;
        break;
      case CardsComponentCardType.REPLACEMENT:
        cardSet.replacementCard = card;
        break;
    }
  }

  findAllCardsAsArray (): CardsComponentCard[] {
    const activeCards      = this.cardSets.map ( cardSet => cardSet.activeCard ).filter ( card => !!card );
    const inactiveCards    = this.cardSets.map ( cardSet => cardSet.inactiveCard ).filter ( card => !!card );
    const replacementCards = this.cardSets.map ( cardSet => cardSet.replacementCard ).filter ( card => !!card );

    return [
      ...activeCards,
      ...inactiveCards,
      ...replacementCards,
    ];
  }

  needsWork (): boolean {
    return this.findAllCardsAsArray ().some ( card => card.needsWork () );
  }

  removeCard ( cardId: number ): void {
    this.cardSets.forEach ( cardSet => {
      if ( cardSet.activeCard && cardSet.activeCard.id === cardId ) {
        cardSet.activeCard = null;
      } else if ( cardSet.inactiveCard && cardSet.inactiveCard.id === cardId ) {
        cardSet.inactiveCard = null;
      } else if ( cardSet.replacementCard && cardSet.replacementCard.id === cardId ) {
        cardSet.replacementCard = null;
      }
    } );
    if ( !this.findAllCardsAsArray ().length ) {
      this.cardSets = [];
    }
  }

  private createCardSet ( cardSetId: number ): CardsComponentCardSet {
    const cardSet = new CardsComponentCardSet ( {
      id: cardSetId
    } );
    this.cardSets.push ( cardSet );
    return cardSet;
  }

  private findOrCreateCardSet ( cardSetId: number ): CardsComponentCardSet {
    return this.cardSets.find ( cardSet => cardSet.id === cardSetId ) || this.createCardSet ( cardSetId );
  }
}
