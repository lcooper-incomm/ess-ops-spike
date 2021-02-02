import { User } from "../user/user";
import {CsCoreTimestamp} from "@cscore/core-client-model";
import {Permission} from "./permission";

export class Team {

  id: number;
  createdBy: User;
  createdDate: CsCoreTimestamp;
  description: string;
  displayName: string;
  modifiedBy: User;
  modifiedDate: CsCoreTimestamp;
  systemName: string;
  casePermission: Permission;
  members: User[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.members = [];

      if ( data.createdBy ) {
        this.createdBy = new User ( data.createdBy );
      }
      if (data.createdDate) {
        this.createdDate = new CsCoreTimestamp(data.createdDate);
      }
      if (data.modifiedBy) {
        this.modifiedBy = new User(data.modifiedBy);
      }
      if (data.modifiedDate) {
        this.modifiedDate = new CsCoreTimestamp(data.modifiedDate);
      }
      if (data.casePermission) {
        this.casePermission = new Permission(data.casePermission);
      }
      if (data.members && data.members.length) {
        this.members = data.members.map(member => new User(member));
      }
    }
  }
}
