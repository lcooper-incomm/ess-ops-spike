import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { AppStateType } from "../../../app-state-type.enum";
import { SearchState } from "../../../core/search/search-state";
import { PlatformType } from "../../../core/platform/platform-type.enum";
import { AbstractSearchResultsTableComponent } from "../abstract-search-results-table/abstract-search-results-table.component";
import { MaplesAccount } from '@cscore/maples-client-model';
import { buildKeyValueTooltipText, maskSSNLastFour, formatAs2LineAddress } from '../../../core/utils/string-utils';
import { KeyValuePair } from '../../../core/utils/key-value-pair';
import { DataTableField } from 'src/app/core/model/data-table-field';
import {CsCoreAddress} from "@cscore/core-client-model";

@Component ( {
  selector: 'cca-serve-account-search-results-table',
  templateUrl: './serve-account-search-results-table.component.html',
  styleUrls: [ './serve-account-search-results-table.component.scss' ]
} )
export class ServeAccountSearchResultsTableComponent extends AbstractSearchResultsTableComponent implements OnInit {

  public columns: DataTableField<MaplesAccount>[] = [
    {
      key: 'accountNumber',
      label: 'Account Number (ID)',
      getValue: ( account: MaplesAccount ) => account.id,
    },
    {
      key: 'cardNumber',
      label: 'Card Number',
      getValue: ( account: MaplesAccount ) => {
        const card = account.getPrimaryCard ();
        return card && card.identifiers.pan;
      },
    },
    {
      key: 'brand',
      label: 'Brand',
      getValue: ( account: MaplesAccount ) => account.product && account.product.item,
    },
    {
      key: 'customerName',
      label: 'Customer Name',
      getValue: ( account: MaplesAccount ) => account.customer.getDisplayName (),
    },
    {
      key: 'ssnLastFour',
      label: 'SSN',
      getValue: ( account: MaplesAccount ) => this.getMaskedSSN ( account ),
    },
    {
      key: 'phoneNumber',
      label: 'Phone Number',
      getValue: ( account: MaplesAccount ) => {
        const phoneNumber = account.customer.getPrimaryPhoneNumber();
        return phoneNumber && phoneNumber.number;
      },
    },
    {
      key: 'addressLine1',
      label: 'Address',
      getValue: ( account: MaplesAccount ) => {
        const address = account.customer.getPrimaryAddress();
        return address && address.line1;
      }
    },
    {
      key: 'addressState',
      label: 'State',
      getValue: ( account: MaplesAccount ) => {
        const address = account.customer.getPrimaryAddress();
        return address && address.state;
      }
    },
    {
      key: 'cardStatus',
      label: 'Card Status',
      getValue: ( account: MaplesAccount ) => {
        const status = account.getPrimaryCard().getPlatformStatus();
        return status && status.name;
      },
    },
  ];

  private filterFields: DataTableField<MaplesAccount>[] = [
    {
      key: 'addressCity',
      label: 'City',
      getValue: ( account: MaplesAccount ) => {
        const address = account.customer.getPrimaryAddress();
        return address && address.city;
      }
    },
    {
      key: 'addressPostalCode',
      label: 'Postal Code',
      getValue: ( account: MaplesAccount ) => {
        const address = account.customer.getPrimaryAddress();
        return address && address.postalCode;
      }
    },
    {
      key: 'proxyNumber',
      label: 'Proxy Number',
      getValue: ( account: MaplesAccount ) => {
        const card = account.getPrimaryCard ();
        return card && card.identifiers.proxyNumber;
      },
    },
    {
      key: 'username',
      label: 'Username',
      getValue: ( account: MaplesAccount ) => account.customer.username,
    },
    {
      key: 'createdDate',
      label: 'Created Date',
      getValue: ( account: MaplesAccount ) => account.createdDate.displayValue,
    },
  ];

  dataSource                 = new MatTableDataSource<MaplesAccount> ();
  displayedColumns: string[] = this.columns.map ( column => column.key );
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
    this.dataSource.sortingDataAccessor = ( account: MaplesAccount, property: string ) => {
      const matchingField = this.columns.find ( column => column.key === property );
      if ( matchingField ) {
        return matchingField.getValue ( account );
      } else {
        return account[ property ];
      }
    };
    this.subscribeToSearchState ();
  }

  getMaskedSSN ( account: MaplesAccount ): string {
    return account.customer.ssnLastFour ? maskSSNLastFour ( account.customer.ssnLastFour ) : '';
  }

  getTooltipText ( account: MaplesAccount ): string {
    const fullAddress          = account.customer.addresses.filter((address: CsCoreAddress) => address.isPrimary == true);
    const address              = formatAs2LineAddress ( fullAddress[0] );
    const primaryCard          = account.getPrimaryCard ();
    const rows: KeyValuePair[] = [
      { key: 'Address', value: address[ 0 ] },
      address[ 1 ] && { key: '', value: address[ 1 ] },
      { key: 'Proxy Number', value: primaryCard && primaryCard.identifiers.proxyNumber },
      { key: 'Username', value: account.customer.username },
      { key: 'Created Date', value: account.createdDate && account.createdDate.displayValue },
    ].filter ( value => !!value );

    return buildKeyValueTooltipText ( rows );
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

  private filterResults ( accounts: MaplesAccount[] ): MaplesAccount[] {
    if ( this.textFilter ) {
      const filter = this.textFilter.toLowerCase ();
      return accounts.filter ( account => {
        const fieldsToSearch = this.columns.concat ( this.filterFields );
        return fieldsToSearch.some ( field => {
          const value = field.getValue ( account ) || '';
          return value.toString ().toLowerCase ().includes ( filter );
        } );
      } );
    }
    return accounts;
  }
}
