import {Permission} from '../../auth/permission';
import {SessionTypeType} from '../session-type-type.enum';
import {WrapUpCodeCategory} from './wrap-up-code-category';
import {SelectionType} from './selection-type.enum';

export class SessionQueue {

  id: number;
  autoWrapTime: number;
  categories: WrapUpCodeCategory[];
  defaultNote: string;
  displayName: string;
  i3Name: string;
  isActive: boolean           = false;
  isAutoCloseEnabled: boolean = false;
  isLocked: boolean           = false;
  locale: string;
  permission: Permission;
  roboHelpId: number;
  sessionTypes: SessionTypeType[];
  systemName: string;
  type: SelectionType;

  constructor(data: any) {
    if (data) {
      Object.assign(this, data);
      this.categories   = [];
      this.sessionTypes = [];

      if (data.categories) {
        data.categories.forEach(category => this.categories.push(new WrapUpCodeCategory(category)));
      }
      if (data.permission) {
        this.permission = new Permission(data.permission);
      }
      if (data.sessionTypes) {
        data.sessionTypes.forEach(type => this.sessionTypes.push(SessionTypeType[<string>type]));
      }
      if (data.type) {
        this.type = SelectionType[<string>data.type];
      }
    }
  }
}
