import {Type} from '@angular/core';
import {CsCoreAddress, CsCorePhoneNumber} from '@cscore/core-client-model';
import {AbstractWizard} from 'src/app/core/wizard/abstract-wizard';
import {DeliveryMethod} from 'src/app/core/model/minion/task/delivery-method';
import {Selection, SelectionDataType} from 'src/app/core/session/model/selection';
import {WizardPage} from 'src/app/core/wizard/wizard-page';
import {Session} from 'src/app/core/session/model/session';
import {SessionQueue} from '../../../session/model/session-queue';
import {GenericOption} from '../../../model/generic-option';
import {ActionReasonCodeMapping} from '../../../mapping/action-reason-code-mapping';
import {SessionType} from '../../../session/model/session-type';
import {ServeRaiseDisputeFormPageComponent} from './serve-raise-dispute-form-page/serve-raise-dispute-form-page.component';
import {ServeRaiseDisputeConfirmationPageComponent} from './serve-raise-dispute-confirmation-page/serve-raise-dispute-confirmation-page.component';
import {ServeRaiseDisputeResultPageComponent} from './serve-raise-dispute-result-page/serve-raise-dispute-result-page.component';
import {MaplesAccountCode, MaplesDisputeTransactionRequest, MaplesTransaction} from '@cscore/maples-client-model';

export enum RaiseDisputePageType {
  FORM         = 'form-page',
  CONFIRMATION = 'confirmation-page',
  RESULT       = 'result-page',
}

export class ServeRaiseDisputeWizard extends AbstractWizard<ServeRaiseDisputeWizardModel> {
  displayStepper: boolean = true;
  key: string = 'raise-dispute-serve';
  startingPageKey: string = RaiseDisputePageType.FORM;

  constructor() {
    super();
    this.model     = new ServeRaiseDisputeWizardModel();
    this.doRefresh = true;
  }

  buildCodexRequest(formValue: any): any {
    return {
      'wizard-key': this.key
    };
  }

  initPages(pageMap: Map<string, Type<WizardPage<any>>>): void {
    pageMap.set(RaiseDisputePageType.FORM, ServeRaiseDisputeFormPageComponent);
    pageMap.set(RaiseDisputePageType.CONFIRMATION, ServeRaiseDisputeConfirmationPageComponent);
    pageMap.set(RaiseDisputePageType.RESULT, ServeRaiseDisputeResultPageComponent);
  }
}

export class ServeRaiseDisputeWizardModel {
  isLoadDispute: boolean = false;
  loadDisputeAmount: string;
  transactionId: string;
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
  isGreenCard: boolean                              = false;
  isTransactionsDisputed: boolean;
  mobilePhone: CsCorePhoneNumber;
  phoneNumber: CsCorePhoneNumber;
  queue: SessionQueue;
  queueOptions: GenericOption<SessionQueue>[]       = [];
  returnedSession: Session;
  reasonOptions: GenericOption<MaplesAccountCode>[] = [];
  reason: MaplesAccountCode;
  selection: Selection<SelectionDataType>;
  session: Session;
  shouldReplaceCard: boolean;
  success: boolean                                  = true;
  transactions: MaplesTransaction[]                 = [];
  typeOptions: GenericOption<SessionType>[]         = [];

  disputeRequest: MaplesDisputeTransactionRequest;
}
