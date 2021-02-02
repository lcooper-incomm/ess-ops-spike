import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {WizardPage} from "../../../../wizard/wizard-page";
import {ProbingQuestionsWizard} from "../probing-questions-wizard";

@Component({
  selector: 'cca-probing-questions-page',
  templateUrl: './probing-questions-page.component.html',
  styleUrls: ['./probing-questions-page.component.scss']
})
export class ProbingQuestionsPageComponent extends WizardPage<ProbingQuestionsWizard> {
  key: string = 'form-page';
  wizardForm: FormGroup = new FormGroup({});
  isCloseable: boolean = true;
}
