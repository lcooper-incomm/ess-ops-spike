import { AbstractWizard } from "../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../core/wizard/wizard-page";
import { ResendDeliveryReviewComponent } from "./resend-delivery-review/resend-delivery-review.component";
import { ResendDeliveryConfirmationComponent } from "./resend-delivery-confirmation/resend-delivery-confirmation.component";
import { Selection } from "../../../core/session/model/selection";

export class ResendDeliveryActionWizard extends AbstractWizard<ResendDeliveryActionWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'resend-delivery-email';
  startingPageKey: string = 'review-page';

  constructor () {
    super ();
    this.doRefresh = true;
    this.model     = new ResendDeliveryActionWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'review-page', ResendDeliveryReviewComponent );
    pageMap.set ( 'confirmation-page', ResendDeliveryConfirmationComponent );
  }
}

export class ResendDeliveryActionWizardModel {
  isFailed: boolean;
  orderNumber: string;
  selection: Selection<any>;
}

