import {Component} from '@angular/core';
import {ServeRaiseDisputeWizard} from '../serve-raise-dispute-wizard';
import {FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, flatMap, map, mapTo, switchMap, tap} from 'rxjs/operators';
import {MaplesDisputeTransactionRequest, MaplesIdCodeResponse, MaplesTransaction} from '@cscore/maples-client-model';
import {WizardConfirmationPage} from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-confirmation-page';
import {CustomerService} from 'src/app/core/customer/customer.service';
import {MinionUtilsService} from 'src/app/core/model/minion/minion-utils.service';
import {WizardWidth} from 'src/app/core/wizard/wizard-width.enum';
import {SetSelectionMaplesTransactionsAction} from 'src/app/core/session/action/session-actions';
import {AppState} from 'src/app/app-state';
import {Customer} from 'src/app/core/customer/customer';
import {SessionClassType} from '../../../../session/session-class-type.enum';
import {SessionTypeType} from '../../../../session/session-type-type.enum';
import {SessionService} from '../../../../session/session.service';
import {Session} from '../../../../session/model/session';
import {CaseService} from '../../../../session/case.service';
import {CaseRequest} from '../../../../session/model/case-request';
import {ActionReasonCodeMapping} from '../../../../mapping/action-reason-code-mapping';
import {IdentifierType} from '../../../../session/model/identifier-type.enum';
import {SessionStatusType} from '../../../../session/model/session-status-type.enum';
import {FlatDisputeTransaction} from '../../../vms-actions/models/vms-request-models';
import {MaplesTransactionService} from '../../../../transaction/maples-transaction.service';
import {PlaceholderDictionary} from '../../../../wizard/placeholders/placeholder-dictionary';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'cca-serve-raise-dispute-confirmation-page',
  templateUrl: './serve-raise-dispute-confirmation-page.component.html'
})
export class ServeRaiseDisputeConfirmationPageComponent extends WizardConfirmationPage<ServeRaiseDisputeWizard> {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup({});

  constructor(
    private caseService: CaseService,
    private customerService: CustomerService,
    private minionUtil: MinionUtilsService,
    private sessionService: SessionService,
    private store: Store<AppState>,
    private maplesTransactionService: MaplesTransactionService,
  ) {
    super();
    this.width = WizardWidth.LARGE;
    this.title           = 'Raise Dispute';
    this.navigationTitle = 'Confirm';
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  get customer(): Customer {
    return this.wizard.model.selection.getCustomer();
  }

  onNext(): Observable<any> {
    this.wizard.model.success = true;
    this.wizard.model.isTransactionsDisputed = true;

    return this.raiseCase()
      .pipe(
        switchMap(() => forkJoin(this.raiseDisputes())),
        catchError(() => {
          this.wizard.model.success = false;
          return of(null);
        }),
        map((responses: MaplesIdCodeResponse[]) => {
          for (let response of responses) {
            if (response === null) {
              this.wizard.model.isTransactionsDisputed = false;
            }
          }
          return 'result-page';
        })
      );
  }

  private buildDisputeRequest(transaction: MaplesTransaction): MaplesDisputeTransactionRequest {
    return new MaplesDisputeTransactionRequest({
      reason: this.wizard.model.reason.description,
      amount: Math.abs(transaction.amounts.authorizedAmount.value),
      accountId: this.wizard.model.selection.getCustomerAccount().id,
      currencyCode: '840'
    });
  }

  private buildTransactions(): FlatDisputeTransaction[] {
    if (!this.wizard.model.isLoadDispute) {
      return this.wizard.model.transactions.map(transaction => {
        return new FlatDisputeTransaction({
          transactionId: transaction.id,
          sourceRefNum: transaction.sourceRefNum,
          deliveryChannelCode: null,
          requestCode: transaction.request ? transaction.request.code : null,
          responseCode: transaction.response ? transaction.response.code : null,
          businessDate: transaction.createDate ? transaction.createDate.getAsMilliseconds() : null,
          amount: transaction.amounts.authorizedAmount.value.toString(),
          merchantName: this.maplesTransactionService.getMerchantName(transaction),
          cardNumber:  transaction.identifiers && transaction.identifiers.cardNumber,
        });
      });
    } else {
      return [
        new FlatDisputeTransaction({
          transactionId: '0',
          sourceRefNum: null,
          deliveryChannelCode: null,
          requestCode: null,
          responseCode: null,
          businessDate: null,
          amount: this.wizard.model.loadDisputeAmount,
          merchantName: null,
          cardNumber: null,
        })
      ];
    }
  }

  private buildCaseRequest(): CaseRequest {
    let transactions = this.buildTransactions();

    const identifier = this.wizard.model.selection.getIdentifierByType(IdentifierType.ACCOUNT_ID);

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
        identifier: identifier ? identifier.flatten() : null,
        reasonCode: null,
        externalReasonCode: this.wizard.model.reason.description,
        transactions: transactions
      },
      queueId: this.wizard.model.queue ? this.wizard.model.queue.id : null,
      sessionClass: SessionClassType.CASE,
      sessionType: SessionTypeType.DISPUTE,
      sourceSessionId: this.wizard.model.session.id,
      status: SessionStatusType.ACTIVE
    });
  }

  private raiseCase(): Observable<Session> {
    return this.caseService.raiseOne(this.buildCaseRequest())
      .pipe(
        tap(session => this.wizard.model.returnedSession = this.sessionService.postProcessSession(session)),
      );
  }

  private raiseDisputes(): Observable<MaplesIdCodeResponse>[] {
    let calls: Observable<MaplesIdCodeResponse>[] = [];

    if (!this.wizard.model.isLoadDispute) {
      for (let transaction of this.wizard.model.transactions) {
        calls.push(
          this.maplesTransactionService.createDispute(transaction.id, this.buildDisputeRequest(transaction))
            .pipe(
              catchError(() => of(null))
            )
        );
      }
    } else {
      calls.push(
        this.maplesTransactionService.createDispute('0', new MaplesDisputeTransactionRequest({
            reason: this.wizard.model.reason.description,
            amount: this.wizard.model.loadDisputeAmount,
            accountId: this.wizard.model.selection.getCustomerAccount().id,
            currencyCode: '840'
          }))
          .pipe(
            catchError(() => of(null))
          )
          .pipe(
            switchMap((response: MaplesIdCodeResponse) => {
              console.log(this.wizard.model.returnedSession);
              if (response
                  && this.wizard.model.returnedSession.disputeComponent.transactions
                  && this.wizard.model.returnedSession.disputeComponent.transactions.length === 1) {
                this.wizard.model.returnedSession.disputeComponent.transactions[0].disputeId = response.id;
                return this.sessionService.updateOneDisputeTransaction(this.wizard.model.returnedSession.disputeComponent.transactions[0]);
              } else {
                return of(null);
              }
            })
          )
      );
    }

    return calls;
  }

  private refreshTransactions(): Observable<any> {
    const selection = this.wizard.model.selection;
    return this.maplesTransactionService
      .searchForSelection(selection)
      .pipe(
        catchError(() => of(null)),
        tap((response: MaplesTransaction[]) => {
          if (response !== null) {
            selection.maplesTransactions = response;
            this.store.dispatch(new SetSelectionMaplesTransactionsAction(selection));
          }
        })
      );
  }
}
