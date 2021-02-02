import { Component, Input, OnInit } from '@angular/core';

@Component ( {
  selector: 'cca-key-value',
  templateUrl: './key-value.component.html',
  styleUrls: [ './key-value.component.scss' ]
} )
export class KeyValueComponent implements OnInit {

  @Input ()
  key: string;
  @Input ()
  keyWidthPercent: number = 40;
  @Input ()
  alignment: string       = 'start center';

  constructor () {
  }

  ngOnInit () {
  }

}
