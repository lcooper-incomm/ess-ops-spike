import { CsCoreTimestamp } from "@cscore/core-client-model";
import { User } from "../user/user";
import { Group } from "./group";
import { RoleMembershipType } from "../constant/role-membership-type.enum";
import { Permission } from "./permission";

export class Role {

  id: number;
  createdBy: User;
  createdDate: CsCoreTimestamp;
  description: string;
  displayName: string;
  group: Group;
  isActive: boolean = false;
  isLocked: boolean = false;
  membershipType: RoleMembershipType;
  modifiedBy: User;
  modifiedDate: CsCoreTimestamp;
  systemName: string;

  admins: User[]            = [];
  members: User[]           = [];
  permissions: Permission[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.admins      = [];
      this.members     = [];
      this.permissions = [];

      if ( data.createdBy ) {
        this.createdBy = new User ( data.createdBy );
      }
      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
      if ( data.membershipType ) {
        this.membershipType = RoleMembershipType[ <string> data.membershipType ];
      }
      if ( data.modifiedBy ) {
        this.modifiedBy = new User ( data.modifiedBy );
      }
      if ( data.modifiedDate ) {
        this.modifiedDate = new CsCoreTimestamp ( data.modifiedDate );
      }

      if ( data.admins && data.admins.length ) {
        data.admins.forEach ( admin => this.admins.push ( new User ( admin ) ) );
      }
      if ( data.members && data.members.length ) {
        data.members.forEach ( member => this.members.push ( new User ( member ) ) );
      }
      if ( data.permissions && data.permissions.length ) {
        data.permissions.forEach ( permission => this.permissions.push ( new Permission ( permission ) ) );
      }
    }
  }
}
