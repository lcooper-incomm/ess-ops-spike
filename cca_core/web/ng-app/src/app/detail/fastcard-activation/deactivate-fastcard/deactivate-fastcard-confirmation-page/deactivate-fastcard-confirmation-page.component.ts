import { Component } from '@angular/core';
import { DeactivateFastcardWizard } from '../deactivate-fastcard-wizard';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, flatMap, tap, mapTo } from 'rxjs/operators';
import { DeactivateFastcardRequest } from '../../aps/aps-request';
import { ApsService } from '../../aps/aps.service';
import { Card } from 'src/app/core/card/card';
import { Selection } from 'src/app/core/session/model/selection';
import { Transactions } from 'src/app/core/transaction/transactions';
import { SetSelectionTransactionsAction } from 'src/app/core/session/action/session-actions';
import { TransactionService } from 'src/app/detail/details-panel/transaction-history-tab/transaction.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';

@Component ( {
  selector: 'cca-deactivate-fastcard-confirmation-page',
  templateUrl: './deactivate-fastcard-confirmation-page.component.html',
  styleUrls: [ './deactivate-fastcard-confirmation-page.component.scss' ]
} )
export class DeactivateFastcardConfirmationPageComponent extends WizardPage<DeactivateFastcardWizard> {
  key: string             = 'confirmation-page';
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor (
    private apsService: ApsService,
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

  get identifierLabel (): string {
    return ApsService.getActivationIdentifierTypeOption ( this.request.identifierType ).displayValue;
  }

  get request (): DeactivateFastcardRequest {
    return this.wizard.model.request;
  }

  ngOnInit (): void {
  }

  onNext (): Observable<string> {
    return this.apsService
      .deactivateCard ( this.request, this.wizard.model.merchantId,this.wizard.model.selection.platform )
      .pipe (
        flatMap ( () => this.handleSuccess () ),
        catchError ( () => this.handleError () ),
      );
  }

  handleSuccess (): Observable<string> {
    this.wizard.model.success = true;
    return this.refreshTransactions ()
      .pipe (
        mapTo ( 'result-page' )
      );
  }

  handleError (): Observable<string> {
    this.wizard.model.success = false;
    return of ( 'result-page' );
  }

  private refreshTransactions () {
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
}
