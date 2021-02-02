import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StatusColor} from "../status-color.enum";
import * as _ from "lodash";
import {MaplesOrderStatusItem} from "@cscore/maples-client-model";
import {BolOrderStateType} from "./bol-order-state-type.enum";
import {AbstractStatusComponent} from "../abstract-status/abstract-status.component";

@Component ( {
  selector: 'cca-bol-order-state',
  templateUrl: './bol-order-state.component.html',
  styleUrls: [ './bol-order-state.component.scss' ]
} )
export class BolOrderStateComponent extends AbstractStatusComponent implements OnInit, OnChanges {

  @Input ()
  status: MaplesOrderStatusItem;

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
    this.setFinalDisplayValue ( this.status.state );
    this.setClass ();
    this.setTooltip ();
  }

  private setClass (): void {
    let value = this.status.state || 'Unavailable';
    switch ( value.toUpperCase () ) {
      case BolOrderStateType.COMPLETE:
        this.color = StatusColor.GREEN;
        break;
      case BolOrderStateType.PROCESSING:
        this.color = StatusColor.BLUE;
        break;
      case BolOrderStateType.PARTIALLY_REFUNDED:
        this.color = StatusColor.LIGHT_BLUE;
        break;
      case BolOrderStateType.COMPLETE:
      case BolOrderStateType.CLOSED:
        this.color = StatusColor.DARK_GREY;
        break;
      default:
        this.color = StatusColor.LIGHT_GREY;
        break;
    }
  }

  private setDisplayValue (): void {
    let value = this.status.state;
    if ( value && value.toUpperCase () === 'HOLDED' ) {
      value = 'ON_HOLD';
    }
    this.displayValue = _.startCase ( value ) || 'Unavailable';
  }

  private setTooltip (): void {
    this.tooltip = this.status.state || 'Unavailable';
  }

}
