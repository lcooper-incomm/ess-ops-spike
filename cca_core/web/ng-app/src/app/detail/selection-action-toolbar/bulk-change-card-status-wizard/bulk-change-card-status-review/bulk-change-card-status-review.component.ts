import { Component } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { BulkChangeCardStatusWizard } from "../bulk-change-card-status-wizard";
import { FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { JobService } from "../../../../core/job/job.service";
import { OrderService } from "../../../../core/order/order.service";
import { switchTap } from "../../../../core/utils/rxjs-utils";
import { WizardWidth } from "../../../../core/wizard/wizard-width.enum";

@Component ( {
  selector: 'cca-bulk-change-card-status-review',
  templateUrl: './bulk-change-card-status-review.component.html',
  styleUrls: [ './bulk-change-card-status-review.component.scss' ]
} )
export class BulkChangeCardStatusReviewComponent extends WizardPage<BulkChangeCardStatusWizard> {
  key: string           = 'review-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private jobService: JobService,
                private orderService: OrderService ) {
    super ();
    this.isCloseable     = true;
    this.isBackable      = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
    this.backButtonText  = 'No';
    this.width           = WizardWidth.MEDIUM;
  }

  onNext (): Observable<any> {
    return this.jobService.bulkChangeStatus ( this.wizard.model.request, this.wizard.model.selection.getOrder ().id )
      .pipe (
        switchTap ( () => this.reloadCancellationTasks () ),
        catchError ( () => {
          this.wizard.model.isFailed = true;
          return 'confirmation-page';
        } ),
        map ( ( value ) => {
          this.wizard.model.jobId = value.jobId;
          return 'confirmation-page';
        } )
      );
  }

  private reloadCancellationTasks (): Observable<void> {
    return this.orderService.loadCancellationTasks ( this.wizard.model.selection )
      .pipe (
        catchError ( () => {
          return of ( null );
        } )
      );
  }
}
