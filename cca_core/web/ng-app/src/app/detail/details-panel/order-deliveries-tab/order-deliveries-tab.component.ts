import {Component, OnInit, ViewChild} from '@angular/core';
import {CcaBaseComponent} from "../../../core/cca-base-component";
import {AppState} from "../../../app-state";
import {Store} from "@ngrx/store";
import {AppStateType} from "../../../app-state-type.enum";
import {SessionState} from "../../../core/session/session-state";
import {Selection} from "../../../core/session/model/selection";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {MaplesOrder, MaplesOrderShipment} from "@cscore/maples-client-model";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormControl} from "@angular/forms";
import * as _ from "lodash";
import {PlatformType} from "../../../core/platform/platform-type.enum";
import {MaplesPartner} from "@cscore/maples-client-model";
import {getShippingMethod, linkToFedex} from './order-deliveries-util';

@Component ( {
  selector: 'cca-order-deliveries-tab',
  templateUrl: './order-deliveries-tab.component.html',
  styleUrls: [ './order-deliveries-tab.component.scss' ],
  animations: [
    trigger ( 'detailExpand', [
      state ( 'collapsed', style ( { height: '0px', minHeight: '0', display: 'none' } ) ),
      state ( 'expanded', style ( { height: '*' } ) ),
      transition ( 'expanded <=> collapsed', animate ( '225ms cubic-bezier(0.4, 0.0, 0.2, 1)' ) ),
    ] ),
  ],
} )
export class OrderDeliveriesTabComponent extends CcaBaseComponent implements OnInit {
  dataSource: MatTableDataSource<MaplesOrderShipment> = new MatTableDataSource<MaplesOrderShipment> ();
  displayedColumns: string[]                    = ['caret', 'shipmentDate', 'trackingNumber', 'recipient', 'cardCount', 'shippingMethod'];
  expandedElement: MaplesOrderShipment;
  filterControl                                 = new FormControl ();
  MaplesPartner                                 = MaplesPartner;
  order: MaplesOrder;
  PlatformType                                  = PlatformType;
  selection: Selection<any>;

  @ViewChild ( MatSort )
  sort: MatSort;
  @ViewChild ( MatPaginator )
  paginator: MatPaginator;

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.sort.disableClear              = true;
    this.dataSource.sort                = this.sort;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.filterPredicate     = ( shipment: MaplesOrderShipment, filterValue: string ) => {
      if ( filterValue ) {
        filterValue = filterValue.toLowerCase ();
      }
      return (shipment.createdDate && shipment.createdDate.getDateOnly () && shipment.createdDate.getDateOnly ().indexOf ( filterValue ) !== -1)
        || (shipment.tracking && shipment.tracking.trackingNumber && shipment.tracking.trackingNumber.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (shipment.recipient && shipment.recipient.getDisplayName () && shipment.recipient.getDisplayName ().toLowerCase ().indexOf ( filterValue ) !== -1)
        || (shipment.recipient && shipment.recipient.emailAddress && shipment.recipient.emailAddress.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (shipment.itemCount && shipment.itemCount.toString ().indexOf ( filterValue ) !== -1)
        || (shipment.recipient && shipment.recipient.shippingMethod && shipment.recipient.shippingMethod.toLowerCase ().indexOf ( filterValue ) !== -1);
    };
    this.dataSource.sortingDataAccessor = ( item: MaplesOrderShipment, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'shipmentDate':
          sortValue = item.createdDate ? item.createdDate.value : null;
          break;
        case 'cardCount':
          sortValue = item.itemCount ? item.itemCount : null;
          break;
        case 'trackingNumber':
          sortValue = (item.tracking && item.tracking.trackingNumber) ? item.tracking.trackingNumber.toLowerCase () : null;
          break;
        case 'recipient':
          if ( item.recipient && item.recipient.getDisplayName () ) {
            sortValue = item.recipient.getDisplayName ().toLowerCase ();
          } else if ( item.recipient && item.recipient.emailAddress ) {
            sortValue = item.recipient.emailAddress.toLowerCase ();
          } else {
            sortValue = null;
          }
          break;
        case 'shippingMethod':
          const shippingMethod = getShippingMethod ( item, this.selection.getOrder (), this.selection.platform );
          sortValue            = shippingMethod && shippingMethod.toLowerCase ();
          break;
        default:
          sortValue = item[ property ];
          break;
      }
      return sortValue;
    };
    this.subscribeToSessionState ();
  }

  applyFilter ( filterValue: string ): void {
    this.dataSource.filter = filterValue.trim ().toLowerCase ();
  }

  getShippingMethod ( shipment: MaplesOrderShipment ): string {
    return getShippingMethod ( shipment, this.selection.getOrder (), this.selection.platform );
  }

  linkToFedex ( trackingNumber: string ): void {
    linkToFedex ( trackingNumber );
  }

  toggleExpanded(element: MaplesOrderShipment): void {
    if (this.expandedElement && this.expandedElement.id === element.id) {
      this.expandedElement = undefined;
    } else {
      this.expandedElement = element;
    }
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.selection = state.selection;
            if ( this.selection && this.selection.orderShipments ) {
              this.dataSource.data = this.selection.orderShipments;
            } else {
              this.dataSource.data = [];
            }
            if ( this.selection.selectedShipment ) {
              let index = _.findIndex ( this.dataSource.data, ( shipment: MaplesOrderShipment ) => {
                return shipment.id === this.selection.selectedShipment.id;
              } );
              if ( index !== -1 ) {
                this.expandedElement = this.dataSource.data[ index ];
              }
              this.selection.selectedShipment = null;
            }
          }
        } )
    );
  }
}
