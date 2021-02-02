export class Occupation {

  name: string;
  type: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
