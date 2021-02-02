import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../wizard/wizard-page";
import { LogComplaintPageType, LogComplaintWizard } from "../log-complaint-wizard";
import { FormGroup } from "@angular/forms";
import { WizardWidth } from "../../../../../wizard/wizard-width.enum";
import { BankType } from "../../../../../complaint/bank";
import { Observable, of } from "rxjs";
import { CaseService } from "../../../../case.service";
import { CaseRequest } from "../../../../model/case-request";
import { SessionTypeType } from "../../../../session-type-type.enum";
import { QueueService } from "../../../../../queue/queue.service";
import { catchError, flatMap, map } from "rxjs/operators";
import { SessionQueue } from "../../../../model/session-queue";
import { WrapUpCodeCategory } from "../../../../model/wrap-up-code-category";
import { Session } from "../../../../model/session";
import * as _ from "lodash";
import { WrapUpCodeCategoryService } from "../../../../../wrap-up-code-category/wrap-up-code-category.service";
import { SessionService } from "../../../../session.service";
import { getPriorityDisplayValue } from "../../../../model/complaint-priority";

@Component ( {
  selector: 'cca-log-complaint-confirmation-page',
  templateUrl: './log-complaint-confirmation-page.component.html',
  styleUrls: [ './log-complaint-confirmation-page.component.scss' ]
} )
export class LogComplaintConfirmationPageComponent extends WizardPage<LogComplaintWizard> implements OnInit {

  BankType              = BankType;
  key: string           = LogComplaintPageType.CONFIRMATION;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private caseService: CaseService,
                private categoryService: WrapUpCodeCategoryService,
                private queueService: QueueService,
                private sessionService: SessionService ) {
    super ();
    this.isBackable      = true;
    this.backButtonText  = 'No';
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
    this.isNextable      = true;
    this.nextButtonText  = 'Yes';
    this.width           = WizardWidth.MEDIUM_LARGE;
  }

  ngOnInit () {
  }

  isBankType(...bankTypes: BankType[]): boolean {
    return this.wizard.model.bank && bankTypes.includes(this.wizard.model.bank.systemValue);
  }

  onLoad (): Observable<any> {
    return this.loadQueues ()
      .pipe ( flatMap ( () => this.loadWrapUpInformation () ) );
  }

  onNext (): Observable<string> {
    let request                = new CaseRequest ();
    request.sessionType        = SessionTypeType.COMPLAINT;
    request.sourceSessionId    = this.wizard.model.session.id;
    request.comment            = 'See Complaint Component for details.';
    request.queueId            = this.wizard.model.queue ? this.wizard.model.queue.id : null;
    request.wrapUpCategoryId   = this.wizard.model.category ? this.wizard.model.category.id : null;
    request.wrapUpCodeId       = this.wizard.model.code ? this.wizard.model.code.id : null;
    request.wrapUpCode         = this.wizard.model.code ? this.wizard.model.code : null;
    request.complaintComponent = this.wizard.model.complaintComponent;

    this.wizard.model.isFailed = false;

    return this.caseService.raiseOne ( request )
      .pipe (
        catchError ( ( err, caught ) => {
          this.wizard.model.isFailed = true;
          return of ( LogComplaintPageType.RESULTS );
        } ),
        map ( ( raisedCase: Session ) => {
          raisedCase                   = this.sessionService.postProcessSession ( raisedCase );
          raisedCase.wrapUpCode        = request.wrapUpCode;
          this.wizard.model.raisedCase = raisedCase;
          return LogComplaintPageType.RESULTS;
        } )
      );
  }

  get priority(): string {
    return getPriorityDisplayValue(this.wizard.model.complaintComponent.priority);
  }

  private loadQueues (): Observable<any> {
    if ( this.wizard.model.queues.length ) {
      return of ( null );
    } else {
      return this.queueService.findAllBySessionType ( SessionTypeType.COMPLAINT )
        .pipe ( map ( ( queues: SessionQueue[] ) => {
          this.wizard.model.queues = queues;
        } ) );
    }
  }

  private loadWrapUpInformation (): Observable<any> {
    let queueName = this.getSelectedQueueName ();

    let queue = _.find ( this.wizard.model.queues, ( queue: SessionQueue ) => {
      return queue.systemName === queueName;
    } );

    if ( queue ) {
      return this.queueService.findOne ( queue.id )
        .pipe ( flatMap ( ( queue: SessionQueue ) => {
          this.wizard.model.queue = queue;

          if ( this.wizard.model.queue && this.wizard.model.queue.categories.length === 1 ) {
            let category = this.wizard.model.queue.categories[ 0 ];
            return this.categoryService.findOne ( category.id )
              .pipe ( map ( ( category: WrapUpCodeCategory ) => {
                this.wizard.model.category = category;

                if ( this.wizard.model.category && this.wizard.model.category.wrapUpCodes.length === 1 ) {
                  this.wizard.model.code = this.wizard.model.category.wrapUpCodes[ 0 ];
                }
              } ) );
          }

        } ) );
    } else {
      return of ( null );
    }
  }

  private getSelectedQueueName (): string {
    let queueName: string;

    switch ( this.wizard.model.bank.systemValue ) {
      case BankType.AMERICAN_EXPRESS:
        queueName = 'COMPLAINT_AMERICAN_EXPRESS';
        break;
      case BankType.BANCORP:
        queueName = 'COMPLAINT_BANCORP';
        break;
      case BankType.MASTERCARD:
        queueName = 'COMPLAINT_MASTERCARD';
        break;
      case BankType.METABANK:
        queueName = 'COMPLAINT_METABANK';
        break;
      default:
        break;
    }

    return queueName;
  }
}
