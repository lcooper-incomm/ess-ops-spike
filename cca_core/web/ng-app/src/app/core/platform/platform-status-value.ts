import { PlatformType } from "./platform-type.enum";

export class PlatformStatusValue {

  id: number;
  name: string;
  platform: PlatformType;
  value: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.platform ) {
        this.platform = PlatformType[ <string>data.platform ];
      }
    }
  }
}
