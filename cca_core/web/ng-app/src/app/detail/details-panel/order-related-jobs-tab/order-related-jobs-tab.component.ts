import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {OrderRelatedJobView} from "../../../core/order/order-related-job-view";
import {FormControl} from "@angular/forms";
import {CcaBaseComponent} from "../../../core/cca-base-component";
import {JobDetailsWizard} from "../job-details-wizard/job-details-wizard";
import {WizardRunner} from "../../../core/wizard/wizard-runner/wizard-runner.service";
import {JobService} from "../../../core/job/job.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app-state";
import {AppStateType} from "../../../app-state-type.enum";
import {SessionState} from "../../../core/session/session-state";
import {Selection} from "../../../core/session/model/selection";

@Component ( {
  selector: 'cca-order-related-jobs-tab',
  templateUrl: './order-related-jobs-tab.component.html',
  styleUrls: [ './order-related-jobs-tab.component.scss' ]
} )
export class OrderRelatedJobsTabComponent extends CcaBaseComponent implements OnInit {

  dataSource: MatTableDataSource<OrderRelatedJobView> = new MatTableDataSource<OrderRelatedJobView>();
  displayedColumns: string[]                          = ['jobId', 'createdDate', 'createdBy', 'targetStatus'];
  filterControl                                       = new FormControl();

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  private selection: Selection<any>;

  constructor ( private minionJobService: JobService,
                private store: Store<AppState>,
                private wizardRunner: WizardRunner ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState();
    this.sort.disableClear          = true;
    this.dataSource.sort            = this.sort;
    this.dataSource.paginator       = this.paginator;
    this.dataSource.filterPredicate = (relatedJob: OrderRelatedJobView, filterValue: string) => {
      if ( filterValue ) {
        filterValue = filterValue.toLowerCase ();
      }
      return (relatedJob.jobId && relatedJob.jobId.toString().indexOf(filterValue) !== -1)
        || (relatedJob.createdDate && relatedJob.createdDate.displayValue.toLowerCase().indexOf(filterValue) !== -1)
        || (relatedJob.createdBy && relatedJob.createdBy.displayName.toLowerCase().indexOf(filterValue) !== -1)
        || (relatedJob.targetStatus && relatedJob.targetStatus.toLowerCase().indexOf(filterValue) !== -1)
    };

    this.dataSource.sortingDataAccessor = ( item, property ) => {
      let sortValue: any;

      switch ( property ) {
        case 'jobId':
          sortValue = item.jobId ? item.jobId : null;
          break;
        case 'createdDate':
          sortValue = item.createdDate ? item.createdDate.value : null;
          break;
        case 'createdBy':
          if ( item.createdBy ) {
            sortValue = item.createdBy.displayName ? item.createdBy.displayName : item.createdBy.username;
            sortValue = sortValue.toLowerCase ();
          }
          break;
        case 'targetStatus':
          sortValue = item.targetStatus ? item.targetStatus.toLowerCase () : null;
          break;
        default:
          sortValue = item[ property ];
          break;
      }
      return sortValue;
    };
  }

  public applyFilter ( filterValue: string ): void {
    this.dataSource.filter = filterValue.trim ().toLowerCase ();
  }

  public openJobDetails(row: OrderRelatedJobView) {
    let wizard                    = new JobDetailsWizard ();
    wizard.model.jobId            = row.jobId;
    this.wizardRunner.run ( wizard );
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE).subscribe((state:SessionState) => {
        if (state) {
          this.selection = state.selection;
          if (this.selection && this.selection.relatedJobs) {
            this.dataSource.data = [...this.selection.relatedJobs];
          }
        }
      })
    )
  }

}
