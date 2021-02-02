export class VersionAndEnvironmentView {

  environment: string;
  version: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
