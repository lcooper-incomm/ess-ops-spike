import { Component, Input, OnInit } from '@angular/core';
import { CsCoreContact } from "../../../../core/model/cs-core-contact";
import { CsCoreAddress, CsCoreAddressType } from "@cscore/core-client-model";

@Component ( {
  selector: 'cca-contact',
  templateUrl: './contact.component.html',
  styleUrls: [ './contact.component.scss' ]
} )
export class ContactComponent implements OnInit {

  @Input ()
  contact: CsCoreContact;

  address: CsCoreAddress;
  email: string;

  constructor () {
  }

  ngOnInit () {
    this.selectAddress ();
    this.email = this.contact.getFirstEmailAddress ();
  }

  private selectAddress (): void {
    if ( this.contact.addresses.length ) {
      //Try to use the CONTACT address first, then MAILING, then the first available
      this.address = this.contact.getAddressByType ( CsCoreAddressType.CONTACT );
      if ( !this.address ) {
        this.address = this.contact.getAddressByType ( CsCoreAddressType.MAILING );
      }
      if ( !this.address ) {
        this.address = this.contact.addresses[ 0 ];
      }
      //Hide the address if it is not populated (stupid MDM crap...)
      if ( this.address && !this.address.line1 ) {
        this.address = null;
      }
    }
  }

}
