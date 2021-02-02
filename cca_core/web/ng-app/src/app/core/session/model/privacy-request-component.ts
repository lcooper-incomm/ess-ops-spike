import {CsCoreAddress} from "@cscore/core-client-model";

export class PrivacyRequestComponent {

  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: CsCoreAddress;
  email: string;
  jobTitle: string;
  account: string;
  comment: string;
  productId: number;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }

    if ( data.address ) {
      this.address = new CsCoreAddress ( data.address );
    }
  }

  flatten(): FlatPrivacyRequestComponent {
    let flat: FlatPrivacyRequestComponent = new FlatPrivacyRequestComponent ( {
      ...this,
      city: this.address ? this.address.city : null,
      line1: this.address ? this.address.line1 : null,
      line2: this.address ? this.address.line2 : null,
      postalCode: this.address ? this.address.postalCode : null,
      state: this.address ? this.address.state : null
    } );
    delete flat["address"];
    return flat;
  }
}

/**
 * Flat object for persisting the request.  Squashes the address.
 */
export class FlatPrivacyRequestComponent {

  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  email: string;
  jobTitle: string;
  account: string;
  comment: string;
  productId: number;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}

