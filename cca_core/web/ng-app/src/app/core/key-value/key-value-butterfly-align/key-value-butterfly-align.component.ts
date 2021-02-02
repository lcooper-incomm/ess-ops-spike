import { Component, Input, OnInit } from '@angular/core';

@Component ( {
  selector: 'cca-key-value-butterfly-align',
  templateUrl: './key-value-butterfly-align.component.html',
  styleUrls: [ './key-value-butterfly-align.component.scss' ]
} )
export class KeyValueButterflyAlignComponent implements OnInit {

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
