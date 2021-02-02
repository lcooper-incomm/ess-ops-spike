import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../core/wizard/wizard-page";
import { ReviewC2cTransferRequestWizard } from "../review-c2c-transfer-request-wizard";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { WizardWidth } from "../../../core/wizard/wizard-width.enum";
import { catchError, map } from "rxjs/operators";
import { FsapiC2cTransferService } from "../../../core/c2c-transfer/fsapi-c2c-transfer.service";
import { FsapiC2cTransferApprovalRequest } from "../../../core/c2c-transfer/fsapi-c2c-transfer-approval-request";

@Component ( {
  selector: 'cca-review-c2c-transfer-request-review',
  templateUrl: './review-c2c-transfer-request-review.component.html',
  styleUrls: [ './review-c2c-transfer-request-review.component.scss' ]
} )
export class ReviewC2cTransferRequestReviewComponent extends WizardPage<ReviewC2cTransferRequestWizard> implements OnInit {
  key: string           = 'review-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private c2cTransferService: FsapiC2cTransferService ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
    this.width           = WizardWidth.MEDIUM;
  }

  ngOnInit () {
  }

  onNext (): Observable<any> {
    return this.c2cTransferService.approveC2CTransfer ( this.wizard.model.request )
      .pipe (
        catchError ( () => {
          this.wizard.model.isFailed = true;
          return 'confirmation-page';
        } ),
        map ( ( response: FsapiC2cTransferApprovalRequest ) => {
          return 'confirmation-page';
        } )
      );
  }
}
