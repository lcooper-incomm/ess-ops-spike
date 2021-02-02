import {Type} from '@angular/core';
import {AbstractWizard} from 'src/app/core/wizard/abstract-wizard';
import {Customer} from 'src/app/core/customer/customer';
import {DeliveryMethod} from 'src/app/core/model/minion/task/delivery-method';
import {Selection} from 'src/app/core/session/model/selection';
import {Transaction} from 'src/app/core/transaction/transaction';
import {WizardPage} from 'src/app/core/wizard/wizard-page';
import {RaiseDisputeConfirmationPageComponent} from './raise-dispute-confirmation-page/raise-dispute-confirmation-page.component';
import {RaiseDisputeFormPageComponent} from './raise-dispute-form-page/raise-dispute-form-page.component';
import {RaiseDisputeResultPageComponent} from './raise-dispute-result-page/raise-dispute-result-page.component';
import {Session} from 'src/app/core/session/model/session';
import {CsCoreAddress, CsCorePhoneNumber} from "@cscore/core-client-model";
import {RaiseDisputeDocumentPageComponent} from './raise-dispute-document-page/raise-dispute-document-page.component';
import {SessionQueue} from "../../../session/model/session-queue";
import {GenericOption} from "../../../model/generic-option";
import {ActionReasonCodeMapping} from "../../../mapping/action-reason-code-mapping";
import {DisputeProbingQuestion} from "./dispute-probing-question";
import {RaiseDisputeQuestionsPageComponent} from "./raise-dispute-questions-page/raise-dispute-questions-page.component";
import {Observable} from "rxjs";
import {SessionType} from "../../../session/model/session-type";
import {PlatformType} from 'src/app/core/platform/platform-type.enum';
import {RaiseDisputeRequest} from '../models/vms-request-models';

export enum RaiseDisputePageType {
  FORM         = 'form-page',
  QUESTIONS    = 'questions-page',
  DOCUMENT     = 'document-page',
  CONFIRMATION = 'confirmation-page',
  RESULT       = 'result-page',
}

export class RaiseDisputeWizard extends AbstractWizard<RaiseDisputeWizardModel> {
  displayStepper: boolean = true;
  key: string;
  startingPageKey: string = RaiseDisputePageType.FORM;

  constructor () {
    super ();
    this.model     = new RaiseDisputeWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    let reason: ActionReasonCodeMapping = formValue.disputeReason ? formValue.disputeReason : this.model.reason;

    return {
      'wizard-key': this.key,
      reason: reason ? reason.code : null,
      success: this.model.success,
      replaceCard: this.model.shouldReplaceCard
    };
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( RaiseDisputePageType.FORM, RaiseDisputeFormPageComponent );
    pageMap.set ( RaiseDisputePageType.QUESTIONS, RaiseDisputeQuestionsPageComponent );
    pageMap.set ( RaiseDisputePageType.DOCUMENT, RaiseDisputeDocumentPageComponent );
    pageMap.set ( RaiseDisputePageType.CONFIRMATION, RaiseDisputeConfirmationPageComponent );
    pageMap.set ( RaiseDisputePageType.RESULT, RaiseDisputeResultPageComponent );
  }

  preProcess (): Observable<any> {
    if ( this.model.selection.platform === PlatformType.GREENCARD ) {
      this.key = 'raise-dispute-greencard';
    } else if ( this.model.selection.getCustomer ().isVmsGiftCard ) {
      this.key = 'raise-dispute-vms-gift';
    } else {
      this.key = 'raise-dispute-vms-gpr';
    }
    this.pages.get ( RaiseDisputePageType.QUESTIONS ).instance.isIgnored = !this.model.probingQuestions.length;
    return super.preProcess ();
  }
}

export class RaiseDisputeWizardModel {
  address: CsCoreAddress;
  comment: string;
  dateOfBirth: string;
  deliveryMethod: DeliveryMethod;
  disputeType: SessionType;
  email: string;
  fax: string;
  firstName: string;
  lastName: string;
  homePhone: CsCorePhoneNumber;
  isFormSent: boolean;
  isGreenCard: boolean                                    = false;
  isTransactionsDisputed: boolean;
  mobilePhone: CsCorePhoneNumber;
  phoneNumber: CsCorePhoneNumber;
  probingQuestions: DisputeProbingQuestion[]              = [];
  queue: SessionQueue;
  queueOptions: GenericOption<SessionQueue>[]             = [];
  returnedSession: Session;
  reasonOptions: GenericOption<ActionReasonCodeMapping>[] = [];
  reason: ActionReasonCodeMapping;
  selection: Selection<Customer>;
  session: Session;
  shouldReplaceCard: boolean;
  success: boolean                                        = true;
  transactions: Transaction[]                             = [];
  typeOptions: GenericOption<SessionType>[]               = [];

  raiseDisputeRequest: RaiseDisputeRequest;
}
