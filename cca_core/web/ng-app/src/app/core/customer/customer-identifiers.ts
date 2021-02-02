export class CustomerIdentifiers {

  accountNumber: string;
  onlineUserId: string;
  proxyNumber: string;
  replacementCardBin: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
