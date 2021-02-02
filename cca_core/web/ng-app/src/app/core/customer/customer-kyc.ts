export class CustomerKyc {
  code: string;
  ofacDescription: string;
  ofacStatus: string;
  registrationSource: string;
  status: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
