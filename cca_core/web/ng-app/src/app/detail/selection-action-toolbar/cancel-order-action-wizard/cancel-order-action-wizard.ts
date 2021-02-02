import {AbstractWizard} from "../../../core/wizard/abstract-wizard";
import {Type} from "@angular/core";
import {WizardPage} from "../../../core/wizard/wizard-page";
import {CancelOrderActionReviewComponent} from "./cancel-order-action-review/cancel-order-action-review.component";
import {CancelOrderActionConfirmationComponent} from "./cancel-order-action-confirmation/cancel-order-action-confirmation.component";
import {Selection} from "../../../core/session/model/selection";
import {CancelOrderFormPageComponent} from "./cancel-order-form-page/cancel-order-form-page.component";
import {MaplesCancelOrderRequest} from "@cscore/maples-client-model";

export class CancelOrderActionWizard extends AbstractWizard<CancelOrderActionWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'cancel-order-action';
  startingPageKey: string = 'form-page';

  constructor() {
    super();
    this.doRefresh = true;
    this.model     = new CancelOrderActionWizardModel();
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key,
      platform: this.model.selection.platform
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set('form-page', CancelOrderFormPageComponent);
    pageMap.set('review-page', CancelOrderActionReviewComponent);
    pageMap.set('confirmation-page', CancelOrderActionConfirmationComponent);
  }
}

export class CancelOrderActionWizardModel {
  isFailed: boolean;
  orderId: string;
  request: MaplesCancelOrderRequest;
  selection: Selection<any>;
}
