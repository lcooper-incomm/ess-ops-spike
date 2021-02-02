import {IdentifierType} from "./identifier-type.enum";
import {PlatformType} from "../../platform/platform-type.enum";

export class Identifier {

  id: number;
  partner: string;
  platform: PlatformType;
  type: IdentifierType;
  value: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.platform ) {
        this.platform = PlatformType[ <string> data.platform ];
      }
      if ( data.type ) {
        this.type = IdentifierType[ <string> data.type ];
      }
    }
  }

  flatten (): FlatIdentifier {
    return new FlatIdentifier ( {
      id: this.id,
      identifierType: this.type,
      partner: this.partner,
      platform: this.platform,
      value: this.value
    } );
  }
}

export class FlatIdentifier {

  id: number;
  identifierType: string;
  partner: string;
  platform: string;
  value: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}

export class IdentifierRequest {

  identifierType: IdentifierType;
  value: string;
  platform: PlatformType;
  comments: [{ content: string }];

  constructor(data: any = null) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
