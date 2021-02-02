import { AbstractWizard } from "../../wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../wizard/wizard-page";
import { SessionClassType } from "../session-class-type.enum";
import { SessionTypeType } from "../session-type-type.enum";
import { CreateSessionFormPageComponent } from "./create-session-form-page/create-session-form-page.component";

export class CreateSessionWizard extends AbstractWizard<CreateSessionWizardModel> {

  displayStepper: boolean = false;
  key: string             = 'create-session';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new CreateSessionWizardModel ();
  }

  buildCodexRequest (): any {
    return {
      'wizard-key': this.key,
      sessionClass: this.model.sessionClass,
      sessionType: this.model.sessionType
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', CreateSessionFormPageComponent );
  }

}

export class CreateSessionWizardModel {
  sessionClass: SessionClassType;
  sessionType: SessionTypeType;
}
