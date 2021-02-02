import {Component, OnInit} from '@angular/core';
import {WizardPage} from "../../../../core/wizard/wizard-page";
import {UpgradeCardWizard} from "../upgrade-card-wizard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WizardWidth} from "../../../../core/wizard/wizard-width.enum";
import {Observable, of} from "rxjs";
import {CcaFormBuilder} from "../../../../core/form/cca-form-builder.service";
import {
  AccountHolder,
  UpdateAccountDetail,
  UpdateAccountRequest
} from "../../../../core/customer/update-account-request";
import {CardUpgradeUtilityService} from "../../../../core/card/card-upgrade-utility.service";
import {CsCoreAddressType} from "@cscore/core-client-model";
import {UpdateAccountActionType} from "../../../../core/customer/update-account-action-type.enum";

@Component({
  selector: 'cca-upgrade-card',
  templateUrl: './upgrade-card.component.html',
  styleUrls: ['./upgrade-card.component.scss']
})
export class UpgradeCardComponent extends WizardPage<UpgradeCardWizard> implements OnInit {
  addressForm: FormGroup      = new FormGroup({});
  feeDisplayValue: string;
  hasSufficientFunds: boolean = false;
  key: string                 = 'form-page';
  wizardForm: FormGroup       = new FormGroup({});

  deliveryChoices: any[] = [
    {
      value: false,
      displayName: 'USPS | Standard Shipping 7-10 Business Days'

    },
    {
      value: true,
      displayName: 'FedEx | Expedite Shipping 3-5 Business Days'
    }
  ];

  constructor(private cardUpgradeService: CardUpgradeUtilityService,
              private formBuilder: CcaFormBuilder) {
    super();
    this.isCloseable    = true;
    this.isNextable     = true;
    this.nextButtonText = 'Next';
    this.width          = WizardWidth.MEDIUM;
  }

  ngOnInit() {
    this.calculateFunds();
    this.initForms();
  }

  onNext(): Observable<any> {
    this.wizard.model.request = this.buildRequest();
    return of('review-page');
  }

  private buildRequest(): UpdateAccountRequest {
    let formValue         = this.wizardForm.getRawValue();
    let request           = new UpdateAccountRequest();
    request.accountDetail = this.buildAccountDetail();
    request.action        = UpdateAccountActionType.UPGRADE_ACCOUNT;
    request.comment       = formValue.comment;
    request.isFeeWaived   = formValue.isFeeWaived;
    request.isExpedited   = formValue.isExpedited;

    return request;
  }

  private buildAccountDetail(): UpdateAccountDetail {
    let accountDetail = new UpdateAccountDetail();

    accountDetail.accountHolder           = new AccountHolder();
    accountDetail.accountHolder.firstName = this.wizard.model.selection.getCustomer().firstName;
    accountDetail.accountHolder.lastName  = this.wizard.model.selection.getCustomer().lastName;

    const address = this.wizardForm.get('address').value;
    address.type  = CsCoreAddressType.MAILING;

    accountDetail.accountHolder.addresses = [address];

    return accountDetail;
  }

  private calculateFunds() {
    this.feeDisplayValue    = this.cardUpgradeService.getUpgradeFeeDisplayValue(this.wizard.model.selection);
    const feeValue          = this.cardUpgradeService.getUpgradeFeeValue(this.wizard.model.selection);
    const balance           = this.cardUpgradeService.getCardBalance(this.wizard.model.selection);
    const isFeeWaived       = this.wizardForm.get('isFeeWaived') ? this.wizardForm.get('isFeeWaived').value : false;
    this.hasSufficientFunds = isFeeWaived || this.cardUpgradeService.hasSufficientFunds(feeValue, balance);

    const isFundedControl = this.wizardForm.get('isFunded');
    if (isFundedControl) {
      isFundedControl.setValue(this.hasSufficientFunds, {emitEvent: false});
    }
  }

  private initForms(): void {
    this.addressForm = this.formBuilder.address(this.wizard.model.selection.getCustomer().getPreferredAddress(), true);

    this.wizardForm = new FormGroup({
      address: this.addressForm,
      comment: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
      isExpedited: new FormControl(false),
      isFunded: new FormControl(this.hasSufficientFunds, [Validators.required, Validators.requiredTrue]),
      isFeeWaived: new FormControl(false)
      }
    );

    // Default to Only Standard Shipping => this will be updated to include expedited shipping in the future
    this.wizardForm.get('isExpedited').disable();
    this.wizardForm.get('isFeeWaived').setValue(false);
    !this.wizard.model.canWaiveFee ? this.wizardForm.get('isFeeWaived').disable() : this.wizardForm.get('isFeeWaived').enable();

    this.addSubscription(
      this.wizardForm.valueChanges.subscribe(() => {
        this.calculateFunds();
      })
    );
  }
}

