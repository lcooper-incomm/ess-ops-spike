import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Store } from "@ngrx/store";
import {MaplesCard} from '@cscore/maples-client-model';
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { Selection } from "../../../core/session/model/selection";
import { AppState } from "../../../app-state";
import { AppStateType } from "../../../app-state-type.enum";
import { SessionState } from "../../../core/session/session-state";
import { CustomerCardPanelComponent } from "./customer-card-panel/customer-card-panel.component";
import { Card } from "../../../core/card/card";

@Component ( {
  selector: 'cca-customer-cards-tab',
  templateUrl: './customer-cards-tab.component.html',
  styleUrls: [ './customer-cards-tab.component.scss' ]
} )
export class CustomerCardsTabComponent extends CcaBaseComponent implements OnInit {

  selection: Selection<any>;

  @ViewChildren ( 'cards' )
  cardComponents: QueryList<CustomerCardPanelComponent>;

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  getCards(): MaplesCard[] {
    if (!this.selection || !this.selection.getCustomerAccount().cards) {
      return [];
    } else {
      return this.selection.getCustomerAccount().cards.sort((a: MaplesCard, b: MaplesCard) => {
        return b.id.localeCompare(a.id);
      });
    }
  }

  handleCardSelection ( card: Card | MaplesCard ): void {
    this.cardComponents.forEach ( ( cardComponent: CustomerCardPanelComponent ) => {
      if ((cardComponent.card && cardComponent.card.identifiers.pan !== card.identifiers.pan)
        || (cardComponent.maplesCard && cardComponent.maplesCard.identifiers.pan !== card.identifiers.pan)) {
        cardComponent.isExpanded = false;
      }
    } );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection ) {
            this.selection = state.selection;
          }
        } )
    );
  }
}
