import { CsCoreAddress } from "@cscore/core-client-model";

export abstract class GreencardActionRequest {
  protected constructor ( data?: { [ key: string ]: string } ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}

export class ActivateB2bCardRequest extends GreencardActionRequest {
  pin: string;
  serialNumber: string;

  constructor ( data?: { [ key: string ]: string } ) {
    super ( data );
  }
}

export class ActivateGiftCardReplacementRequest extends GreencardActionRequest {
  birthYear: string;
  expDate: string;
  serialNumber: string;

  constructor ( data?: { [ key: string ]: string } ) {
    super ( data );
  }
}

export class AdjustGreencardBalanceRequest extends GreencardActionRequest {
  serialNumber: string;
  reason: string;
  amount: string;
  comment: string;

  constructor ( data?: { [ key: string ]: string } ) {
    super ( data );
  }
}

export class MerchandiseReleaseRequest extends GreencardActionRequest {
  approved: boolean;
  comment: string;
  reason: string;
  serialNumber: string;

  constructor ( data?: { [ key: string ]: string } ) {
    super ( data );
  }
}

export class GiftCardReplacementRequest extends GreencardActionRequest {
  serialNumber: string;
  replacePan: boolean;
  cardHolder: FlatCardHolder;

  constructor ( data?: { [ key: string ]: any } ) {
    super ( data );
  }
}

export class CardHolder {
  address: CsCoreAddress;
  birthYear: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;

  constructor ( data?: { [ key: string ]: any } ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.address ) {
        this.address = new CsCoreAddress ( data.address );
      }
    }
  }

  flatten (): FlatCardHolder {
    return {
      ...this,
      addressLine1: this.address.line1,
      addressLine2: this.address.line2,
      city: this.address.city,
      countryCode: this.address.country,
      postalCode: this.address.postalCode,
      state: this.address.state,
    }
  }
}

export interface FlatCardHolder {
  addressLine1: string;
  addressLine2: string;
  birthYear: string;
  city: string;
  countryCode: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  postalCode: string;
  state: string;
}

export class GreencardReleasePreAuthRequest extends GreencardActionRequest {
  accLogId: string;

  constructor ( data?: { [ key: string ]: string } ) {
    super ( data );
  }
}

export class StatusChangeRequest extends GreencardActionRequest {
  cardStatusCode: number;
  comment: string;
  serialNumber: string;

  constructor ( data ) {
    super ( data );
  }
}

export interface TransferCardRequest {
  parentSerialNumber: string;
  childSerialNumber: string;
  childCardType: string;
  notes: string;
  fees: string;
}
