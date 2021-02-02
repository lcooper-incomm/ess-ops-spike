import {Component} from '@angular/core';
import {WizardPage} from "../../../../wizard/wizard-page";
import {ServeAdjustBalanceWizard} from "../serve-adjust-balance-wizard";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WizardWidth} from "../../../../wizard/wizard-width.enum";
import {GenericOption} from "../../../../model/generic-option";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {MaplesAccount, MaplesAccountCode, MaplesPlatform} from "@cscore/maples-client-model";
import {TransactionType} from "../../../../transaction/transaction-type.enum";
import * as _ from "lodash";
import {CustomerAccountService} from '../../../../customer-account/customer-account.service';

@Component({
  selector: 'cca-serve-adjust-balance-form-page',
  templateUrl: './serve-adjust-balance-form-page.component.html',
  styleUrls: ['./serve-adjust-balance-form-page.component.scss']
})
export class ServeAdjustBalanceFormPageComponent extends WizardPage<ServeAdjustBalanceWizard> {
  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup({});
  isCloseable: boolean    = true;
  isNextable: boolean     = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.MEDIUM;

  reasons: GenericOption<MaplesAccountCode>[] = [];
  private allReasons: MaplesAccountCode[]     = [];

  adjustmentTypes: GenericOption<TransactionType>[] = [
    {
      displayValue: 'Credit (+)',
      value: TransactionType.CREDIT,
    },
    {
      displayValue: 'Debit (-)',
      value: TransactionType.DEBIT,
    },
  ];

  constructor(private formBuilder: FormBuilder,
              private customerAccountService: CustomerAccountService) {
    super();
  }

  onLoad(): Observable<any> {
    return this.loadReasons();
  }

  ngOnInit(): void {
    this.initForm();
  }

  onNext(): Observable<string> {
    this.wizard.model.adjustmentType = this.getAdjustmentType();
    this.wizard.model.amount         = this.getAmount();
    this.wizard.model.comment        = this.getComment();
    this.wizard.model.reason         = this.getReason();
    return of('confirmation-page');
  }

  get accountNumber(): string | null {
    return this.wizard.model.selection.getCustomerAccount() && this.wizard.model.selection.getCustomerAccount().id;
  }

  get availableBalance(): string | null {
    return this.customerAccount.getCurrentBalance() && this.customerAccount.getCurrentBalance().balance.find(balance => balance.type === 'AVAILABLE').amount.displayValue;
  }

  get customerAccount(): MaplesAccount | null {
    return this.wizard.model.selection.getCustomerAccount();
  }

  private getAmount(): string {
    let amount = parseFloat(this.getValueFromForm<string>('amount'));
    return amount.toFixed(2);
  }

  private getComment(): string {
    return this.getValueFromForm<string>('comment');
  }

  private getReason(): MaplesAccountCode {
    return this.getValueFromForm<MaplesAccountCode>('reason');
  }

  private getAdjustmentType(): TransactionType | null {
    return this.getValueFromForm<TransactionType>('adjustmentType');
  }

  private initForm() {
    this.wizardForm = this.formBuilder.group({
      'adjustmentType': [null, Validators.required],
      'amount': [null, [Validators.required, Validators.min(0.01)]],
      'comment': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      'reason': [{value: null, disabled: true}, Validators.required],
    });

    this.onFormFieldChange('adjustmentType', (adjustmentType: TransactionType) => {
      this.reasons = this.getReasons();
      this.wizardForm.get('reason').setValue(null);
      this.wizardForm.get('reason').enable();
    });

  }

  private getReasons(): GenericOption<MaplesAccountCode>[] {
    return this.allReasons
      .map(ServeAdjustBalanceFormPageComponent.mapReason);
  }

  private loadReasons(): Observable<void> {
    return this.customerAccountService
      .findAccountTransactionType(MaplesPlatform.SERVE)
      .pipe(
        map((reasons: MaplesAccountCode[]) => {
          this.allReasons = _.sortBy(reasons, 'description');
        }),
      );
  }

  private static mapReason(reason: MaplesAccountCode): GenericOption<MaplesAccountCode> {
    return {
      displayValue: reason.description,
      value: reason,
    };
  }
}
