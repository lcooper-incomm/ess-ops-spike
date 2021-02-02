import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MaplesAccount, MaplesCustomer, MaplesIdentificationType} from '@cscore/maples-client-model';
import {CsCoreAddress} from '@cscore/core-client-model';
import {AppStateType} from '../../../app-state-type.enum';
import {SearchState} from '../../../core/search/search-state';
import {PlatformType} from '../../../core/platform/platform-type.enum';
import {AbstractSearchResultsTableComponent} from '../abstract-search-results-table/abstract-search-results-table.component';
import {buildKeyValueTooltipText, formatAs2LineAddress, maskSSNLastFour} from '../../../core/utils/string-utils';
import {KeyValuePair} from '../../../core/utils/key-value-pair';
import {DataTableField} from 'src/app/core/model/data-table-field';
import {SearchResultType} from '../../../core/search/search.service';

@Component({
  selector: 'cca-encor-search-results-table',
  templateUrl: './encor-search-results-table.component.html'
})
export class EncorSearchResultsTableComponent extends AbstractSearchResultsTableComponent implements OnInit {

  public columns: DataTableField<MaplesCustomer>[] = [
    {
      key: 'memberNumber',
      label: 'Member Number',
      getValue: (customer: MaplesCustomer) => customer.getIdentification(MaplesIdentificationType.MEMBER)
    },
    {
      key: 'firstName',
      label: 'First Name',
      getValue: (customer: MaplesCustomer) => customer.firstName
    },
    {
      key: 'lastName',
      label: 'Last Name',
      getValue: (customer: MaplesCustomer) => customer.lastName
    },
    {
      key: 'address',
      label: 'Address',
      getValue: (customer: MaplesCustomer) => {
        const primary: CsCoreAddress = customer.getPrimaryAddress();
        if (primary) {
          const address: string[] = formatAs2LineAddress(primary);
          return address[0] + ', ' + address[1];
        } else if (!customer.addresses || customer.addresses.length === 0) {
          return null;
        } else {
          const address: string[] = formatAs2LineAddress(customer.addresses[0]);
          return address[0] + ', ' + address[1];
        }
      }
    },
    {
      key: 'ssnLast4',
      label: 'Last 4 SSN',
      getValue: (customer: MaplesCustomer) => customer.getIdentification(MaplesIdentificationType.LAST_4_SSN)
    }
    // TODO: Member Status??
  ];

  private filterFields: DataTableField<MaplesCustomer>[] = [
    {
      key: 'firstName',
      label: 'First Name',
      getValue: (customer: MaplesCustomer) => {
        return customer.firstName;
      }
    }
  ];

  dataSource                 = new MatTableDataSource<MaplesCustomer>();
  displayedColumns: string[] = this.columns.map(column => column.key);
  PlatformType               = PlatformType;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  private textFilter: string;

  ngOnInit() {
    this.sort.disableClear              = true;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.sortingDataAccessor = (customer: MaplesCustomer, property: string) => {
      const matchingField = this.columns.find(column => column.key === property);
      if (matchingField) {
        return matchingField.getValue(customer);
      } else {
        return customer[property];
      }
    };
    this.subscribeToSearchState();
  }

  private subscribeToSearchState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SEARCH_STATE).subscribe({
        next: (searchState: SearchState) => {
          if (searchState) {
            this.textFilter = searchState.textFilter;
            if (searchState.selectedSearchType) {
              this.dataSource.data = this.filterResults(searchState.selectedSearchType.results);
            } else {
              this.dataSource.data = [];
            }
          }
        }
      })
    );
  }

  private filterResults(customers: MaplesCustomer[]): MaplesCustomer[] {
    if (this.textFilter) {
      const filter = this.textFilter.toLowerCase();
      return customers.filter(account => {
        const fieldsToSearch = this.columns.concat(this.filterFields);
        return fieldsToSearch.some(field => {
          const value = field.getValue(account) || '';
          return value.toString().toLowerCase().includes(filter);
        });
      });
    }
    return customers;
  }
}
