import { AbstractWizard } from "../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../core/wizard/wizard-page";
import { RefundOrderActionComponent } from "./refund-order-action/refund-order-action.component";
import { RefundOrderActionReviewComponent } from "./refund-order-action-review/refund-order-action-review.component";
import { RefundOrderActionConfirmationComponent } from "./refund-order-action-confirmation/refund-order-action-confirmation.component";
import {MaplesOrder, MaplesOrderItemCard, MaplesRefundOrderRequest} from "@cscore/maples-client-model";
import { Selection } from "../../../core/session/model/selection";
import {CsCoreCurrency} from '@cscore/gringotts';

export class RefundOrderActionWizard extends AbstractWizard<RefundOrderActionWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'refund-order-action';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.doRefresh = true;
    this.model     = new RefundOrderActionWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', RefundOrderActionComponent );
    pageMap.set ( 'review-page', RefundOrderActionReviewComponent );
    pageMap.set ( 'confirmation-page', RefundOrderActionConfirmationComponent );
  }
}

export class RefundOrderActionWizardModel {
  comment: string;
  isFailed: boolean;
  order: MaplesOrder;
  orderId: string;
  refundAmountValue: CsCoreCurrency;
  subtotalAmount: string;
  purchasingFeeAmount: string;
  shippingFeeAmount: string;
  discountFeeAmount: string;
  grandTotalAmount: string;
  refundDisplayAmount: string;
  request: MaplesRefundOrderRequest = new MaplesRefundOrderRequest();
  refundAmount: string;
  selection: Selection<any>;
  cards: MaplesOrderItemCard[];
}
