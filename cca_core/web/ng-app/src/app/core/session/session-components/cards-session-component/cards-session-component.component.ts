import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { CsCoreCurrency, CsCoreCurrencyUtil } from "@cscore/gringotts";
import { CardsComponent } from '../../model/cards-component';
import { CardsComponentCardSet } from '../../model/cards-component-card-set';
import { Session } from '../../model/session';

@Component ( {
  selector: 'cca-cards-session-component',
  templateUrl: './cards-session-component.component.html',
  styleUrls: [ './cards-session-component.component.scss' ]
} )
export class CardsSessionComponentComponent implements OnInit {
  @Input () component: CardsComponent;
  @Input () editable: boolean            = false;
  @Input () header: string               = 'Card Sets';
  @Input () hideFinancialImpact: boolean = false;
  @Input () session: Session;
  @Input () stackedView: boolean         = false;

  displayedColumns: string[] = [ 'set', 'inactive', 'active', 'replacement' ];

  totalMerchantLoads: CsCoreCurrency;
  totalInCommLoads: CsCoreCurrency;
  totalRecoveredAmount: CsCoreCurrency;
  totalLoss: CsCoreCurrency;

  ngOnInit (): void {
    this.computeTotals ();
  }

  get cardSets (): CardsComponentCardSet[] {
    return this.component && _.sortBy ( this.component.cardSets, 'id' );
  }

  private computeTotals () {
    const cards = this.component.findAllCardsAsArray ();

    const merchantLoadAmounts = cards.map ( card => card.merchantLoadAmount ).filter ( amount => !!amount );
    const incommLoadAmounts   = cards.map ( card => card.incommLoadAmount ).filter ( amount => !!amount );
    const recoveredAmounts    = cards.map ( card => card.recoveredAmount ).filter ( amount => !!amount );

    this.totalMerchantLoads   = CsCoreCurrencyUtil.addAll ( merchantLoadAmounts );
    this.totalInCommLoads     = CsCoreCurrencyUtil.addAll ( incommLoadAmounts );
    this.totalRecoveredAmount = CsCoreCurrencyUtil.addAll ( recoveredAmounts );

    this.totalLoss = CsCoreCurrencyUtil.subtract ( this.totalInCommLoads, this.totalRecoveredAmount );
  }
}
