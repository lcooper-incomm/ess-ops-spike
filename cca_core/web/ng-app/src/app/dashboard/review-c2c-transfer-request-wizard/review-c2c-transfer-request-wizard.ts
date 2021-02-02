import { AbstractWizard } from "../../core/wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "../../core/wizard/wizard-page";
import { ReviewC2cTransferRequestComponent } from "./review-c2c-transfer-request/review-c2c-transfer-request.component";
import { ReviewC2cTransferRequestReviewComponent } from "./review-c2c-transfer-request-review/review-c2c-transfer-request-review.component";
import { ReviewC2cTransferRequestConfirmationComponent } from "./review-c2c-transfer-request-confirmation/review-c2c-transfer-request-confirmation.component";
import { PlatformType } from "../../core/platform/platform-type.enum";
import { FsapiC2cTransferResponse } from "../../core/c2c-transfer/fsapi-c2c-transfer-response";
import { FsapiC2cTransferApprovalRequest } from "../../core/c2c-transfer/fsapi-c2c-transfer-approval-request";

export class ReviewC2cTransferRequestWizard extends AbstractWizard<ReviewC2cTransferRequestWizardModel> {

  displayStepper: boolean = true;
  key: string             = 'approve-c2c-transfer';
  startingPageKey: string = 'form-page';

  constructor () {
    super ();
    this.doRefresh = true;
    this.model     = new ReviewC2cTransferRequestWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( 'form-page', ReviewC2cTransferRequestComponent );
    pageMap.set ( 'review-page', ReviewC2cTransferRequestReviewComponent );
    pageMap.set ( 'confirmation-page', ReviewC2cTransferRequestConfirmationComponent );
  }
}

export class ReviewC2cTransferRequestWizardModel {
  decision: string;
  id: number;
  isApproved: boolean;
  isFailed: boolean;
  platform: PlatformType;
  response: FsapiC2cTransferResponse;
  request: FsapiC2cTransferApprovalRequest;
  transactionTotal: string;
}
