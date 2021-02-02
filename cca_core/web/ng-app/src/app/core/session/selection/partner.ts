import { Permission } from "../../auth/permission";
import { PlatformType } from "../../platform/platform-type.enum";

export class Partner {

  public static readonly INCOMM = 'INCOMM';
  public static readonly GLOBAL = 'GLOBAL';

  id: number;
  ivrDnis: string;
  name: string;
  permission: Permission;
  platform: PlatformType;
  type: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.permission ) {
        this.permission = new Permission ( data.permission );
      }
      if ( data.platform ) {
        this.platform = PlatformType[ <string>data.platform ];
      }
    }
  }
}
