import { Component, Input, OnInit } from '@angular/core';

@Component ( {
  selector: 'cca-value-display',
  templateUrl: './value-display.component.html',
  styleUrls: [ './value-display.component.scss' ]
} )
export class ValueDisplayComponent implements OnInit {
  @Input ()
  value: any;

  constructor () {
  }

  ngOnInit () {
  }

}
