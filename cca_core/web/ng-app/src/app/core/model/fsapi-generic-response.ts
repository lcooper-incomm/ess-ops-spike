export class FsapiGenericResponse {

  newPan: string;
  responseCode: string;
  responseMessage: string;


  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
