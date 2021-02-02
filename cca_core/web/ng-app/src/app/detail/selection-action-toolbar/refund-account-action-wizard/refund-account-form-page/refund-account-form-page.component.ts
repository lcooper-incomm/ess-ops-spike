import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {RefundAccountWizard} from '../refund-account-action-wizard';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {GenericOption} from '../../../../core/model/generic-option';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {CsCoreCurrencyCode, CsCoreCurrencyUtil} from '@cscore/gringotts';

@Component({
  selector: 'cca-refund-account-form-page',
  templateUrl: './refund-account-form-page.component.html'
})
export class RefundAccountFormPageComponent extends WizardPage<RefundAccountWizard> implements OnInit {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup({});

  methodOptions: GenericOption<any>[] = [
    {value: 'ACH', displayValue: 'ACH'},
    {value: 'CHECK', displayValue: 'Check'}
  ];
  bankOptions: GenericOption<any>[] = [];

  ngOnInit() {
    this.initForms();

    this.title           = 'Account Withdraw';
    this.closeButtonText = 'Cancel';
    this.isBackable      = false;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.width           = WizardWidth.MEDIUM;

    for (let bank of this.wizard.model.linkedAccounts) {
      this.bankOptions.push({
        value: bank.id,
        displayValue: bank.accountNumber
      });
    }
  }

  onNext(): Observable<string> {
    this.updateRequest();
    return of('confirmation-page');
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  private initForms(): void {
    this.wizardForm = new FormGroup({
      method: new FormControl(this.wizard.model.request.method, [Validators.required]),
      id: new FormControl(this.wizard.model.request.id, []),
      amount: new FormControl(this.wizard.model.request.amount, [Validators.required, Validators.pattern ('([0-9]+[^.])|([0-9]+[.][0-9]{2})')]),
      comment: new FormControl(this.wizard.model.comment, [Validators.required, Validators.minLength(5), Validators.maxLength(500)])
    });

    this.wizardForm.get('amount').valueChanges.subscribe((value: string) => {
      try {
        let currency = CsCoreCurrencyUtil.buildWithCode(+value, CsCoreCurrencyCode.USD);
        if (currency.value > this.wizard.model.balance.value) {
          this.wizardForm.get('amount').setErrors({'max': true});
        }
      } catch (error) {}
    });
    this.wizardForm.get('method').valueChanges.subscribe((value: string) => {
      if (value === 'CHECK') {
        this.wizardForm.get('id').setValidators([]);
      } else {
        this.wizardForm.get('id').setValidators([Validators.required]);
      }
    });
  }

  private updateRequest(): void {
    let formValue: any                 = this.wizardForm.getRawValue();
    this.wizard.model.request.method   = formValue.method;
    if (this.wizard.model.request.method === 'CHECK') {
      this.wizard.model.request.id     = this.wizard.model.address.id;
    } else {
      this.wizard.model.request.id     = formValue.id;
    }
    this.wizard.model.request.amount   = formValue.amount;
    this.wizard.model.request.currency = '840';
    this.wizard.model.comment          = formValue.comment;
  }
}
