import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { StatusColor } from "../status-color.enum";
import * as _ from "lodash";

@Component ( {
  selector: 'cca-abstract-status',
  template: ''
} )
export class AbstractStatusComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  useAbbreviation: boolean = false;
  @Input ()
  customClasses: string;

  color: StatusColor;
  displayValue: string;
  tooltip: string;

  constructor () {
    super ();
  }

  ngOnInit () {
  }

  setFinalDisplayValue ( value: string ): void {
    if ( this.useAbbreviation ) {
      value             = value.toUpperCase ();
      value             = value.replace ( ' ', '_' );
      value             = value.replace ( '-', '_' );
      this.displayValue = value
        .split ( '_' )
        .map ( part => part.substring ( 0, 1 ) )
        .join ( '' );
    } else {
      this.displayValue = _.startCase ( value );
    }
  }

}
