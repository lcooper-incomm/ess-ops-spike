import {
  CsCoreAddress,
  CsCoreAddressType,
  CsCorePhoneNumber,
  CsCorePhoneNumberType,
  CsCoreTimestamp
} from "@cscore/core-client-model";
import * as _ from "lodash";

export class CsCoreContact {

  id: string;
  createDate: CsCoreTimestamp;
  name: string;
  partyId: string;
  type: CsCoreContactType;
  version: number;

  addresses: CsCoreAddress[]        = [];
  emailAddresses: string[]          = [];
  phoneNumbers: CsCorePhoneNumber[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.addresses    = [];
      this.phoneNumbers = [];

      if ( data.createDate ) {
        this.createDate = new CsCoreTimestamp ( data.createDate );
      }
      if ( data.type ) {
        this.type = CsCoreContactType[ <string> data.type ];
      }

      if ( data.addresses ) {
        data.addresses.forEach ( address => this.addresses.push ( new CsCoreAddress ( address ) ) );
      }
      if ( data.phoneNumbers ) {
        data.phoneNumbers.forEach ( phoneNumber => this.phoneNumbers.push ( new CsCorePhoneNumber ( phoneNumber ) ) );
      }
    }
  }

  getAddressByType ( type: CsCoreAddressType ): CsCoreAddress {
    return _.find ( this.addresses, ( address: CsCoreAddress ) => {
      return address.type === type;
    } );
  }

  getFirstEmailAddress (): string {
    if ( this.emailAddresses.length ) {
      return this.emailAddresses[ 0 ];
    } else {
      return null;
    }
  }

  getPhoneNumberByType ( type: CsCorePhoneNumberType ): CsCorePhoneNumber {
    return _.find ( this.phoneNumbers, ( phoneNumber: CsCorePhoneNumber ) => {
      return phoneNumber.type === type;
    } );
  }
}

export enum CsCoreContactType {
  ACCOUNT_MANAGER         = 'ACCOUNT_MANAGER',
  CONTACT                 = 'CONTACT',
  FRAUD                   = 'FRAUD',
  PRODUCT_ACCOUNT_MANAGER = 'PRODUCT_ACCOUNT_MANAGER',
  UNKNOWN                 = 'UNKNOWN'
}
