import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { BulkChangeCardStatusWizard } from "../bulk-change-card-status-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { ReasonCode } from "../../../../core/action/product-action-reason-code";
import { SecurityService } from "../../../../core/security/security.service";
import { Job, JobOwner } from "../../../../core/model/minion/job";
import { User } from "../../../../core/user/user";
import { MinionTaskType, Task } from "../../../../core/model/minion/task/task";
import { FsapiStatusType } from "../../../../core/status/fsapi-status/fsapi-status-type.enum";
import { PlatformType } from "../../../../core/platform/platform-type.enum";
import { Partner } from "../../../../core/session/selection/partner";
import { WizardWidth } from "../../../../core/wizard/wizard-width.enum";

@Component ( {
  selector: 'cca-bulk-change-card-status',
  templateUrl: './bulk-change-card-status.component.html',
  styleUrls: [ './bulk-change-card-status.component.scss' ]
} )
export class BulkChangeCardStatusComponent extends WizardPage<BulkChangeCardStatusWizard> implements OnInit {
  key: string           = 'form-page';
  reasons: ReasonCode[] = [];
  wizardForm: FormGroup = new FormGroup ( {} );

  statuses: any[] = [
    {
      displayName: 'Lost-Stolen',
      value: FsapiStatusType.LOST_STOLEN
    },
    {
      displayName: 'Inactive',
      value: FsapiStatusType.INACTIVE
    },
    {
      displayName: 'Fraud Hold',
      value: FsapiStatusType.FRAUD_HOLD
    }
  ];

  constructor ( private securityService: SecurityService ) {
    super ();
    this.isCloseable    = true;
    this.isNextable     = true;
    this.nextButtonText = 'Next';
    this.width          = WizardWidth.MEDIUM;
  }

  ngOnInit () {
    this.initForms ();
  }

  onNext (): Observable<any> {
    this.wizard.model.targetStatus = this.wizardForm.get ( 'statusSelect' ).value;
    this.wizard.model.request      = this.buildRequest ();
    return of ( 'review-page' );
  }

  private buildRequest (): Job {
    let request = new Job ();

    request.comment   = this.wizardForm.get ( 'comment' ).value;
    request.ipAddress = '172.0.0.0';
    request.name      = 'Bulk Change Status';
    request.owner     = this.buildJobOwner ();
    request.tasks     = this.buildTasks ();

    return request;
  }

  private buildJobOwner (): JobOwner {
    let user: User = this.securityService.getCurrentUser ();
    let jobOwner   = new JobOwner ();

    jobOwner.name         = user.displayName;
    jobOwner.username     = user.username;
    jobOwner.emailAddress = user.email;

    return jobOwner;
  }

  private buildTasks (): Task[] {
    let tasks = [];

    this.wizard.model.cards.forEach ( orderItemCard => {
      let task: Task = this.buildTask ( orderItemCard.serialNumber );
      tasks.push ( task );
    } );
    return tasks;
  }

  private buildTask ( serialNumber: string ): Task {
    let task          = new Task ();
    task.comment      = this.wizardForm.get ( 'comment' ).value;
    task.partner      = Partner.INCOMM;
    task.platform     = PlatformType.VMS;
    task.serialNumber = serialNumber;
    task.targetStatus = this.wizardForm.get ( 'statusSelect' ).value;
    task.taskOrder    = 1;
    task.taskType     = MinionTaskType.CHANGE_STATUS;

    return task;
  }

  private initForms (): void {
    this.wizardForm = new FormGroup ( {
      statusSelect: new FormControl ( '', [ Validators.required ] ),
      comment: new FormControl ( null, [ Validators.required, Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ] )
    } );
  }

}
