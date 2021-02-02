import { AbstractWizard } from "../../../../core/wizard/abstract-wizard";
import { Group } from "../../../../core/auth/group";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { EditGroupPageComponent } from "./edit-group-page/edit-group-page.component";
import { EditGroupOwnersPageComponent } from "./edit-group-owners-page/edit-group-owners-page.component";
import { EditGroupRolesPageComponent } from "./edit-group-roles-page/edit-group-roles-page.component";
import { EditGroupPermissionsPageComponent } from "./edit-group-permissions-page/edit-group-permissions-page.component";

export class EditGroupWizard extends AbstractWizard<EditGroupWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'edit-group';
  startingPageKey: string = 'group-page';

  constructor () {
    super ();
    this.model = new EditGroupWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'group-page', EditGroupPageComponent );
    pageMap.set ( 'owners-page', EditGroupOwnersPageComponent );
    pageMap.set ( 'roles-page', EditGroupRolesPageComponent );
    pageMap.set ( 'permissions-page', EditGroupPermissionsPageComponent );
  }
}

export class EditGroupWizardModel {
  group: Group;
}
