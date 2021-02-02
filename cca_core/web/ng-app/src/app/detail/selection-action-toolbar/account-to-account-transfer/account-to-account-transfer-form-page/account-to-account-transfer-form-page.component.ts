import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {MaplesAccountBalances, MaplesRelatedAccount} from '@cscore/maples-client-model';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AccountToAccountTransferWizard} from '../account-to-account-transfer-wizard';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {SecurityService} from '../../../../core/security/security.service';
import {Permission} from '../../../../core/auth/permission';
import {MaplesSimpleAccountInfo} from '../../../../core/session/model/maples-simple-account-info';

@Component({
  selector: 'cca-account-to-account-transfer-form-page',
  templateUrl: './account-to-account-transfer-form-page.component.html',
  styleUrls: ['./account-to-account-transfer-form-page.component.scss']
})
export class AccountToAccountTransferFormPageComponent extends WizardPage<AccountToAccountTransferWizard> implements OnInit {

  key: string                 = 'form-page';
  wizardForm: FormGroup       = new FormGroup({});
  reserveAccounts: MaplesRelatedAccount[];
  subAccounts: MaplesAccountBalances;
  canAddOtherAccount: boolean = false;

  constructor(private securityService: SecurityService) {
    super();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.SMALL;
    this.title           = 'Account To Account Transfer';

    if (this.securityService.hasPermission(Permission.SERVE_TRANSFER_FUNDS_OTHER_ACCOUNTS)) {
      this.canAddOtherAccount = true;
    }
  }

  ngOnInit() {
    this.initForm();
  }

  onNext(): Observable<string> {
    this.wizard.model.amount      = this.getAmount();
    this.wizard.model.fromAccount = this.getFromAccount();
    this.wizard.model.toAccount   = this.getToAccount();

    if (this.getToAccount() === 'ANOTHER') {
      return of('add-account-page');
    } else {
      return of('review-page');
    }
  }

  getFromAccount(): any {
    return this.getValueFromForm<any>('fromAccount');
  }

  /**
   * If the new from account is already set in the to account, reset the to account.
   * @param account
   */
  setFromAccount(account: MaplesSimpleAccountInfo): void {
    this.wizardForm.get('fromAccount').setValue(account.id);
    this.wizard.model.fromAccount = account;
    if (this.wizard.model.toAccount && this.wizard.model.toAccount.id === account.id) {
      this.wizard.model.toAccount = null;
    }
  }

  setToAccount(account: MaplesSimpleAccountInfo): void {
    this.wizardForm.get('toAccount').setValue(account.id);
    this.wizard.model.toAccount = account;
  }

  setToAnotherAccount(): void {
    let account: MaplesSimpleAccountInfo = new MaplesSimpleAccountInfo();
    account.id = 'ANOTHER';
    this.wizardForm.get('toAccount').setValue(account.id);
    this.wizard.model.toAccount = account;
  }

  private initForm(): void {
    this.wizardForm = new FormGroup({
      fromAccount: new FormControl(null, [Validators.required]),
      toAccount: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required])
    });

    this.onFormFieldChange('fromAccount', (res: any) => {
      this.wizardForm.get('amount').setValidators([Validators.required, Validators.max(this.availableBalance)]);
    });

  }

  private getToAccount(): any {
    return this.getValueFromForm<any>('toAccount');
  }

  private getAmount(): string {
    let amount = parseFloat(this.getValueFromForm<string>('amount'));
    return amount.toFixed(2);
  }

  get availableBalance(): number {
    let account          = this.wizard.model.accounts.find((account) => account.id === this.getFromAccount());
    let availableBalance = account && account.availableBalance.value;
    return availableBalance;
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }
}

