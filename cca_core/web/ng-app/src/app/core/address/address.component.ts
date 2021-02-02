import { Component, Input, OnInit } from '@angular/core';
import { CsCoreAddress } from "@cscore/core-client-model";

@Component ( {
  selector: 'cca-address',
  templateUrl: './address.component.html',
  styleUrls: [ './address.component.scss' ]
} )
export class AddressComponent implements OnInit {

  @Input ()
  address: CsCoreAddress;

  constructor () {
  }

  ngOnInit () {
  }

}
