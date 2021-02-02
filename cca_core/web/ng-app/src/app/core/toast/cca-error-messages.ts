export class CcaErrorMessages {

  messages: string[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
