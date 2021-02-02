import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import * as _ from 'lodash';
import {MaplesAccountShippingOption} from '@cscore/maples-client-model';
import {CcaFormBuilder} from '../../../../core/form/cca-form-builder.service';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {buildCardReplaceReasonOptions} from '../../../../core/card/card-replace-reason.enum';
import {GenericOption} from '../../../../core/model/generic-option';
import {SecurityService} from '../../../../core/security/security.service';
import {Permission} from '../../../../core/auth/permission';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {AddressFormComponent} from '../../../../core/form/address-form/address-form.component';
import {CustomerAccountService} from '../../../../core/customer-account/customer-account.service';
import {CsCoreCurrency, CsCoreCurrencyCode, CsCoreCurrencyUtil} from '@cscore/gringotts';
import {ReplaceServeCardPageComponent} from '../replace-serve-card-page.component';

@Component({
  selector: 'cca-replace-serve-card-form-page',
  templateUrl: './replace-serve-card-form-page.component.html',
  styleUrls: ['./replace-serve-card-form-page.component.scss']
})
export class ReplaceServeCardFormPageComponent extends ReplaceServeCardPageComponent implements AfterViewInit {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup({});
  reasonOptions: GenericOption<any>[];
  initialized: boolean  = false;

  @ViewChild('address') address: AddressFormComponent;

  constructor(private formBuilder: CcaFormBuilder,
              private securityService: SecurityService,
              private customerAccountService: CustomerAccountService) {
    super();
    this.isCloseable    = true;
    this.isNextable     = true;
    this.nextButtonText = 'Next';
    this.width          = WizardWidth.MEDIUM;
    this.title          = 'Replace Card';
  }

  onLoad(): Observable<any> {
    if (this.initialized) {
      return of(null);
    } else {
      return this.customerAccountService.findShippingOptions(this.wizard.model.request.accountId, this.wizard.model.platformType)
        .pipe(
          map((value: MaplesAccountShippingOption[]) => {
            this.wizard.model.maplesShippingOptions = value;
          })
        )
        .pipe(
          tap(() => {
            this.initForms();
          })
        );
    }
  }

  ngAfterViewInit(): void {
    this.primaryAddressChanged();
  }

  onNext(): Observable<any> {
    this.updateRequest();
    return of('confirmation-page');
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  updateRequest(): void {
    let formValue: any                              = this.wizardForm.getRawValue();
    this.wizard.model.request.isFraud               = formValue.isFraud;
    this.wizard.model.request.shippingMethod        = formValue.shippingMethod;
    this.wizard.model.request.isFeeWaived           = formValue.isFeeWaived;
    this.wizard.model.request.isFeeApplicable       = formValue.isFeeApplicable;
    this.wizard.model.request.isPrimaryAddressValid = formValue.isPrimaryAddressValid;
    this.wizard.model.request.reason                = formValue.reason;
    this.wizard.model.request.comment               = formValue.comment;
    this.wizard.model.request.address               = formValue.address;
  }

  hasShippingFee(shippingMethod: string): boolean {
    if (!shippingMethod) {
      return false;
    }
    const shipping: MaplesAccountShippingOption = this.wizard.model.maplesShippingOptions
      .find((value: MaplesAccountShippingOption) => value.code === shippingMethod);

    if (shipping) {
      const amount: CsCoreCurrency = CsCoreCurrencyUtil.buildWithCode(+shipping.amount, CsCoreCurrencyCode.USD);
      return !amount.isZero() && amount.isPositive();
    } else {
      return false;
    }
  }

  canWaiveFee(): boolean {
    return this.securityService.hasPermission(Permission.SERVE_WAIVE_FEE_FOR_REPLACE_CARD);
  }

  primaryAddressChanged(): void {
    let isPrimaryAddressValid: boolean = this.wizardForm.get('isPrimaryAddressValid').value;
    if (isPrimaryAddressValid) {
      this.wizard.model.request.address = _.cloneDeep(this.wizard.model.primaryAddress);
      this.wizardForm.get('address').get('line1').setValue(this.wizard.model.primaryAddress.line1);
      this.wizardForm.get('address').get('line2').setValue(this.wizard.model.primaryAddress.line2);
      this.wizardForm.get('address').get('city').setValue(this.wizard.model.primaryAddress.city);
      this.wizardForm.get('address').get('state').setValue(this.wizard.model.primaryAddress.state);
      this.wizardForm.get('address').get('postalCode').setValue(this.wizard.model.primaryAddress.postalCode);
    }

    this.address.setRequired(!isPrimaryAddressValid);
    this.address.setDisabled(isPrimaryAddressValid);
  }

  private initForms(): void {
    this.wizard.model.request.isFeeApplicable       = true;
    this.wizard.model.request.isReplacementCard     = true;
    this.wizard.model.request.shippingMethod        = 'USPS_PAID';
    this.wizard.model.request.isPrimaryAddressValid = true;
    this.wizard.model.request.address               = this.wizard.model.primaryAddress;
    this.reasonOptions                              = buildCardReplaceReasonOptions();

    this.wizardForm = new FormGroup({
      address: this.formBuilder.address(this.wizard.model.request.address, false),
      isFraud: new FormControl(this.wizard.model.request.isFraud, []),
      isFeeWaived: new FormControl(this.wizard.model.request.isFeeWaived, []),
      isFeeApplicable: new FormControl(this.wizard.model.request.isFeeApplicable, []),
      isPrimaryAddressValid: new FormControl(this.wizard.model.request.isPrimaryAddressValid, []),
      reason: new FormControl(this.wizard.model.request.reason, [Validators.required]),
      shippingMethod: new FormControl(this.wizard.model.request.shippingMethod, [Validators.required]),
      comment: new FormControl(this.wizard.model.request.comment, [Validators.required, Validators.minLength(5), Validators.maxLength(500)])
    });

    this.convertShippingData();

    if (!this.canWaiveFee()) {
      this.wizardForm.get('isFeeWaived').disable();
    }

    this.wizardForm.valueChanges.subscribe(() => {
      this.updateRequest();
    });
    this.initialized = true;
  }

  /**
   * Map shipping fees to options and set default value.
   */
  convertShippingData(): void {

    let defaultOption: MaplesAccountShippingOption = this.wizard.model.maplesShippingOptions.find((option: MaplesAccountShippingOption) => {
      return option.code === 'USPS_PAID'
    });

    if (!defaultOption) {
      defaultOption = this.wizard.model.maplesShippingOptions.find((option: MaplesAccountShippingOption) => {
        return option.code === 'USPS'
      });
    }

    if (!defaultOption) {
      defaultOption = this.wizard.model.maplesShippingOptions[0];
    }

    this.wizard.model.shippingOptions = this.wizard.model.maplesShippingOptions.map(
      obj => ({
        ...obj,
        value: `${obj.code}`,
        displayValue: `${obj.description + ' $(' + obj.amount + ' Fee)'}`
      })
    );

    this.wizardForm.get('shippingMethod').setValue(defaultOption.code);
    this.wizard.model.request.shippingMethod = defaultOption.code;
  }
}
