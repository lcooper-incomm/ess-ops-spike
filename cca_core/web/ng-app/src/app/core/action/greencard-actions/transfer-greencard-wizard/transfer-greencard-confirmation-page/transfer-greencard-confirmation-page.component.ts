import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { Observable, of } from 'rxjs';
import { TransferGreencardWizard } from '../transfer-greencard-wizard';
import { TransferCardRequest } from '../../greencard-action-service/greencard-action-request-models';
import { GreencardActionService } from '../../greencard-action-service/greencard-action.service';
import { catchError, tap, switchMap, mapTo } from 'rxjs/operators';
import { Selection } from 'src/app/core/session/model/selection';
import { SetSelectionTransactionsAction } from 'src/app/core/session/action/session-actions';
import { Transactions } from 'src/app/core/transaction/transactions';
import { TransactionService } from 'src/app/detail/details-panel/transaction-history-tab/transaction.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { Card } from 'src/app/core/card/card';

@Component ( {
  selector: 'cca-transfer-greencard-confirmation-page',
  templateUrl: './transfer-greencard-confirmation-page.component.html',
  styleUrls: [ './transfer-greencard-confirmation-page.component.scss' ],
} )
export class TransferGreencardConfirmationPageComponent extends WizardPage<TransferGreencardWizard> {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor (
    private actionService: GreencardActionService,
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

  onNext (): Observable<string> {
    this.wizard.model.success = true;
    return this.actionService
      .transferCard ( this.buildRequest () )
      .pipe (
        switchMap ( () => this.refreshTransactions () ),
        catchError ( () => {
          this.wizard.model.success = false;
          return of ( null );
        } ),
        mapTo ( 'result-page' ),
      )
  }

  get oldSerialNumber (): string {
    const card = this.wizard.model.selection.getCard ();
    return card && card.identifiers.serialNumber;
  }

  get newSerialNumber (): string {
    return this.wizard.model.newSerialNumber;
  }

  get comment (): string {
    return this.wizard.model.comment;
  }

  private buildRequest (): TransferCardRequest {
    return {
      parentSerialNumber: this.oldSerialNumber,
      childSerialNumber: this.newSerialNumber,
      childCardType: 'P',
      notes: this.comment,
      fees: '0',
    };
  }

  private refreshTransactions (): Observable<any> {
    const selection: Selection<Card> = this.wizard.model.selection;
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
