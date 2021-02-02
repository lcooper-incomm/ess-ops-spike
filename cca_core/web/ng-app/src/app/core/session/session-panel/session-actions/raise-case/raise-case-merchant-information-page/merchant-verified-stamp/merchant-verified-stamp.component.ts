import { Component, Input, OnInit } from '@angular/core';

@Component ( {
  selector: 'cca-merchant-verified-stamp',
  templateUrl: './merchant-verified-stamp.component.html',
  styleUrls: [ './merchant-verified-stamp.component.scss' ]
} )
export class MerchantVerifiedStampComponent implements OnInit {

  @Input ()
  isVerified: boolean = false;

  constructor () {
  }

  ngOnInit () {
  }

}
