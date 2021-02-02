import { AbstractWizard } from "../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../core/wizard/wizard-page";
import { ChangeGreencardStatusComponent } from "./change-greencard-status/change-greencard-status.component";
import { Card } from "../../../core/card/card";
import { ChangeGreencardStatusReviewComponent } from "./change-greencard-status-review/change-greencard-status-review.component";
import { ChangeGreencardStatusConfirmationComponent } from "./change-greencard-status-confirmation/change-greencard-status-confirmation.component";
import { CsCoreStatus } from "../../../core/model/cs-core-status";

export class ChangeGreencardStatusWizard extends AbstractWizard<ChangeGreencardStatusWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'change-greencard-status';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.doRefresh = true;
    this.model     = new ChangeGreencardStatusWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', ChangeGreencardStatusComponent );
    pageMap.set ( 'review-page', ChangeGreencardStatusReviewComponent );
    pageMap.set ( 'confirmation-page', ChangeGreencardStatusConfirmationComponent );
  }
}

export class ChangeGreencardStatusWizardModel {
  allowedStatuses: GreencardStatusOption[] = [];
  card: Card;
  cardStatusCode: number;
  comment: string;
  customerId: string;
  currentStatus: CsCoreStatus;
  newStatus: CsCoreStatus;
  sessionId: string;
}

export interface GreencardStatusOption {
  cardStatusCode: number;
  displayName: string;
}
