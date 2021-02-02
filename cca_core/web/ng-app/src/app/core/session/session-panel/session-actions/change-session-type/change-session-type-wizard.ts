import { AbstractWizard } from "../../../../wizard/abstract-wizard";
import { Session } from "../../../model/session";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../wizard/wizard-page";
import { ChangeSessionTypeFormPageComponent } from "./change-session-type-form-page/change-session-type-form-page.component";
import { ChangeSessionTypeConfirmPageComponent } from "./change-session-type-confirm-page/change-session-type-confirm-page.component";
import { ChangeSessionTypeSuccessPageComponent } from "./change-session-type-success-page/change-session-type-success-page.component";
import { ChangeSessionTypeFailurePageComponent } from "./change-session-type-failure-page/change-session-type-failure-page.component";
import { SessionClass } from "../../../model/session-class";
import { SessionType } from "../../../model/session-type";

export class ChangeSessionTypeWizard extends AbstractWizard<ChangeSessionTypeWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'change-session-type';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model = new ChangeSessionTypeWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      currentSessionClass: this.model.session.sessionClassType,
      currentSessionType: this.model.session.sessionTypeType,
      selectedSessionClass: formValue.sessionClass ? formValue.sessionClass.name : null,
      selectedSessionType: formValue.sessionType ? formValue.sessionType.name : null
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', ChangeSessionTypeFormPageComponent );
    pageMap.set ( 'confirm-page', ChangeSessionTypeConfirmPageComponent );
    pageMap.set ( 'success-page', ChangeSessionTypeSuccessPageComponent );
    pageMap.set ( 'failure-page', ChangeSessionTypeFailurePageComponent );
  }
}

export class ChangeSessionTypeWizardModel {
  removedComponentsAlert: string;
  selectedSessionClass: SessionClass;
  selectedSessionType: SessionType;
  session: Session;
}
