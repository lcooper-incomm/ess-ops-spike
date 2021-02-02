import {Component, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, finalize, switchMap, tap} from 'rxjs/operators';
import {MaplesIdCodeResponse} from '@cscore/maples-client-model';
import {WizardResultPage} from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import {ServeRaiseDisputeWizard} from '../serve-raise-dispute-wizard';
import {WizardWidth} from 'src/app/core/wizard/wizard-width.enum';
import {ViewSessionWizard} from '../../../../session/view-session-wizard/view-session-wizard';
import {WizardRunner} from '../../../../wizard/wizard-runner/wizard-runner.service';
import {ActionReasonCodeMapping} from '../../../../mapping/action-reason-code-mapping';
import {Transactions} from '../../../../transaction/transactions';
import {SetSelectionTransactionsAction} from '../../../../session/action/session-actions';
import {MinionUtilsService} from '../../../../model/minion/minion-utils.service';
import {SessionService} from '../../../../session/session.service';
import {AppState} from '../../../../../app-state';
import {SpinnerComponent} from '../../../../spinner/spinner.component';
import {MaplesTransactionService} from '../../../../transaction/maples-transaction.service';
import {PlaceholderDictionary} from '../../../../wizard/placeholders/placeholder-dictionary';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * The create case from the confirm page should always proceed.  If the following calls fails, give the user the option
 * to retry disputing the transactions and sending the form.  This borrows from the similar functions in the confirm
 * page to carry these out.
 */
@Component({
  selector: 'cca-serve-raise-dispute-result-page',
  templateUrl: './serve-raise-dispute-result-page.component.html'
})
export class ServeRaiseDisputeResultPageComponent extends WizardResultPage<ServeRaiseDisputeWizard> {
  key: string = 'result-page';

  @ViewChild('formSpinner') formSpinner: SpinnerComponent;
  @ViewChild('disputeSpinner') disputeSpinner: SpinnerComponent;

  constructor(private wizardRunner: WizardRunner) {
    super();
    this.width = WizardWidth.LARGE;
    this.title           = 'Raise Dispute';
    this.navigationTitle = 'Result';
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  isSuccess(): boolean {
    return this.wizard.model.success;
  }

  openViewSessionDialog(): void {
    let wizard           = new ViewSessionWizard();
    wizard.model.session = this.wizard.model.returnedSession;
    this.wizardRunner.run(wizard);
    this.close().subscribe();
  }
}
