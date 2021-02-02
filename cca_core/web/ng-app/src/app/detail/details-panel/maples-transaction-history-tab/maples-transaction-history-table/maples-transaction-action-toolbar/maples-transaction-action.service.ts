import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  MaplesNode,
  MaplesPlatform,
  MaplesRule,
  MaplesTransaction,
  MaplesTransactionAlerts,
  MaplesTransactionAmounts,
  MaplesTransactionDevice,
  MaplesTransactionFeeInfo,
  MaplesTransactionRequest,
  MaplesTransactionResponse,
  MaplesTransactionSettlement,
  MaplesTransactionType
} from '@cscore/maples-client-model';
import {ActionToolbarButtonStatus} from 'src/app/core/action-toolbar/action-toolbar-button-status';
import {AppState} from 'src/app/app-state';
import {AppStateType} from 'src/app/app-state-type.enum';
import {SecurityService} from 'src/app/core/security/security.service';
import {SessionState} from 'src/app/core/session/session-state';
import {snapshot} from 'src/app/core/store-utils/store-utils';
import {WizardRunner} from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import {ActionService} from '../../../../selection-action-toolbar/action-service';
import {PropertyService} from '../../../../../core/config/property.service';
import {Session} from '../../../../../core/session/model/session';
import {Selection, SelectionDataType} from '../../../../../core/session/model/selection';
import {Permission} from '../../../../../core/auth/permission';
import {MaplesTransactionDetailsWizard} from '../../maples-transaction-details-wizard/maples-transaction-details-wizard';
import {MaplesTransactionBlockMerchantWizard} from '../../maples-transaction-block-merchant-wizard/maples-transaction-block-merchant-wizard';
import {IdentifierType} from '../../../../../core/session/model/identifier-type.enum';
import {AuditActivityType} from '../../../../../core/audit/audit-activity-type.enum';
import {ServeRaiseDisputeWizard} from '../../../../../core/action/serve-actions/serve-raise-dispute/serve-raise-dispute-wizard';
import {ServeCancelTransactionWizard} from '../../../../wizards/serve-cancel-transaction-wizard/serve-cancel-transaction-wizard';
import {DateService} from '../../../../../core/date/date.service';
import {MaplesTransactionService} from '../../../../../core/transaction/maples-transaction.service';
import {ServeAdjustTransactionWizard} from '../../../../wizards/serve-adjust-transaction/serve-adjust-transaction-wizard';
import {switchMap, tap} from 'rxjs/operators';
import {SetSelectionMaplesTransactionsAction} from 'src/app/core/session/action/session-actions';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaplesTransactionActionService extends ActionService {

  public static readonly NOT_POSITIVE = 'Transaction must be positive';

  constructor(
    securityService: SecurityService,
    private store: Store<AppState>,
    private wizardRunner: WizardRunner,
    private dateService: DateService,
    private maplesTransactionService: MaplesTransactionService
  ) {
    super(securityService);
  }

  doAllChecksForScheduledTransaction(transaction: MaplesTransaction): ActionToolbarButtonStatus[] {
    const sessionState: SessionState = snapshot(this.store, AppStateType.SESSION_STATE);
    const session                    = sessionState && sessionState.session;
    const selection                  = sessionState.selection;

    let actions: ActionToolbarButtonStatus[] = [];
    actions.push(this.checkCancelTransaction(session, selection, transaction));

    return actions;
  }

  private checkCancelTransaction(session: Session, selection: Selection<SelectionDataType>, transaction: MaplesTransaction): ActionToolbarButtonStatus {
    const action     = new ActionToolbarButtonStatus();
    action.label     = 'Cancel Transaction';
    action.isVisible = true;
    action.onClick   = () => {
      const wizard                              = new ServeCancelTransactionWizard();
      wizard.model.transaction                  = transaction;
      wizard.model.eventId                      = transaction.schedule.accountEventId;
      wizard.model.request.type                 = 'EXCLUSION';
      wizard.model.request.date                 = this.dateService.convertMMDDYYYYHHmmZToYYYYMMDDUtc(transaction.schedule.eventDate.displayValue);
      wizard.model.request.amount               = transaction.amounts.authorizedAmount.value.toString();
      wizard.model.request.currencyCode         = '840';
      wizard.model.request.accountId            = selection.getCustomerAccount().id;
      wizard.model.request.isCancelFullSchedule = false;
      wizard.model.platform = selection.getMaplesPlatform();

      this.wizardRunner.run(wizard)
        .afterClosed()
        .subscribe(() => this.maplesTransactionService.scheduledTransactionsRefreshed.next(true));
    };

    if (this.isAbleToPerformActions(session, selection, action)) {
      if (!this.securityService.hasPermission(Permission.SERVE_CANCEL_TRANSACTION)) {
        action.disabledReason = ActionService.NO_PERMISSION;
      } else if (transaction.schedule.overrideStatus && transaction.schedule.overrideStatus === 'CANCELLED') {
        action.disabledReason = 'Transaction already cancelled';
      }
    }

    return action;
  }

  doAllChecksForTransaction(transaction: MaplesTransaction, preauthTransaction: MaplesTransaction): ActionToolbarButtonStatus[] {
    const sessionState: SessionState = snapshot(this.store, AppStateType.SESSION_STATE);
    const session                    = sessionState && sessionState.session;
    const selection                  = sessionState.selection;

    return [
      this.checkViewFullTransactionDetails(session, selection, transaction,preauthTransaction),
      this.checkBlockMerchant(session, selection, transaction),
      this.checkDisputeTransaction(session, selection, transaction),
      this.checkCancelPreauth(session, selection, transaction),
      this.checkAdjustTransaction(session, selection, transaction),
    ];
  }

  private checkCancelPreauth(session: Session, selection: Selection<SelectionDataType>, transaction: MaplesTransaction): ActionToolbarButtonStatus {
    const action = new ActionToolbarButtonStatus();
    action.label = 'Cancel PreAuth';
    action.isVisible = true;
    action.onClick = () => {
      const wizard = new ServeCancelTransactionWizard();
      wizard.model.accountId = selection.getCustomerAccount().id;
      wizard.model.transaction = transaction;
      wizard.model.isPreauth = true;
      wizard.model.platform = selection.getMaplesPlatform();

      this.wizardRunner.run(wizard)
        .afterClosed()
        .pipe(switchMap(() => this.refreshTransactions(selection)))
        .subscribe();
    };

    if (this.isAbleToPerformActions(session, selection, action)) {
      if (!this.securityService.hasPermission(Permission.SERVE_CANCEL_PREAUTH_TRANSACTION)) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      // PreAuth filter must be applied
      else if (selection.transactionRequests.maplesCurrent.filters.accountType !== MaplesTransactionType.PREAUTH) {
        action.disabledReason = 'Transaction must be preauth';
      }
      // A preauth transaction must be in status 'OPEN', not MATCHED, CANCELLED, or EXPIRED (the other possible preauth statuses)
      else if (transaction.status !== 'OPEN') {
        action.disabledReason = 'Transaction must be pending';
      }
    }

    return action;
  }

  private checkAdjustTransaction(session: Session, selection: Selection<SelectionDataType>, transaction: MaplesTransaction): ActionToolbarButtonStatus {
    const action     = new ActionToolbarButtonStatus();
    action.label     = 'Adjust Transaction';
    action.isVisible = true;
    action.onClick   = () => {
      const wizard = new ServeAdjustTransactionWizard();
      wizard.model.transaction = transaction;
      wizard.model.accountId = selection.getCustomerAccount().id;
      wizard.model.platform = selection.getMaplesPlatform();
      const card = selection.getCustomerAccount().cards.find(card => card.identifiers.pan.endsWith(transaction.identifiers.cardNumber.slice(-4)));
      wizard.model.cardId = card && card.id || card.identifiers.cardId;

      this.wizardRunner.run(wizard)
        .afterClosed()
        .pipe(switchMap(() => this.refreshTransactions(selection)))
        .subscribe();
    };

    if (this.isAbleToPerformActions(session, selection, action)) {
      if (!this.securityService.hasPermission(Permission.SERVE_ADJUST_TRANSACTION)) {
        action.disabledReason = ActionService.NO_PERMISSION;
      } else if (!transaction.alerts.isAdjustable) {
        action.disabledReason = 'Transaction is not adjustable';
      } else if (!transaction.amounts || !transaction.amounts.authorizedAmount || transaction.amounts.authorizedAmount.isZero()) {
        action.disabledReason = 'Transaction amount must not be zero';
      }
    }

    return action;
  }

  private checkViewFullTransactionDetails(session: Session, selection: Selection<SelectionDataType>, transaction: MaplesTransaction, preauthTransaction: MaplesTransaction): ActionToolbarButtonStatus {
    let merchant     = transaction.nodes.find((node) => node.type.toLowerCase() === 'merchant');
    const action     = new ActionToolbarButtonStatus();
    action.label     = 'View All Details';
    action.isVisible = true;
    action.onClick   = () => {
      const wizard             = new MaplesTransactionDetailsWizard();
      wizard.model.transaction = transaction;
      wizard.model.preauthTransaction = preauthTransaction;
      wizard.model.amounts     = (transaction.amounts) ? transaction.amounts : new MaplesTransactionAmounts();
      wizard.model.device      = (transaction.device) ? transaction.device : new MaplesTransactionDevice();
      wizard.model.feeInfo     = (transaction.feeInfo) ? transaction.feeInfo : new MaplesTransactionFeeInfo();
      wizard.model.request     = (transaction.request) ? transaction.request : new MaplesTransactionRequest();
      wizard.model.response    = (transaction.response) ? transaction.response : new MaplesTransactionResponse();
      wizard.model.settlement  = (transaction.settlement) ? transaction.settlement : new MaplesTransactionSettlement();
      wizard.model.alerts      = (transaction.alerts) ? transaction.alerts : new MaplesTransactionAlerts();
      wizard.model.nodes       = (transaction.nodes) ? transaction.nodes : null;
      wizard.model.merchant    = merchant;
      this.wizardRunner.run(wizard);
    };

    if (this.isAbleToPerformActions(session, selection, action)) {
      if (!this.securityService.hasPermission(Permission.HISTORY_FULL_VIEW)) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
    }
    return action;
  }

  private checkBlockMerchant(session: Session, selection: Selection<SelectionDataType>, transaction: MaplesTransaction): ActionToolbarButtonStatus {
    let merchant     = transaction.nodes.find((node) => node.type.toLowerCase() === 'merchant');
    const action     = new ActionToolbarButtonStatus();
    action.label     = 'Block Merchant';
    action.isVisible = true;
    action.onClick   = () => {
      const wizard                   = new MaplesTransactionBlockMerchantWizard();
      wizard.model.selection         = selection;
      wizard.model.transaction       = transaction;
      wizard.model.merchant          = merchant ? merchant : null;
      wizard.model.identifier        = selection.getCustomerAccount().id;
      wizard.model.identifierType    = IdentifierType.ACCOUNT_ID;
      wizard.model.auditActivityType = AuditActivityType.BLOCK_MERCHANT;

      this.wizardRunner.run(wizard);
    };

    if (this.isAbleToPerformActions(session, selection, action)) {
      if (!this.securityService.hasPermission(Permission.HISTORY_FULL_VIEW)) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      // must have a merchant and must not be blocked
      if (this.isMerchantBlocked(merchant, selection) || merchant == null) {
        action.disabledReason = 'There is no available merchant to block in this transaction.';
      }
    }

    return action;
  }

  private checkDisputeTransaction(session: Session, selection: Selection<SelectionDataType>, transaction: MaplesTransaction): ActionToolbarButtonStatus {
    const action     = new ActionToolbarButtonStatus();
    action.label     = 'Dispute';
    action.isVisible = true;
    action.onClick   = () => {
      const wizard              = new ServeRaiseDisputeWizard();
      wizard.model.selection    = selection;
      wizard.model.session      = session;
      wizard.model.transactions = [transaction];

      this.wizardRunner.run(wizard);
    };

    if (this.isAbleToPerformActions(session, selection, action)) {
      if (!transaction.alerts.isDisputable) {
        action.disabledReason = 'Transaction must be disputable';
      } else if (!this.securityService.hasPermission(Permission.SERVE_RAISE_DISPUTE)) {
        action.disabledReason = ActionService.NO_PERMISSION;
      } else if (!transaction.amounts || transaction.amounts.authorizedAmount.isPositive()) {
        action.disabledReason = 'Transaction must be negative';
      }
    }

    return action;
  }

  private isMerchantBlocked(merchant: MaplesNode, selection: Selection<SelectionDataType>): boolean {
    if (merchant) {
      if (selection.blockedMerchants.find((rule: MaplesRule) => (rule.merchantId === merchant.id) && rule.status.toLowerCase() === 'active')) {
        return true;
      }
    }
    return false;
  }

  private refreshTransactions(selection: Selection<SelectionDataType>): Observable<any> {
    return this.maplesTransactionService
      .searchForSelection(selection)
      .pipe(
        tap(transactions => {
          selection.maplesTransactions = transactions;
          this.store.dispatch(new SetSelectionMaplesTransactionsAction(selection));
        })
      );
  }
}
