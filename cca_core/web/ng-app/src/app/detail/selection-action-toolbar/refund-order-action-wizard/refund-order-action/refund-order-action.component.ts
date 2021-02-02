import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {CsCoreCurrency, CsCoreCurrencyUtil} from '@cscore/gringotts';
import {MaplesOrderItemCard, MaplesPlatform, MaplesRefundOrderRequest} from '@cscore/maples-client-model';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {RefundOrderActionWizard} from '../refund-order-action-wizard';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {PlatformType} from '../../../../core/platform/platform-type.enum';
import {OrderService} from '../../../../core/order/order.service';
import {SpinnerComponent} from '../../../../core/spinner/spinner.component';
import {Logger} from '../../../../logging/logger.service';

@Component({
  selector: 'cca-refund-order-action',
  templateUrl: './refund-order-action.component.html',
  styleUrls: ['./refund-order-action.component.scss']
})
export class RefundOrderActionComponent extends WizardPage<RefundOrderActionWizard> implements OnInit {

  key: string                   = 'form-page';
  PlatformType                  = PlatformType;
  wizardForm: FormGroup         = new FormGroup({});
  @ViewChild('loadingSpinner')
  loadingSpinner: SpinnerComponent;
  calculateRefundError: boolean = false;
  isPhysical: boolean = false;
  isItemRefund: boolean = false;

  constructor(private logger: Logger) {
    super();
    this.isCloseable    = true;
    this.isNextable     = true;
    this.nextButtonText = 'Next';
    this.width          = WizardWidth.MEDIUM;
  }

  ngOnInit() {
    for (let item of this.wizard.model.selection.orderItems) {
      if (item.productType && item.productType.toLowerCase().indexOf('physical') !== -1) {
        this.isPhysical = true;
      }
    }
    if  (this.wizard.model.request.items.length > 0) {
      this.isItemRefund = true;
    }

    this.initForms();
    this.subscribeToFormChanges();
    this.setStandardRefundAmount();
  }

  onNext(): Observable<any> {
    this.wizard.model.request = this.buildRequest(this.wizard.model.request);
    this.logger.debug(JSON.stringify(this.wizard.model.request));

    return of('review-page');
  }

  get isCustomAmountRefunded(): boolean {
    return this.wizardForm.get('isCustomAmountRefunded').value;
  }

  /**
   * For BOL, we use calculate refund to do the calculation based upon the checkboxes.  This is stored
   * in the refundAmount model field.
   *
   * @param request
   */
  private buildRequest(request: MaplesRefundOrderRequest): MaplesRefundOrderRequest {
    if (this.isCustomAmountRefunded) {
      request.amount             = Number(this.wizardForm.get('customRefund').value).toFixed(2);
      request.refundShippingFees = false;
      request.refundPurchaseFees = false;
      request.isCustom           = true;
    } else {
      if (this.wizard.model.selection.getMaplesPlatform() === MaplesPlatform.BOL) {
        request.amount = Number(this.wizard.model.refundAmountValue.value).toFixed(2);
      } else if (this.wizardForm.get('isSubTotalRefunded').value) {
        // ECOMM will add in the shipping and purchase fees if those flags are true, so we should only pass the subtotal (if checked)
        request.amount = Number(this.wizard.model.order.totals.subtotal.value).toFixed(2);
      } else {
        request.amount = Number(0).toFixed(2);
      }
      request.refundShippingFees = !!this.wizardForm.get('isShippingFeesRefunded').value;
      request.refundPurchaseFees = !!this.wizardForm.get('isPurchaseFeesRefunded').value;
    }

    if (this.wizard.model.selection.platform === PlatformType.BOL) {
      request.comment = this.wizardForm.get('comment').value;
    }
    return request;
  }

  private initForms(): void {
    let commentValidators = this.wizard.model.selection.platform === PlatformType.BOL ? [Validators.required, Validators.minLength(5), Validators.maxLength(500)] : [];

    this.wizardForm = new FormGroup({
      comment: new FormControl(null, commentValidators),
      isSubTotalRefunded: new FormControl(false),
      isPurchaseFeesRefunded: new FormControl(false),
      isShippingFeesRefunded: new FormControl(false),
      isCustomAmountRefunded: new FormControl(false),
      customRefund: new FormControl(''),
      refundAmount: new FormControl(null, [Validators.min(0.01), Validators.max(this.wizard.model.order.totals.grandTotal.value)]),
    });
  }

  private getCurrency(value: number = 0): CsCoreCurrency {
    return CsCoreCurrencyUtil.buildWithDescriptor(value, this.wizard.model.order.totals.grandTotal.descriptor);
  }

  private calculateAmounts(): CsCoreCurrency {
    let amount: CsCoreCurrency = this.getCurrency();
    let refundDisplayAmount: CsCoreCurrency = this.getCurrency();
    let subtotalAmount: CsCoreCurrency = this.getCurrency();
    let purchasingFeeAmount: CsCoreCurrency = this.getCurrency();
    let shippingFeeAmount: CsCoreCurrency = this.getCurrency();
    let discountFeeAmount: CsCoreCurrency = this.getCurrency();
    let grandTotalAmount: CsCoreCurrency = this.getCurrency();

    if (this.wizard.model.request.items.length === 0) {
      if (this.wizardForm.get('isSubTotalRefunded').value && this.wizard.model.order.totals.subtotal) {
        amount = CsCoreCurrencyUtil.add(amount, this.wizard.model.order.totals.subtotal);
        refundDisplayAmount = CsCoreCurrencyUtil.add(refundDisplayAmount, this.wizard.model.order.totals.subtotal);
      }
      if (this.wizardForm.get('isPurchaseFeesRefunded').value && this.wizard.model.order.totals.purchaseFees) {
        refundDisplayAmount = CsCoreCurrencyUtil.add(refundDisplayAmount, this.wizard.model.order.totals.purchaseFees);
      }
      if (this.wizardForm.get('isShippingFeesRefunded').value && this.wizard.model.order.totals.shippingFees) {
        refundDisplayAmount = CsCoreCurrencyUtil.add(refundDisplayAmount, this.wizard.model.order.totals.shippingFees);
      }

      // Amount is the original full amount, but now subtract out already refunded amounts.
      if (this.wizardForm.get('isSubTotalRefunded').value && this.wizard.model.order.totals.refunded) {
        amount = CsCoreCurrencyUtil.subtract(amount, this.wizard.model.order.totals.refunded);
        refundDisplayAmount = CsCoreCurrencyUtil.subtract(refundDisplayAmount, this.wizard.model.order.totals.refunded);
      }
      if (this.wizardForm.get('isPurchaseFeesRefunded').value && this.wizard.model.order.totals.refundedPurchaseFees) {
        refundDisplayAmount = CsCoreCurrencyUtil.subtract(refundDisplayAmount, this.wizard.model.order.totals.refundedPurchaseFees);
      }
      if (this.wizardForm.get('isShippingFeesRefunded').value && this.wizard.model.order.totals.refundedShippingFees) {
        refundDisplayAmount = CsCoreCurrencyUtil.subtract(refundDisplayAmount, this.wizard.model.order.totals.refundedShippingFees);
      }

      // If any fees and a discount exists, then subtract it out.
      if (this.wizard.model.order.totals.discounted
          && ((this.wizardForm.get('isPurchaseFeesRefunded').value && this.wizard.model.order.totals.purchaseFees)
          || (this.wizardForm.get('isShippingFeesRefunded').value && this.wizard.model.order.totals.shippingFees))) {
        refundDisplayAmount = CsCoreCurrencyUtil.subtract(refundDisplayAmount, this.wizard.model.order.totals.discounted);
      }

      subtotalAmount = this.wizard.model.order.totals.subtotal;
      if (this.wizard.model.order.totals.refunded) {
        subtotalAmount = CsCoreCurrencyUtil.subtract(subtotalAmount, this.wizard.model.order.totals.refunded);
      }
      // refunded might include refunded fees, so it could be negative.  Reset to zero.
      if (subtotalAmount.isNegative()) {
        subtotalAmount = this.getCurrency();
      }
      purchasingFeeAmount = this.wizard.model.order.totals.purchaseFees;
      if (this.wizard.model.order.totals.refundedPurchaseFees) {
        purchasingFeeAmount = CsCoreCurrencyUtil.subtract(purchasingFeeAmount, this.wizard.model.order.totals.refundedPurchaseFees);
      }
      shippingFeeAmount = this.wizard.model.order.totals.shippingFees;
      if (this.wizard.model.order.totals.refundedShippingFees) {
        shippingFeeAmount = CsCoreCurrencyUtil.subtract(shippingFeeAmount, this.wizard.model.order.totals.refundedShippingFees);
      }
      if (this.wizard.model.order.totals.discounted) {
        discountFeeAmount = this.wizard.model.order.totals.discounted;
      }
      grandTotalAmount = subtotalAmount;
      grandTotalAmount = CsCoreCurrencyUtil.add(grandTotalAmount, purchasingFeeAmount);
      grandTotalAmount = CsCoreCurrencyUtil.add(grandTotalAmount, shippingFeeAmount);
      grandTotalAmount = CsCoreCurrencyUtil.subtract(grandTotalAmount, discountFeeAmount);
    } else {
      // No shipping fee refund for order item.
      // NOTE: In item, the sub total and grand total are backwards.
      for (let item of this.wizard.model.selection.orderItems) {
        let cards: MaplesOrderItemCard[] = item.cards.filter(card => this.wizard.model.request.items.indexOf(card.id) !== -1);

        for (let card of cards) {
          subtotalAmount = CsCoreCurrencyUtil.add(subtotalAmount, item.initialValue);
          if (this.wizardForm.get('isSubTotalRefunded').value) {
            amount = CsCoreCurrencyUtil.add(amount, item.initialValue);
            refundDisplayAmount = CsCoreCurrencyUtil.add(refundDisplayAmount, item.initialValue);
          }
          if (item.purchaseFee && !item.totals.refundedPurchaseFees) {
            purchasingFeeAmount = CsCoreCurrencyUtil.add(purchasingFeeAmount, item.purchaseFee);
            if (this.wizardForm.get('isPurchaseFeesRefunded').value) {
              amount = CsCoreCurrencyUtil.add(amount, item.purchaseFee);
            }
          }
        }

        grandTotalAmount = subtotalAmount;
        grandTotalAmount = CsCoreCurrencyUtil.add(grandTotalAmount, purchasingFeeAmount);
        grandTotalAmount = CsCoreCurrencyUtil.subtract(grandTotalAmount, discountFeeAmount);
      }
    }

    if (amount.isNegative()) {
      amount = this.getCurrency();
    }

    this.wizard.model.refundDisplayAmount = refundDisplayAmount.displayValue;
    this.wizard.model.subtotalAmount = subtotalAmount.displayValue;
    this.wizard.model.purchasingFeeAmount = purchasingFeeAmount.displayValue;
    this.wizard.model.discountFeeAmount = discountFeeAmount.displayValue;
    this.wizard.model.shippingFeeAmount = shippingFeeAmount.displayValue;
    this.wizard.model.grandTotalAmount = grandTotalAmount.displayValue;

    this.wizard.model.refundAmountValue = amount;
    return refundDisplayAmount;
  }

  private setCustomRefundAmount(customRefund: number): void {
    this.setToCustom();
    const amount = this.getCurrency(customRefund);

    this.calculateAmounts();
    this.wizard.model.refundAmountValue = amount;
    this.wizard.model.refundDisplayAmount = amount.displayValue;
    this.setRefundDisplayAmountToForm(amount);
  }

  private updateCustomValue(): void {
    let value: number = this.wizardForm.get('customRefund').value;
    this.wizard.model.refundAmountValue = this.getCurrency(value);
    this.wizard.model.refundDisplayAmount = this.wizard.model.refundAmountValue.displayValue;
  }

  private setStandardRefundAmount(): void {
    this.setToStandard();

    this.setRefundDisplayAmountToForm(this.calculateAmounts());
  }

  private setRefundDisplayAmountToForm(amount: CsCoreCurrency) {
    const refundAmountField = this.wizardForm.get('refundAmount');
    refundAmountField.patchValue(amount.value, {emitEvent: false});
    refundAmountField.updateValueAndValidity({onlySelf: true, emitEvent: false});
  }

  private setToCustom(): void {
    let subTotal    = this.wizardForm.get('isSubTotalRefunded');
    let purchaseFee = this.wizardForm.get('isPurchaseFeesRefunded');
    let shippingFee = this.wizardForm.get('isShippingFeesRefunded');

    subTotal.patchValue(false, {emitEvent: false});
    subTotal.disable({emitEvent: false});

    purchaseFee.patchValue(false, {emitEvent: false});
    purchaseFee.disable({emitEvent: false});

    shippingFee.patchValue(false, {emitEvent: false});
    shippingFee.disable({emitEvent: false});

    this.wizardForm.get('customRefund').setValidators(Validators.required);
  }

  private setToStandard(): void {
    this.wizardForm.get('customRefund').patchValue('', {emitEvent: false});
    this.wizardForm.get('customRefund').clearValidators();
    this.wizardForm.get('isSubTotalRefunded').enable({emitEvent: false});
    this.wizardForm.get('isPurchaseFeesRefunded').enable({emitEvent: false});
    this.wizardForm.get('isShippingFeesRefunded').enable({emitEvent: false});
  }

  private subscribeToFormChanges(): void {
    this.addSubscription(
      this.wizardForm.get('customRefund').valueChanges
        .subscribe(isCustomAmountRefunded => {
          this.updateCustomValue();
        })
    );
    this.addSubscription(
      this.wizardForm.get('isCustomAmountRefunded').valueChanges
        .subscribe(isCustomAmountRefunded => {
          this.onFormChange(isCustomAmountRefunded);
        })
    );
    this.addSubscription(
      this.wizardForm.get('isSubTotalRefunded').valueChanges
        .subscribe(isCustomAmountRefunded => {
          this.onFormChange(this.wizardForm.get('isCustomAmountRefunded').value);
        })
    );
    this.addSubscription(
      this.wizardForm.get('isPurchaseFeesRefunded').valueChanges
        .subscribe(isCustomAmountRefunded => {
          this.onFormChange(this.wizardForm.get('isCustomAmountRefunded').value);
        })
    );
    this.addSubscription(
      this.wizardForm.get('isShippingFeesRefunded').valueChanges
        .subscribe(isCustomAmountRefunded => {
          this.onFormChange(this.wizardForm.get('isCustomAmountRefunded').value);
        })
    );
  }

  private onFormChange(isCustomAmountRefunded: boolean): void {
    isCustomAmountRefunded ? this.setCustomRefundAmount(this.wizardForm.get('customRefund').value) : this.setStandardRefundAmount();
  }
}
