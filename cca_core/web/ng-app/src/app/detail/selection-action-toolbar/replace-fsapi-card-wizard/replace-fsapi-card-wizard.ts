import { AbstractWizard } from "../../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../../core/wizard/wizard-page";
import { ReplaceFsapiCardComponent } from "./replace-fsapi-card/replace-fsapi-card.component";
import { ReplaceFsapiCardReviewComponent } from "./replace-fsapi-card-review/replace-fsapi-card-review.component";
import { ReplaceFsapiCardConfirmationComponent } from "./replace-fsapi-card-confirmation/replace-fsapi-card-confirmation.component";
import { FsapiReplaceCardRequest } from "./fsapi-replace-card-request";
import { CsCoreAddress } from "@cscore/core-client-model";
import { Selection } from "../../../core/session/model/selection";

export class ReplaceFsapiCardWizard extends AbstractWizard<ReplaceFsapiCardWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'replace-vms-card';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.doRefresh = true;
    this.model     = new ReplaceFsapiCardWizardModel ();

  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', ReplaceFsapiCardComponent );
    pageMap.set ( 'review-page', ReplaceFsapiCardReviewComponent );
    pageMap.set ( 'confirmation-page', ReplaceFsapiCardConfirmationComponent );
  }
}

export class ReplaceFsapiCardWizardModel {
  address: CsCoreAddress; //This is just for convenience in displaying the address on the confirm page
  customerId: string;
  firstName: string;
  isFailed: boolean;
  lastName: string;
  newCardNumber: string;
  request: FsapiReplaceCardRequest;
  selection: Selection<any>;
}
