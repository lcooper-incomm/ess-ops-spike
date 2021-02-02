import { Node } from "../node";
import { CsCorePhoneNumber, CsCorePhoneNumberType, CsCoreTimestamp } from "@cscore/core-client-model";
import { Hierarchy } from "../hierarchy/hierarchy";
import { LocationMerchant } from "./location-merchant";
import { CsCoreContact } from "../../model/cs-core-contact";
import * as _ from "lodash";

export class Location extends Node {

  controlNumber: string;
  country: string;
  createdDate: CsCoreTimestamp;
  emailAddress: string;
  federalEmployerNumber: string;
  hierarchy: Hierarchy;
  managerName: string;
  merchant: LocationMerchant;
  storeNumber: string;

  contacts: CsCoreContact[]         = [];
  phoneNumbers: CsCorePhoneNumber[] = [];

  constructor ( data: any = null ) {
    super ( data );
    this.contacts     = [];
    this.phoneNumbers = [];

    if ( data.createdDate ) {
      this.createdDate = new CsCoreTimestamp ( data.createdDate );
    }
    if ( data.hierarchy ) {
      this.hierarchy = new Hierarchy ( data.hierarchy );
    }
    if ( data.merchant ) {
      this.merchant = new LocationMerchant ( data.merchant );
    }
    if ( data.contacts ) {
      data.contacts.forEach ( contact => this.contacts.push ( new CsCoreContact ( contact ) ) );
    }
    if ( data.phoneNumbers ) {
      data.phoneNumbers.forEach ( phoneNumber => this.phoneNumbers.push ( new CsCorePhoneNumber ( phoneNumber ) ) );
    }
  }

  getFirstContact (): CsCoreContact {
    if ( this.contacts.length ) {
      return this.contacts[ 0 ];
    } else {
      return null;
    }
  }

  getPhoneNumberByType ( type: CsCorePhoneNumberType ): CsCorePhoneNumber {
    return _.find ( this.phoneNumbers, function ( phoneNumber: CsCorePhoneNumber ) {
      return phoneNumber.type === type;
    } );
  }

}
