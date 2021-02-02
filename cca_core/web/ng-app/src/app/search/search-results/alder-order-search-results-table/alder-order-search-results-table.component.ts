import {Component, OnInit, ViewChild} from '@angular/core';
import {MaplesOrder} from "@cscore/maples-client-model";
import {DataTableField} from "../../../core/model/data-table-field";
import {PlatformType} from "../../../core/platform/platform-type.enum";
import {AbstractSearchResultsTableComponent} from "../abstract-search-results-table/abstract-search-results-table.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortable} from "@angular/material/sort";
import {AppStateType} from "../../../app-state-type.enum";
import {SearchState} from "../../../core/search/search-state";
import {buildKeyValueTooltipText} from "../../../core/utils/string-utils";
import {KeyValuePair} from "../../../core/utils/key-value-pair";

@Component({
  selector: 'cca-alder-order-search-results-table',
  templateUrl: './alder-order-search-results-table.component.html',
  styleUrls: ['./alder-order-search-results-table.component.scss']
})
export class AlderOrderSearchResultsTableComponent extends AbstractSearchResultsTableComponent implements OnInit {
  public columns: DataTableField<MaplesOrder>[] = [
    {
      key: 'orderNumber',
      label: 'Order Number',
      getValue: (order: MaplesOrder) => order.id,
    },
    {
      key: 'dateCreated',
      label: 'Date Created',
      getValue: (order: MaplesOrder) => order.createdDate && order.createdDate.displayValue,
    },
    {
      key: 'firstName',
      label: 'Purchaser First Name',
      getValue: (order: MaplesOrder) => order.customer && order.customer.firstName,
    },
    {
      key: 'lastName',
      label: 'Purchaser Last Name',
      getValue: (order: MaplesOrder) => order.customer && order.customer.lastName,
    },
    {
      key: 'checkoutId',
      label: 'Checkout ID',
      getValue: (order: MaplesOrder) => order.correlationId,
    },
    {
      key: 'status',
      label: 'Status',
      getValue: (order: MaplesOrder) => {
        const status = order.status;
        return status && status.current.state;
      },
    },
    {
      key: 'amount',
      label: 'Purchase Amount',
      getValue: (order: MaplesOrder) => {
        const amount = order.totals;
        return amount && amount.grandTotal && amount.grandTotal.displayValue;
      },
    },
  ];

  private filterFields: DataTableField<MaplesOrder>[] = [];

  dataSource                 = new MatTableDataSource<MaplesOrder>();
  displayedColumns: string[] = this.columns.map(column => column.key);
  PlatformType               = PlatformType;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  private textFilter: string;

  ngOnInit() {
    this.sort.disableClear = true;
    this.sort.sort(({id: 'dateCreated', start: 'desc'}) as MatSortable);
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.sortingDataAccessor = (order: MaplesOrder, property: string) => {
      const matchingField = this.columns.find(column => column.key === property);
      if (matchingField) {
        if (property === 'amount') {
          return order.totals && order.totals.grandTotal && order.totals.grandTotal.value;
        }
        return matchingField.getValue(order);
      } else {
        return order[property];
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

  getTooltipText(order: MaplesOrder): string {
    const rows: KeyValuePair[] = [].filter(value => !!value);

    return buildKeyValueTooltipText(rows);
  }

  private filterResults(orders: MaplesOrder[]): MaplesOrder[] {
    if (this.textFilter) {
      const filter = this.textFilter.toLowerCase();
      return orders.filter(order => {
        const fieldsToSearch = this.columns.concat(this.filterFields);
        return fieldsToSearch.some(field => {
          const value = field.getValue(order) || '';
          return value.toString().toLowerCase().includes(filter);
        });
      });
    }
    return orders;
  }
}

