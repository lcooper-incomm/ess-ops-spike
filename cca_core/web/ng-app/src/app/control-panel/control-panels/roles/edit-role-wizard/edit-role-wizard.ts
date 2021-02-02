import { AbstractWizard } from "../../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { Role } from "../../../../core/auth/role";
import { EditRolePageComponent } from "./edit-role-page/edit-role-page.component";
import { EditRoleMembersPageComponent } from "./edit-role-members-page/edit-role-members-page.component";
import { EditRolePermissionsPageComponent } from "./edit-role-permissions-page/edit-role-permissions-page.component";
import { EditRoleAdministratorsPageComponent } from "./edit-role-administrators-page/edit-role-administrators-page.component";

export class EditRoleWizard extends AbstractWizard<EditRoleWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'edit-role';
  startingPageKey: string = 'role-page';

  constructor () {
    super ();
    this.model = new EditRoleWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'role-page', EditRolePageComponent );
    pageMap.set ( 'administrators-page', EditRoleAdministratorsPageComponent );
    pageMap.set ( 'members-page', EditRoleMembersPageComponent );
    pageMap.set ( 'permissions-page', EditRolePermissionsPageComponent );
  }
}

export class EditRoleWizardModel {
  role: Role;
  dataSource: Role[];
}
