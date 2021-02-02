import { AbstractWizard } from "../../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { Permission } from "../../../../core/auth/permission";
import { EditPermissionPageComponent } from "./edit-permission-page/edit-permission-page.component";
import { EditPermissionGroupsPageComponent } from "./edit-permission-groups-page/edit-permission-groups-page.component";
import { EditPermissionRolesPageComponent } from "./edit-permission-roles-page/edit-permission-roles-page.component";

export class EditPermissionWizard extends AbstractWizard<EditPermissionWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'edit-permission';
  startingPageKey: string = 'permission-page';

  constructor () {
    super ();
    this.model = new EditPermissionWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'permission-page', EditPermissionPageComponent );
    pageMap.set ( 'groups-page', EditPermissionGroupsPageComponent );
    pageMap.set ( 'roles-page', EditPermissionRolesPageComponent );
  }
}

export class EditPermissionWizardModel {
  permission: Permission;
}
