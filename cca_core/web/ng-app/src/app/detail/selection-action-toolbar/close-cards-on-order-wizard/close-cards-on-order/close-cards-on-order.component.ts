import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { CloseCardsOnOrderWizard } from "../close-cards-on-order-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { WizardWidth } from "../../../../core/wizard/wizard-width.enum";
import { Observable, of } from "rxjs";
import { ChangeOrderCardStatusRequest } from "../../../../core/order/change-order-card-status-request";
import { FsapiStatusType } from "../../../../core/status/fsapi-status/fsapi-status-type.enum";
import { ProductActionReasonCodeService } from "../../../../core/action/product-action-reason-code.service";
import { PlatformType } from "../../../../core/platform/platform-type.enum";
import { ProductActionReasonCodeType } from "../../../../core/action/product-action-reason-code-type.enum";
import { ReasonCode } from "../../../../core/action/product-action-reason-code";
import { TransactionType } from "../../../../core/transaction/transaction-type.enum";
import * as _ from "lodash";
import { finalize, map } from "rxjs/operators";
import { Partner } from "../../../../core/session/selection/partner";

@Component ( {
  selector: 'cca-close-cards-on-order',
  templateUrl: './close-cards-on-order.component.html',
  styleUrls: [ './close-cards-on-order.component.scss' ]
} )
export class CloseCardsOnOrderComponent extends WizardPage<CloseCardsOnOrderWizard> implements OnInit {
  key: string           = 'form-page';
  reasons: ReasonCode[] = [];
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private productActionReasonCodeService: ProductActionReasonCodeService ) {
    super ();
    this.isCloseable    = true;
    this.isNextable     = true;
    this.nextButtonText = 'Next';
    this.width          = WizardWidth.MEDIUM;
  }

  ngOnInit () {
    this.initForms ();
  }

  onLoad (): Observable<any> {

    return this.productActionReasonCodeService.findAllByPlatformAndType ( PlatformType.VMS, ProductActionReasonCodeType.ADJUST_BALANCE, Partner.INCOMM )
      .pipe (
        map ( ( reasonCodes: ReasonCode[] ) => {
          this.reasons = _.filter ( reasonCodes, ( reasonCode: ReasonCode ) => {
            return (reasonCode.reasonDescription.indexOf ( 'BOL - Cancel' ) === 0 || reasonCode.reasonDescription.indexOf ( 'BOL Cancel' ) === 0) && reasonCode.reasonAdjustment === TransactionType.DEBIT;
          } );
        } ),
        finalize ( () => this.updateReasonForm () )
      );
  }

  onNext (): Observable<any> {
    this.wizard.model.reason     = this.getReason ();
    this.wizard.model.request    = this.buildRequest ();
    this.wizard.model.reasonCode = this.wizardForm.get ( 'reasonSelect' ).value;
    return of ( 'review-page' );
  }

  private buildRequest (): ChangeOrderCardStatusRequest {
    let request          = new ChangeOrderCardStatusRequest ();
    request.orderId      = this.wizard.model.selection.getOrder ().id;
    request.orderNumber  = this.wizard.model.selection.getOrder ().number;
    request.partner      = this.wizard.model.selection.simplePartner;
    request.platform     = this.wizard.model.selection.platform;
    request.reason       = this.getReasonCode ();
    request.targetStatus = FsapiStatusType.CLOSED;
    request.cards        = this.wizard.model.cards;
    return request;
  }

  private getReason (): string {
    return this.getValueFromForm<string> ( 'reasonSelect' );
  }

  private getReasonCode (): string {
    let toFind = this.wizardForm.get ( 'reasonSelect' ).value;
    let code   = this.reasons.find ( reason => reason.reasonDescription === toFind );
    return code.reasonCode;
  }

  private initForms (): void {
    this.wizardForm = new FormGroup ( {
      reasonSelect: new FormControl ( '', [ Validators.required ] ),
    } );
  }

  private updateReasonForm () {
    if ( this.wizard.model.reasonCode ) {
      this.wizardForm.get ( 'reasonSelect' ).setValue ( this.wizard.model.reasonCode );
    }
  }

}
