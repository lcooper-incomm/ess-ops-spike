import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Job, JobQueueResponse} from "../../../core/model/minion/job";
import {SecurityService} from "../../../core/security/security.service";
import {JobUtilityService} from "../../../core/job/job-utility.service";
import {CcaBaseComponent} from "../../../core/cca-base-component";
import {OrderRelatedJobView} from "../../../core/order/order-related-job-view";
import {JobDetailsWizard} from "../../../detail/details-panel/job-details-wizard/job-details-wizard";
import {WizardRunner} from "../../../core/wizard/wizard-runner/wizard-runner.service";
import {JobService} from "../../../core/job/job.service";
import {SpinnerComponent} from "../../../core/spinner/spinner.component";
import {finalize} from "rxjs/operators";
import {SpinnerSize} from "../../../core/spinner/spinner-size.enum";

@Component ( {
  selector: 'cca-job-queue',
  templateUrl: './job-queue.component.html',
  styleUrls: [ './job-queue.component.scss' ]
} )
export class JobQueueComponent extends CcaBaseComponent implements OnInit {
  dataSource: MatTableDataSource<Job> = new MatTableDataSource<Job> ();
  displayedColumns: string[]          = [ 'id', 'name', 'requester', 'queuedDate', 'startedDate', 'status' ];
  jobQueue: JobQueueResponse;
  showAll: boolean                    = false;
  SpinnerSize                         = SpinnerSize;

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( 'resultsSpinner' )
  resultsSpinner: SpinnerComponent;

  constructor ( private jobUtilityService: JobUtilityService,
                private jobService: JobService,
                private securityService: SecurityService,
                private wizardRunner: WizardRunner ) {
    super ();
  }

  ngOnInit () {
    this.initDataSource ();
    this.findAll ();

  }

  private findAll ( page: number = 0 ): void {
    this.resultsSpinner.start ();
    let username;
    if ( !this.showAll ) {
      username = this.securityService.getCurrentUser ().username;
    } else {
      username = null
    }
    this.jobService.findAll ( username, page )
      .pipe (
        finalize ( () => {
          this.resultsSpinner.stop ();
        } )
      )
      .subscribe ( ( jobQueue: JobQueueResponse ) => {
        this.jobQueue         = jobQueue;
        this.dataSource.data  = jobQueue.content;
        this.paginator.length = jobQueue.totalElements;
        this.getDates ( jobQueue.content );
      } )
  }

  private getDates ( jobs ) {
    jobs.forEach ( job => {
      job.queuedDate  = job.statusHistory ? this.jobUtilityService.getQueuedDate ( job.statusHistory ) : null;
      job.startedDate = job.statusHistory ? this.jobUtilityService.getStartedDate ( job.statusHistory ) : null;
    } )
  }

  private initDataSource (): void {
    //Listen for page changes so we can fetch the specified page
    this.addSubscription (
      this.paginator.page.subscribe ( ( event: any ) => {
        this.findAll ( event.pageIndex );
      } )
    );
  }

  public onTimerComplete ( $event ) {
    this.findAll ( this.paginator.pageIndex );
  }

  public openJobDetail(row: OrderRelatedJobView) {
    let wizard         = new JobDetailsWizard ();
    wizard.model.jobId = row.id;
    this.wizardRunner.run ( wizard );
  }

  public toggleShowAll () {
    this.showAll = !this.showAll;
    this.findAll ()
  }
}



