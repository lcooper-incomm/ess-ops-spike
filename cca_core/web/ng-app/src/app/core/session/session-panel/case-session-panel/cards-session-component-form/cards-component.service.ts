import { Injectable } from '@angular/core';
import { GenericOption } from 'src/app/core/model/generic-option';
import { CardsComponentCardType } from '../../../model/cards-component-card-type.enum';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardsComponentCard } from '../../../model/cards-component-card';
import { map } from 'rxjs/operators';

const build = map ( value => new CardsComponentCard ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class CardsComponentService {

  constructor ( private http: HttpClient ) {
  }

  addOneCard ( componentId: number, card: CardsComponentCard ): Observable<CardsComponentCard> {
    return this.http.post ( `/rest/card-component/${componentId}/card`, card ).pipe ( build );
  }

  deleteOneCard ( cardId: number ): Observable<any> {
    return this.http.delete ( `/rest/card-component/card/${cardId}` );
  }

  updateOneCard ( card: UpdateCardRequest ): Observable<CardsComponentCard> {
    return this.http.put ( `/rest/card-component/card/${card.id}`, card ).pipe ( build );
  }

  static getCardTypeOptions (): GenericOption<CardsComponentCardType>[] {
    return [
      CardsComponentCardType.ACTIVE,
      CardsComponentCardType.INACTIVE,
      CardsComponentCardType.REPLACEMENT,
    ].map ( type => this.getCardTypeOption ( type ) )
  }

  static getCardTypeOption ( cardType: CardsComponentCardType ): GenericOption<CardsComponentCardType> {
    switch ( cardType ) {
      case CardsComponentCardType.INACTIVE:
        return {
          value: CardsComponentCardType.INACTIVE,
          displayValue: 'Inactive',
          description: 'Fraudulent Card',
          sortOrder: 1,
        };
      case CardsComponentCardType.ACTIVE:
        return {
          value: CardsComponentCardType.ACTIVE,
          displayValue: 'Active',
          description: 'Card in Hand',
          sortOrder: 2,
        };
      case CardsComponentCardType.REPLACEMENT:
        return {
          value: CardsComponentCardType.REPLACEMENT,
          displayValue: 'Replacement',
          sortOrder: 3,
        };
      default:
        return null;
    }
  }
}

export interface UpdateCardRequest {
  id: number;
  cardsComponent: UpdateCardsComponentRequest,
  cardSet: number;
  cardType: CardsComponentCardType;
  incommLoadAmount: number;
  isActivated: boolean;
  isApproved: boolean;
  isAwaitingItActivation: boolean;
  isCheckIssued: boolean;
  isDeactivated: boolean;
  isDenied: boolean;
  isFundsRemoved: boolean;
  isItActivated: boolean;
  isLoaded: boolean;
  isNeedingCheckIssued: boolean;
  isNeedingReplacement: boolean;
  isReplaced: boolean;
  isSeekingApproval: boolean;
  isShipped: boolean;
  lastFour: string;
  merchantLoadAmount: number;
  note: string;
  recoveredAmount: number;
  selectionId: number;
}

export interface UpdateCardsComponentRequest {
  id: number;
}
