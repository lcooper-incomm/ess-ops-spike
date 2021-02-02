import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatusColor } from "../status-color.enum";
import { AbstractStatusComponent } from "../abstract-status/abstract-status.component";

@Component ( {
  selector: 'cca-boolean-status',
  templateUrl: './boolean-status.component.html',
  styleUrls: [ './boolean-status.component.scss' ]
} )
export class BooleanStatusComponent extends AbstractStatusComponent implements OnInit, OnChanges {

  @Input ()
  status: boolean;

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
    this.setFinalDisplayValue ( this.status ? 'Active' : 'Inactive' );
    this.color = this.status ? StatusColor.GREEN : StatusColor.RED;
  }

}
