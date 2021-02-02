import {Component} from '@angular/core';
import {RaiseDisputePageType, RaiseDisputeWizard} from '../raise-dispute-wizard';
import {FormGroup} from '@angular/forms';
import {WizardConfirmationPage} from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-confirmation-page';
import {forkJoin, Observable, of} from 'rxjs';
import {CustomerService} from 'src/app/core/customer/customer.service';
import {catchError, flatMap, mapTo, switchMap, tap} from 'rxjs/operators';
import {FlatDisputeTransaction, RaiseDisputeRequest} from '../../models/vms-request-models';
import {CsCoreCodeType} from '@cscore/core-client-model';
import {MinionUtilsService} from 'src/app/core/model/minion/minion-utils.service';
import {TaskResponse} from 'src/app/core/model/minion/task-response';
import {WizardWidth} from 'src/app/core/wizard/wizard-width.enum';
import {DeliveryMethodCode} from 'src/app/core/model/minion/task/delivery-method';
import {SetSelectionTransactionsAction} from 'src/app/core/session/action/session-actions';
import {Transactions} from 'src/app/core/transaction/transactions';
import {TransactionService} from 'src/app/detail/details-panel/transaction-history-tab/transaction.service';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/app-state';
import {Customer} from 'src/app/core/customer/customer';
import {SessionClassType} from "../../../../session/session-class-type.enum";
import {SessionTypeType} from "../../../../session/session-type-type.enum";
import {SessionService} from "../../../../session/session.service";
import {Session} from "../../../../session/model/session";
import {CaseService} from "../../../../session/case.service";
import {CaseRequest} from "../../../../session/model/case-request";
import {ActionReasonCodeMapping} from "../../../../mapping/action-reason-code-mapping";
import {IdentifierType} from "../../../../session/model/identifier-type.enum";
import {Transaction} from 'src/app/core/transaction/transaction';
import {RaiseDisputeResponse} from '../../models/vms-response-models';
import {SessionStatusType} from "../../../../session/model/session-status-type.enum";

@Component({
  selector: 'cca-raise-dispute-confirmation-page',
  templateUrl: './raise-dispute-confirmation-page.component.html',
  styleUrls: ['./raise-dispute-confirmation-page.component.scss']
})
export class RaiseDisputeConfirmationPageComponent extends WizardConfirmationPage<RaiseDisputeWizard> {
  key: string           = RaiseDisputePageType.CONFIRMATION;
  wizardForm: FormGroup = new FormGroup({});

  readonly DeliveryMethod = DeliveryMethodCode;

  constructor(
    private caseService: CaseService,
    private customerService: CustomerService,
    private minionUtil: MinionUtilsService,
    private sessionService: SessionService,
    private store: Store<AppState>,
    private transactionService: TransactionService,
  ) {
    super();
    this.width = WizardWidth.LARGE;
  }

  get customer(): Customer {
    return this.wizard.model.selection.getCustomer();
  }

  onNext(): Observable<any> {
    this.wizard.model.success = true;

    return this.raiseCase()
      .pipe(
        // Only raise dispute for transaction if the card is not a Greencard
        flatMap(() => this.wizard.model.isGreenCard ? this.sendDocumentAndRefresh() : this.raiseDisputeAndSendDocuments()),
        catchError(() => {
          this.wizard.model.success = false;
          return of(null);
        }),
        mapTo(RaiseDisputePageType.RESULT),
      );
  }

  private buildDisputeRequest(): RaiseDisputeRequest {
    return {
      deliveryMethod: this.wizard.model.deliveryMethod.code,
      comment: this.wizard.model.comment,
      reasonCode: this.wizard.model.reason,
      transactions: this.buildTransactions(),
    };
  }

  private buildTransactions(): FlatDisputeTransaction[] {

    return this.wizard.model.transactions.map(transaction => {
      return new FlatDisputeTransaction({
        transactionId: transaction.id,
        deliveryChannelCode: transaction.getCodeByType(CsCoreCodeType.DELIVERY_CHANNEL).code,
        requestCode: transaction.request.code,
        responseCode: transaction.response.code,
        businessDate: transaction.businessDate ? transaction.businessDate.getAsMilliseconds() : null,
        amount: transaction.amounts.authorizedAmount.value.toString(),
        merchantName: transaction.nodes.merchant && transaction.nodes.merchant.name,
        cardNumber: transaction.identifiers.pan,
      });
    });
  }

  private buildGCTransactions(): FlatDisputeTransaction[] {

    return this.wizard.model.transactions.map(transaction => {
      return new FlatDisputeTransaction({
        transactionId: transaction.id,
        deliveryChannelCode: transaction.getCodeByType(CsCoreCodeType.CURRENCY).code,
        request: transaction.getRequestDisplayValue(),
        requestCode: transaction.request.code,
        response: transaction.getResponseDisplayValue(),
        responseCode: transaction.response.code,
        businessDate: transaction.createDate ? transaction.createDate.getAsMilliseconds() : null,
        amount: transaction.amounts.authorizedAmount.value.toString(),
        merchantName: transaction.nodes.merchant && transaction.nodes.merchant.name,
        cardNumber: transaction.identifiers.pan,
      });
    });
  }

  private buildCaseRequest(): CaseRequest {
    let transactions;
    if (this.wizard.model.isGreenCard) {
      transactions = this.buildGCTransactions();
    } else {
      transactions = this.buildTransactions();
    }

    const identifier = this.wizard.model.selection.getIdentifierByType(IdentifierType.CUSTOMERID);

    return new CaseRequest({
      comment: this.wizard.model.comment,
      customerComponent: {
        dateOfBirth: this.wizard.model.dateOfBirth,
        firstName: this.wizard.model.firstName,
        lastName: this.wizard.model.lastName,
        city: this.wizard.model.address ? this.wizard.model.address.city : null,
        line1: this.wizard.model.address ? this.wizard.model.address.line1 : null,
        line2: this.wizard.model.address ? this.wizard.model.address.line2 : null,
        postalCode: this.wizard.model.address ? this.wizard.model.address.postalCode : null,
        state: this.wizard.model.address ? this.wizard.model.address.state : null,
        emailAddress: this.wizard.model.email ? this.wizard.model.email : null,
        phoneNumber: this.wizard.model.phoneNumber ? this.wizard.model.phoneNumber.number : null
      },
      disputeComponent: {
        comment: this.wizard.model.comment,
        deliveryMethod: this.wizard.model.deliveryMethod.code,
        identifier: identifier ? identifier.flatten() : null,
        reasonCode: this.wizard.model.reason,
        probingQuestions: this.wizard.model.probingQuestions,
        transactions: transactions
      },
      queueId: this.wizard.model.queue ? this.wizard.model.queue.id : null,
      sessionClass: SessionClassType.CASE,
      sessionType: SessionTypeType.DISPUTE,
      sourceSessionId: this.wizard.model.session.id,
      status: this.wizard.model.isGreenCard ? SessionStatusType.AWAITING_DOCS : SessionStatusType.ACTIVE
    });
  }

  private raiseCase(): Observable<Session> {
    return this.caseService.raiseOne(this.buildCaseRequest())
      .pipe(
        tap(session => this.wizard.model.returnedSession = this.sessionService.postProcessSession(session)),
      );
  }

  private raiseDispute(): Observable<RaiseDisputeResponse> {
    this.wizard.model.raiseDisputeRequest = this.buildDisputeRequest();

    this.wizard.model.isTransactionsDisputed = false;
    return this.customerService
      .raiseDispute(this.wizard.model.selection.getCustomer().id, this.wizard.model.raiseDisputeRequest)
      .pipe(
        catchError(((err, caught) => of(null))),
        tap((response: RaiseDisputeResponse) => {
          this.wizard.model.isTransactionsDisputed = !!response; // Will be null if it failed
          this.wizard.model.shouldReplaceCard      = !!response && this.wizard.model.reason.code === ActionReasonCodeMapping.UNAUTHORIZED_TRANSACTION;
        })
      );
  }

  private raiseDisputeAndSendDocuments(): Observable<any> {
    return forkJoin([
      this.raiseDispute(),
      this.sendDisputeDocument().pipe(switchMap(() => {
        return this.refreshTransactions();
      }))
    ]);
  }

  private refreshTransactions(): Observable<any> {
    const selection = this.wizard.model.selection;
    return this.transactionService
      .searchForSelection(selection)
      .pipe(
        catchError(() => of(null)),
        tap((response: Transactions) => {
          if (response !== null) {
            selection.transactions = response;
            this.store.dispatch(new SetSelectionTransactionsAction(selection));
          }
        })
      );
  }

  private sendDisputeDocument(): Observable<TaskResponse> {
    const task                   = this.minionUtil.createDisputeTaskFromWizard(this.wizard.model);
    this.wizard.model.isFormSent = false;
    return this.customerService.sendDisputeDocumentation(task)
      .pipe(tap((response: TaskResponse) => this.wizard.model.isFormSent = true));
  }

  private sendDocumentAndRefresh(): Observable<any> {
    this.wizard.model.isTransactionsDisputed = true; // Indicate this step successful automatically for GreenCard
    return this.sendDisputeDocument()
      .pipe(
        switchMap(() => {
          return this.refreshTransactions();
        })
      );
  }
}
