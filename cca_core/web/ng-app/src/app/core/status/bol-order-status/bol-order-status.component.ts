import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatusColor } from "../status-color.enum";
import { MaplesOrderStatusItem } from "@cscore/maples-client-model";
import { BolOrderStatusType } from "./bol-order-status-type.enum";
import { AbstractStatusComponent } from "../abstract-status/abstract-status.component";

@Component ( {
  selector: 'cca-bol-order-status',
  templateUrl: './bol-order-status.component.html',
  styleUrls: [ './bol-order-status.component.scss' ]
} )
export class BolOrderStatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

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
      case BolOrderStatusType.RISK_SUCCESS:
      case BolOrderStatusType.RISK_PENDING:
      case BolOrderStatusType.FRAUD_INIT:
      case BolOrderStatusType.FULFILLMENT_READY:
      case BolOrderStatusType.FULFILLMENT_INIT:
      case BolOrderStatusType.FULFILLMENT_ACCEPTED:
      case BolOrderStatusType.FULFILLMENT_PENDING:
      case BolOrderStatusType.FULFILLMENT_PARTIAL:
      case BolOrderStatusType.FULFILLMENT_COMPLETE:
      case BolOrderStatusType.IN_PROGRESS:
        this.color = StatusColor.LIGHT_BLUE;
        break;
      case BolOrderStatusType.FRAUD_FAILED:
      case BolOrderStatusType.FRAUD_DECLINED:
      case BolOrderStatusType.FULFILLMENT_DECLINED:
      case BolOrderStatusType.FULFILLMENT_REJECTED:
        this.color = StatusColor.LIGHT_RED;
        break;
      case BolOrderStatusType.FRAUD_RETRYING:
      case BolOrderStatusType.FRAUD_PENDING:
      case BolOrderStatusType.HOLD:
        this.color = StatusColor.LIGHT_ORANGE;
        break;
      case BolOrderStatusType.PAYMENT_COMPLETE:
      case BolOrderStatusType.COMPLETE:
      case BolOrderStatusType.COMPLETED:
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
