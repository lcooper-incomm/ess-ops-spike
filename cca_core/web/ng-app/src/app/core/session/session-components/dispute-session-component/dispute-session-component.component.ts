import {Component, Input, OnInit} from '@angular/core';
import {DisputeComponent} from "../../model/dispute-component";
import {DisputeTransaction} from "../../../action/vms-actions/models/vms-request-models";
import {WizardRunner} from "../../../wizard/wizard-runner/wizard-runner.service";
import {ProbingQuestionsWizard} from "../probing-questions-wizard/probing-questions-wizard";
import {CustomerAccountService} from '../../../customer-account/customer-account.service';

@Component({
  selector: 'cca-dispute-session-component',
  templateUrl: './dispute-session-component.component.html',
  styleUrls: ['./dispute-session-component.component.scss']
})
export class DisputeSessionComponentComponent implements OnInit {

  @Input()
  disputeComponent: DisputeComponent;

  transactions: DisputeTransaction[];

  constructor(private customerAccountService: CustomerAccountService,
              private wizardRunner: WizardRunner) {
  }

  ngOnInit() {
    this.transactions = this.disputeComponent.transactions;
  }

  openProbingQuestionsWizard(): void {
    if (this.disputeComponent && this.disputeComponent.probingQuestions && this.disputeComponent.probingQuestions.length > 0) {
      let wizard: ProbingQuestionsWizard = new ProbingQuestionsWizard();
      wizard.model.probingQuestions      = this.disputeComponent.probingQuestions;
      this.wizardRunner.run(wizard);
    }
  }
}
