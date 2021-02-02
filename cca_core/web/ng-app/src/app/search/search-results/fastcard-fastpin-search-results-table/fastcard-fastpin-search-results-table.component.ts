import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Card } from "../../../core/card/card";
import { AppStateType } from "../../../app-state-type.enum";
import { SearchState } from "../../../core/search/search-state";
import * as _ from "lodash";
import { PlatformType } from "../../../core/platform/platform-type.enum";
import { CsCoreStatus } from "../../../core/model/cs-core-status";
import { AbstractSearchResultsTableComponent } from "../abstract-search-results-table/abstract-search-results-table.component";

@Component ( {
  selector: 'cca-fastcard-fastpin-search-results-table',
  templateUrl: './fastcard-fastpin-search-results-table.component.html',
  styleUrls: [ './fastcard-fastpin-search-results-table.component.scss' ]
} )
export class FastcardFastpinSearchResultsTableComponent extends AbstractSearchResultsTableComponent implements OnInit {

  dataSource                 = new MatTableDataSource<Card> ();
  displayedColumns: string[] = [ 'serialNumber', 'van', 'pin', 'upc', 'description', 'status', 'amount' ];

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
        case 'description':
          sortValue = card.productDescription ? card.productDescription.toLowerCase () : null;
          break;
        case 'serialNumber':
          sortValue = card.identifiers.serialNumber;
          break;
        case 'van':
          sortValue = card.identifiers.van;
          break;
        case 'pin':
          sortValue = card.identifiers.pin;
          break;
        case 'upc':
          sortValue = card.identifiers.upc;
          break;
        case 'amount':
          sortValue = (card.amounts && card.amounts.denomination) ? card.amounts.denomination.value : null;
          break;
        case 'status':
          let status = card.getStatusByPlatform ( PlatformType.INCOMM );
          sortValue  = (status && status.description) ? status.description.toLowerCase () : null;
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
        let status: CsCoreStatus = card.getStatusByPlatform ( PlatformType.INCOMM );
        return (card.identifiers.serialNumber && card.identifiers.serialNumber.indexOf ( filter ) !== -1)
          || (card.identifiers.van && card.identifiers.van.indexOf ( filter ) !== -1)
          || (card.identifiers.pin && card.identifiers.pin.indexOf ( filter ) !== -1)
          || (card.identifiers.upc && card.identifiers.upc.indexOf ( filter ) !== -1)
          || (card.productDescription && card.productDescription.toLowerCase ().indexOf ( filter ) !== -1)
          || (status && status.description && status.description.toLowerCase ().indexOf ( filter ) !== -1)
          || (card.amounts.denomination && card.amounts.denomination.displayValue.indexOf ( filter ) !== -1);
      } );
    }
    return cards;
  }

}
