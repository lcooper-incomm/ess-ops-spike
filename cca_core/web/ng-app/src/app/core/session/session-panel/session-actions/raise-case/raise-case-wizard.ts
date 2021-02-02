import { AbstractWizard } from "../../../../wizard/abstract-wizard";
import { Type } from "@angular/core";
import { WizardPage } from "src/app/core/wizard/wizard-page";
import { Observable, of } from "rxjs";
import { RaiseCaseCaseInformationPageComponent } from "./raise-case-case-information-page/raise-case-case-information-page.component";
import { RaiseCaseCustomerInformationPageComponent } from "./raise-case-customer-information-page/raise-case-customer-information-page.component";
import { RaiseCaseMerchantInformationPageComponent } from "./raise-case-merchant-information-page/raise-case-merchant-information-page.component";
import { RaiseCaseReceiptInformationPageComponent } from "./raise-case-receipt-information-page/raise-case-receipt-information-page.component";
import { RaiseCaseConfirmationPageComponent } from "./raise-case-confirmation-page/raise-case-confirmation-page.component";
import { RaiseCaseResultsPageComponent } from "./raise-case-results-page/raise-case-results-page.component";
import { SessionClassType } from "../../../session-class-type.enum";
import { SessionQueue } from "../../../model/session-queue";
import { CustomerComponent } from "../../../model/customer-component";
import { MerchantComponent } from "../../../model/merchant-component";
import { ReceiptComponent } from "../../../model/receipt-component";
import { Session } from "../../../model/session";
import { SessionType } from "../../../model/session-type";
import { Selection } from "../../../model/selection";
import {EncorComponent} from '../../../model/encor-component';
import {RaiseCaseEncorInformationPageComponent} from './raise-case-encor-information-page/encor-information-page.component';

export enum RaiseCasePageType {
  CASE_INFORMATION     = 'case-information-page',
  CONFIRMATION         = 'confirmation-page',
  ENCOR_INFORMATION    = 'encor-information-page',
  CUSTOMER_INFORMATION = 'customer-information-page',
  MERCHANT_INFORMATION = 'merchant-information-page',
  RECEIPT_INFORMATION  = 'receipt-information-page',
  RESULTS              = 'results-page'
}

export class RaiseCaseWizard extends AbstractWizard<RaiseCaseWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'raise-case';
  startingPageKey: string = RaiseCasePageType.CASE_INFORMATION;

  constructor () {
    super ();
    this.model     = new RaiseCaseWizardModel ();
    this.doRefresh = false;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      isFailed: this.currentPageKey === RaiseCasePageType.RESULTS && !this.model.newCase,
      sessionClass: this.model.sessionClass,
      sessionType: this.model.sessionType ? this.model.sessionType.name : null,
      queue: this.model.queue ? this.model.queue.systemName : null
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( RaiseCasePageType.CASE_INFORMATION, RaiseCaseCaseInformationPageComponent );
    pageMap.set ( RaiseCasePageType.ENCOR_INFORMATION, RaiseCaseEncorInformationPageComponent );
    pageMap.set ( RaiseCasePageType.CUSTOMER_INFORMATION, RaiseCaseCustomerInformationPageComponent );
    pageMap.set ( RaiseCasePageType.MERCHANT_INFORMATION, RaiseCaseMerchantInformationPageComponent );
    pageMap.set ( RaiseCasePageType.RECEIPT_INFORMATION, RaiseCaseReceiptInformationPageComponent );
    pageMap.set ( RaiseCasePageType.CONFIRMATION, RaiseCaseConfirmationPageComponent );
    pageMap.set ( RaiseCasePageType.RESULTS, RaiseCaseResultsPageComponent );
  }

  preProcess (): Observable<any> {
    this.pages.get ( RaiseCasePageType.CUSTOMER_INFORMATION ).instance.isIgnored = true;
    this.pages.get ( RaiseCasePageType.ENCOR_INFORMATION ).instance.isIgnored = true;
    this.pages.get ( RaiseCasePageType.MERCHANT_INFORMATION ).instance.isIgnored = true;
    this.pages.get ( RaiseCasePageType.RECEIPT_INFORMATION ).instance.isIgnored  = true;
    return of ( null );
  }
}

export class RaiseCaseWizardModel {
  customerComponent: CustomerComponent;
  encorComponent: EncorComponent;
  hasCustomerComponent: boolean  = false;
  hasEncorComponent: boolean     = false;
  hasMerchantComponent: boolean  = false;
  hasReceiptComponent: boolean   = false;
  merchantComponent: MerchantComponent;
  newCase: Session;
  queue: SessionQueue;
  receiptComponent: ReceiptComponent;
  selection: Selection<any>;
  session: Session;
  sessionClass: SessionClassType = SessionClassType.CASE;
  sessionType: SessionType;
}
