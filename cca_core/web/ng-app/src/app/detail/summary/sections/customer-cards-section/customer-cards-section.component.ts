import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { Card } from "../../../../core/card/card";
import { AppStateType } from "../../../../app-state-type.enum";
import { SessionState } from "../../../../core/session/session-state";
import { RoutingService } from "../../../../core/routing/routing.service";
import { UrlQueryParam } from "../../../../core/routing/url-query-param.enum";
import { CustomerService } from "../../../../core/customer/customer.service";
import { SpinnerSize } from "../../../../core/spinner/spinner-size.enum";
import { DetailTabType } from "../../../detail-tab-type.enum";
import { SetSelectionSelectedTabAction } from "../../../../core/session/action/session-actions";
import { Customer } from 'src/app/core/customer/customer';
import { Selection } from 'src/app/core/session/model/selection';
import { SelectionType } from 'src/app/core/session/model/selection-type.enum';
import { MaplesAccount, MaplesCard, MaplesPlatform } from '@cscore/maples-client-model';
import { isFsapiPlatform } from '../../../../core/platform/platform-type.enum';
import { CustomerAccountService } from 'src/app/core/customer-account/customer-account.service';

@Component ( {
  selector: 'cca-customer-cards-section',
  templateUrl: './customer-cards-section.component.html',
  styleUrls: [ './customer-cards-section.component.scss' ]
} )
export class CustomerCardsSectionComponent extends AbstractSelectionAwareComponent<Customer | MaplesAccount> implements OnInit {

  currentLastFour: string;
  card: Card | MaplesCard;
  SpinnerSize = SpinnerSize;

  constructor (
    private customerAccountService: CustomerAccountService,
    private customerService: CustomerService,
    private routingService: RoutingService,
    protected store: Store<AppState>,
  ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
    this.subscribeToSessionState ();
  }

  get cards (): Card[] | MaplesCard[] {
    return this.selection.type === SelectionType.CUSTOMER ? this.selection.getCustomer ().cards : this.selection.getCustomerAccount ().cards;
  }

  compareCards ( card1: Card | MaplesCard, card2: Card | MaplesCard ): boolean {
    return card1.identifiers.pan === card2.identifiers.pan;
  }

  isOnCardsTab (): boolean {
    return this.selection.selectedTab === DetailTabType.CARDS;
  }

  navigateToCard ( card: Card ): void {
    this.selection.selectedTab = DetailTabType.CARDS;
    this.store.dispatch ( new SetSelectionSelectedTabAction ( this.selection ) );
  }

  selectCard ( card: Card | MaplesCard ): void {
    if ( card instanceof Card ) {
      this.customerService.setSelectedCardForSelection ( this.selection as Selection<Customer>, card );
    } else {
      this.customerAccountService.setSelectedCardForSelection ( this.selection as Selection<MaplesAccount>, card );
    }
  }

  get isFsapiPlatform (): boolean {
    return this.card && this.card instanceof Card && isFsapiPlatform ( this.card.platform )
  }

  get isServePlatform (): boolean {
    return this.card && this.card instanceof MaplesCard && this.card.platform === MaplesPlatform.SERVE;
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.currentLastFour = this.routingService.getQueryParam ( UrlQueryParam.DETAILS_LAST_FOUR );
            if ( state.selection ) {
              this.selection = state.selection as Selection<Customer>;
              if ( this.selection.type === SelectionType.CUSTOMER && this.selection.selectedCard ) {
                this.card = this.selection.selectedCard;

                // To change it on the summary panel had to find the status from the cards in the selection and not from selected card
                // because selected card does not change unless is clicked
                let cards: Card[] = <Card[]>this.selection.data.cards;
                let currentCard = cards.find((item: Card) => this.card.identifiers.cardId === item.identifiers.cardId);
                this.card.statuses = currentCard.statuses;

              } else if ( this.selection.type === SelectionType.CUSTOMER_ACCOUNT ) {
                this.card = this.selection.getCustomerAccount().getPrimaryCard();
              }
            }
          }
        } )
    );
  }

}
