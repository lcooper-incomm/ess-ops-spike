import { Component, Input, OnInit } from '@angular/core';
import { Card } from "../../../../../core/card/card";
import { CcaBaseComponent } from "../../../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";
import { AppStateType } from "../../../../../app-state-type.enum";
import { SessionState } from "../../../../../core/session/session-state";
import { Customer } from '../../../../../core/customer/customer';
import { MaplesCard, MaplesPlatform } from '@cscore/maples-client-model';
import { isFsapiPlatform } from 'src/app/core/platform/platform-type.enum';
import {Selection, SelectionDataType} from '../../../../../core/session/model/selection';

@Component ( {
  selector: 'cca-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: [ './customer-card.component.scss' ]
} )
export class CustomerCardComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  allowUnmask: boolean     = false;
  @Input ()
  card: Card | MaplesCard;
  @Input ()
  enableHighlight: boolean = false;
  @Input ()
  selection: Selection<SelectionDataType>;

  currentLastFour: string;
  customer: Customer;

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  get isServeCard (): boolean {
    return this.card instanceof MaplesCard && this.card.platform === MaplesPlatform.SERVE;
  }

  get isFsapiCard (): boolean {
    return this.card instanceof Card && isFsapiPlatform ( this.card.platform );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection && state.selection.selectedCard ) {
            this.currentLastFour = state.selection.selectedCard.identifiers.pan ? state.selection.selectedCard.identifiers.pan.slice ( -4 ) : null;
            this.customer        = state.selection.getCustomer ();
          } else if ( state && state.selection && state.selection.selectedCustomerAccountCard ) {
            const pan            = state.selection.selectedCustomerAccountCard.identifiers ? state.selection.selectedCustomerAccountCard.identifiers.pan : null;
            this.currentLastFour = pan ? pan && pan.slice ( -4 ) : null;
          } else {
            this.currentLastFour = null;
          }
        } )
    );
  }

}
