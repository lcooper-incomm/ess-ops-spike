import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { ReportTransactionFraudWizard } from '../report-transaction-fraud-wizard';
import { FormGroup } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { TransactionService } from 'src/app/detail/details-panel/transaction-history-tab/transaction.service';
import { AppState } from 'src/app/app-state';
import { Store } from '@ngrx/store';
import { UpdateTransactionRequest } from '../../models/vms-request-models';
import { Transaction } from 'src/app/core/transaction/transaction';
import { CsCoreCodeType } from '@cscore/core-client-model';
import { FsapiGenericResponse } from 'src/app/core/model/fsapi-generic-response';
import { catchError, mapTo, switchMap, tap } from 'rxjs/operators';
import { Selection } from 'src/app/core/session/model/selection';
import { Customer } from 'src/app/core/customer/customer';
import { Transactions } from 'src/app/core/transaction/transactions';
import { SetSelectionTransactionsAction } from 'src/app/core/session/action/session-actions';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';

@Component ( {
  selector: 'cca-report-transaction-fraud-confirmation-page',
  templateUrl: './report-transaction-fraud-confirmation-page.component.html',
  styleUrls: [ './report-transaction-fraud-confirmation-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class ReportTransactionFraudConfirmationPageComponent extends WizardPage<ReportTransactionFraudWizard> {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor (
    private customerService: CustomerService,
    private transactionService: TransactionService,
    private store: Store<AppState>
  ) {
    super ();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'No';
    this.nextButtonText  = 'Yes';
    this.width           = WizardWidth.LARGE;
  }

  onNext (): Observable<string> {
    this.wizard.model.success = true;
    const updates             = this.transactions.map ( this.buildRequest.bind ( this ) );
    return forkJoin ( updates )
      .pipe (
        switchMap ( () => this.refreshTransactions () ),
        catchError ( () => {
          this.wizard.model.success = false;
          return of ( null );
        } ),
        mapTo ( 'result-page' ),
      );
  }

  get transactions (): Transaction[] {
    return this.wizard.model.transactions.filter ( transaction => !transaction.flags.isFraudulent );
  }

  private buildRequest ( transaction: Transaction ): Observable<FsapiGenericResponse> {
    const data: UpdateTransactionRequest = {
      comment: 'Reported as Fraudulent in CCA',
      transaction: {
        transactionId: transaction.id,
        deliveryChannelCode: transaction.getCodeByType ( CsCoreCodeType.DELIVERY_CHANNEL ).code,
        requestCode: transaction.request.code,
        responseCode: transaction.response.code,
        isFraudulent: true,
        date: transaction.businessDate.getAsMilliseconds (),
      }
    };
    return this.customerService.updateTransaction ( this.wizard.model.selection.getCustomer ().id, data );
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
