import { Component, OnInit } from '@angular/core';
import { LogComplaintPageType, LogComplaintWizard } from "../log-complaint-wizard";
import { FormGroup } from "@angular/forms";
import { WizardResultPage } from "../../../../../wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";
import { ViewSessionWizard } from "../../../../view-session-wizard/view-session-wizard";
import { WizardRunner } from "../../../../../wizard/wizard-runner/wizard-runner.service";
import {WizardWidth} from '../../../../../wizard/wizard-width.enum';

@Component ( {
  selector: 'cca-log-complaint-results-page',
  templateUrl: './log-complaint-results-page.component.html',
  styleUrls: [ './log-complaint-results-page.component.scss' ]
} )
export class LogComplaintResultsPageComponent extends WizardResultPage<LogComplaintWizard> implements OnInit {

  key: string           = LogComplaintPageType.RESULTS;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private wizardRunner: WizardRunner ) {
    super ();
    this.width           = WizardWidth.MEDIUM_LARGE;
  }

  ngOnInit () {
  }

  isSuccess (): boolean {
    return !this.wizard.model.isFailed;
  }

  openViewSession (): void {
    let wizard           = new ViewSessionWizard ();
    wizard.model.session = this.wizard.model.raisedCase;
    this.wizardRunner.run ( wizard );
    this.doClose();
  }

  doClose(): void {
    this.addSubscription(
      this.close().subscribe()
    );
  }
}
