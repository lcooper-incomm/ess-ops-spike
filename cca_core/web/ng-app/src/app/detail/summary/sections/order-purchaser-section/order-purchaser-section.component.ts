import { Component, OnInit } from '@angular/core';
import { AbstractSelectionAwareComponent } from "../../../abstract-selection-aware/abstract-selection-aware.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { MaplesOrder } from '@cscore/maples-client-model';
import { CsCoreAddressType, CsCorePhoneNumber, CsCorePhoneNumberType, CsCoreAddress } from '@cscore/core-client-model';

@Component ( {
  selector: 'cca-order-purchaser-section',
  templateUrl: './order-purchaser-section.component.html',
  styleUrls: [ './order-purchaser-section.component.scss' ]
} )
export class OrderPurchaserSectionComponent extends AbstractSelectionAwareComponent<MaplesOrder> implements OnInit {

  readonly CsCoreAddressType = CsCoreAddressType;

  constructor ( protected store: Store<AppState> ) {
    super ( store );
  }

  ngOnInit () {
    super.init ();
  }

  getPreferredAddress (): CsCoreAddress {
    const customer        = this.selection && this.selection.getOrder () && this.selection.getOrder ().customer;
    const customerAddress = () => customer.getAddressByType ( CsCoreAddressType.CUSTOMER );
    const billingAddress  = () => customer.getAddressByType ( CsCoreAddressType.BILLING );
    return customer && (customerAddress () || billingAddress () || customer.addresses[ 0 ]);
  }

  getPreferredPhoneNumber (): CsCorePhoneNumber {
    const customer = this.selection && this.selection.getOrder () && this.selection.getOrder ().customer;
    const mobile   = () => customer.getPhoneNumberByType ( CsCorePhoneNumberType.MOBILE );
    const home     = () => customer.getPhoneNumberByType ( CsCorePhoneNumberType.HOME );
    const work     = () => customer.getPhoneNumberByType ( CsCorePhoneNumberType.WORK );
    return customer && (mobile () || home () || work () || customer.phoneNumbers[ 0 ]);
  }
}
