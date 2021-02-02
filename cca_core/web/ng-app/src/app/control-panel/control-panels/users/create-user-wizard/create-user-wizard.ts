import { AbstractWizard } from "../../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { CreateUserFormPageComponent } from "./create-user-form-page/create-user-form-page.component";
import { User } from "../../../../core/user/user";

export class CreateUserWizard extends AbstractWizard<CreateUserWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'create-user';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new CreateUserWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', CreateUserFormPageComponent );
  }
}

export class CreateUserWizardModel {
  isClone: boolean = false;
  user: User;
  users: User[]    = [];
}
