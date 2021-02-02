import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, finalize, flatMap, map} from 'rxjs/operators';
import {MaplesAccountAdjustBalanceRequest, MaplesPlatform} from '@cscore/maples-client-model';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AccountToAccountTransferWizard} from '../account-to-account-transfer-wizard';
import {CcaFormBuilder} from '../../../../core/form/cca-form-builder.service';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {AuditActivityType} from '../../../../core/audit/audit-activity-type.enum';
import {Session} from '../../../../core/session/model/session';
import {AuditService} from '../../../../core/audit/audit.service';
import {TransactionType} from '../../../../core/transaction/transaction-type.enum';
import {CustomerAccountService} from '../../../../core/customer-account/customer-account.service';

@Component({
  selector: 'cca-account-to-account-transfer-review-page',
  templateUrl: './account-to-account-transfer-review-page.component.html',
  styleUrls: ['./account-to-account-transfer-review-page.component.scss']
})
export class AccountToAccountTransferReviewPageComponent extends WizardPage<AccountToAccountTransferWizard> implements OnInit {
  key: string           = 'review-page';
  wizardForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: CcaFormBuilder,
              private customerAccountService: CustomerAccountService,
              private auditService: AuditService) {
    super();
    this.isCloseable = false;
    this.isBackable  = true;

    this.isNextable     = true;
    this.backButtonText = 'No';
    this.nextButtonText = 'Yes';
    this.width          = WizardWidth.SMALL;
    this.title          = 'Account To Account Transfer';
    this.footer         = 'Are you sure you want to perform this action?';
  }

  ngOnInit() {
  }


  onNext(): Observable<string> {
    const fromAccountId = this.wizard.model.fromAccount;
    const toAccountId   = this.wizard.model.toAccount;

    // Hard code for Serve account to account transfer transactionType
    const fromRequest: MaplesAccountAdjustBalanceRequest = {
      transactionType: 'MiscDebit',
      amount: this.wizard.model.amount,
      adjustmentType: TransactionType.DEBIT
    };

    const toRequest: MaplesAccountAdjustBalanceRequest = {
      transactionType: 'MiscCredit',
      amount: this.wizard.model.amount,
      adjustmentType: TransactionType.CREDIT
    };

    return forkJoin([
      this.customerAccountService.adjustAccountBalance(fromAccountId, fromRequest, MaplesPlatform.SERVE).pipe(catchError(error => of(error))),
      this.customerAccountService.adjustAccountBalance(toAccountId, toRequest, MaplesPlatform.SERVE).pipe(catchError(error => of(error))),
    ]).pipe(
      finalize(() => {
        this.auditService.addOne(AuditActivityType.ADJUST_BALANCE).subscribe();
      }),
      flatMap((response: [any, Session | HttpErrorResponse]) => {
        if (response[0] instanceof HttpErrorResponse) {
          this.wizard.model.success[0] = false;
        }
        if (response[1] instanceof HttpErrorResponse) {
          this.wizard.model.success[1] = false;
        }
        return of(null);
      }),
      map(() => {
        return 'confirmation-page';
      })
    );
  }

  onBack(): Observable<string> {
    return of('form-page');
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }
}
