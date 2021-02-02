export class AccountIdentifiers {

  accountNumber: string;
  upc: string;
  van16: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
