import { Component } from '@angular/core';
import { ActivateFastcardWizard } from '../activate-fastcard-wizard';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';
import { ApsService } from '../../aps/aps.service';
import { ActivateFastcardRequest } from '../../aps/aps-request';
import { TransactionService } from "../../../details-panel/transaction-history-tab/transaction.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app-state";
import { Transactions } from "../../../../core/transaction/transactions";
import { SetSelectionTransactionsAction } from "../../../../core/session/action/session-actions";
import {SecurityService} from "../../../../core/security/security.service";

@Component ( {
  selector: 'cca-activate-fastcard-confirmation-page',
  templateUrl: './activate-fastcard-confirmation-page.component.html',
  styleUrls: [ './activate-fastcard-confirmation-page.component.scss' ]
} )
export class ActivateFastcardConfirmationPageComponent extends WizardPage<ActivateFastcardWizard> {
  isBackable: boolean     = true;
  isCloseable: boolean    = true;
  isNextable: boolean     = true;
  closeButtonText: string = 'Cancel';
  nextButtonText: string  = 'Submit';
  key: string             = 'confirmation-page';
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor ( private apsService: ApsService,
                private store: Store<AppState>,
                private transactionService: TransactionService,
                private securityService: SecurityService) {
    super ();
  }

  get identifierLabel (): string {
    return ApsService.getActivationIdentifierTypeOption ( this.request.identifierType ).displayValue;
  }

  get request (): ActivateFastcardRequest {
    return this.wizard.model.request;
  }

  ngOnInit (): void {
  }

  onNext (): Observable<string> {
    return this.apsService
      .activateCard ( this.request, this.wizard.model.merchantId,this.securityService.getCurrentUser().prefDefaultDataSource )
      .pipe (
        flatMap ( () => this.handleSuccess () ),
        catchError ( () => this.handleError () ),
      );
  }

  handleSuccess (): Observable<string> {
    this.wizard.model.successMessage = 'Card activated successfully!';
    return this.transactionService.searchForSelection ( this.wizard.model.selection )
      .pipe ( map ( ( transactions: Transactions ) => {
        this.wizard.model.selection.transactions = transactions;
        this.store.dispatch ( new SetSelectionTransactionsAction ( this.wizard.model.selection ) );
        return 'success-page';
      } ) );
  }

  handleError (): Observable<string> {
    this.wizard.model.failureMessage = 'Card could not be activated. Please try again. If the problem persists, contact customer support.';
    return of ( 'failure-page' );
  }
}
