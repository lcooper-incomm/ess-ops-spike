import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatusColor } from "../status-color.enum";
import { MaplesOrderStatusItem } from "@cscore/maples-client-model";
import { EcommOrderStatusType } from "./ecomm-order-status-type.enum";
import { AbstractStatusComponent } from "../abstract-status/abstract-status.component";

@Component ( {
  selector: 'cca-ecomm-order-status',
  templateUrl: './ecomm-order-status.component.html',
  styleUrls: [ './ecomm-order-status.component.scss' ]
} )
export class EcommOrderStatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

  @Input ()
  status: MaplesOrderStatusItem;

  @Input ()
  statusString: string;

  constructor () {
    super ();
  }

  ngOnInit () {
    this.init ();
  }

  ngOnChanges ( changes: SimpleChanges ): void {
    this.init ();
  }

  private init (): void {
    let statusValue;
    if ( this.status ) {
      statusValue = this.status.status;
    }
    if ( this.statusString ) {
      statusValue = this.statusString;
    }

    this.setFinalDisplayValue ( statusValue || 'Unavailable' );
    this.setClass ( statusValue );
    this.setTooltip ( statusValue );
  }

  private setClass ( statusValue ): void {
    let value;
    value = statusValue || 'Unavailable';

    switch ( value.toUpperCase () ) {
      case EcommOrderStatusType.RISK_SUCCESS:
      case EcommOrderStatusType.RISK_PENDING:
      case EcommOrderStatusType.ORDER_INIT:
      case EcommOrderStatusType.FRAUD_INIT:
      case EcommOrderStatusType.FRAUD_SUCCESS:
      case EcommOrderStatusType.FULFILLMENT_READY:
      case EcommOrderStatusType.FULFILLMENT_INIT:
      case EcommOrderStatusType.FULFILLMENT_ACCEPTED:
      case EcommOrderStatusType.FULFILLMENT_PENDING:
      case EcommOrderStatusType.FULFILLMENT_PARTIAL:
      case EcommOrderStatusType.PAYMENT_PARTIAL_COMPLETE:
      case EcommOrderStatusType.FULFILLMENT_COMPLETE:
        this.color = StatusColor.LIGHT_BLUE;
        break;
      case EcommOrderStatusType.RISK_DECLINED:
      case EcommOrderStatusType.FRAUD_FAILED:
      case EcommOrderStatusType.FRAUD_DECLINED:
      case EcommOrderStatusType.FULFILLMENT_DECLINED:
      case EcommOrderStatusType.FULFILLMENT_REJECTED:
        this.color = StatusColor.LIGHT_RED;
        break;
      case EcommOrderStatusType.FRAUD_RETRYING:
      case EcommOrderStatusType.FRAUD_PENDING:
      case EcommOrderStatusType.HOLDED:
        this.color = StatusColor.LIGHT_ORANGE;
        break;
      case EcommOrderStatusType.PAYMENT_COMPLETE:
      case EcommOrderStatusType.COMPLETE:
        this.color = StatusColor.LIGHT_GREEN;
        break;
      default:
        this.color = StatusColor.LIGHT_GREY;
        break;
    }
  }

  private setTooltip ( statusValue ): void {
    this.tooltip = statusValue || 'Unavailable';
  }

}
