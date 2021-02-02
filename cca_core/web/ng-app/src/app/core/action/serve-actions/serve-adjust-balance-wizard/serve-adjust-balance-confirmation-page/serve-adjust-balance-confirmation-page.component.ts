import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, map, mapTo, switchMap, tap} from 'rxjs/operators';
import {CsCoreCurrency, CsCoreCurrencyUtil} from '@cscore/gringotts';
import {MaplesAccount, MaplesAccountAdjustBalanceRequest, MaplesAccountCode, MaplesPlatform, MaplesTransaction} from '@cscore/maples-client-model';
import {WizardPage} from '../../../../wizard/wizard-page';
import {ServeAdjustBalanceWizard} from '../serve-adjust-balance-wizard';
import {WizardWidth} from '../../../../wizard/wizard-width.enum';
import {BalanceAdjustmentService} from '../../../../balance-adjustment/balance-adjustment.service';
import {Selection} from '../../../../session/model/selection';
import {Customer} from '../../../../customer/customer';
import {SetSelectionMaplesTransactionsAction} from '../../../../session/action/session-actions';
import {AppState} from '../../../../../app-state';
import {MaplesTransactionService} from '../../../../transaction/maples-transaction.service';
import {AuditService} from '../../../../audit/audit.service';
import {IdentifierService} from '../../../../identifier/identifier.service';
import {IdentifierRequest} from '../../../../session/model/identifier';
import {PlatformType} from '../../../../platform/platform-type.enum';
import {CustomerAccountService} from '../../../../customer-account/customer-account.service';

@Component({
  selector: 'cca-serve-adjust-balance-confirmation-page',
  templateUrl: './serve-adjust-balance-confirmation-page.component.html',
  styleUrls: ['./serve-adjust-balance-confirmation-page.component.scss']
})
export class ServeAdjustBalanceConfirmationPageComponent extends WizardPage<ServeAdjustBalanceWizard>  {
  key: string             = 'confirmation-page';
  wizardForm: FormGroup   = new FormGroup ( {} );
  isBackable: boolean     = true;
  isCloseable: boolean    = true;
  isNextable: boolean     = true;
  backButtonText: string  = 'No';
  closeButtonText: string = 'Cancel';
  nextButtonText: string  = 'Yes';
  width: WizardWidth      = WizardWidth.MEDIUM;

  amount: CsCoreCurrency;
  newBalance: CsCoreCurrency;

  constructor(private customerAccountService: CustomerAccountService,
              private transactionService: MaplesTransactionService,
              private auditService: AuditService,
              private identifierService: IdentifierService,
              private store: Store<AppState>) {
    super();
  }

  onLoad (): Observable<any> {
    this.amount     = this.getAmountAsCurrency();
    this.newBalance = this.computeResultingBalance ();
    return of ( null );
  }

  onNext (): Observable<any> {
    return this.customerAccountService
      .adjustAccountBalance ( this.customerAccount.id, this.buildRequest (), MaplesPlatform.SERVE )
      .pipe (
        switchMap ( (value: any) => {
          // If changeAccountStatus success, then audit and comment.
          return forkJoin([
            this.updateAudit().pipe(catchError(error => of(error))),
            this.updateIdentifier().pipe(catchError(error => of(error))),
            this.refreshTransactions ()
          ]).pipe(map((response: [any, any, any]) => {
            this.wizard.model.success = 0;
            if (response[0] instanceof HttpErrorResponse || response[1] instanceof HttpErrorResponse) {
              this.wizard.model.success = 2;
            }
          })
          );
        }),
        catchError ( () => {
          this.wizard.model.success = 1;
          return of ( null );
        } ),
        mapTo ( 'result-page' ),
      );
  }

  get accountNumber (): string | null {
    return this.customerAccount && this.customerAccount.id;
  }

  get availableBalance (): CsCoreCurrency | null {
    return this.customerAccount.getCurrentBalance() && this.customerAccount.getCurrentBalance().balance.find(balance => balance.type === 'AVAILABLE').amount;
  }

  get comment (): string {
    return this.wizard.model.comment;
  }

  get customerAccount (): MaplesAccount | null {
    return this.wizard.model.selection.getCustomerAccount ();
  }

  get reason (): MaplesAccountCode {
    return this.wizard.model.reason;
  }

  private computeResultingBalance (): CsCoreCurrency | null {
    return this.availableBalance && BalanceAdjustmentService.computeResultingBalance (
      this.availableBalance,
      parseFloat(this.wizard.model.amount),
      this.wizard.model.adjustmentType,
    );
  }

  private getAmountAsCurrency (): CsCoreCurrency | null {
    const value            = parseFloat(this.wizard.model.amount) * BalanceAdjustmentService.getAdjustmentScalar ( this.wizard.model.adjustmentType );
    const availableBalance = this.availableBalance;
    return availableBalance && CsCoreCurrencyUtil.buildWithDescriptor ( value, availableBalance.descriptor );
  }

  private buildRequest (): MaplesAccountAdjustBalanceRequest {
    return {
      transactionType: this.wizard.model.reason.code,
      amount: this.wizard.model.amount,
      adjustmentType: this.wizard.model.adjustmentType
    };
  }

  private updateAudit(): Observable<any> {
    return this.auditService.addOne(this.wizard.model.auditActivityType);
  }

  private updateIdentifier(): Observable<any> {
    let request: IdentifierRequest = {
      identifierType: this.wizard.model.identifierType,
      value: this.wizard.model.identifier,
      platform: PlatformType.SERVE,
      comments: [
        {
          content: this.wizard.model.comment
        }
      ]
    };

    return this.identifierService.addOneIdentifierWithComment(request);
  }

  private refreshTransactions (): Observable<any> {
    const selection: Selection<Customer> = this.wizard.model.selection;
    return this.transactionService
      .searchForSelection ( selection )
      .pipe (
        tap ( ( response: MaplesTransaction[] ) => {
          selection.maplesTransactions = response;
          this.store.dispatch(new SetSelectionMaplesTransactionsAction(selection));
        } ),
        catchError ( () => of ( null ) ),
      );
    return of(null);
  }

}
