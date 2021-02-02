import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatusColor } from "../status-color.enum";
import { CsCoreStatus } from "../../model/cs-core-status";
import { IncommStatusType } from "./incomm-status-type.enum";
import { AbstractStatusComponent } from "../abstract-status/abstract-status.component";

@Component ( {
  selector: 'cca-incomm-status',
  templateUrl: './incomm-status.component.html',
  styleUrls: [ './incomm-status.component.scss' ]
} )
export class IncommStatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

  @Input ()
  status: CsCoreStatus;

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
    this.setFinalDisplayValue ( this.status.description );
    this.setClass ();
    this.setTooltip ();
  }

  private setClass (): void {
    switch ( this.status.name ) {
      case IncommStatusType.ACTIVE:
        this.color = StatusColor.GREEN;
        break;
      case IncommStatusType.INACTIVE:
      case IncommStatusType.DEACTIVE:
        this.color = StatusColor.BLUE;
        break;
      case IncommStatusType.REDEEMED:
      case IncommStatusType.CONSUMED:
        this.color = StatusColor.DARK_GREY;
        break;
      default:
        this.color = StatusColor.LIGHT_GREY;
        break;
    }
  }

  private setTooltip (): void {
    this.tooltip = this.status.name;
    if ( this.status.description ) {
      this.tooltip += ' - ' + this.status.description;
    }
  }

}
