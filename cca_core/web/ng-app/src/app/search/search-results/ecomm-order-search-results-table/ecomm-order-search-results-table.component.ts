import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { AppStateType } from "../../../app-state-type.enum";
import { SearchState } from "../../../core/search/search-state";
import { MaplesOrder, MaplesOrderStatusItem } from "@cscore/maples-client-model";
import * as _ from "lodash";
import { AbstractSearchResultsTableComponent } from "../abstract-search-results-table/abstract-search-results-table.component";

@Component ( {
  selector: 'cca-ecomm-order-search-results-table',
  templateUrl: './ecomm-order-search-results-table.component.html',
  styleUrls: [ './ecomm-order-search-results-table.component.scss' ]
} )
export class EcommOrderSearchResultsTableComponent extends AbstractSearchResultsTableComponent implements OnInit {

  dataSource                 = new MatTableDataSource<MaplesOrder> ();
  displayedColumns: string[] = [ 'orderNumber', 'date', 'firstName', 'lastName', 'email', 'lastFour', 'status', 'amount' ];

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  private textFilter: string;

  ngOnInit () {
    this.sort.disableClear              = true;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.sortingDataAccessor = ( order: MaplesOrder, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'orderNumber':
          sortValue = order.number;
          break;
        case 'lastFour':
          sortValue = order.payment ? order.payment.ccLastFour : null;
          break;
        case 'amount':
          sortValue = (order.totals && order.totals.grandTotal) ? order.totals.grandTotal.value : null;
          break;
        case 'date':
          sortValue = order.createdDate ? order.createdDate.value : null;
          break;
        case 'email':
          sortValue = (order.customer && order.customer.emailAddress) ? order.customer.emailAddress.toLowerCase () : null;
          break;
        case 'firstName':
          sortValue = (order.customer && order.customer.firstName) ? order.customer.firstName.toLowerCase () : null;
          break;
        case 'lastName':
          sortValue = (order.customer && order.customer.lastName) ? order.customer.lastName.toLowerCase () : null;
          break;
        case 'status':
          sortValue = (order.status && order.status.current && order.status.current.status) ? order.status.current.status : 'unavailable';
          break;
        default:
          sortValue = order[ property ];
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

  private filterResults ( orders: MaplesOrder[] ): MaplesOrder[] {
    if ( this.textFilter ) {
      let filter = this.textFilter.toLowerCase ();
      return _.filter ( orders, function ( order: MaplesOrder ) {
        let status: MaplesOrderStatusItem = order.status.current;
        return (order.number && order.number.indexOf ( filter ) !== -1)
          || (order.createdDate && order.createdDate.displayValue.toLowerCase ().indexOf ( filter ) !== -1)
          || (order.customer.firstName && order.customer.firstName.toLowerCase ().indexOf ( filter ) !== -1)
          || (order.customer.lastName && order.customer.lastName.toLowerCase ().indexOf ( filter ) !== -1)
          || (order.customer.emailAddress && order.customer.emailAddress.toLowerCase ().indexOf ( filter ) !== -1)
          || (order.payment && order.payment.ccLastFour && order.payment.ccLastFour.indexOf ( filter ) !== -1)
          || (status && status.state && status.state.toLowerCase ().indexOf ( filter ) !== -1)
          || (order.totals.grandTotal && order.totals.grandTotal.displayValue.indexOf ( filter ) !== -1);
      } );
    }
    return orders;
  }

}
