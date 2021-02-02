import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MaplesOrderItem, MaplesOrderTotals} from "@cscore/maples-client-model";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Selection} from "../../../../core/session/model/selection";
import {CcaBaseComponent} from "../../../../core/cca-base-component";
import {DetailTabType} from "../../../detail-tab-type.enum";
import {SetSelectionSelectedTabAction} from "../../../../core/session/action/session-actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app-state";
import {MaplesPartner} from "@cscore/maples-client-model";
import {PlatformType} from "../../../../core/platform/platform-type.enum";
import {CsCoreCurrencyCode, CsCoreCurrencyUtil} from "@cscore/gringotts";
import {AppStateType} from "../../../../app-state-type.enum";
import {SessionState} from "../../../../core/session/session-state";

@Component ( {
  selector: 'cca-order-items-table',
  templateUrl: './order-items-table.component.html',
  styleUrls: [ './order-items-table.component.scss' ]
} )
export class OrderItemsTableComponent extends CcaBaseComponent implements OnInit {
  dataSource: MatTableDataSource<MaplesOrderItem> = new MatTableDataSource<MaplesOrderItem> ();
  displayedColumns: string[];
  selectedId: string;

  @Input ()
  selectedOrderFlag: boolean = true;

  @Input ()
  selection: Selection<any>;

  @Input ()
  isFilterable: boolean = true;

  @Input ()
  platform: PlatformType;

  @Input ()
  viewDeliveries: boolean = true;

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;
  @Output () filterCardItems = new EventEmitter<MaplesOrderItem> ();

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  @Input ()
  set orderItems ( orderItems: MaplesOrderItem[] ) {
    if ( orderItems ) {
      this.buildCurrencyTotals ( orderItems );
    }
  }

  ngOnInit () {
    this.subscribeToSessionState();
    this.sort.disableClear          = true;
    this.dataSource.sort            = this.sort;
    this.dataSource.paginator       = this.paginator;
    this.dataSource.filterPredicate = ( orderItem: MaplesOrderItem, filterValue: string ) => {
      if ( filterValue ) {
        filterValue = filterValue.toLowerCase ();
      }
      return orderItem.name && orderItem.name.toLowerCase ().indexOf ( filterValue ) !== -1
        || (orderItem.quantity && orderItem.quantity.toString ().indexOf ( filterValue ) !== -1)
        || (orderItem.initialValue && orderItem.initialValue.displayValue.toString ().indexOf ( filterValue ) !== -1)
        || (orderItem.totals && orderItem.totals.purchaseFees && orderItem.totals.purchaseFees.displayValue.toString ().indexOf ( filterValue ) !== -1)
        || (orderItem.totals && orderItem.totals.discounted && orderItem.totals.discounted.displayValue.toString ().indexOf ( filterValue ) !== -1)
        || (orderItem.totals && orderItem.totals.handlingFees && orderItem.totals.handlingFees.displayValue.toString ().indexOf ( filterValue ) !== -1)

    };

    this.dataSource.sortingDataAccessor = ( item, property ) => {
      let sortValue: any;

      switch ( property ) {
        case 'name':
          sortValue = item.name ? item.name.toLowerCase () : null;
          break;
        case 'status':
          sortValue = item.quantity ? item.quantity.toString () : null;
          break;
        case 'value':
          sortValue = item.initialValue ? item.initialValue.value : null;
          break;
        case 'purchaseFees':
          let purchaseFees = item.purchaseFee ? item.purchaseFee : null;
          sortValue        = purchaseFees ? purchaseFees.value : null;
          break;
        case 'handlingFees':
          let handlingFees = item.handlingFee ? item.handlingFee : null;
          sortValue        = handlingFees ? handlingFees.value : null;
          break;
        case 'discounted':
          let discounted = item.feeDiscount ? item.feeDiscount : null;
          sortValue      = discounted ? discounted.value : null;
          break;
        default:
          sortValue = item[ property ];
          break;
      }
      return sortValue;
    };
  }

  private buildCurrencyTotals(orderItems: MaplesOrderItem[]): void {
    orderItems.forEach((orderItem: MaplesOrderItem) => {
      let totals: MaplesOrderTotals = new MaplesOrderTotals();
      totals.subtotal               = orderItem.initialValue ? CsCoreCurrencyUtil.multiply(orderItem.initialValue, orderItem.quantity) : CsCoreCurrencyUtil.buildWithCode(0, CsCoreCurrencyCode.USD);
      if (orderItem.feeDiscount) {
        totals.discounted = orderItem.feeDiscount;
      }
      if (totals.discounted) {
        totals.purchaseFees = orderItem.purchaseFee ? CsCoreCurrencyUtil.subtract(CsCoreCurrencyUtil.multiply(orderItem.purchaseFee, orderItem.quantity), totals.discounted) : CsCoreCurrencyUtil.buildWithCode(0, CsCoreCurrencyCode.USD);
        totals.handlingFees = orderItem.handlingFee ? CsCoreCurrencyUtil.subtract(CsCoreCurrencyUtil.multiply(orderItem.handlingFee, orderItem.quantity), totals.discounted) : CsCoreCurrencyUtil.buildWithCode(0, CsCoreCurrencyCode.USD);
      } else {
        totals.purchaseFees = orderItem.purchaseFee ? CsCoreCurrencyUtil.multiply(orderItem.purchaseFee, orderItem.quantity) : CsCoreCurrencyUtil.buildWithCode(0, CsCoreCurrencyCode.USD);
        totals.handlingFees = orderItem.handlingFee ? CsCoreCurrencyUtil.multiply(orderItem.handlingFee, orderItem.quantity) : CsCoreCurrencyUtil.buildWithCode(0, CsCoreCurrencyCode.USD);
      }

      totals.grandTotal = CsCoreCurrencyUtil.add(totals.subtotal, CsCoreCurrencyUtil.add(totals.purchaseFees,totals.handlingFees));

      orderItem.totals = totals;
    });
    this.dataSource.data = orderItems;
  }

  applyFilter ( filterValue: string ): void {
    this.dataSource.filter = filterValue.trim ().toLowerCase ();
  }

  filterItems ( orderItem: MaplesOrderItem ): void {
    this.selectedId = orderItem.id;
    this.filterCardItems.emit ( orderItem );
  }

  navigateToDeliveriesAndFilterByOrderItem ( orderItem: MaplesOrderItem ): void {
    this.selection.selectedTab = DetailTabType.ORDER_DELIVERIES;
    this.store.dispatch ( new SetSelectionSelectedTabAction ( this.selection ) );
  }

  private setDisplayedColumns (): void {
    if ( this.selection && this.selection.simplePartner === MaplesPartner.WALMART && this.selection.platform !== PlatformType.ALDER ) {
      this.displayedColumns = [ 'name', 'quantity', 'value', 'purchaseFee', 'handlingFee', 'balance' ];
    } else if (this.selection.platform === PlatformType.ALDER) {
      this.displayedColumns = ['productName', 'productValue', 'recipientName', 'recipientEmail', 'promotionCode', 'promotionCodeStatus', 'promotionID', 'promotionName']
    } else {
      this.displayedColumns = [ 'imageUri', 'name', 'quantity', 'value', 'purchaseFee', 'discounted', 'handlingFee', 'balance' ];
    }
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state) {
            this.selection = state.selection;
            this.setDisplayedColumns();
          }
        })
    );
  }

}
