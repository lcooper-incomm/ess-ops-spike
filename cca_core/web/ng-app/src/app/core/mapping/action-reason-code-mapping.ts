import { PlatformType } from "../platform/platform-type.enum";

export class ActionReasonCodeMapping {

  public static readonly UNAUTHORIZED_TRANSACTION = 'UNAUTHORIZED_TRANSACTION';

  id: number;
  code: string;
  displayValue: string;
  isActive: boolean = false;
  platform: PlatformType;
  platformCode: string;
  type: ActionReasonCodeMappingType;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.platform ) {
        this.platform = PlatformType[ <string>data.platform ];
      }
      if ( data.type ) {
        this.type = ActionReasonCodeMappingType[ <string>data.type ];
      }
    }
  }
}

export enum ActionReasonCodeMappingType {
  RAISE_DISPUTE = 'RAISE_DISPUTE'
}
