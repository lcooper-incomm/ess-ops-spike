import { CsCoreAddress } from "@cscore/core-client-model";

export class CustomerComponent {

  id: number;
  address: CsCoreAddress;
  ani: string;
  callbackTime: string;
  contactMethod: string;
  dateOfBirth: string;
  emailAddress: string;
  firstName: string;
  language: string;
  lastName: string;
  phoneNumber: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.address ) {
        this.address = new CsCoreAddress ( data.address );
      }
    }
  }

  flatten (): FlatCustomerComponent {
    return new FlatCustomerComponent ( {
      ...this,
      city: this.address ? this.address.city : null,
      line1: this.address ? this.address.line1 : null,
      line2: this.address ? this.address.line2 : null,
      postalCode: this.address ? this.address.postalCode : null,
      state: this.address ? this.address.state : null
    } );
  }

  getDisplayName (): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export class FlatCustomerComponent {

  id: number;
  ani: string;
  callbackTime: string;
  city: string;
  contactMethod: string;
  dateOfBirth: string;
  emailAddress: string;
  firstName: string;
  language: string;
  lastName: string;
  line1: string;
  line2: string;
  phoneNumber: string;
  postalCode: string;
  state: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
