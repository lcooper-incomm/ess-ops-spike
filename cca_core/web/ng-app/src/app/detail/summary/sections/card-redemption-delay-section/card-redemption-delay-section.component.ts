import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { AppStateType } from "../../../../app-state-type.enum";
import { SessionState } from "../../../../core/session/session-state";
import { Card } from '../../../../core/card/card';

@Component ( {
  selector: 'cca-card-redemption-delay-section',
  templateUrl: './card-redemption-delay-section.component.html',
  styleUrls: [ './card-redemption-delay-section.component.scss' ]
} )
export class CardRedemptionDelaySectionComponent extends AbstractSelectionAwareComponent<Card> implements OnInit {

  allFundsAvailableDate: Date;
  isFundsAvailableDateInFuture: boolean = false;

  private isInitialized: boolean = false;

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
    this.subscribeToSessionState ();
  }

  private loadRedemptionDelay (): void {
    let card: Card = this.selection.getCard ();
    if ( card.redemption
      && card.redemption.redemptionDelay
      && card.redemption.redemptionDelay > 0
      && card.activation
      && card.activation.activationDate ) {
      let redemptionDelayInMs    = card.redemption.redemptionDelay * 60 * 1000;
      this.allFundsAvailableDate = new Date ( card.activation.activationDate.value.getTime () + redemptionDelayInMs );
    } else {
      this.allFundsAvailableDate = null;
    }

    this.isFundsAvailableDateInFuture = this.allFundsAvailableDate && this.allFundsAvailableDate > new Date ();
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection && state.selection.data && !this.isInitialized ) {
            this.loadRedemptionDelay ();
          }
        } )
    );
  }
}
