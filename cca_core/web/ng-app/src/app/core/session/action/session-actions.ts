import { PayloadAction } from "../../payload-action";
import { SelectionAlert } from "../../../detail/selection-alerts-panel/selection-alert";
import { SessionActionType } from "./session-action-type.enum";
import { Comment } from '../../model/comment';
import { CommentRequest } from '../../model/comment-request';
import { ReceiptComponentCard } from "../model/receipt-component-card";
import { Selection, SelectionDataType } from "../model/selection";
import { DocumentsComponentDocument } from "../model/documents-component-document";
import { Session } from "../model/session";
import { Page } from "../../model/page";
import { Transaction } from "../../transaction/transaction";
import { Action } from "@ngrx/store";
import { CustomerAlertsInfo } from "../../customer/customer-alert";
import { CustomerAccountLimit } from "../../customer/customer-account-limit";
import { CallComponent } from "../model/call-component";
import { CustomerComponent } from "../model/customer-component";
import { LawEnforcementComponent } from "../model/law-enforcement-component";
import { MerchantComponent } from "../model/merchant-component";
import { ReceiptComponent } from "../model/receipt-component";
import { RefundRequestComponent } from "../model/refund-request-component";
import { CardsComponent } from "../model/cards-component";
import { ComplaintComponent } from "../model/complaint-component";
import {MaplesAccount, MaplesCustomer, MaplesTransaction} from "@cscore/maples-client-model";
import { SessionHistoryItem } from "../../dock/dock/session-history/models/session-history-item";
import {PrivacyRequestComponent} from "../model/privacy-request-component";
import {EncorComponent} from '../model/encor-component';

export class AddAlertAction implements PayloadAction {
  payload: SelectionAlert;
  type = SessionActionType.ADD_ALERT;

  constructor ( payload: SelectionAlert ) {
    this.payload = payload;
  }
}

export class AddCommentAction implements PayloadAction {
  payload: Comment;
  type = SessionActionType.ADD_COMMENT;

  constructor ( payload: Comment ) {
    this.payload = payload;
  }
}

export class AddReceiptCardAction implements PayloadAction {
  payload: ReceiptComponentCard;
  type = SessionActionType.ADD_RECEIPT_CARD;

  constructor ( payload: ReceiptComponentCard ) {
    this.payload = payload;
  }
}

export class AddSelectionAction implements PayloadAction {
  payload: Selection<any>;
  type = SessionActionType.ADD_SELECTION;

  constructor ( payload: Selection<any> ) {
    this.payload = payload;
  }
}

export class AddSessionDocumentAction implements PayloadAction {
  payload: DocumentsComponentDocument;
  type = SessionActionType.ADD_SESSION_DOCUMENT;

  constructor ( payload: DocumentsComponentDocument ) {
    this.payload = payload;
  }
}

export class AddSessionToWorkspaceAction implements PayloadAction {
  payload: Session;
  type = SessionActionType.ADD_SESSION_TO_WORKSPACE;

  constructor ( session: Session ) {
    this.payload = session;
  }
}

export class AppendSelectionCommentsAction implements PayloadAction {
  payload: Page<Comment>;
  type = SessionActionType.APPEND_SELECTION_COMMENTS;

  constructor ( payload: Page<Comment> ) {
    this.payload = payload;
  }
}

export class AppendSelectionCommentAction implements PayloadAction {
  payload: Comment;
  type = SessionActionType.APPEND_SELECTION_COMMENT;

  constructor ( payload: Comment ) {
    this.payload = payload;
  }
}

export class AppendSessionHistoryAction implements PayloadAction {
  payload: Page<SessionHistoryItem>;
  type = SessionActionType.APPEND_SESSION_HISTORY;

  constructor ( history: Page<SessionHistoryItem> ) {
    this.payload = history;
  }
}

export class AppendToWorkspaceAction implements PayloadAction {
  payload: Page<Session>;
  type = SessionActionType.WORKSPACE_APPEND;

  constructor ( page: Page<Session> ) {
    this.payload = page;
  }
}

export class AutoWrapCallRemoteAction implements PayloadAction {
  payload: Session;
  type = SessionActionType.AUTO_WRAP_CALL_REMOTE;

  constructor ( payload: Session ) {
    this.payload = payload;
  }
}

export class ClearSelectionCommentsAction implements Action {
  type = SessionActionType.CLEAR_SELECTION_COMMENTS;
}

export class ClearSessionStateAction implements Action {
  type = SessionActionType.CLEAR_STATE;
}

export class CloseSessionAction implements PayloadAction {
  payload: Session;
  type = SessionActionType.CLOSE_SESSION;

  constructor ( payload: Session ) {
    this.payload = payload;
  }
}

export class CollapseSessionPanelAction implements Action {
  type = SessionActionType.COLLAPSE_SESSION_PANEL;
}

export class DisconnectCallAction implements PayloadAction {
  payload: Session;
  type = SessionActionType.DISCONNECT_CALL;

  constructor ( payload: Session ) {
    this.payload = payload;
  }
}

export class DismissSessionAction implements Action {
  type = SessionActionType.DISMISS_SESSION;
}

export class EditReceiptCardAction implements PayloadAction {
  payload: ReceiptComponentCard;
  type = SessionActionType.EDIT_RECEIPT_CARD;

  constructor ( payload: ReceiptComponentCard ) {
    this.payload = payload;
  }
}

export class EditSessionDocumentAction implements PayloadAction {
  payload: DocumentsComponentDocument;
  type = SessionActionType.EDIT_SESSION_DOCUMENT;

  constructor ( payload: DocumentsComponentDocument ) {
    this.payload = payload;
  }
}

export class LoadSelectionAction implements PayloadAction {
  payload: Selection<any>;
  type = SessionActionType.LOAD_SELECTION;

  constructor ( selection: Selection<any> ) {
    this.payload = selection;
  }
}

export class LoadSessionAction implements PayloadAction {
  payload: Session;
  type = SessionActionType.LOAD_SESSION;

  constructor ( session: Session ) {
    this.payload = session;
  }
}

export class OpenSessionPanelAction implements Action {
  type = SessionActionType.OPEN_SESSION_PANEL;
}

export class RefreshWorkspaceAction implements PayloadAction {
  payload: Page<Session>;
  type = SessionActionType.WORKSPACE_REFRESH;

  constructor ( page: Page<Session> ) {
    this.payload = page;
  }
}

export class RemoveReceiptCardAction implements PayloadAction {
  payload: ReceiptComponentCard;
  type = SessionActionType.REMOVE_RECEIPT_CARD;

  constructor ( payload: ReceiptComponentCard ) {
    this.payload = payload;
  }
}

export class RemoveSelectionAction implements PayloadAction {
  payload: Selection<any>;
  type = SessionActionType.REMOVE_SELECTION;

  constructor ( payload: Selection<any> ) {
    this.payload = payload;
  }
}

export class RemoveSessionDocumentAction implements PayloadAction {
  payload: DocumentsComponentDocument;
  type = SessionActionType.REMOVE_SESSION_DOCUMENT;

  constructor ( payload: DocumentsComponentDocument ) {
    this.payload = payload;
  }
}

export class RemoveSessionFromWorkspaceAction implements PayloadAction {
  payload: Session;
  type = SessionActionType.REMOVE_SESSION_FROM_WORKSPACE;

  constructor ( session: Session ) {
    this.payload = session;
  }
}

export class SetCustomerIsCanadianAction implements PayloadAction {
  payload: boolean;
  type = SessionActionType.SET_CUSTOMER_IS_CANADIAN;

  constructor ( payload: boolean ) {
    this.payload = payload;
  }
}

export class SetPendingCommentAction implements PayloadAction {
  payload: CommentRequest;
  type = SessionActionType.ADD_PENDING_COMMENT;

  constructor ( payload: CommentRequest ) {
    this.payload = payload;
  }
}

export class SetSelectionAccountCardHistoryAction implements PayloadAction {
  payload: Selection<MaplesAccount>;
  type = SessionActionType.SET_SELECTION_ACCOUNT_CARD_HISTORY;

  constructor ( payload: Selection<MaplesAccount> ) {
    this.payload = payload;
  }
}

export class SetSelectionAccountDocumentsAction implements PayloadAction {
  payload: Selection<MaplesAccount>;
  type = SessionActionType.SET_SELECTION_ACCOUNT_DOCUMENTS;

  constructor ( payload: Selection<MaplesAccount> ) {
    this.payload = payload;
  }
}

export class SetSelectionAccountNotificationsAction implements PayloadAction {
  payload: Selection<MaplesAccount>;
  type = SessionActionType.SET_SELECTION_ACCOUNT_NOTIFICATIONS;

  constructor ( payload: Selection<MaplesAccount> ) {
    this.payload = payload;
  }
}

export class SetSelectionMaplesCustomerOrderAction implements PayloadAction {
  payload: Selection<MaplesCustomer>;
  type = SessionActionType.SET_SELECTION_MAPLES_CUSTOMER_ORDERS;

  constructor ( payload: Selection<MaplesCustomer> ) {
    this.payload = payload;
  }
}

export class SetSelectionAccountBlockedMerchantsAction implements PayloadAction {
  payload: Selection<MaplesAccount>;
  type = SessionActionType.SET_SELECTION_ACCOUNT_BLOCKED_MERCHANTS;

  constructor ( payload: Selection<MaplesAccount> ) {
    this.payload = payload;
  }
}

export class SetSelectionAccountStatusCodesAccountAction implements PayloadAction {
  payload: Selection<MaplesAccount>;
  type = SessionActionType.SET_SELECTION_ACCOUNT_STATUS_CODES_ACCOUNT;

  constructor ( payload: Selection<MaplesAccount> ) {
    this.payload = payload;
  }
}

export class SetSelectionAccountStatusCodesAddressAction implements PayloadAction {
  payload: Selection<MaplesAccount>;
  type = SessionActionType.SET_SELECTION_ACCOUNT_STATUS_CODES_ADDRESS;

  constructor ( payload: Selection<MaplesAccount> ) {
    this.payload = payload;
  }
}

export class SetSelectionAccountStatusCodesFundingSourceAction implements PayloadAction {
  payload: Selection<MaplesAccount>;
  type = SessionActionType.SET_SELECTION_ACCOUNT_STATUS_CODES_FUNDING_SOURCE;

  constructor(payload: Selection<MaplesAccount>) {
    this.payload = payload;
  }
}

    export class SetSelectionCommentDateRangeAction implements PayloadAction {
      payload: Selection<SelectionDataType>;
      type = SessionActionType.SET_SELECTION_COMMENT_DATE_RANGE;

      constructor(selection: Selection<SelectionDataType>) {
        this.payload = selection;
      }
    }

    export class SetSelectionCommentsAction implements PayloadAction {
      type = SessionActionType.SET_SELECTION_COMMENTS;

      constructor(public payload: Comment[]) {

      }
    }

    export class SetSelectionCustomerAlertsAction implements PayloadAction {
      payload: CustomerAlertsInfo;
      type = SessionActionType.SET_SELECTION_CUSTOMER_ALERTS;

      constructor(payload: CustomerAlertsInfo) {
        this.payload = payload;
      }
    }

    export class SetSelectionCustomerLimitsAction implements PayloadAction {
      payload: CustomerAccountLimit[];
      type = SessionActionType.SET_SELECTION_CUSTOMER_LIMITS;

      constructor(payload: CustomerAccountLimit[]) {
        this.payload = payload;
      }
    }

    export class SetSelectionDataAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_DATA;

      constructor(selection: Selection<any>) {
        this.payload = selection;
      }
    }

    export class SetSelectionDescriptionAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_DESCRIPTION;

      constructor(selection: Selection<any>) {
        this.payload = selection;
      }
    }

    export class SetSelectionFailedAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_FAILED;

      constructor(payload: Selection<any>) {
        this.payload = payload;
      }
    }

    export class SetSelectionFeePlansAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_FEE_PLANS;

      constructor(payload: Selection<any>) {
        this.payload = payload;
      }
    }

    export class SetSelectionHierarchyAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_HIERARCHY;

      constructor(selection: Selection<any>) {
        this.payload = selection;
      }
    }

    export class SetSelectionLastReplacementActivityAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_LAST_REPLACEMENT_ACTIVITY;

      constructor(selection: Selection<any>) {
        this.payload = selection;
      }
    }

    export class SetSelectionOrderRelatedJobsAction implements PayloadAction {

      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_ORDER_RELATED_JOBS;

      constructor(selection: Selection<any>) {
        this.payload = selection;
      }
    }

    export class SetSelectionPurchaseLocationAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_PURCHASE_LOCATION;

      constructor(selection: Selection<any>) {
        this.payload = selection;
      }
    }

    export class SetSelectionPurchaseOrderAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_PURCHASE_ORDER;

      constructor(selection: Selection<any>) {
        this.payload = selection;
      }
    }

    export class SetSelectionRelatedCasesAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_RELATED_CASES;

      constructor(selection: Selection<any>) {
        this.payload = selection;
      }
    }

    export class SetSelectionSelectedCardAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_SELECTED_CARD;

      constructor(payload: Selection<any>) {
        this.payload = payload;
      }
    }

    export class SetSelectionCustomerAccountFeaturesAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_ACCOUNT_FEATURES;

      constructor(payload: Selection<any>) {
        this.payload = payload;
      }
    }

    export class SetSelectionSelectedCustomerAccountCardAction implements PayloadAction {
      payload: Selection<MaplesAccount>;
      type = SessionActionType.SET_SELECTION_SELECTED_CUSTOMER_ACCOUNT_CARD;

      constructor(payload: Selection<MaplesAccount>) {
        this.payload = payload;
      }
    }

    export class SetSelectionSelectedTabAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_SELECTED_TAB;

      constructor(selection: Selection<any>) {
        this.payload = selection;
      }
    }

    export class SetSelectionShipmentsAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_SHIPMENTS;

      constructor(payload: Selection<any>) {
        this.payload = payload;
      }
    }

    export class SetSelectionOrderTransactionsAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_ORDER_TRANSACTIONS;

      constructor(payload: Selection<any>) {
        this.payload = payload;
      }
    }

    export class SetSelectionTerminalsAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_TERMINALS;

      constructor(selection: Selection<any>) {
        this.payload = selection;
      }
    }

    export class SetSelectionMaplesTransactionsAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_MAPLES_TRANSACTIONS;

      constructor(selection: Selection<any>) {
        this.payload = selection;
      }
    }

    export class SetSelectionMaplesTransactionDetailAction implements PayloadAction {
      payload: any;
      type = SessionActionType.SET_SELECTION_MAPLES_TRANSACTION_DETAIL;

      constructor(selection: Selection<any>, transaction: MaplesTransaction) {
        this.payload = {
          selection: selection,
          transaction: transaction
        };
      }
    }

    export class SetSelectionTransactionsAction implements PayloadAction {
      payload: Selection<any>;
      type = SessionActionType.SET_SELECTION_TRANSACTIONS;

      constructor(selection: Selection<any>) {
        this.payload = selection;
      }
    }

    export class SetSelectionTransactionSearchRequestAction implements PayloadAction {
      payload: Selection<SelectionDataType>;
      type = SessionActionType.SET_SELECTION_TRANSACTION_SEARCH_REQUEST;

      constructor(selection: Selection<SelectionDataType>) {
        this.payload = selection;
      }
    }

    export class SetSessionHistoryAction implements PayloadAction {
      payload: Page<SessionHistoryItem>;
      type = SessionActionType.SET_SESSION_HISTORY;

      constructor(history: Page<SessionHistoryItem>) {
        this.payload = history;
      }
    }

    export class StartSaveSessionAction implements Action {
      type = SessionActionType.START_SAVE;
    }

    export class StopSaveSessionAction implements Action {
      type = SessionActionType.STOP_SAVE;
    }

    export class UpdateCallComponentAction implements PayloadAction {
      payload: CallComponent;
      type = SessionActionType.UPDATE_CALL_COMPONENT;

      constructor(callComponent: CallComponent) {
        this.payload = callComponent;
      }
    }

    export class UpdateCardsComponentAction implements PayloadAction {
      payload: CardsComponent;
      type = SessionActionType.UPDATE_CARDS_COMPONENT;

      constructor(cardsComponent: CardsComponent) {
        this.payload = cardsComponent;
      }
    }

    export class UpdatePrivacyRequestComponentAction implements PayloadAction {
      payload: PrivacyRequestComponent;
      type = SessionActionType.UPDATE_PRIVACY_REQUEST_COMPONENT;

      constructor(payload: PrivacyRequestComponent) {
        this.payload = payload;
      }
    }

    export class UpdateEncorComponentAction implements PayloadAction {
      payload: EncorComponent;
      type = SessionActionType.UPDATE_ENCOR_COMPONENT;

      constructor(payload: EncorComponent) {
        this.payload = payload;
      }
    }

    export class UpdateCustomerComponentAction implements PayloadAction {
      payload: CustomerComponent;
      type = SessionActionType.UPDATE_CUSTOMER_COMPONENT;

      constructor(payload: CustomerComponent) {
        this.payload = payload;
      }
    }

    export class UpdateComplaintComponentAction implements PayloadAction {
      payload: ComplaintComponent;
      type = SessionActionType.UPDATE_COMPLAINT_COMPONENT;

      constructor(payload: ComplaintComponent) {
        this.payload = payload;
      }
    }

    export class UpdateLawEnforcementComponentAction implements PayloadAction {
      payload: LawEnforcementComponent;
      type = SessionActionType.UPDATE_LAW_ENFORCEMENT_COMPONENT;

      constructor(payload: LawEnforcementComponent) {
        this.payload = payload;
      }
    }

    export class UpdateMerchantComponentAction implements PayloadAction {
      payload: MerchantComponent;
      type = SessionActionType.UPDATE_MERCHANT_COMPONENT;

      constructor(payload: MerchantComponent) {
        this.payload = payload;
      }
    }

    export class UpdateReceiptComponentAction implements PayloadAction {
      payload: ReceiptComponent;
      type = SessionActionType.UPDATE_RECEIPT_COMPONENT;

      constructor(payload: ReceiptComponent) {
        this.payload = payload;
      }
    }

    export class UpdateRefundRequestComponentAction implements PayloadAction {
      payload: RefundRequestComponent;
      type = SessionActionType.UPDATE_REFUND_REQUEST_COMPONENT;

      constructor(payload: RefundRequestComponent) {
        this.payload = payload;
      }
    }

    export class UpdateSelectionTransactionAction implements PayloadAction {
      payload: Transaction;
      type = SessionActionType.UPDATE_SELECTION_TRANSACTION;

      constructor(payload: Transaction) {
        this.payload = payload;
      }
    }

    export class UpdateSessionAction implements PayloadAction {
      payload: Session;
      type = SessionActionType.UPDATE_SESSION;

      constructor(session: Session) {
        this.payload = session;
      }
    }

    export class UpdateSessionStatusAction implements PayloadAction {
      payload: Session;
      type = SessionActionType.UPDATE_SESSION_STATUS;

      constructor(session: Session) {
        this.payload = session;
      }
    }

    export class UpdateSessionInWorkspaceAction implements PayloadAction {
      payload: Session;
      type = SessionActionType.UPDATE_SESSION_IN_WORKSPACE;

      constructor(session: Session) {
        this.payload = session;
      }
    }

