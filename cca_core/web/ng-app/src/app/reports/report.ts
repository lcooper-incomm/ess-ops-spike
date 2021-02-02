import {Permission} from '../core/auth/permission';

export class Report {

  id: number;
  isActive: boolean = false;
  status: boolean;
  link: string;
  name: string;
  permission: Permission;
  snippet: string;

  constructor(data: any = null) {
    if (data) {
      Object.assign(this, data);

      if (data.isActive) {
        this.status = data.isActive;
      }

      if (data.permission) {
        this.permission = new Permission(data.permission);
      }
    }
  }
}
