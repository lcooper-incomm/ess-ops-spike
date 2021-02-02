import { Component, Input, OnInit } from '@angular/core';

@Component ( {
  selector: 'cca-simple-panel',
  templateUrl: './simple-panel.component.html',
  styleUrls: [ './simple-panel.component.scss' ]
} )
export class SimplePanelComponent implements OnInit {

  @Input ()
  color: string;

  constructor () {
  }

  ngOnInit () {
  }

}
