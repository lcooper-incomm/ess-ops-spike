import { PlatformType } from "../platform/platform-type.enum";

export class CsCoreStatus {

  description: string;
  name: string;
  platform: PlatformType;
  type: CsCoreStatusType;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.platform ) {
        this.platform = PlatformType[ <string>data.platform ];
      }
      if ( data.type ) {
        this.type = CsCoreStatusType[ <string>data.type ];
      }
    }
  }
}

export enum CsCoreStatusType {
  PLATFORM = 'PLATFORM',
  SHIPPING = 'SHIPPING'
}
