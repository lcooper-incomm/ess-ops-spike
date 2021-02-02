import {Type} from "@angular/core";
import {AbstractWizard} from "../../../wizard/abstract-wizard";
import {WizardPage} from "../../../wizard/wizard-page";
import {ProbingQuestionsPageComponent} from "./probing-questions-page/probing-questions-page.component";
import {DisputeProbingQuestion} from "../../../action/vms-actions/raise-dispute/dispute-probing-question";

export class ProbingQuestionsWizard extends AbstractWizard<ProbingQuestionsWizardModel> {
  displayStepper: boolean = false;
  key: string             = 'dispute-probing-questions';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.model     = new ProbingQuestionsWizardModel();
    this.doRefresh = true;
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key,
    }
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', ProbingQuestionsPageComponent);
  }
}

export class ProbingQuestionsWizardModel {
  probingQuestions: DisputeProbingQuestion[];
}
