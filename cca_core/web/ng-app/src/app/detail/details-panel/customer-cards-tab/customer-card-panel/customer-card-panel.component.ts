import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {MaplesCard, MaplesCardHistory, MaplesOrderItemCard, MaplesStatus} from '@cscore/maples-client-model';
import {Card} from '../../../../core/card/card';
import {AppState} from '../../../../app-state';
import {CcaBaseComponent} from '../../../../core/cca-base-component';
import {AppStateType} from '../../../../app-state-type.enum';
import {SessionState} from '../../../../core/session/session-state';
import {Selection} from '../../../../core/session/model/selection';
import {SetSelectionSelectedCardAction} from '../../../../core/session/action/session-actions';
import {Customer} from '../../../../core/customer/customer';
import {CsCoreStatus, CsCoreStatusType} from '../../../../core/model/cs-core-status';
import {CardService} from '../../../../core/card/card.service';

@Component ( {
  selector: 'cca-customer-card-panel',
  templateUrl: './customer-card-panel.component.html',
  styleUrls: [ './customer-card-panel.component.scss' ]
} )
export class CustomerCardPanelComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  card: Card;
  @Input ()
  maplesCard: MaplesCard;
  @Output ()
  onSelect: EventEmitter<Card | MaplesCard> = new EventEmitter<Card | MaplesCard> ();

  customer: Customer;
  isExpanded: boolean     = false;
  isSelectedCard: boolean = false;
  CsCoreStatusType        = CsCoreStatusType;

  private selection: Selection<any>;

  private isInitialized: boolean = false;

  constructor ( private cardService: CardService,
                private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  selectCard (): void {
    if (this.card) {
      this.selection.selectedCard = this.card;
    } else {
      this.selection.selectedCustomerAccountCard = this.maplesCard;
    }
    this.store.dispatch ( new SetSelectionSelectedCardAction ( this.selection ) );
    this.onSelect.emit ( this.card );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection ) {
            this.selection = state.selection;
            if ( this.selection ) {
              this.customer = this.selection.getCustomer ();
            }

            if ( this.selection.selectedCard && this.selection.selectedCard.identifiers.pan === this.card.identifiers.pan && !this.isInitialized ) {
              this.isExpanded    = true;
              this.isInitialized = true;
            }
          }

          this.isSelectedCard = state
            && state.selection
            && state.selection.selectedCard
            && state.selection.selectedCard.identifiers.pan === this.card.identifiers.pan;
        } )
    );
  }

  isServeCard ( card ): boolean {
    return card instanceof MaplesCard;
  }

  isFsapiCard ( card ): boolean {
    return card instanceof Card || card instanceof MaplesOrderItemCard;
  }

  getStatus ( card ): CsCoreStatus | string | null {
    if ( card instanceof Card ) {
      return card.getStatusByPlatform ( (<Card>this.card).platform );
    } else if ( card instanceof MaplesOrderItemCard ) {
      return card.status;
    } else {
      return null;
    }
  }

  getMaplesStatus(): MaplesStatus {
    return this.selection.getMaplesCardStatus(this.maplesCard);
  }

  getCardHistory(card: MaplesCard): MaplesCardHistory {
    return this.selection.cardHistory.find((cardHistory: MaplesCardHistory) => {
      return card.identifiers.pan.endsWith(cardHistory.newCardNumber);
    });
  }
}
