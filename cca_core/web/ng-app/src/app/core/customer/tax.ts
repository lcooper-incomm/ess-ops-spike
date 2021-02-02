export class Tax {

  isTaxResidentofCanada: boolean = false;
  noTaxIdReasonCode: string;
  noTaxIdReasonDescription: string;
  payerId: string;
  taxJurisdictionResidence: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
