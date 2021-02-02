import { Component, Input, OnInit } from '@angular/core';
import { CsCoreAddress } from "@cscore/core-client-model";

@Component ( {
  selector: 'cca-key-value-address',
  templateUrl: './key-value-address.component.html',
  styleUrls: [ './key-value-address.component.scss' ]
} )
export class KeyValueAddressComponent implements OnInit {

  @Input ()
  address: CsCoreAddress;
  @Input ()
  key: string             = 'Address';
  @Input ()
  keyWidthPercent: number = 40;

  constructor () {
  }

  ngOnInit () {

  }

}
