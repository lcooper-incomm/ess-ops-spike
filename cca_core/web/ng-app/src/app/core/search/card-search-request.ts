import { PlatformType } from "../platform/platform-type.enum";

export class CardSearchRequest {

  identifierType: string;
  identifier: string;
  platform: PlatformType;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.platform ) {
        this.platform = PlatformType[ <string> data.platform ];
      }
    }
  }
}
