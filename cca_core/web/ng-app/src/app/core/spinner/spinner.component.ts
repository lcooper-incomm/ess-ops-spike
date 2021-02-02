import { Component, Input, OnInit } from '@angular/core';
import { SpinnerSize } from "./spinner-size.enum";

@Component ( {
  selector: 'cca-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: [ './spinner.component.scss' ]
} )
export class SpinnerComponent implements OnInit {

  @Input ()
  color: string     = 'primary';
  @Input ()
  on: boolean       = false;
  @Input ()
  rounded: boolean  = false;
  @Input ()
  size: SpinnerSize = SpinnerSize.SMALL;
  @Input ()
  id: string        = null;

  constructor () {
  }

  ngOnInit () {
  }

  start (): void {
    this.on = true;
  }

  stop (): void {
    this.on = false;
  }
}
