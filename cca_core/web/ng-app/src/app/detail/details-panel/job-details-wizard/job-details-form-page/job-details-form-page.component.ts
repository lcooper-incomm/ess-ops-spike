import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { JobDetailsWizard } from "../job-details-wizard";
import { FormGroup } from "@angular/forms";
import { Job } from "../../../../core/model/minion/job";
import { JobService } from "../../../../core/job/job.service";
import * as _ from "lodash";
import { WizardWidth } from "../../../../core/wizard/wizard-width.enum";
import { JobUtilityService } from "../../../../core/job/job-utility.service";
import { CsCoreTimestamp } from "@cscore/core-client-model";

@Component ( {
  selector: 'cca-job-details-form-page',
  templateUrl: './job-details-form-page.component.html',
  styleUrls: [ './job-details-form-page.component.scss' ]
} )
export class JobDetailsFormPageComponent extends WizardPage<JobDetailsWizard> implements OnInit {
  doneDate: CsCoreTimestamp;
  queuedDate: CsCoreTimestamp;
  startedDate: CsCoreTimestamp;
  job: Job;
  key: string           = 'form-page';
  requester: string;
  showHistory: boolean  = true;
  status: string;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private jobUtilityService: JobUtilityService,
                private jobService: JobService ) {
    super ();
    this.closeButtonText = 'Close';
    this.isBackable      = false;
    this.isCloseable     = true;
    this.isNextable      = false;
    this.width           = WizardWidth.MEDIUM;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    }
  }

  ngOnInit () {
    this.findOneById ()
  }

  findOneById () {
    this.jobService.findOneById ( this.wizard.model.jobId )
      .subscribe ( ( job: Job ) => {
        this.job       = _.cloneDeep ( job );
        this.requester = this.job.owner.username;
        this.getDates ( this.job.statusHistory );
        this.getTaskCounts ( this.job );
      } );
  }

  getDates ( statuses ) {
    this.queuedDate  = this.jobUtilityService.getQueuedDate ( statuses );
    this.startedDate = this.jobUtilityService.getStartedDate ( statuses );
    this.doneDate    = this.jobUtilityService.getDoneDate ( statuses );
  }

  private getTaskCounts ( job ) {
    if ( this.job.tasks.length ) {
      this.job = this.jobUtilityService.getTaskCounts ( job );
    }
  }

  public onTimerComplete ( $event ) {
    this.findOneById ()
  }

}
