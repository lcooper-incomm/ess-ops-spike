import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-state';
import { Card } from 'src/app/core/card/card';
import { Selection } from 'src/app/core/session/model/selection';
import { SetSelectionTransactionsAction } from 'src/app/core/session/action/session-actions';
import { Transactions } from 'src/app/core/transaction/transactions';
import { TransactionService } from 'src/app/detail/details-panel/transaction-history-tab/transaction.service';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { GreencardReleasePreAuthWizard } from '../greencard-release-preauth-wizard';

@Component ( {
  selector: 'cca-greencard-release-preauth-result-page',
  templateUrl: './greencard-release-preauth-result-page.component.html',
  styleUrls: [ './greencard-release-preauth-result-page.component.scss' ],
} )
export class GreencardReleasePreauthResultPageComponent extends WizardPage<GreencardReleasePreAuthWizard> {
  key: string           = 'result-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  message: string;

  constructor ( private transactionService: TransactionService, private store: Store<AppState> ) {
    super ();
    this.isCloseable = true;
  }

  onClose (): Observable<any> {
    const selection: Selection<Card> = this.wizard.model.selection;
    return this.transactionService
      .searchForSelection ( selection )
      .pipe (
        tap ( ( response: Transactions ) => {
          selection.transactions = response;
          this.store.dispatch ( new SetSelectionTransactionsAction ( selection ) );
        } )
      );
  }

  onLoad (): Observable<any> {
    this.isFailed   = !this.wizard.model.success;
    this.isBackable = !this.wizard.model.success;
    this.message    = this.wizard.model.success ? 'Pre-Auth released successfully!' : 'We encountered an error while attempting to release the Pre-Auth. Please wait a few moments and try again. If the problem persists, contact an administrator.';
    this.wizardForm.updateValueAndValidity ();
    return of ( null );
  }
}
