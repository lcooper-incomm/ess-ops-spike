import { AbstractWizard } from "../../../../core/wizard/abstract-wizard";
import { Group } from "../../../../core/auth/group";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { CreateGroupFormPageComponent } from "./create-group-form-page/create-group-form-page.component";

export class CreateGroupWizard extends AbstractWizard<CreateGroupWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'create-group';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new CreateGroupWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', CreateGroupFormPageComponent );
  }
}

export class CreateGroupWizardModel {
  isClone: boolean = false;
  group: Group;
  groups: Group[]  = [];
}
