import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatusColor } from "../status-color.enum";
import { CsCoreStatus } from "../../model/cs-core-status";
import * as _ from "lodash";
import { AbstractStatusComponent } from "../abstract-status/abstract-status.component";

@Component ( {
  selector: 'cca-status',
  templateUrl: './status.component.html',
  styleUrls: [ './status.component.scss' ]
} )
export class StatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

  @Input ()
  status: CsCoreStatus | string;

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
    const displayValue = this.status instanceof CsCoreStatus ? this.status.description : this.status;
    this.setFinalDisplayValue ( displayValue ? _.startCase ( displayValue ) : 'Unavailable' );
    this.color = StatusColor.LIGHT_GREY;
    this.setTooltip ();
  }

  private setTooltip (): void {
    if ( this.status instanceof CsCoreStatus ) {
      this.tooltip = [ this.status.name, this.status.description ].filter ( part => !!part ).join ( ' - ' );
    } else {
      this.tooltip = this.status || '';
    }
  }
}
