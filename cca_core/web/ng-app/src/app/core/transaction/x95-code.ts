export class X95Code {

  code: string;
  description: string;
  originalType: string;
  type: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
