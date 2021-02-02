import { SessionState } from "./session-state";
import { PayloadAction } from "../payload-action";
import { SessionActionType } from "./action/session-action-type.enum";
import { Session } from "./model/session";
import * as _ from "lodash";
import { DocumentsComponentDocument } from "./model/documents-component-document";
import { ReceiptComponentCard } from "./model/receipt-component-card";
import { Selection } from "./model/selection";
import { OrderActionType } from "../order/action/order-action-type.enum";
import { Comment } from "../model/comment";
import { Transaction } from "../transaction/transaction";
import {MaplesTransaction} from '@cscore/maples-client-model';

export const DEFAULT_SESSION_STATE: SessionState = {
  history: null,
  isCollapsed: false,
  isSaving: false,
  lastSavedDate: null,
  pendingComment: null,
  selection: null,
  session: null,
  workspaceSessions: null
};

export function sessionReducer ( state: SessionState = DEFAULT_SESSION_STATE, action: PayloadAction ): SessionState {
  let newState: SessionState;

  switch ( action.type ) {
    case SessionActionType.ADD_ALERT:
      newState = {
        ...state
      };

      if ( newState.selection ) {
        newState.selection.alerts.push ( action.payload );
      }
      break;
    case SessionActionType.ADD_COMMENT:
      newState = {
        ...state,
        lastSavedDate: new Date (),
      };
      if ( newState.session ) {
        newState.session.comments = [
          ...state.session.comments,
          action.payload
        ];
      }
      break;
    case SessionActionType.ADD_PENDING_COMMENT:
      newState = {
        ...state,
        pendingComment: action.payload
      };
      break;
    case SessionActionType.ADD_RECEIPT_CARD:
      newState = {
        ...state
      };
      if ( newState.session && newState.session.receiptComponent ) {
        newState.session.receiptComponent.cards.push ( action.payload );
      }
      break;
    case SessionActionType.ADD_SESSION_DOCUMENT:
      newState = {
        ...state
      };
      if ( newState.session && newState.session.documentsComponent ) {
        newState.session.documentsComponent.documents.push ( action.payload );
      }
      break;
    case SessionActionType.ADD_SELECTION:
      newState = {
        ...state
      };

      if ( newState.session ) {
        //We need to make sure this selection doesn't already exist
        const existingSelection = newState.session.selections.find ( existingSelection => existingSelection.id === action.payload.id );
        if ( !existingSelection ) {
          newState.session.selections.push ( action.payload );
          newState.selection = action.payload;
        } else {
          newState.selection = existingSelection;
          if ( !newState.selection.data && action.payload.data ) {
            newState.selection.data = action.payload.data;
          }
        }
      }
      break;
    case SessionActionType.ADD_SESSION_TO_WORKSPACE:
      newState = {
        ...state,
        workspaceSessions: {
          ...state.workspaceSessions,
          content: [
            ...(state.workspaceSessions ? state.workspaceSessions.content : []),
            action.payload
          ]
        }
      };
      newState.workspaceSessions.totalElements++;
      break;
    case SessionActionType.APPEND_SESSION_HISTORY:
      newState = {
        ...state,
        history: {
          ...action.payload,
          content: [
            ...state.history.content,
            ...action.payload.content
          ]
        }
      };
      break;
    case SessionActionType.APPEND_SELECTION_COMMENTS:
      let existingComments: Comment[] = [];
      if ( state.selection.comments ) {
        existingComments = state.selection.comments.content;
      }

      let selectionComments = {
        ...action.payload,
        content: [
          ...existingComments,
          ...action.payload.content
        ]
      };

      newState = <SessionState>{
        ...state
      };
      if ( newState.selection ) {
        newState.selection.comments = selectionComments;
      }
      break;
    case SessionActionType.APPEND_SELECTION_COMMENT:
      newState = <SessionState>{
        ...state
      };
      if ( newState.selection ) {
        newState.selection.comments.size = state.selection.comments.size + 1 ;
        newState.selection.comments.numberOfElements = state.selection.comments.numberOfElements + 1 ;
        newState.selection.comments.totalElements = state.selection.comments.totalElements + 1 ;
        newState.selection.comments.content = [...state.selection.comments.content, action.payload];
      }
      break;
    case SessionActionType.CLEAR_SELECTION_COMMENTS:
      newState = <SessionState>{
        ...state
      };
      if ( newState.selection ) {
        newState.selection.comments = null;
      }
      break;
    case SessionActionType.CLEAR_STATE:
      newState = DEFAULT_SESSION_STATE;
      break;
    case SessionActionType.CLOSE_SESSION: {
      newState = {
        ...state,
        lastSavedDate: null,
        selection: null,
        session: null, //Clear the session
        workspaceSessions: { //Remove the session from the workspace
          ...state.workspaceSessions,
          content: _.reject ( state.workspaceSessions.content, function ( session: Session ) {
            return session.id === action.payload.id;
          } )
        }
      };

      newState.workspaceSessions.totalElements--; //Adjust workspace pagination count
      break;
    }
    case SessionActionType.COLLAPSE_SESSION_PANEL:
      newState = {
        ...state,
        isCollapsed: true
      };
      break;
    case SessionActionType.AUTO_WRAP_CALL_REMOTE:
    case SessionActionType.DISCONNECT_CALL:
      newState = {
        ...state
      };

      //Only do this if the current session is the session being updated by the server
      if ( newState.session && newState.session.id === action.payload.id ) {
        newState.session.status                         = action.payload.status;
        newState.session.callComponent.disconnectedDate = action.payload.callComponent.disconnectedDate;
        newState.session.wrapUpCodeCategory             = action.payload.wrapUpCodeCategory;
        newState.session.wrapUpCode                     = action.payload.wrapUpCode;
      }
      break;
    case SessionActionType.DISMISS_SESSION:
      newState = {
        ...state,
        isCollapsed: false,
        selection: null,
        session: null
      };
      break;
    case SessionActionType.EDIT_RECEIPT_CARD:
      newState = {
        ...state
      };

      if ( newState.session ) {
        //Find and update the master copy of the document
        let cardIndex                = _.findIndex ( newState.session.receiptComponent.cards, function ( card: ReceiptComponentCard ) {
          return card.id === action.payload.id;
        } );
        let masterCard               = newState.session.receiptComponent.cards[ cardIndex ];
        masterCard.van               = action.payload.van;
        masterCard.serialNumber      = action.payload.serialNumber;
        masterCard.packageVan        = action.payload.packageVan;
        masterCard.productType       = action.payload.productType;
        masterCard.initialLoadAmount = action.payload.initialLoadAmount;
      }
      break;
    case SessionActionType.EDIT_SESSION_DOCUMENT:
      newState = {
        ...state
      };

      if ( newState.session && newState.session.documentsComponent ) {
        //Find and update the master copy of the document
        let documentIndex   = _.findIndex ( newState.session.documentsComponent.documents, function ( document: DocumentsComponentDocument ) {
          return document.id === action.payload.id;
        } );
        let masterDocument  = newState.session.documentsComponent.documents[ documentIndex ];
        masterDocument.link = action.payload.link;
        masterDocument.name = action.payload.name;
      }
      break;
    case OrderActionType.LOAD_ORDER_ITEMS_FOR_SELECTION:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection && selection.data ) {
          selection.orderItems = [ ...action.payload.orderItems ];
        }
      }
      break;
    case SessionActionType.LOAD_SESSION:
      newState = {
        ...state,
        isCollapsed: false,
        lastSavedDate: new Date (),
        selection: null,
        session: action.payload
      };
      break;
    case SessionActionType.LOAD_SELECTION:
      newState = {
        ...state
      };

      if ( newState.session ) {
        newState.selection = newState.session.selections.find ( selection => selection.id === action.payload.id );
      }
      break;
    case SessionActionType.OPEN_SESSION_PANEL:
      newState = {
        ...state,
        isCollapsed: false
      };
      break;
    case SessionActionType.REMOVE_RECEIPT_CARD:
      newState = {
        ...state
      };
      if ( newState.session && newState.session.receiptComponent ) {
        newState.session.receiptComponent.cards = _.reject ( state.session.receiptComponent.cards, function ( card: ReceiptComponentCard ) {
          return card.id === action.payload.id;
        } );
      }
      break;
    case SessionActionType.REMOVE_SELECTION:
      newState = {
        ...state
      };
      if ( newState.session ) {
        newState.session.selections = _.reject ( newState.session.selections, ( selection: Selection<any> ) => {
          return selection.id === action.payload.id;
        } );
        if ( newState.selection && newState.selection.id === action.payload.id ) {
          newState.selection = null;
        }
      }
      break;
    case SessionActionType.REMOVE_SESSION_DOCUMENT:
      newState = {
        ...state
      };
      if ( newState.session && newState.session.documentsComponent ) {
        newState.session.documentsComponent.documents = _.reject ( state.session.documentsComponent.documents, function ( document: DocumentsComponentDocument ) {
          return document.id === action.payload.id;
        } );
      }
      break;
    case SessionActionType.REMOVE_SESSION_FROM_WORKSPACE:
      let sessions: Session[] = [ ...state.workspaceSessions.content ];
      if ( action.payload ) {
        sessions = _.reject ( state.workspaceSessions.content, function ( session: Session ) {
          return session.id === action.payload.id;
        } );
      }

      newState = {
        ...state,
        workspaceSessions: {
          ...state.workspaceSessions,
          content: sessions
        }
      };

      newState.workspaceSessions.totalElements--;
      break;
    case SessionActionType.UPDATE_SESSION_IN_WORKSPACE:
      const index: number = _.findIndex(state.workspaceSessions.content , {id: action.payload.id});
      state.workspaceSessions.content [index] = action.payload;

      newState = {
        ...state,
        workspaceSessions: {
          ...state.workspaceSessions,
          content: state.workspaceSessions.content
        }
      };

      break;
    case SessionActionType.SET_CUSTOMER_IS_CANADIAN:
      newState = {
        ...state
      };
      if ( newState.selection && newState.selection.getCustomer () ) {
        newState.selection.getCustomer ().isCanadian = action.payload;
      }
      break;
    case SessionActionType.SET_SELECTION_ACCOUNT_CARD_HISTORY:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.cardHistory = action.payload.cardHistory;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_ACCOUNT_DOCUMENTS:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.accountDocuments = action.payload.accountDocuments;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_ACCOUNT_NOTIFICATIONS:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.accountNotifications = action.payload.accountNotifications;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_MAPLES_CUSTOMER_ORDERS:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.orders = action.payload.orders;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_ACCOUNT_BLOCKED_MERCHANTS:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.blockedMerchants = action.payload.blockedMerchants;
        }
      }
      break;

    case SessionActionType.SET_SELECTION_ACCOUNT_STATUS_CODES_ACCOUNT:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.accountStatusCodesAccount = action.payload.accountStatusCodesAccount;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_ACCOUNT_STATUS_CODES_ADDRESS:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.accountStatusCodesAddress = action.payload.accountStatusCodesAddress;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_ACCOUNT_STATUS_CODES_FUNDING_SOURCE:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.accountStatusCodesFundingSource = action.payload.accountStatusCodesFundingSource;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_COMMENT_DATE_RANGE:
      newState = {
        ...state
      };

      if ( newState.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.commentQuery = action.payload.commentQuery;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_COMMENTS:
      newState = <SessionState>{
        ...state
      };
      if ( newState.selection ) {
        newState.selection.comments = {
          ...newState.selection.comments,
          content: action.payload
        };
      }
      break;
    case SessionActionType.SET_SELECTION_CUSTOMER_ALERTS:
      newState = {
        ...state
      };
      if ( newState.selection ) {
        newState.selection.customerAlerts = action.payload;
      }
      break;
    case SessionActionType.SET_SELECTION_CUSTOMER_LIMITS:
      newState = {
        ...state
      };
      if ( newState.selection ) {
        newState.selection.limits = action.payload;
      }
      break;
    case SessionActionType.SET_SELECTION_DATA:
      newState = {
        ...state
      };

      if ( newState.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.data = action.payload.data;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_DESCRIPTION:
      newState = {
        ...state
      };

      if ( newState.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.description = action.payload.description;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_FAILED:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.isFailedToLoad = action.payload.isFailedToLoad;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_FEE_PLANS:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.feePlans = [ ...action.payload.feePlans ];
        }
      }
      break;
    case SessionActionType.SET_SELECTION_HIERARCHY:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.hierarchy = action.payload.hierarchy;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_LAST_REPLACEMENT_ACTIVITY:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.lastReplacementActivity = action.payload.lastReplacementActivity;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_ORDER_RELATED_JOBS:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.relatedJobs = [...action.payload.relatedJobs];
        }
      }
      break;
    case SessionActionType.SET_SELECTION_MAPLES_TRANSACTIONS:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.maplesTransactions = action.payload.maplesTransactions;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_MAPLES_TRANSACTION_DETAIL:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.selection.id );
        if ( selection ) {
          let i: number = selection.maplesTransactions.findIndex((txn: MaplesTransaction) => txn.sourceRefNum === action.payload.transaction.sourceRefNum);
          selection.maplesTransactions[i] = action.payload.transaction;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_PURCHASE_LOCATION:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.purchaseLocation = action.payload.purchaseLocation;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_PURCHASE_ORDER:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.purchaseOrder = action.payload.purchaseOrder;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_RELATED_CASES:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.relatedCases = [ ...action.payload.relatedCases ];
        }
      }
      break;
    case SessionActionType.SET_SELECTION_SELECTED_CARD:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.selectedCard = action.payload.selectedCard;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_SELECTED_CUSTOMER_ACCOUNT_CARD:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.selectedCustomerAccountCard = action.payload.selectedCustomerAccountCard;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_SELECTED_TAB:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.selectedTab      = action.payload.selectedTab;
          selection.selectedShipment = action.payload.selectedShipment;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_SHIPMENTS:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.orderShipments = [ ...action.payload.orderShipments ];
        }
      }
      break;
    case SessionActionType.SET_SELECTION_ORDER_TRANSACTIONS:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.orderTransactions = [ ...action.payload.orderTransactions ];
        }
      }
      break;
    case SessionActionType.SET_SELECTION_TERMINALS:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.terminals = [ ...action.payload.terminals ];
        }
      }
      break;
    case SessionActionType.SET_SELECTION_TRANSACTION_SEARCH_REQUEST:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.transactionRequests = action.payload.transactionRequests;
        }
      }

      break;
    case SessionActionType.SET_SELECTION_TRANSACTIONS:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.transactions = action.payload.transactions;
        }
      }
      break;
    case SessionActionType.SET_SELECTION_ACCOUNT_FEATURES:
      newState = {
        ...state
      };

      if ( state.session ) {
        const selection = state.session.selections.find ( selection => selection.id === action.payload.id );
        if ( selection ) {
          selection.getCustomerAccount().features = action.payload.getCustomerAccount().features;
        }
      }
      break;
    case SessionActionType.SET_SESSION_HISTORY:
      newState = {
        ...state,
        history: action.payload,
      };
      break;
    case SessionActionType.START_SAVE:
      newState = {
        ...state,
        isSaving: true
      };
      break;
    case SessionActionType.STOP_SAVE:
      newState = {
        ...state,
        isSaving: false
      };
      break;
    case SessionActionType.UPDATE_CALL_COMPONENT:
      newState = {
        ...state,
        lastSavedDate: new Date ()
      };
      if ( newState.session ) {
        newState.session.callComponent = action.payload;
      }
      break;
    case SessionActionType.UPDATE_CARDS_COMPONENT:
      newState = {
        ...state,
        lastSavedDate: new Date ()
      };
      if ( newState.session ) {
        newState.session.cardsComponent = action.payload;
      }
      break;
    case SessionActionType.UPDATE_CUSTOMER_COMPONENT:
      newState = {
        ...state,
        lastSavedDate: new Date ()
      };
      if ( newState.session ) {
        newState.session.customerComponent = action.payload;
      }
      break;
    case SessionActionType.UPDATE_COMPLAINT_COMPONENT:
      newState = {
        ...state,
        lastSavedDate: new Date ()
      };
      if ( newState.session ) {
        newState.session.complaintComponent = action.payload;
      }
      break;
    case SessionActionType.UPDATE_ENCOR_COMPONENT:
      newState = {
        ...state,
        lastSavedDate: new Date ()
      };
      if ( newState.session ) {
        newState.session.encorComponent = action.payload;
      }
      break;
    case SessionActionType.UPDATE_MERCHANT_COMPONENT:
      newState = {
        ...state,
        lastSavedDate: new Date ()
      };
      if ( newState.session ) {
        newState.session.merchantComponent = action.payload;
      }
      break;
    case SessionActionType.UPDATE_LAW_ENFORCEMENT_COMPONENT:
      newState = {
        ...state,
        lastSavedDate: new Date ()
      };
      if ( newState.session ) {
        newState.session.lawEnforcementComponent = action.payload;
      }
      break;
    case SessionActionType.UPDATE_PRIVACY_REQUEST_COMPONENT:
      newState = {
        ...state,
        lastSavedDate: new Date ()
      };
      if ( newState.session ) {
        newState.session.privacyRequestComponent = action.payload;
      }
      break;
    case SessionActionType.UPDATE_SELECTION_TRANSACTION:
      newState = {
        ...state
      };

      if ( newState.selection && newState.selection.transactions ) {
        let index                                             = _.findIndex ( newState.selection.transactions.transactions, ( transaction: Transaction ) => {
          return transaction.uuid === action.payload.uuid;
        } );
        newState.selection.transactions.transactions[ index ] = action.payload;
      }

      break;
    case SessionActionType.UPDATE_SESSION:
      newState = {
        ...state,
        session: action.payload,
        lastSavedDate: new Date ()
      };
      break;
    case SessionActionType.WORKSPACE_APPEND:
      newState = {
        ...state,
        workspaceSessions: {
          ...action.payload,
          content: [
            ...state.workspaceSessions.content,
            ...action.payload.content
          ]
        }
      };
      break;
    case SessionActionType.WORKSPACE_REFRESH:
      newState = {
        ...state,
        workspaceSessions: action.payload
      };
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
