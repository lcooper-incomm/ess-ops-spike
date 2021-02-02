import { Component } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { FsapiReverseFeeWizard } from '../fsapi-reverse-fee-wizard';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { TransactionService } from 'src/app/detail/details-panel/transaction-history-tab/transaction.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { VmsReverseFeeRequest } from '../../models/vms-request-models';
import { CsCoreCodeType } from '@cscore/core-client-model';
import { catchError, mapTo, switchMap, tap } from 'rxjs/operators';
import { Selection } from 'src/app/core/session/model/selection';
import { Customer } from 'src/app/core/customer/customer';
import { Transactions } from 'src/app/core/transaction/transactions';
import { SetSelectionTransactionsAction } from 'src/app/core/session/action/session-actions';
import { Transaction } from 'src/app/core/transaction/transaction';

@Component ( {
  selector: 'cca-fsapi-reverse-fee-confirmation-page',
  templateUrl: './fsapi-reverse-fee-confirmation-page.component.html',
  styleUrls: [ './fsapi-reverse-fee-confirmation-page.component.scss' ]
} )
export class FsapiReverseFeeConfirmationPageComponent extends WizardPage<FsapiReverseFeeWizard> {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor (
    private customerService: CustomerService,
    private transactionService: TransactionService,
    private store: Store<AppState>,
  ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
  }

  get transaction (): Transaction {
    return this.wizard.model.transaction;
  }

  onNext (): Observable<any> {
    this.wizard.model.success = true;
    return this.customerService
      .reverseFee ( this.wizard.model.selection.getCustomer ().id, this.buildRequest () )
      .pipe (
        switchMap ( () => this.refreshTransactions () ),
        catchError ( () => {
          this.wizard.model.success = false;
          return of ( null );
        } ),
        mapTo ( 'result-page' )
      )
  }

  private buildRequest (): VmsReverseFeeRequest {
    return {
      comment: this.wizard.model.comment,
      reason: this.wizard.model.reason.reasonCode,
      transaction: {
        transactionId: this.wizard.model.transaction.id,
        deliveryChannelCode: this.wizard.model.transaction.getCodeByType ( CsCoreCodeType.DELIVERY_CHANNEL ).code,
        requestCode: this.wizard.model.transaction.request.code,
        responseCode: this.wizard.model.transaction.response.code,
        date: this.wizard.model.transaction.businessDate.getAsMilliseconds (),
      }
    }
  }

  private refreshTransactions (): Observable<any> {
    const selection: Selection<Customer> = this.wizard.model.selection;
    return this.transactionService
      .searchForSelection ( selection )
      .pipe (
        tap ( ( response: Transactions ) => {
          selection.transactions = response;
          this.store.dispatch ( new SetSelectionTransactionsAction ( selection ) );
        } ),
        catchError ( () => of ( null ) ),
      );
  }
}
