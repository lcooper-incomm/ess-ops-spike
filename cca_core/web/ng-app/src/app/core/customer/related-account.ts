export class RelatedAccount {
  accountNumber: string;
  customerId: string;
  serialNumber: string;
  proxyNumber: string;
  pan: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
