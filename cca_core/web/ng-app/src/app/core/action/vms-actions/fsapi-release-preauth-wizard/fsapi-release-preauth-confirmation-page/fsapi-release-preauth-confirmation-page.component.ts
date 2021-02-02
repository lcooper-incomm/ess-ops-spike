import { Component } from '@angular/core';
import { FsapiReleasePreauthWizard } from '../fsapi-release-preauth-wizard';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { catchError, mapTo, switchMap, tap } from 'rxjs/operators';
import { VmsReleasePreauthRequest } from '../../models/vms-request-models';
import { CsCoreCodeType } from '@cscore/core-client-model';
import { TransactionService } from 'src/app/detail/details-panel/transaction-history-tab/transaction.service';
import { Selection } from 'src/app/core/session/model/selection';
import { Customer } from 'src/app/core/customer/customer';
import { Transactions } from 'src/app/core/transaction/transactions';
import { SetSelectionTransactionsAction } from 'src/app/core/session/action/session-actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';

@Component ( {
  selector: 'cca-fsapi-release-preauth-confirmation-page',
  templateUrl: './fsapi-release-preauth-confirmation-page.component.html',
  styleUrls: [ './fsapi-release-preauth-confirmation-page.component.scss' ]
} )
export class FsapiReleasePreauthConfirmationPageComponent extends WizardPage<FsapiReleasePreauthWizard> {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor (
    private customerService: CustomerService,
    private transactionService: TransactionService,
    private store: Store<AppState>
  ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
  }

  onNext (): Observable<string> {
    this.wizard.model.success = true;
    return this.customerService
      .releasePreauth ( this.wizard.model.selection.getCustomer ().id, this.wizard.model.selection.platform, this.buildRequest () )
      .pipe (
        switchMap ( () => this.refreshTransactions () ),
        catchError ( () => {
          this.wizard.model.success = false;
          return of ( null );
        } ),
        mapTo ( 'result-page' ),
      )
  }

  private buildRequest (): VmsReleasePreauthRequest {
    return {
      comment: this.wizard.model.comment,
      deliveryChannel: this.wizard.model.transaction.getCodeByType ( CsCoreCodeType.DELIVERY_CHANNEL ).code,
      reason: this.wizard.model.reason.reasonCode,
      requestCode: this.wizard.model.transaction.request.code,
      responseCode: this.wizard.model.transaction.response.code,
      transactionDate: this.wizard.model.transaction.businessDate.getAsMilliseconds (),
      transactionId: this.wizard.model.transaction.id,
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
