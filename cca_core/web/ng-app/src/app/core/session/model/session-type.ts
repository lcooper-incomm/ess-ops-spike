import { getSessionTypeDisplayName, SessionTypeType } from "../session-type-type.enum";
import { Permission } from "../../auth/permission";

export class SessionType {

  displayName: string;
  name: string;
  permission: Permission;

  components: string[] = [];
  statuses: string[]   = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.setDisplayName ();

      if ( data.permission ) {
        this.permission = new Permission ( data.permission );
      }
    }
  }

  getType (): SessionTypeType {
    return SessionTypeType[ <string>this.name ];
  }

  private setDisplayName (): void {
    this.displayName = getSessionTypeDisplayName ( this.getType () );
  }
}
