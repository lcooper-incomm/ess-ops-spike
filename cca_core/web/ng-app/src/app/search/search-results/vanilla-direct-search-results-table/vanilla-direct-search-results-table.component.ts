import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { AppStateType } from "../../../app-state-type.enum";
import { SearchState } from "../../../core/search/search-state";
import * as _ from "lodash";
import { Account } from "../../../core/account/account";
import { AbstractSearchResultsTableComponent } from "../abstract-search-results-table/abstract-search-results-table.component";

@Component ( {
  selector: 'cca-vanilla-direct-search-results-table',
  templateUrl: './vanilla-direct-search-results-table.component.html',
  styleUrls: [ './vanilla-direct-search-results-table.component.scss' ]
} )
export class VanillaDirectSearchResultsTableComponent extends AbstractSearchResultsTableComponent implements OnInit {

  dataSource                 = new MatTableDataSource<Account> ();
  displayedColumns: string[] = [ 'accountNumber', 'description', 'billerName', 'date', 'status' ];

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  private textFilter: string;

  ngOnInit () {
    this.sort.disableClear              = true;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.sortingDataAccessor = ( account: Account, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'accountNumber':
          sortValue = account.identifiers.van16 ? account.identifiers.van16.toLowerCase () : null;
          break;
        case 'description':
          sortValue = account.description ? account.description.toLowerCase () : null;
          break;
        case 'billerName':
          let node  = account.nodes ? account.nodes.biller : null;
          sortValue = (node && node.name) ? node.name.toLowerCase () : null;
          break;
        case 'date':
          sortValue = account.createDate ? account.createDate.value : null;
          break;
        case 'status':
          let status = account.status;
          sortValue  = (status && status.description) ? status.description.toLowerCase () : null;
          break;
        default:
          sortValue = account[ property ];
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

  private filterResults ( accounts: Account[] ): Account[] {
    if ( this.textFilter ) {
      let filter = this.textFilter.toLowerCase ();
      return _.filter ( accounts, function ( account: Account ) {
        let biller = account.nodes.biller;
        return (account.identifiers.van16 && account.identifiers.van16.indexOf ( filter ) !== -1)
          || (account.description && account.description.toLowerCase ().indexOf ( filter ) !== -1)
          || (biller && biller.name && biller.name.toLowerCase ().indexOf ( filter ) !== -1)
          || (account.createDate && account.createDate.displayValue.toLowerCase ().indexOf ( filter ) !== -1)
          || (account.status && account.status.description && account.status.description.toLowerCase ().indexOf ( filter ) !== -1);
      } );
    }
    return accounts;
  }

}
