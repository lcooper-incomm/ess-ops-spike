import { AbstractWizard } from "../../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { ChangeFeePlanVmsComponent } from "./change-fee-plan-vms/change-fee-plan-vms.component";
import { ChangeFeePlanVmsReviewComponent } from "./change-fee-plan-vms-review/change-fee-plan-vms-review.component";
import { ChangeFeePlanVmsConfirmationComponent } from "./change-fee-plan-vms-confirmation/change-fee-plan-vms-confirmation.component";
import { FeePlan } from "../../../../core/model/fee-plan";
import { Selection } from "../../../../core/session/model/selection";
import { UpdateAccountRequest } from "../../../../core/customer/update-account-request";

export class ChangeFeePlanVmsWizard extends AbstractWizard<ChangeFeePlanVmsWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'change-fee-plan-vms';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.model     = new ChangeFeePlanVmsWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', ChangeFeePlanVmsComponent );
    pageMap.set ( 'review-page', ChangeFeePlanVmsReviewComponent );
    pageMap.set ( 'confirmation-page', ChangeFeePlanVmsConfirmationComponent );
  }
}

export class ChangeFeePlanVmsWizardModel {
  comment: string;
  currentFeePlan: FeePlan;
  customerId: string;
  isFailed: boolean;
  newFeePlan: FeePlan;
  request: UpdateAccountRequest;
  selection: Selection<any>;
}
