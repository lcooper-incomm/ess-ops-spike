import {Component, OnInit} from '@angular/core';
import {WizardPage} from "../../../../core/wizard/wizard-page";
import {CloseCardsOnOrderWizard} from "../close-cards-on-order-wizard";
import {FormGroup} from "@angular/forms";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";

import {OrderService} from "../../../../core/order/order.service";
import {OrderCloseCardRelatedJobView} from "../../../../core/order/order-close-card-related-job-view";
import {WizardWidth} from "../../../../core/wizard/wizard-width.enum";
import {switchTap} from 'src/app/core/utils/rxjs-utils';

@Component ( {
  selector: 'cca-close-cards-on-order-review',
  templateUrl: './close-cards-on-order-review.component.html',
  styleUrls: [ './close-cards-on-order-review.component.scss' ]
} )
export class CloseCardsOnOrderReviewComponent extends WizardPage<CloseCardsOnOrderWizard> implements OnInit {
  key: string           = 'review-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private orderService: OrderService ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
    this.width           = WizardWidth.MEDIUM;
  }

  ngOnInit () {
  }

  onNext (): Observable<string> {
    return this.orderService.changeCardStatus ( this.wizard.model.selection.getOrder ().id, this.wizard.model.request )
      .pipe (
        switchTap ( () => this.reloadCancellationTasks () ),
        catchError ( () => {
          this.wizard.model.isFailed = true;
          return 'confirmation-page';
        } ),
        map((value: OrderCloseCardRelatedJobView) => {
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
      )
  }
}
