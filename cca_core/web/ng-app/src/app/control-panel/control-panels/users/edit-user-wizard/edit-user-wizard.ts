import { User } from "../../../../core/user/user";
import { AbstractWizard } from "../../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { EditUserPageComponent } from "./edit-user-page/edit-user-page.component";
import { EditUserOwnerPageComponent } from "./edit-user-owner-page/edit-user-owner-page.component";
import { EditUserRolePageComponent } from "./edit-user-role-page/edit-user-role-page.component";

export class EditUserWizard extends AbstractWizard<EditRoleWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'edit-user';
  startingPageKey: string = 'user-page';

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
    pageMap.set ( 'user-page', EditUserPageComponent );
    pageMap.set ( 'owners-page', EditUserOwnerPageComponent );
    pageMap.set ( 'roles-page', EditUserRolePageComponent );
  }
}

export class EditRoleWizardModel {
  user: User;
}
