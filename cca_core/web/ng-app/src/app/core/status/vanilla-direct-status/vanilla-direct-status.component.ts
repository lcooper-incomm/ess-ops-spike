import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatusColor } from "../status-color.enum";
import { CsCoreStatus } from "../../model/cs-core-status";
import { VanillaDirectStatusType } from "./vanilla-direct-status-type.enum";
import { AbstractStatusComponent } from "../abstract-status/abstract-status.component";

@Component ( {
  selector: 'cca-vanilla-direct-status',
  templateUrl: './vanilla-direct-status.component.html',
  styleUrls: [ './vanilla-direct-status.component.scss' ]
} )
export class VanillaDirectStatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

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
      case VanillaDirectStatusType.OPEN:
        this.color = StatusColor.GREEN;
        break;
      case VanillaDirectStatusType.CLOSED:
        this.color = StatusColor.RED;
        break;
      case VanillaDirectStatusType.SUSPENDED:
        this.color = StatusColor.ORANGE;
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
