import { Injectable } from '@angular/core';
import { MinionJobStatusType } from "../model/minion/minion-job-status";
import { Job } from "../model/minion/job";
import { CsCoreTimestamp } from "@cscore/core-client-model";
import { MinionTaskStatusType } from '../model/minion/task/minion-task-status';

@Injectable ( {
  providedIn: 'root'
} )
export class JobUtilityService {

  constructor () {
  }

  public getQueuedDate ( statuses ): CsCoreTimestamp {
    const queuedDate = statuses.find ( status => status.type === MinionJobStatusType.SCHEDULED );
    return queuedDate.createdDate ? queuedDate.createdDate : null;
  }

  public getStartedDate ( statuses ): CsCoreTimestamp {
    const startedDate = statuses.find ( status => status.type === MinionJobStatusType.ACTIVE );
    return startedDate.createdDate ? startedDate.createdDate : null;
  }

  public getDoneDate ( statuses ): CsCoreTimestamp {
    const doneDate = statuses.find ( status => status.type === MinionJobStatusType.COMPLETED );
    return doneDate.createdDate ? doneDate.createdDate : null
  }

  public getTaskCounts ( job: Job ): Job {

    let failedResults = job.tasks.filter ( result => {
      return result.status.type === MinionTaskStatusType.ERROR;
    } );

    let completedResults = job.tasks.filter ( result => {
      return result.status.type === MinionTaskStatusType.DONE;
    } );

    job.completeCount   = completedResults.length ? completedResults.length : 0;
    job.completePercent = (job.completeCount / job.tasks.length) * 100;

    job.failedCount   = failedResults.length ? failedResults.length : 0;
    job.failedPercent = (job.failedCount / job.tasks.length) * 100;

    job.pendingCount   = job.tasks.length - (job.failedCount + job.completeCount);
    job.pendingPercent = (job.pendingCount / job.tasks.length) * 100;

    return job;
  }

  public export ( jobId ) {
    window.open ( '/rest/job/' + jobId + '/export' );
  }
}
