import { AbstractWizard } from "../../../core/wizard/abstract-wizard";
import { Selection } from "../../../core/session/model/selection";
import { Card } from "../../../core/card/card";
import { Type } from "@angular/core";
import { WizardPage } from "../../../core/wizard/wizard-page";
import { CustomerService } from "../../../core/customer/customer.service";
import { CsCoreCurrency } from "@cscore/gringotts";
import { Observable, of } from "rxjs";
import { RequestFsapiC2cTransferFormPageComponent } from "./request-fsapi-c2c-transfer-form-page/request-fsapi-c2c-transfer-form-page.component";
import { RequestFsapiC2cTransferConfirmPageComponent } from "./request-fsapi-c2c-transfer-confirm-page/request-fsapi-c2c-transfer-confirm-page.component";
import { RequestFsapiC2cTransferResultsPageComponent } from "./request-fsapi-c2c-transfer-results-page/request-fsapi-c2c-transfer-results-page.component";
import { Customer } from "../../../core/customer/customer";
import { FsapiC2cRequest } from "../../../core/c2c-transfer/fsapi-c2c-request";
import { Session } from "../../../core/session/model/session";

export enum RequestFsapiC2cTransferWizardPageType {
  FORM_PAGE    = 'form-page',
  CONFIRM_PAGE = 'confirm-page',
  RESULTS_PAGE = 'results-page'
}

export class RequestFsapiC2cTransferWizard extends AbstractWizard<RequestFsapiC2cTransferWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'request-fsapi-c2c-transfer';
  startingPageKey: string = RequestFsapiC2cTransferWizardPageType.FORM_PAGE;

  constructor ( private customerService: CustomerService ) {
    super ();
    this.model = new RequestFsapiC2cTransferWizardModel ();
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      isFailed: this.model.isFailed
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( RequestFsapiC2cTransferWizardPageType.FORM_PAGE, RequestFsapiC2cTransferFormPageComponent );
    pageMap.set ( RequestFsapiC2cTransferWizardPageType.CONFIRM_PAGE, RequestFsapiC2cTransferConfirmPageComponent );
    pageMap.set ( RequestFsapiC2cTransferWizardPageType.RESULTS_PAGE, RequestFsapiC2cTransferResultsPageComponent );
  }

  preProcess (): Observable<any> {
    this.model.transferFee = this.getTransferFee ();
    return of ( null );
  }

  private getTransferFee (): CsCoreCurrency {
    let activeFeePlan = this.model.selection.getActiveFeePlan ();
    let feeDetail     = activeFeePlan.getFeeDetailByDescription ( 'CARD TO CARD TRANSFER VIA CUSTOMER SERVICE' );
    if ( !feeDetail ) {
      feeDetail = activeFeePlan.getFeeDetailByDescription ( 'CARD TO CARD TRANSFER FEE CSR' );
    }

    return feeDetail ? feeDetail.amount : null;
  }
}

export class RequestFsapiC2cTransferWizardModel {
  fromCard: Card;
  isFailed: boolean = false;
  request: FsapiC2cRequest;
  selection: Selection<any>;
  session: Session;
  toCard: Card;
  toCustomer: Customer;
  transferAmount: CsCoreCurrency;
  transferFee: CsCoreCurrency;
}
