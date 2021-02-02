import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Card } from "../../../core/card/card";
import { AppStateType } from "../../../app-state-type.enum";
import { SearchState } from "../../../core/search/search-state";
import { CsCoreStatus } from "../../../core/model/cs-core-status";
import { PlatformType } from "../../../core/platform/platform-type.enum";
import * as _ from "lodash";
import { CsCoreCurrency } from "@cscore/gringotts";
import { AbstractSearchResultsTableComponent } from "../abstract-search-results-table/abstract-search-results-table.component";

@Component ( {
  selector: 'cca-vms-gift-search-results-table',
  templateUrl: './vms-gift-search-results-table.component.html',
  styleUrls: [ './vms-gift-search-results-table.component.scss' ]
} )
export class VmsGiftSearchResultsTableComponent extends AbstractSearchResultsTableComponent implements OnInit {

  dataSource                 = new MatTableDataSource<Card> ();
  displayedColumns: string[] = [ 'cardNumber', 'accountNumber', 'productCategory', 'cardId', 'status', 'balance' ];
  PlatformType               = PlatformType;

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  private textFilter: string;

  ngOnInit () {
    this.sort.disableClear              = true;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.sortingDataAccessor = ( card: Card, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'productCategory':
          sortValue = card.productCategory ? card.productCategory.toLowerCase () : null;
          break;
        case 'status':
          let status = card.getStatusByPlatform ( PlatformType.VMS );
          sortValue  = (status && status.name) ? status.name.toLowerCase () : null;
          break;
        case 'cardNumber':
          sortValue = card.identifiers.pan;
          break;
        case 'accountNumber':
          sortValue = card.customer ? card.customer.identifiers.accountNumber : null;
          break;
        case 'cardId':
          sortValue = card.identifiers.cardId;
          break;
        case 'balance':
          sortValue = (card.customer && card.customer.accounts && card.customer.accounts.spending && card.customer.accounts.spending.availableBalance) ? card.customer.accounts.spending.availableBalance.value : null;
          break;
        default:
          sortValue = card[ property ];
          break;
      }

      return sortValue;
    };
    this.subscribeToSearchState ();
  }

  private subscribeToSearchState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SEARCH_STATE ).subscribe ( {
        next: ( searchState: SearchState ) => {
          if ( searchState ) {
            this.textFilter = searchState.textFilter;
            if ( searchState.selectedSearchType ) {
              this.dataSource.data = this.filterResults ( searchState.selectedSearchType.results );
            } else {
              this.dataSource.data = [];
            }
          }
        }
      } )
    );
  }

  private filterResults ( cards: Card[] ): Card[] {
    if ( this.textFilter ) {
      let filter = this.textFilter.toLowerCase ();
      return _.filter ( cards, function ( card: Card ) {
        let status: CsCoreStatus    = card.getStatusByPlatform ( PlatformType.VMS );
        let balance: CsCoreCurrency = card.customer.accounts.spending.availableBalance;
        return (card.identifiers.pan && card.identifiers.pan.indexOf ( filter ) !== -1)
          || (card.identifiers.cardId && card.identifiers.cardId.indexOf ( filter ) !== -1)
          || (card.productCategory && card.productCategory.toLowerCase ().indexOf ( filter ) !== -1)
          || (card.customer.identifiers.accountNumber && card.customer.identifiers.accountNumber.indexOf ( filter ) !== -1)
          || (balance && balance.displayValue.indexOf ( filter ) !== -1)
          || (status && status.name && status.name.toLowerCase ().indexOf ( filter ) !== -1);
      } );
    }
    return cards;
  }
}
