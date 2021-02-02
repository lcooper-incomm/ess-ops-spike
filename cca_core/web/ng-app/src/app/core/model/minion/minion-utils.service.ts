import {Injectable} from '@angular/core';
import {MinionFormType, TaskSendableForm} from 'src/app/core/model/minion/task/task-sendable-form';
import {Selection} from "../../session/model/selection";
import {Customer} from "../../customer/customer";
import {MinionCardHolder} from "./minion-card-holder";
import {CsCoreCodeType, CsCoreTimestamp} from "@cscore/core-client-model";
import * as moment from "moment";
import {VmsSendFormWizardModel} from "../../action/vms-actions/vms-send-form-wizard/vms-send-form-wizard";
import {SendDirectDepositFormTask} from "./task/send-direct-deposit-form-task";
import {SecurityService} from "../../security/security.service";
import {SendAccountStatementTask} from "./task/send-account-statement-task";
import {
  RaiseDisputeWizardModel
} from '../../action/vms-actions/raise-dispute/raise-dispute-wizard';
import {SendDisputeDocumentTask} from "./task/send-dispute-document-task";
import {Card} from '../../card/card';
import {FsapiStatusType} from '../../status/fsapi-status/fsapi-status-type.enum';
import {MinionDisputedTransaction} from './minion-disputed-transaction';
import {Transaction} from '../../transaction/transaction';
import {MinionDisputedTransactionType} from './minion-disputed-transaction-type.enum';
import {PlatformType} from "../../platform/platform-type.enum";
import {SelectionType} from "../../session/model/selection-type.enum";
import {ViewDisputeWizardModel} from "../../action/vms-actions/view-dispute/view-dispute-wizard";


@Injectable({
  providedIn: 'root'
})
export class MinionUtilsService {

  public static readonly ACCOUNT_STATEMENT_FORMAT: string = 'MM/DD/YYYY';

  constructor(private securityService: SecurityService) {
  }

  cardHolderFromCustomer(customer: Customer): MinionCardHolder {
    let cardHolder: MinionCardHolder;
    if (customer) {
      cardHolder           = new MinionCardHolder();
      cardHolder.address   = customer.getPreferredAddress();
      cardHolder.firstName = customer.firstName;
      cardHolder.lastName  = customer.lastName;
    }

    return cardHolder;
  }

  convertCsCoreTimestampToDateStringForAccountStatement(inputDate: CsCoreTimestamp): string {
    let dateString = null;
    if (inputDate) {
      dateString = this.convertDateToStringForAccountStatement(inputDate.value);
    }
    return dateString;
  }

  convertDateToStringForAccountStatement(inputDate: Date): string {
    let dateString = null;
    if (inputDate) {
      dateString = moment(inputDate).format(MinionUtilsService.ACCOUNT_STATEMENT_FORMAT);
    }

    return dateString;
  }

  createAccountStatementTaskFromSendFormWizard(model: VmsSendFormWizardModel): SendAccountStatementTask {
    let task: SendAccountStatementTask = new SendAccountStatementTask();
    if (model) {
      this.populateCoreSendableFormFields(model.selection, task);
      task.deliveryMethod = model.deliveryMethod.code;
      task.endDate        = model.endDate;
      task.fax            = model.faxNumber ? model.faxNumber.number : null;
      task.startDate      = model.startDate;
      task.waiveFee       = model.waiveFee;

      // use info on the wizard model for VMS Gift
      if (model.selection.getCustomer().isVmsGiftCard) {
        task.email      = model.email;
        task.cardholder = this.createCardholderFromSendFormWizard(model);
      }
      // else get info from selection
      else {
        task.email      = model.selection.getCustomer().emailAddress;
        task.cardholder = this.cardHolderFromCustomer(model.selection.getCustomer());
      }
    }

    return task;
  }

  createCardholderFromSendFormWizard(model: VmsSendFormWizardModel): MinionCardHolder {
    let cardholder: MinionCardHolder;
    if (model) {
      cardholder = new MinionCardHolder({
        firstName: model.missingFirstName,
        lastName: model.missingLastName,
        address: model.confirmedAddress
      });
    }

    return cardholder;
  }

  createDirectDepositTaskFromSendFormWizard(model: VmsSendFormWizardModel): SendDirectDepositFormTask {
    let task: SendDirectDepositFormTask = new SendDirectDepositFormTask();
    if (model) {
      this.populateCoreSendableFormFields(model.selection, task);
      task.deliveryMethod = model.deliveryMethod.code;
      task.fax            = model.faxNumber ? model.faxNumber.number : null;
      task.email          = model.selection.getCustomer().emailAddress;
      task.cardholder     = this.cardHolderFromCustomer(model.selection.getCustomer());
    }

    return task;
  }

  createDisputeTaskFromWizard(model: RaiseDisputeWizardModel): SendDisputeDocumentTask {
    const task = new SendDisputeDocumentTask();

    if (model) {
      const selection = model.selection;
      const customer  = model.selection.getCustomer();
      const card      = this.getBestCardFromList(customer.cards);

      this.populateCoreSendableFormFields(selection, task);

      if (selection.platform === PlatformType.VMS) {
        task.accountNumber = customer.accounts.spending.accountNumber;
        task.customerName  = customer.isVmsGiftCard ? model.firstName + ' ' + model.lastName : customer.getDisplayName();
      } else if (selection.platform === PlatformType.GREENCARD) {
        task.customerName = model.returnedSession.customerComponent.getDisplayName();

      }

      task.addressLine1         = model.address.line1;
      task.addressLine2         = model.address.line2;
      task.addressCity          = model.address.city;
      task.addressState         = model.address.state;
      task.addressPostalCode    = model.address.postalCode;
      task.deliveryMethod       = model.deliveryMethod.code;
      task.disputedTransactions = this.buildTransactions(model.transactions);
      task.email                = model.email;
      task.fax                  = model.fax;
      task.formType             = this.getFormType(model);
      task.landLinePhoneNumber  = model.homePhone ? model.homePhone.number : null;
      task.maskedPan            = model.transactions.length === 1 ? model.transactions[0].identifiers.pan : card.identifiers.pan;
      task.mobilePhoneNumber    = model.mobilePhone ? model.mobilePhone.number : null;
      task.reason               = model.reason ? model.reason.displayValue : 'Not Available';
      task.sessionId            = model.session.id;

      return task;
    } else {
      return new SendDisputeDocumentTask();
    }
  }

  createDisputeTaskFromViewDisputeWizard(model: ViewDisputeWizardModel): SendDisputeDocumentTask {
    const task = new SendDisputeDocumentTask();
    if (model) {
      const disputedTransaction           = new MinionDisputedTransaction();
      disputedTransaction.amount          = model.session.disputeComponent.transactions[0].amount.displayValue;
      disputedTransaction.merchantName    = model.session.disputeComponent.transactions[0].merchantName;
      disputedTransaction.transactionDate = model.session.disputeComponent.transactions[0].businessDate.getAsMilliseconds();
      disputedTransaction.type            = null;

      const selection = model.selection;
      this.populateCoreSendableFormFields(selection, task);
      task.customerName = model.session.customerComponent.getDisplayName();

      task.addressLine1         = model.session.customerComponent.address.line1;
      task.addressLine2         = model.session.customerComponent.address.line2;
      task.addressCity          = model.session.customerComponent.address.city;
      task.addressState         = model.session.customerComponent.address.state;
      task.addressPostalCode    = model.session.customerComponent.address.postalCode;
      task.deliveryMethod       = model.dispute.deliveryMethod.code;
      task.disputedTransactions = [disputedTransaction];
      task.email                = model.dispute.emailAddress;
      task.fax                  = model.dispute.fax;
      task.formType             = this.getFormType(model);
      task.landLinePhoneNumber  = model.dispute.homePhone ? model.dispute.homePhone.number : null;
      task.mobilePhoneNumber    = model.dispute.mobilePhone ? model.dispute.mobilePhone.number : null;
      task.maskedPan            = model.transaction.identifiers.pan;
      task.reason               = model.dispute.reasonCode ? model.dispute.reasonCode.displayValue : 'Not Available';
      task.sessionId            = model.session.id;

      return task;
    } else {
      return new SendDisputeDocumentTask();
    }
  }

  private buildTransactions(transactions: Transaction[]): MinionDisputedTransaction[] {
    return transactions.map(transaction => {
      let transactionDate: CsCoreTimestamp = transaction.platform === PlatformType.GREENCARD ? transaction.createDate : transaction.businessDate;

      return new MinionDisputedTransaction({
        amount: transaction.amounts.authorizedAmount.value,
        merchantName: transaction.nodes.merchant && transaction.nodes.merchant.name,
        transactionDate: transactionDate && transactionDate.getAsMilliseconds(),
        type: transaction.platform === PlatformType.GREENCARD ? null : this.getTransactionType(transaction),
      });
    });
  }

  private getBestCardFromList(cards: Card[]) {
    if (cards && cards.length > 0) {
      //Try to find the active card (first one that's not inactive, closed, or expired)
      const activeCard = cards.find(card => {
        const status = card.getFsapiStatus();
        return status && ![FsapiStatusType.INACTIVE, FsapiStatusType.CLOSED, FsapiStatusType.EXPIRED].includes(status);
      });

      return activeCard || cards[0];
    }
  }

  private getFormType(model: RaiseDisputeWizardModel | ViewDisputeWizardModel): MinionFormType {
    if (model.selection.platform === PlatformType.GREENCARD) {
      return MinionFormType.GREENCARD_DISPUTE;
    } else if (model.selection.getCustomer().useCanadianDispute) {
      return MinionFormType.GPR_CANADA_CARD_DISPUTE_EN;
    } else if (model.selection.getCustomer().isVmsGiftCard && model.queue.systemName === 'COLUMBIA_GIFT_CARD') {
      return MinionFormType.GREENCARD_DISPUTE_ES_CO ;
    } else if (model.selection.getCustomer().isVmsGiftCard && model.queue.systemName != 'COLUMBIA_GIFT_CARD' ) {
      return MinionFormType.GIFT_CARD_DISPUTE;
    } else {
      return MinionFormType.GPR_CARD_DISPUTE;
    }
  }

  private getTransactionType(transaction: Transaction): MinionDisputedTransactionType {
    const code = transaction.getCodeByType(CsCoreCodeType.DELIVERY_CHANNEL);
    switch (code && code.code) {
      case '01' :
        return MinionDisputedTransactionType.ATM_WITHDRAWAL;
      case '02' :
        return MinionDisputedTransactionType.POINT_OF_SALE;
      default:
        return MinionDisputedTransactionType.ONLINE_TRANSACTION;
    }
  }

  private populateCoreSendableFormFields(selection: Selection<any>, task: TaskSendableForm):
    void {
    task.submitterName = this.securityService.getCurrentUser().username;
    task.taskOrder     = 0;
    task.platform      = selection.platform;

    if (selection.type === SelectionType.CUSTOMER) {
      task.customerId = selection.getCustomer().id;
      task.partner    = selection.partner.name;
    }
    // delivery method and formType must be populated elsewhere since those things aren't stored easily on the Selection
  }


}
