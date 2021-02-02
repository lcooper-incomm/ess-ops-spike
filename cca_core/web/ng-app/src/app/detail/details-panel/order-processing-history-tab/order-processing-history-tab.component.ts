import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Store} from '@ngrx/store';
import {
  MaplesOrderItem,
  MaplesOrderItemCard,
  MaplesOrderItemHistory,
  MaplesOrderStatusHistory
} from '@cscore/maples-client-model';
import {AppStateType} from '../../../app-state-type.enum';
import {SessionState} from '../../../core/session/session-state';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {AppState} from '../../../app-state';
import {CsCoreTimestamp} from '@cscore/core-client-model';
import {Logger} from '../../../logging/logger.service';

@Component({
  selector: 'cca-order-processing-history-tab',
  templateUrl: './order-processing-history-tab.component.html',
  styleUrls: ['./order-processing-history-tab.component.scss']
})
export class OrderProcessingHistoryTabComponent extends CcaBaseComponent implements OnInit {

  data: OrderStatusHistoryModel[] = [];
  productTypeFilter: string = 'All';
  dataSource: MatTableDataSource<OrderStatusHistoryModel> = new MatTableDataSource<OrderStatusHistoryModel>();
  displayedColumns: string[]                               = ['date', 'type', 'name', 'status', 'comment'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store<AppState>,
              private logger: Logger) {
    super();
  }

  ngOnInit() {
    this.sort.disableClear          = true;
    this.dataSource.sort            = this.sort;
    this.dataSource.paginator       = this.paginator;
    this.dataSource.filterPredicate = (orderStatus: OrderStatusHistoryModel, filterValue: string) => {
      if (filterValue) {
        filterValue = filterValue.toLowerCase();
      }
      return orderStatus.createDate.displayValue && orderStatus.createDate.displayValue.toString().indexOf(filterValue) !== -1
        || (orderStatus.type && orderStatus.type.toLowerCase().indexOf(filterValue) !== -1)
        || (orderStatus.name && orderStatus.name.toLowerCase().indexOf(filterValue) !== -1)
        || (orderStatus.comment && orderStatus.comment.toLowerCase().indexOf(filterValue) !== -1)
        || (orderStatus.status && orderStatus.status.toLowerCase().indexOf(filterValue) !== -1);
    };

    this.dataSource.sortingDataAccessor = (item, property) => {
      let sortValue: any;

      switch (property) {
        case 'date':
          sortValue = item.createDate ? item.createDate.getAsMilliseconds() : null;
          break;
        case 'type':
          sortValue = item.type ? item.type.toLowerCase() : null;
          break;
        case 'name':
          sortValue = item.name ? item.name.toLowerCase() : null;
          break;
        case 'comment':
          sortValue = item.comment ? item.comment.toLowerCase() : null;
          break;
        case 'comment':
          sortValue = item.comment ? item.comment.toLowerCase() : null;
          break;
        case 'status':
          sortValue = item.status ? item.status.toLowerCase() : null;
          break;
        default:
          sortValue = item[property];
          break;
      }
      return sortValue;
    };

    this.subscribeToSessionState();
  }

  applyProductType(productTypeFilter: string) {
    this.productTypeFilter = productTypeFilter;
    this.filterData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterData(): void {
    if (this.productTypeFilter === 'Physical') {
      this.dataSource.data = this.data.filter(item => item.isPhysical === true);
    } else if (this.productTypeFilter === 'Digital') {
      this.dataSource.data = this.data.filter(item => item.isPhysical === false);
    } else {
      this.dataSource.data = this.data.filter(item => true);
    }
  }

  /**
   * Aggregate the history for the order, order items and cards on the order items.
   */
  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state && state.selection) {
            let data: OrderStatusHistoryModel[] = [];
            for (let status of state.selection.getOrder().status.histories) {
              try {
                data.push(this.mapOrderStatus(status));
              } catch (e) {
                this.logger.error('Failed to map order status');
              }
            }
            for (let item of state.selection.orderItems) {
              for (let status of item.history) {
                try {
                  data.push(this.mapOrderItemStatus(item, status));
                } catch (e) {
                  this.logger.error('Failed to map order item status');
                }
              }
              for (let card of item.cards) {
                for (let status of card.history) {
                  try {
                    data.push(this.mapOrderLineItemStatus(item, card, status));
                  } catch (e) {
                    // If payment status doesn't exist.  Fail silently.
                  }
                }
              }
            }
            this.data = data;
            this.filterData();
          }
        })
    );
  }

  private mapOrderStatus(status: MaplesOrderStatusHistory): OrderStatusHistoryModel {
    let data: OrderStatusHistoryModel = new OrderStatusHistoryModel();
    data.createDate = status.createdDate;
    data.type = 'Order';
    data.isPhysical = undefined;
    if (status.comment && status.reason) {
      data.comment = status.comment + ' - ' + status.reason;
    } else {
      data.comment = status.reason;
    }
    data.status = status.status;
    return data;
  }

  private mapOrderItemStatus(item: MaplesOrderItem, status: MaplesOrderItemHistory): OrderStatusHistoryModel {
    let data: OrderStatusHistoryModel = new OrderStatusHistoryModel();
    data.createDate = status.createDate;
    data.type = 'Order Item';
    data.isPhysical = item.productType === 'PHYSICAL';
    data.name = item.id + ' - ' + item.name;
    data.comment = status.reason;
    data.status = status.deliveryStatusCurrent.name;
    return data;
  }

  private mapOrderLineItemStatus(item: MaplesOrderItem, card: MaplesOrderItemCard, status: MaplesOrderItemHistory): OrderStatusHistoryModel {
    let data: OrderStatusHistoryModel = new OrderStatusHistoryModel();
    data.createDate = status.createDate;
    data.type = 'Line Item';
    data.isPhysical = item.productType === 'PHYSICAL';
    data.name = card.id + ' - ' + item.name;
    data.comment = status.reason;
    if (status.deliveryStatusCurrent.name !== status.deliveryStatusPrevious.name) {
      data.status = status.deliveryStatusCurrent.name;
    } else if (!status.paymentStatusCurrent) {
      throw new Error('Payment status does not exist');
    } else {
      data.status = status.paymentStatusCurrent.name;
    }
    return data;
  }
}

export class OrderStatusHistoryModel {
  createDate: CsCoreTimestamp;
  type: string;
  isPhysical: boolean;
  name: string;
  status: string;
  comment: string;
}
