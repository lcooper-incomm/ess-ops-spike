export class CardActivationPos {

  locationName: string;
  merchantId: string;
  merchantName: string;
  terminalNumber: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
