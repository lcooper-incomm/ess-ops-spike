import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Card } from "../../../core/card/card";
import { AppStateType } from "../../../app-state-type.enum";
import { SearchState } from "../../../core/search/search-state";
import { CsCoreStatus } from "../../../core/model/cs-core-status";
import { PlatformType } from "../../../core/platform/platform-type.enum";
import { CsCoreCurrency } from "@cscore/gringotts";
import * as _ from "lodash";
import { SearchParameterValueType } from "../../../core/search/search-type/search-parameter-value-type.enum";
import { IdentificationTypeType } from "../../../core/form/identification-field/identification-type-type.enum";
import { AbstractSearchResultsTableComponent } from "../abstract-search-results-table/abstract-search-results-table.component";

@Component ( {
  selector: 'cca-vms-gpr-search-results-table',
  templateUrl: './vms-gpr-search-results-table.component.html',
  styleUrls: [ './vms-gpr-search-results-table.component.scss' ]
} )
export class VmsGprSearchResultsTableComponent extends AbstractSearchResultsTableComponent implements OnInit {

  private nonSsnColumns: string[] = [ 'cardNumber', 'accountNumber', 'customerName', 'dateOfBirth', 'productCategory', 'cardId', 'status', 'balance' ];
  private ssnColumns: string[]    = [ 'cardNumber', 'accountNumber', 'customerName', 'ssn', 'dateOfBirth', 'productCategory', 'cardId', 'status', 'balance' ];

  dataSource                 = new MatTableDataSource<Card> ();
  displayedColumns: string[] = this.nonSsnColumns;
  isSsnSearch: boolean       = false;

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
        case 'customerName':
          sortValue = (card.customer && card.customer.getDisplayName ()) ? card.customer.getDisplayName ().toLowerCase () : null;
          break;
        case 'productCategory':
          sortValue = card.productCategory ? card.productCategory.toLowerCase () : null;
          break;
        case 'status':
          let status = card.getStatusByPlatform ( PlatformType.VMS );
          sortValue  = (status && status.name) ? status.name.toLowerCase () : null;
          break;
        case 'ssn':
          sortValue = (card.customer && card.customer.identification) ? card.customer.identification.number : null;
          break;
        case 'dateOfBirth':
          sortValue = card.customer ? card.customer.dateOfBirth : null;
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
            this.isSsnSearch      = !!searchState.selectedSearchType
              && searchState.selectedSearchType.parameters.get ( SearchParameterValueType.IDENTIFICATION_TYPE ) === IdentificationTypeType.SOCIAL_SECURITY_NUMBER;
            this.displayedColumns = this.isSsnSearch ? this.ssnColumns : this.nonSsnColumns;
          }
        }
      } )
    );
  }

  private filterResults ( cards: Card[] ): Card[] {
    if ( this.textFilter ) {
      let filter    = this.textFilter.toLowerCase ();
      let component = this;
      return _.filter ( cards, function ( card: Card ) {
        let status: CsCoreStatus    = card.getStatusByPlatform ( PlatformType.VMS );
        let balance: CsCoreCurrency = card.customer.accounts.spending.availableBalance;
        return (card.identifiers.pan && card.identifiers.pan.indexOf ( filter ) !== -1)
          || (card.identifiers.cardId && card.identifiers.cardId.indexOf ( filter ) !== -1)
          || (card.productCategory && card.productCategory.toLowerCase ().indexOf ( filter ) !== -1)
          || (card.customer.identifiers.accountNumber && card.customer.identifiers.accountNumber.indexOf ( filter ) !== -1)
          || (card.customer.getDisplayName () && card.customer.getDisplayName ().toLowerCase ().indexOf ( filter ) !== -1)
          || (card.customer.dateOfBirth && card.customer.dateOfBirth.indexOf ( filter ) !== -1)
          || (component.isSsnSearch && card.customer.identification && card.customer.identification.number && card.customer.identification.number.indexOf ( filter ) !== -1)
          || (balance && balance.displayValue.indexOf ( filter ) !== -1)
          || (status && status.name && status.name.toLowerCase ().indexOf ( filter ) !== -1);
      } );
    }
    return cards;
  }
}
