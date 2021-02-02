export class FsapiReplaceCardRequest {
  activation: FsapiReplaceCardActivation;
  amount: string;
  cardHolder: FsapiReplaceCardCardHolder;
  comment: string;
  createNewCard: boolean              = false;
  isExpedited: boolean                = false;
  isFeeWaived: boolean                = false;
  loadAmountType: FsapiLoadAmountType = FsapiLoadAmountType.CURRENT_BALANCE;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.activation ) {
        this.activation = new FsapiReplaceCardActivation ( data.activation );
      }
      if ( data.cardHolder ) {
        this.cardHolder = new FsapiReplaceCardCardHolder ( data.cardHolder );
      }
      if ( data.loadAmountType ) {
        this.loadAmountType = FsapiLoadAmountType[ <string>data.loadAmountType ];
      }
    }
  }
}

export class FsapiReplaceCardCardHolder {
  addressLine1: string;
  addressLine2: string;
  birthYear: string;
  city: string;
  countryCode: string;
  firstName: string;
  lastName: string;
  phone: string;
  postalCode: string;
  state: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}

export class FsapiReplaceCardActivation {
  activationCode: string;
  isMerchantBillable: boolean = false;
  merchantName: string;
  terminalNumber: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}

export enum FsapiLoadAmountType {
  INITIAL_LOAD_AMOUNT = 'INITIAL_LOAD_AMOUNT',
  CURRENT_BALANCE     = 'CURRENT_BALANCE',
  OTHER_AMOUNT        = 'OTHER_AMOUNT'
}
