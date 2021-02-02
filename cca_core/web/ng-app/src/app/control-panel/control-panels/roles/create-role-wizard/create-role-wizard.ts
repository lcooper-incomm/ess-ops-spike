import { AbstractWizard } from "../../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { Role } from "../../../../core/auth/role";
import { CreateRoleFormPageComponent } from "./create-role-form-page/create-role-form-page.component";

export class CreateRoleWizard extends AbstractWizard<CreateRoleWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'create-role';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new CreateRoleWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', CreateRoleFormPageComponent );
  }
}

export class CreateRoleWizardModel {
  isClone: boolean = false;
  role: Role;
  roles: Role[]    = [];
}
