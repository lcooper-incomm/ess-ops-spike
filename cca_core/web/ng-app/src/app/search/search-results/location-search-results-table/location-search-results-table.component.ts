import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { AppStateType } from "../../../app-state-type.enum";
import { SearchState } from "../../../core/search/search-state";
import { CsCoreStatus } from "../../../core/model/cs-core-status";
import { PlatformType } from "../../../core/platform/platform-type.enum";
import { Location } from "../../../core/node/location/location";
import * as _ from "lodash";
import { CsCoreAddress, CsCoreAddressType, CsCorePhoneNumber, CsCorePhoneNumberType } from "@cscore/core-client-model";
import { AbstractSearchResultsTableComponent } from "../abstract-search-results-table/abstract-search-results-table.component";

@Component ( {
  selector: 'cca-location-search-results-table',
  templateUrl: './location-search-results-table.component.html',
  styleUrls: [ './location-search-results-table.component.scss' ]
} )
export class LocationSearchResultsTableComponent extends AbstractSearchResultsTableComponent implements OnInit {

  dataSource                 = new MatTableDataSource<Location> ();
  displayedColumns: string[] = [ 'locationId', 'locationName', 'merchantName', 'phoneNumber', 'address', 'city', 'state', 'postalCode', 'status' ];

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  private textFilter: string;

  ngOnInit () {
    this.sort.disableClear              = true;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.sortingDataAccessor = ( location: Location, property: string ) => {
      let sortValue: any;

      let address = location.getAddressByType ( CsCoreAddressType.PHYSICAL );
      switch ( property ) {
        case 'locationId':
          sortValue = location.legacyId;
          break;
        case 'phoneNumber':
          let phoneNumber = location.getPhoneNumberByType ( CsCorePhoneNumberType.WORK );
          sortValue       = phoneNumber ? phoneNumber.number : null;
          break;
        case 'address':
          sortValue = (address && address.line1) ? address.line1.toLowerCase () : null;
          break;
        case 'city':
          sortValue = (address && address.city) ? address.city.toLowerCase () : null;
          break;
        case 'state':
          sortValue = (address && address.state) ? address.state.toLowerCase () : null;
          break;
        case 'postalCode':
          sortValue = (address && address.postalCode) ? address.postalCode.toLowerCase () : null;
          break;
        case 'locationName':
          sortValue = location.name ? location.name.toLowerCase () : null;
          break;
        case 'merchantName':
          sortValue = (location.merchant && location.merchant.name) ? location.merchant.name.toLowerCase () : null;
          break;
        case 'status':
          let status = location.getStatusByPlatform ( PlatformType.MDM );
          sortValue  = (status && status.description) ? status.description.toLowerCase () : 'unavailable';
          break;
        default:
          sortValue = location[ property ];
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

  private filterResults ( locations: Location[] ): Location[] {
    if ( this.textFilter ) {
      let filter = this.textFilter.toLowerCase ();
      return _.filter ( locations, function ( location: Location ) {
        let status: CsCoreStatus           = location.getStatusByPlatform ( PlatformType.MDM );
        let phoneNumber: CsCorePhoneNumber = location.getPhoneNumberByType ( CsCorePhoneNumberType.WORK );
        let address: CsCoreAddress         = location.getAddressByType ( CsCoreAddressType.PHYSICAL );
        return (location.legacyId && location.legacyId.indexOf ( filter ) !== -1)
          || (location.name && location.name.toLowerCase ().indexOf ( filter ) !== -1)
          || (location.merchant && location.merchant.name && location.merchant.name.toLowerCase ().indexOf ( filter ) !== -1)
          || (phoneNumber && phoneNumber.number && phoneNumber.number.indexOf ( filter ) !== -1)
          || (address && address.line1 && address.line1.toLowerCase ().indexOf ( filter ) !== -1)
          || (address && address.city && address.city.toLowerCase ().indexOf ( filter ) !== -1)
          || (address && address.state && address.state.toLowerCase ().indexOf ( filter ) !== -1)
          || (address && address.postalCode && address.postalCode.toLowerCase ().indexOf ( filter ) !== -1)
          || (status && status.description && status.description.toLowerCase ().indexOf ( filter ) !== -1);
      } );
    }
    return locations;
  }

}
