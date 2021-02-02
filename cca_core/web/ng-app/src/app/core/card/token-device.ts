export class TokenDevice {

  id: string;
  ipAddress: string;
  language: string;
  location: string;
  name: string;
  number: string;
  type: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }

  get simpleType (): string | null {
    if ( this.type ) {
      const actualType = this.type.toLowerCase ();
      if ( actualType.indexOf ( 'mobile phone' ) !== -1 ) {
        return TokenDeviceTypes.PHONE;
      } else if ( actualType.indexOf ( 'tablet' ) !== -1 ) {
        return TokenDeviceTypes.TABLET;
      } else if ( actualType.indexOf ( 'watch' ) !== -1 ) {
        return TokenDeviceTypes.WATCH;
      } else {
        return TokenDeviceTypes.UNKNOWN;
      }
    } else {
      return null;
    }
  }
}

export enum TokenDeviceTypes {
  PHONE   = 'PHONE',
  TABLET  = 'TABLET',
  WATCH   = 'WATCH',
  UNKNOWN = 'UNKNOWN',
}
