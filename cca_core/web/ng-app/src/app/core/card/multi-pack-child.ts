export class MultiPackChild {

  pan: string;
  serialNumber: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
