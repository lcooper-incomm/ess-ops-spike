import { User } from "../user/user";
import { CsCoreTimestamp } from "@cscore/core-client-model";
import { Permission } from "./permission";
import { Role } from "./role";

export class Group {

  id: number;
  createdBy: User;
  createdDate: CsCoreTimestamp;
  description: string;
  displayName: string;
  isActive: boolean = false;
  isLocked: boolean = false;
  modifiedBy: User;
  modifiedDate: CsCoreTimestamp;
  systemName: string;

  owners: User[]            = [];
  permissions: Permission[] = [];
  roles: Role[]             = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.owners      = [];
      this.permissions = [];
      this.roles       = [];

      if ( data.createdBy ) {
        this.createdBy = new User ( data.createdBy );
      }
      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
      if ( data.modifiedBy ) {
        this.modifiedBy = new User ( data.modifiedBy );
      }
      if ( data.modifiedDate ) {
        this.modifiedDate = new CsCoreTimestamp ( data.modifiedDate );
      }

      if ( data.owners && data.owners.length ) {
        data.owners.forEach ( owner => this.owners.push ( new User ( owner ) ) );
      }
      if ( data.permissions && data.permissions.length ) {
        data.permissions.forEach ( permission => this.permissions.push ( new Permission ( permission ) ) );
      }
      if ( data.roles && data.roles.length ) {
        data.roles.forEach ( role => this.roles.push ( new Role ( role ) ) );
      }
    }
  }
}
