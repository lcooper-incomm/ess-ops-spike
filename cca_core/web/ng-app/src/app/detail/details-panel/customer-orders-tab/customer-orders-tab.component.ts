import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {CsCoreTableColumn} from '@cscore/components/public-api';
import {MaplesOrder} from '@cscore/maples-client-model';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {AppState} from '../../../app-state';
import {AppStateType} from '../../../app-state-type.enum';
import {SessionState} from '../../../core/session/session-state';
import {Selection} from '../../../core/session/model/selection';
import {Session} from '../../../core/session/model/session';

@Component({
  selector: 'cca-customer-orders-tab',
  templateUrl: './customer-orders-tab.component.html'
})
export class CustomerOrdersTabComponent extends CcaBaseComponent implements OnInit {

  columns: CsCoreTableColumn<MaplesOrder>[] = [
    {
      key: 'caret',
      label: '',
      getValue: (order: MaplesOrder) => null,
    },
    {
      key: 'number',
      label: 'Order Number',
      getValue: (order: MaplesOrder) => order.id,
    },
    {
      key: 'date',
      label: 'Order Date',
      getValue: (order: MaplesOrder) => order.createdDate && order.createdDate.displayValue,
    },
    {
      key: 'status',
      label: 'Status',
      getValue: (order: MaplesOrder) => order.status && order.status.current && order.status.current.status,
    },
    {
      key: 'extNumber',
      label: 'Ext Number',
      getValue: (order: MaplesOrder) => order.number,
    }
  ];

  dataSource: MatTableDataSource<MaplesOrder> = new MatTableDataSource();
  displayedColumns: string[]                  = this.columns.map(column => column.key);
  filterForm: FormGroup                       = new FormGroup({
    filter: new FormControl()
  });
  selection: Selection<any>;
  session: Session;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (order: MaplesOrder, filterValue: string): boolean => {
      return (order.createdDate && order.createdDate.displayValue.indexOf(filterValue) !== -1)
        || (order.number && order.number.toLowerCase().indexOf(filterValue) !== -1)
        || (order.id && order.id.toLowerCase().indexOf(filterValue) !== -1)
        || (order.status && order.status.current && order.status.current.status.toLowerCase().indexOf(filterValue) !== -1);
    };

    this.subscribeToSessionState();
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state) {
            this.selection = state.selection;
            this.session = state.session;
          }

          if (state && state.selection && state.selection.orders) {
            this.dataSource.data = state.selection.orders;
          } else {
            this.dataSource.data = [];
          }
        })
    );
  }
}
