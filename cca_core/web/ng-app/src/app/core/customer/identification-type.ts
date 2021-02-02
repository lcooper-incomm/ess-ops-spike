import { IdentificationTypeType } from "../form/identification-field/identification-type-type.enum";

export class IdentificationType {
  country: string;
  description: string;
  type: IdentificationTypeType;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.type ) {
        data.type = IdentificationTypeType[ <string>data.type ];
      }
    }
  }
}
