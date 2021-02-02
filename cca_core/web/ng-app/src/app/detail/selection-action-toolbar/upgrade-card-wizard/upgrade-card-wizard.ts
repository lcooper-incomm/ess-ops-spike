import { AbstractWizard } from "../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../core/wizard/wizard-page";
import { Selection } from "../../../core/session/model/selection";
import { UpgradeCardComponent } from "./upgrade-card/upgrade-card.component";
import { UpgradeCardReviewComponent } from "./upgrade-card-review/upgrade-card-review.component";
import { UpgradeCardConfirmationComponent } from "./upgrade-card-confirmation/upgrade-card-confirmation.component";
import { UpdateAccountRequest } from "../../../core/customer/update-account-request";
import { Customer } from "src/app/core/customer/customer";

export class UpgradeCardWizard extends AbstractWizard<UpgradeCardWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'upgrade-card';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.doRefresh = true;
    this.model     = new UpgradeCardWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', UpgradeCardComponent );
    pageMap.set ( 'review-page', UpgradeCardReviewComponent );
    pageMap.set ( 'confirmation-page', UpgradeCardConfirmationComponent );
  }
}

export class UpgradeCardWizardModel {
  canWaiveFee: boolean = false;
  customerId: string;
  isFailed: boolean    = false;
  newCardNumber: string;
  request: UpdateAccountRequest;
  selection: Selection<Customer>;
}
