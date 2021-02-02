import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {
  MaplesAccountCodeDescription,
  MaplesCard,
  MaplesFundingSource,
  MaplesPlatform,
  MaplesRule,
  MaplesStatus
} from '@cscore/maples-client-model';
import {Permission} from '../../core/auth/permission';
import {ActionService} from './action-service';
import {SecurityService} from '../../core/security/security.service';
import {WizardRunner} from '../../core/wizard/wizard-runner/wizard-runner.service';
import {Session} from '../../core/session/model/session';
import {Selection, SelectionDataType} from '../../core/session/model/selection';
import {ActionToolbarButtonStatus} from '../../core/action-toolbar/action-toolbar-button-status';
import {ChangeAccountStatusWizard} from '../../core/action/account-actions/change-account-status-wizard/change-account-status-wizard';
import {Customer} from '../../core/customer/customer';
import {ServeAdjustBalanceWizard} from '../../core/action/serve-actions/serve-adjust-balance-wizard/serve-adjust-balance-wizard';
import {PlatformType} from '../../core/platform/platform-type.enum';
import {ServeAccountStatus} from '../../core/model/account/serve-account-status.enum';
import {IdentifierType} from '../../core/session/model/identifier-type.enum';
import {AuditActivityType} from '../../core/audit/audit-activity-type.enum';
import {ReplaceServeCardWizard} from './replace-serve-card-wizard/replace-serve-card-wizard';
import {ViewBlockedMerchantsWizard} from '../../core/action/serve-actions/serve-view-blocked-merchants-wizard/view-blocked-merchants-wizard';
import {ServeSendFormsWizard} from '../wizards/serve-send-forms-wizard/serve-send-forms-wizard';
import {ServeCloseAccountWizard} from '../wizards/serve-close-account-wizard/serve-close-account-wizard';
import {AccountToAccountTransferWizard} from './account-to-account-transfer/account-to-account-transfer-wizard';
import {CustomerAccountService} from '../../core/customer-account/customer-account.service';
import {RefundAccountWizard} from './refund-account-action-wizard/refund-account-action-wizard';

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountActionService extends ActionService {

  constructor(securityService: SecurityService,
              private customerAccountService: CustomerAccountService,
              private wizardRunner: WizardRunner) {
    super(securityService);
  }

  doAllChecksForSelection(session: Session, selection: Selection<any>): Observable<ActionToolbarButtonStatus[]> {
    return forkJoin([
      this.checkChangeAccountStatus(session, selection),
      this.checkCloseAccount(session, selection),
      this.checkAdjustBalance(session, selection),
      this.checkRefundAccount(session, selection),
      this.checkServeReplaceCard(session, selection),
      this.checkViewBlockedMerchants(session, selection),
      this.checkSendForms(session, selection),
      this.checkTransferFunds(session, selection)
    ]);
  }

  checkRefundAccount(session: Session, selection: Selection<SelectionDataType>): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus();
    action.label     = 'Refund';
    action.isVisible = this.isSelectionDataLoaded(selection);
    action.onClick   = () => {
      let wizard             = new RefundAccountWizard();
      wizard.model.accountId = selection.getCustomerAccount().id;
      wizard.model.platform  = MaplesPlatform.SERVE;
      wizard.model.address   = selection.getCustomerAccount().customer.getPrimaryAddress();
      wizard.model.linkedAccounts = selection.getCustomerAccount().customer.fundingSources.filter((fundingSource: MaplesFundingSource) => {
        return fundingSource.sourceType === 'Bank';
      });
      wizard.model.request.method = 'CHECK';
      wizard.model.request.amount = '0.00';
      wizard.model.balance = selection.getCustomerAccount().getBalanceType('Master', 'AVAILABLE').amount;
      wizard.model.identifierType = IdentifierType.ACCOUNT_ID;
      wizard.model.auditActivityType = AuditActivityType.REFUND_ACCOUNT;
      this.wizardRunner.run(wizard);
    };

    if (!this.securityService.hasPermission(Permission.SERVE_REFUND)) {
      action.disabledReason = ActionService.NO_PERMISSION;
    }

    return of(action);
  }

  checkSendForms(session: Session, selection: Selection<SelectionDataType>): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus();
    action.label     = 'Send Forms';
    action.isVisible = this.isSelectionDataLoaded(selection);
    action.onClick   = () => {
      let wizard             = new ServeSendFormsWizard();
      wizard.model.accountId = selection.getCustomerAccount().id;
      wizard.model.platform  = MaplesPlatform.SERVE;
      this.wizardRunner.run(wizard);
    };

    if (!this.securityService.hasPermission(Permission.SERVE_SEND_FORM)) {
      action.disabledReason = ActionService.NO_PERMISSION;
    }

    return of(action);
  }

  checkChangeAccountStatus(session: Session, selection: Selection<SelectionDataType>): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus();
    action.label     = 'Change Status';
    action.isVisible = this.isSelectionDataLoaded(selection);
    action.onClick   = () => {
      let wizard                                            = new ChangeAccountStatusWizard();
      wizard.model.currentStatus                            = selection.getCustomerAccount().getAccountStatus().name;
      wizard.model.currentReason                            = selection.getCustomerAccount().getAccountStatus().description;
      wizard.model.accountChangeStatusRequest.accountStatus = wizard.model.currentStatus;
      wizard.model.accountId                                = selection.getCustomerAccount().id;
      wizard.model.platform                                 = MaplesPlatform.SERVE;
      this.wizardRunner.run(wizard);
    };

    if (!this.securityService.hasPermission(Permission.SERVE_CHANGE_ACCOUNT_STATUS)) {
      action.disabledReason = ActionService.NO_PERMISSION;
    }
    if (selection.getCustomerAccount().getAccountStatus().description === MaplesAccountCodeDescription.PERMANENTLYCLOSED) {
      action.disabledReason = 'Status cannot be PERMANENTLYCLOSED';
    }
    return of(action);
  }

  /**
   * Launch wizard to close account and all sub accounts.
   *
   * @param session
   * @param selection
   */
  checkCloseAccount(session: Session, selection: Selection<SelectionDataType>): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus();
    action.label     = 'Close Account';
    action.isVisible = this.isSelectionDataLoaded(selection);
    action.onClick = () => {
      let wizard             = new ServeCloseAccountWizard();
      wizard.model.account = selection.getCustomerAccount();
      wizard.model.platform  = MaplesPlatform.SERVE;
      this.wizardRunner.run(wizard);
    };

    if (!this.securityService.hasPermission(Permission.CLOSE_ACCOUNT)) {
      action.disabledReason = ActionService.NO_PERMISSION;
    }
    let accountStatus: MaplesStatus = selection.getCustomerAccount().getAccountStatus();
    if (accountStatus.name.toLowerCase() !== 'open') {
      action.disabledReason = 'The account must be open.';
    }

    if (selection.getCustomerAccount().getCurrentBalance()
      && this.isValuePositive(selection)) {
      action.disabledReason = 'The balance must be <= $0.00';
    }

    return of(action);
  }

  checkServeReplaceCard(session: Session, selection: Selection<SelectionDataType>): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus();
    action.label     = 'Replace Card';
    action.isVisible = true;

    let card: MaplesCard     = selection.getCustomerAccount().getPrimaryCard();
    let status: MaplesStatus = selection.getCustomerAccount().getCardStatus();

    action.onClick = () => {
      let wizard                     = new ReplaceServeCardWizard();
      wizard.model.request.accountId = selection.getCustomerAccount().id;
      wizard.model.primaryAddress    = selection.getCustomerAccount().customer.getPrimaryAddress();
      wizard.model.cardId            = card.identifiers.cardId;
      wizard.model.pan               = card.identifiers.pan;
      wizard.model.platform          = selection.getMaplesPlatform();
      wizard.model.identifier        = wizard.model.request.accountId;
      wizard.model.identifierType    = IdentifierType.ACCOUNT_ID;
      this.wizardRunner.run(wizard);
    };

    if (!this.securityService.hasPermission(Permission.SERVE_REPLACE_CARD)) {
      action.disabledReason = 'You must have permission to perform this action.';
    } else if (!card || !status || !selection.getCustomerAccount().getAccountStatus()) {
      action.disabledReason = 'There is no active card.';
    } else if (selection.getCustomerAccount().getAccountStatus().name !== 'OPEN') {
      action.disabledReason = 'The account must be open.';
    } else if (status.description !== 'Open' && status.description !== 'PendingActivation') {
      action.disabledReason = 'The card must be open or pending activation.';
    }

    return of(action);
  }

  checkAdjustBalance(session: Session, selection: Selection<Customer>): Observable<ActionToolbarButtonStatus> {
    const action     = new ActionToolbarButtonStatus();
    action.label     = 'Adjust Balance';
    action.isVisible = this.isSelectionDataLoaded(selection);
    action.onClick   = () => {
      const wizard                   = new ServeAdjustBalanceWizard();
      wizard.model.selection         = selection;
      wizard.model.identifier        = selection.getCustomerAccount().id;
      wizard.model.identifierType    = IdentifierType.ACCOUNT_ID;
      wizard.model.auditActivityType = AuditActivityType.ADJUST_BALANCE;
      this.wizardRunner.run(wizard);
    };

    if (this.isAbleToPerformActions(session, selection, action)) {
      // Must have permission
      if (selection.platform === PlatformType.SERVE && !this.securityService.hasPermission(Permission.SERVE_ADJUST_BALANCE)) {
        action.disabledReason = ActionService.NO_PERMISSION;
      } else {
        const accountStatus = selection.getCustomerAccount().getAccountStatus();

        if (accountStatus.name === ServeAccountStatus.CLOSED
          || accountStatus.name === ServeAccountStatus.PERMANENTLY_CLOSED) {
          action.disabledReason = 'Account must not be in Closed status to perform this action.';
        }
      }
    }

    return of(action);
  }

  checkViewBlockedMerchants(session: Session, selection: Selection<SelectionDataType>): Observable<ActionToolbarButtonStatus> {
    const action     = new ActionToolbarButtonStatus();
    action.label     = 'View Blocked Merchants';
    action.isVisible = this.isSelectionDataLoaded(selection);
    action.onClick   = () => {
      const wizard           = new ViewBlockedMerchantsWizard();
      wizard.model.selection = selection;
      this.wizardRunner.run(wizard);
    };

    if (!this.activeBlockedMerchants(selection)) {
      action.disabledReason = 'There are no active blocked merchants for this account.';
    }

    return of(action);
  }

  private isValuePositive(selection: Selection<SelectionDataType>): boolean {
    let availableBalance = selection.getCustomerAccount().getCurrentBalance().balance.find(balance => balance.type === 'AVAILABLE');
    return availableBalance && (availableBalance.amount.value > 0);
  }

  private activeBlockedMerchants(selection: Selection<SelectionDataType>): boolean {
    let active = selection.blockedMerchants ? selection.blockedMerchants.filter((blockedMerchants: MaplesRule) => blockedMerchants.status === 'ACTIVE') : [];
    return active.length > 0;
  }

  checkTransferFunds(session: Session, selection: Selection<SelectionDataType>): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus();
    action.label     = 'Transfer Funds';
    action.isVisible = this.isSelectionDataLoaded(selection);

    action.onClick = () => {
      let wizard             = new AccountToAccountTransferWizard(this.customerAccountService, this.securityService);
      wizard.model.selection = selection;
      this.wizardRunner.run(wizard);
    };

    if (!this.securityService.hasPermission(Permission.SERVE_TRANSFER_FUNDS)) {
      action.disabledReason = ActionService.NO_PERMISSION;
    }
    let accountStatus: MaplesStatus = selection.getCustomerAccount().getAccountStatus();
    if (accountStatus.name.toLowerCase() !== 'open') {
      action.disabledReason = 'The account must be open.';
    }

    return of(action);
  }
}
