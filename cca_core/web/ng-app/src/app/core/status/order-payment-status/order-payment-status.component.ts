import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractStatusComponent } from "../abstract-status/abstract-status.component";
import { StatusColor } from "../status-color.enum";
import { MaplesOrderPaymentStatus } from "@cscore/maples-client-model";
import * as _ from "lodash";

@Component ( {
  selector: 'cca-order-payment-status',
  templateUrl: './order-payment-status.component.html',
  styleUrls: [ './order-payment-status.component.scss' ]
} )
export class OrderPaymentStatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

  @Input ()
  status: MaplesOrderPaymentStatus;

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
    this.setFinalDisplayValue ( this.status.description ? _.startCase ( this.status.description ) : 'Unavailable' );
    this.color = StatusColor.LIGHT_GREY;
    this.setTooltip ();
  }

  private setTooltip (): void {
    this.tooltip = this.status.message ? this.status.message : '';
  }

}
