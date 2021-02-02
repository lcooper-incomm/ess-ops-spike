export class LocationMerchant {

  id: string;
  controlNumber: string;
  name: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
