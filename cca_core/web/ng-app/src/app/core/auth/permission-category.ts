import { User } from "../user/user";
import { CsCoreTimestamp } from "@cscore/core-client-model";
import { Permission } from "./permission";

export class PermissionCategory {

  id: number;
  createdBy: User;
  createdDate: CsCoreTimestamp;
  description: string;
  displayName: string;
  locked: boolean = false;
  modifiedBy: User;
  modifiedDate: CsCoreTimestamp;
  systemName: string;

  permissions: Permission[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.permissions = [];

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
      if ( data.permissions ) {
        data.permissions.forEach ( permission => this.permissions.push ( new Permission ( permission ) ) );
      }
    }
  }
}
