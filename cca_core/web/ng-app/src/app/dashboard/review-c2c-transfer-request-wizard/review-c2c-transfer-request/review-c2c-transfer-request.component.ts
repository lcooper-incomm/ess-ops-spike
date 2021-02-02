import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../core/wizard/wizard-page";
import { ReviewC2cTransferRequestWizard } from "../review-c2c-transfer-request-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { FsapiC2cTransferService } from "../../../core/c2c-transfer/fsapi-c2c-transfer.service";
import { FsapiC2cTransferResponse } from "../../../core/c2c-transfer/fsapi-c2c-transfer-response";
import { CsCoreCurrencyUtil } from "@cscore/gringotts";
import { WizardWidth } from "../../../core/wizard/wizard-width.enum";
import { FsapiC2cTransferApprovalRequest } from "../../../core/c2c-transfer/fsapi-c2c-transfer-approval-request";
import { map } from "rxjs/operators";

@Component ( {
  selector: 'cca-review-c2c-transfer-request',
  templateUrl: './review-c2c-transfer-request.component.html',
  styleUrls: [ './review-c2c-transfer-request.component.scss' ]
} )
export class ReviewC2cTransferRequestComponent extends WizardPage<ReviewC2cTransferRequestWizard> implements OnInit {
  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private c2cTransferService: FsapiC2cTransferService ) {
    super ();
    this.isCloseable    = true;
    this.isNextable     = true;
    this.nextButtonText = 'Next';
    this.width          = WizardWidth.MEDIUM;
  }

  onNext (): Observable<any> {
    this.wizard.model.request = this.buildRequest ();
    return of ( 'review-page' );
  }

  ngOnInit () {

  }

  onLoad (): Observable<any> {
    if ( !this.wizard.model.response ) {
      return this.c2cTransferService.getDetails ( this.wizard.model.id, this.wizard.model.platform )
        .pipe ( map ( ( response: FsapiC2cTransferResponse ) => {
          this.wizard.model.response = response;
          this.calculateTransactionTotal ();
          this.initForm ();
        } ) );
    } else {
      return of ( null );
    }
  }

  private buildRequest (): any {

    let request = new FsapiC2cTransferApprovalRequest ();
    this.wizard.model.isApproved ? request.decision = 'APPROVED' : request.decision = 'REJECTED';

    request.amount         = this.wizard.model.response.amount.value;
    request.fromCardholder = this.wizard.model.response.fromCardholder;
    request.fromCustomerId = this.wizard.model.response.fromCustomerId;
    request.fromPan        = this.wizard.model.response.fromPan;
    request.id             = this.wizard.model.response.id;
    request.platform       = this.wizard.model.response.platform;
    request.reason         = this.wizardForm.get ( 'reason' ).value;
    request.comment        = this.wizard.model.response.reason;
    request.sessionId      = this.wizard.model.response.sessionId;
    request.status         = request.decision;
    request.toCardholder   = this.wizard.model.response.toCardholder;
    request.toCustomerId   = this.wizard.model.response.toCustomerId;
    request.toPan          = this.wizard.model.response.toPan;
    request.transferFee    = this.wizard.model.response.transferFee ? this.wizard.model.response.transferFee.value : null;

    return request;
  }

  private calculateTransactionTotal () {
    let total                          = CsCoreCurrencyUtil.add ( this.wizard.model.response.amount, this.wizard.model.response[ 'transferFee' ] );
    this.wizard.model.transactionTotal = total.displayValue;

  }

  private initForm (): void {
    let csrReason        = `[${this.wizard.model.response.createdBy.username}] ${this.wizard.model.response.reason}`;
    let supervisorReason = this.wizard.model.response.reason;
    this.wizardForm      = new FormGroup ( {
      comment: new FormControl ( csrReason, [ Validators.required ] ),
      reason: new FormControl ( supervisorReason, [ Validators.required ] )
    } );
    this.wizardForm.get ( 'comment' ).disable ()
  }

  public toggleApproved () {
    this.wizard.model.isApproved = !this.wizard.model.isApproved;
  }
}
