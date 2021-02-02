import { IdentifierType } from "../session/model/identifier-type.enum";
import { PlatformType } from "../platform/platform-type.enum";
import { CsCoreTimestamp } from "@cscore/core-client-model";

export class AuditCardReplacementActivity {

  id: number;
  identifier: string;
  identifierType: IdentifierType;
  lastReplacedDate: CsCoreTimestamp;
  platform: PlatformType;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.identifierType ) {
        this.identifierType = IdentifierType[ <string>data.identifierType ];
      }
      if ( data.platform ) {
        this.platform = PlatformType[ <string>data.platform ];
      }
      if ( data.lastReplacedDate ) {
        this.lastReplacedDate = new CsCoreTimestamp ( data.lastReplacedDate );
      }
    }
  }
}
