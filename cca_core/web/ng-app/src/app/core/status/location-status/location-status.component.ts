import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatusColor } from "../status-color.enum";
import { CsCoreStatus } from "../../model/cs-core-status";
import { LocationStatusType } from "./location-status-type.enum";
import { AbstractStatusComponent } from "../abstract-status/abstract-status.component";

@Component ( {
  selector: 'cca-location-status',
  templateUrl: './location-status.component.html',
  styleUrls: [ './location-status.component.scss' ]
} )
export class LocationStatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

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
    this.setFinalDisplayValue ( this.status ? this.status.description : 'Unavailable' );
    this.setClass ();
    this.setTooltip ();
  }

  private setClass (): void {
    let statusDescription = this.status.description ? this.status.description.toUpperCase () : null;
    switch ( statusDescription ) {
      case LocationStatusType.ACTIVE:
        this.color = StatusColor.GREEN;
        break;
      case LocationStatusType.CLOSED:
        this.color = StatusColor.DARK_GREY;
        break;
      default:
        this.color = StatusColor.LIGHT_GREY;
        break;
    }
  }

  private setTooltip (): void {
    if ( this.status ) {
      this.tooltip = this.status.description;
    } else {
      this.tooltip = 'Unavailable';
    }
  }

}
