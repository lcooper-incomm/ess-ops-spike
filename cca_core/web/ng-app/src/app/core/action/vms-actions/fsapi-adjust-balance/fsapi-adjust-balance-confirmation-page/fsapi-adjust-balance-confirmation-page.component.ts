import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, switchMap, tap } from 'rxjs/operators';
import { BalanceAdjustmentService } from 'src/app/core/balance-adjustment/balance-adjustment.service';
import { Customer } from 'src/app/core/customer/customer';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';
import { FsapiAdjustBalanceRequest } from '../../models/vms-request-models';
import { FsapiAdjustBalanceWizard } from '../fsapi-adjust-balance-wizard';
import { CustomerAccountType } from '../../../../customer/customer-account-type.enum';
import { ReasonCode } from '../../../product-action-reason-code';
import { Selection } from 'src/app/core/session/model/selection';
import { SetSelectionTransactionsAction } from 'src/app/core/session/action/session-actions';
import { Transactions } from 'src/app/core/transaction/transactions';
import { TransactionService } from 'src/app/detail/details-panel/transaction-history-tab/transaction.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { CsCoreCurrency, CsCoreCurrencyUtil } from "@cscore/gringotts";

@Component ( {
  selector: 'cca-fsapi-adjust-balance-confirmation-page',
  templateUrl: './fsapi-adjust-balance-confirmation-page.component.html',
  styleUrls: [ './fsapi-adjust-balance-confirmation-page.component.scss' ],
} )
export class FsapiAdjustBalanceConfirmationPageComponent extends WizardPage<FsapiAdjustBalanceWizard> {
  key: string             = 'confirmation-page';
  wizardForm: FormGroup   = new FormGroup ( {} );
  isBackable: boolean     = true;
  isCloseable: boolean    = true;
  isNextable: boolean     = true;
  backButtonText: string  = 'No';
  closeButtonText: string = 'Cancel';
  nextButtonText: string  = 'Yes';
  width: WizardWidth      = WizardWidth.MEDIUM;

  constructor (
    private customerService: CustomerService,
    private transactionService: TransactionService,
    private store: Store<AppState>,
  ) {
    super ();
  }

  amount: CsCoreCurrency;
  newBalance: CsCoreCurrency;

  onLoad (): Observable<any> {
    this.amount     = this.getAmountAsCurrency ();
    this.newBalance = this.computeResultingBalance ();
    return of ( null );
  }

  onNext (): Observable<string> {
    return this.customerService
      .adjustBalance ( this.customer.id, this.buildRequest () )
      .pipe (
        switchMap ( () => {
          this.wizard.model.success = true;
          return this.refreshTransactions ();
        } ),
        catchError ( () => {
          this.wizard.model.success = false;
          return of ( null );
        } ),
        mapTo ( 'result-page' ),
      )
  }

  get accountNumber (): string | null {
    return this.customer && this.customer.accounts.spending.accountNumber;
  }

  get availableBalance (): CsCoreCurrency | null {
    return this.customer && this.customer.accounts.spending.availableBalance;
  }

  get comment (): string {
    return this.wizard.model.comment;
  }

  get customer (): Customer | null {
    return this.wizard.model.selection.getCustomer ();
  }

  get reason (): ReasonCode {
    return this.wizard.model.reason;
  }

  private buildRequest (): FsapiAdjustBalanceRequest {
    return {
      accountType: CustomerAccountType.SPENDING,
      amount: this.wizard.model.amount.toString (),
      comment: this.wizard.model.comment,
      crdrFlag: this.wizard.model.adjustmentType,
      reason: this.wizard.model.reason.reasonCode,
    }
  }

  private computeResultingBalance (): CsCoreCurrency | null {
    return this.availableBalance && BalanceAdjustmentService.computeResultingBalance (
      this.availableBalance,
      this.wizard.model.amount,
      this.wizard.model.reason.reasonAdjustment,
    );
  }

  private getAmountAsCurrency (): CsCoreCurrency | null {
    const value            = this.wizard.model.amount * BalanceAdjustmentService.getAdjustmentScalar ( this.wizard.model.adjustmentType );
    const availableBalance = this.availableBalance;
    return availableBalance && CsCoreCurrencyUtil.buildWithDescriptor ( value, availableBalance.descriptor );
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
