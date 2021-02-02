import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatusColor } from "../status-color.enum";
import { CsCoreStatus } from "../../model/cs-core-status";
import { AbstractStatusComponent } from "../abstract-status/abstract-status.component";

@Component ( {
  selector: 'cca-ddp-status',
  templateUrl: './ddp-status.component.html',
  styleUrls: [ './ddp-status.component.scss' ]
} )
export class DdpStatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

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
    this.setFinalDisplayValue ( this.status.name );
    this.setClass ();
    this.setTooltip ();
  }

  private setClass (): void {
    switch ( this.status.name ) {
      default:
        this.color = StatusColor.LIGHT_GREY;
        break;
    }
  }

  private setTooltip (): void {
    this.tooltip = this.status.name;
  }

}
