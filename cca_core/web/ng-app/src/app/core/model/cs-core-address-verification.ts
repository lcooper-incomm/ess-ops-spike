export class CsCoreAddressVerification {

  avsIndicator: boolean = false;
  postalCode: string;
  responseCode: string;
  responseDescription: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
