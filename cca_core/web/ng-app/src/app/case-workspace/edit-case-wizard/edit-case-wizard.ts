import { AbstractWizard } from "../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../core/wizard/wizard-page";
import { Session } from "../../core/session/model/session";
import { EditCaseWizardComponent } from "./form-page/edit-case-wizard.component";
import { EditCaseReviewComponent } from "./review-page/edit-case-review.component";
import { EditCaseConfirmationComponent } from "./confirmation-page/edit-case-confirmation.component";
import { Team } from "../../core/auth/team";
import { EditCaseRequest } from "./edit-case-request";
import { User } from "../../core/user/user";

export class EditCaseWizard extends AbstractWizard<EditCaseWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'edit-case';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new EditCaseWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', EditCaseWizardComponent );
    pageMap.set ( 'review-page', EditCaseReviewComponent );
    pageMap.set ( 'confirmation-page', EditCaseConfirmationComponent );
  }
}

export class EditCaseWizardModel {
  assignedTeam: Team = null;
  assignedUser: User = null;
  isFailed: boolean;
  request: EditCaseRequest;
  session: Session;
  teams: Team[];
}
