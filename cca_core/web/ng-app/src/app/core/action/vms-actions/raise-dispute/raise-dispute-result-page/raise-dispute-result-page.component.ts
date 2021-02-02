import {Component, ViewChild} from '@angular/core';
import { WizardResultPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import { RaiseDisputePageType, RaiseDisputeWizard } from '../raise-dispute-wizard';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';
import { ViewSessionWizard } from "../../../../session/view-session-wizard/view-session-wizard";
import { WizardRunner } from "../../../../wizard/wizard-runner/wizard-runner.service";
import {Observable, of} from 'rxjs';
import {RaiseDisputeResponse} from '../../models/vms-response-models';
import {catchError, finalize, switchMap, tap} from 'rxjs/operators';
import {ActionReasonCodeMapping} from '../../../../mapping/action-reason-code-mapping';
import {CustomerService} from '../../../../customer/customer.service';
import {Transaction} from '../../../../transaction/transaction';
import {Transactions} from '../../../../transaction/transactions';
import {SetSelectionTransactionsAction} from '../../../../session/action/session-actions';
import {TaskResponse} from '../../../../model/minion/task-response';
import {MinionUtilsService} from '../../../../model/minion/minion-utils.service';
import {TransactionService} from '../../../../../detail/details-panel/transaction-history-tab/transaction.service';
import {SessionService} from '../../../../session/session.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../app-state';
import {SpinnerComponent} from '../../../../spinner/spinner.component';

/**
 * The create case from the confirm page should always proceed.  If the following calls fails, give the user the option
 * to retry disputing the transactions and sending the form.  This borrows from the similar functions in the confirm
 * page to carry these out.
 */
@Component ( {
  selector: 'cca-raise-dispute-result-page',
  templateUrl: './raise-dispute-result-page.component.html',
  styleUrls: [ './raise-dispute-result-page.component.scss' ]
} )
export class RaiseDisputeResultPageComponent extends WizardResultPage<RaiseDisputeWizard> {
  key: string = RaiseDisputePageType.RESULT;

  @ViewChild('formSpinner') formSpinner: SpinnerComponent;
  @ViewChild('disputeSpinner') disputeSpinner: SpinnerComponent;

  constructor ( private wizardRunner: WizardRunner,
                private customerService: CustomerService,
                private minionUtil: MinionUtilsService,
                private transactionService: TransactionService,
                private store: Store<AppState>,
                private sessionService: SessionService) {
    super ();
    this.width = WizardWidth.LARGE;
  }

  isSuccess (): boolean {
    return this.wizard.model.success;
  }

  openViewSessionDialog (): void {
    let wizard           = new ViewSessionWizard ();
    wizard.model.session = this.wizard.model.returnedSession;
    this.wizardRunner.run ( wizard );
    this.close ().subscribe ();
  }

  /**
   * If the wizard is closed and the form sent is still in a failed state, try setting the new session to active instead
   * of awaiting docs.
   */
  onClose (): Observable<any> {
    if (!this.wizard.model.isFormSent) {
      return this.sessionService.changeStatusAwaitingToActive(this.wizard.model.returnedSession.id);
    } else {
      return of ( null );
    }
  }

  /**
   * Try resending the forms.  Recheck success based on isFormSent and isTransactionsDisputed.
   */
  private sendDisputeDocument(): void {
    this.formSpinner.start();
    const task                   = this.minionUtil.createDisputeTaskFromWizard(this.wizard.model);
    this.wizard.model.isFormSent = false;
    this.addSubscription(this.customerService.sendDisputeDocumentation(task)
      .pipe(
        catchError((error) => of(null))
      )
      .subscribe((response: TaskResponse) => {
        this.wizard.model.isFormSent = !!response;
        this.wizard.model.success = this.wizard.model.isFormSent && this.wizard.model.isTransactionsDisputed;
        this.formSpinner.stop();
      })
    );
  }

  /**
   * Try re-disputing the transactions.  Recheck success based on isFormSent and isTransactionsDisputed.
   */
  private raiseDispute(): void {
    this.disputeSpinner.start();
    this.wizard.model.isTransactionsDisputed = false;
    this.addSubscription(this.customerService
      .raiseDispute(this.wizard.model.selection.getCustomer().id, this.wizard.model.raiseDisputeRequest)
      .pipe(
        catchError((error) => of(null)),
        switchMap((response: RaiseDisputeResponse) => {
          this.wizard.model.isTransactionsDisputed = !!response; // Will be null if it failed
          this.wizard.model.shouldReplaceCard      = !!response && this.wizard.model.reason.code === ActionReasonCodeMapping.UNAUTHORIZED_TRANSACTION;

          return (response !== null) ? this.refreshTransactions() : of(null);
        }),
        finalize(() => {
          this.wizard.model.success = this.wizard.model.isFormSent && this.wizard.model.isTransactionsDisputed;
          this.disputeSpinner.stop();
        })
      )
      .subscribe()
    );
  }

  /**
   * Refresh the transactions in the background if successfully disputed.
   */
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

}
