import { Injectable } from '@angular/core';
import { Session } from "./model/session";
import { AuthenticationState } from "../../auth/authentication-state";
import { snapshot } from "../store-utils/store-utils";
import { AppStateType } from "../../app-state-type.enum";
import { Comment } from "../model/comment";
import { CardsComponentCard } from "./model/cards-component-card";
import { SessionStatusType } from "./model/session-status-type.enum";
import { SessionClassType } from "./session-class-type.enum";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import * as _ from "lodash";

@Injectable ( {
  providedIn: 'root'
} )
export class SessionValidator {

  constructor ( private store: Store<AppState> ) {
  }

  hasAtLeastOneCommentFromCurrentUser ( session: Session ): boolean {
    let authenticationState: AuthenticationState = snapshot ( this.store, AppStateType.AUTHENTICATION_STATE );
    return !!_.find ( session.comments, function ( comment: Comment ) {
      return comment.createdBy.id === authenticationState.user.id;
    } );
  }

  isCallComponentComplete ( session: Session ): boolean {
    return !session.callComponent
      || (!!session.callComponent.callerName
        && (!session.callComponent.uid || !!session.callComponent.dnis));
  }

  isCardsComponentComplete ( session: Session ): boolean {
    let hasComponent: boolean     = !!session.cardsComponent;
    let anyCardNeedsWork: boolean = false;

    if ( hasComponent ) {
      let cards: CardsComponentCard[] = session.cardsComponent.findAllCardsAsArray ();
      cards.forEach ( card => {
        if ( card.needsWork () ) {
          anyCardNeedsWork = true;
        }
      } );
    }
    return !hasComponent || !anyCardNeedsWork;
  }

  isCustomerComponentComplete ( session: Session ): boolean {
    return !session.customerComponent
      || (!!session.customerComponent.firstName
        && !!session.customerComponent.lastName);
  }

  /**
   * Session should be disabled if it's been CANCELLED, CLOSED, or FORCED_CLOSED, or it belongs to another user.
   */
  isDisabled ( session: Session ): boolean {
    let authenticationState: AuthenticationState = snapshot ( this.store, AppStateType.AUTHENTICATION_STATE );
    let userId                                   = authenticationState.user.id;

    //Disable form if session is closed, or if session is not current user's session
    return !!session.closedDate
      || session.status.value === SessionStatusType.CLOSED
      || session.status.value === SessionStatusType.CANCELLED
      || session.status.value === SessionStatusType.FORCED_CLOSED
      || (session.user && session.user.id !== userId);
  }

  isDocumentsComponentComplete ( session: Session ): boolean {
    return true;
  }

  isLawEnforcementComponentComplete ( session: Session ): boolean {
    return true;
  }

  isMerchantComponentComplete ( session: Session ): boolean {
    return true;
  }

  isReceiptComponentComplete ( session: Session ): boolean {
    let hasComponent: boolean     = !!session.receiptComponent;
    let anyCardNeedsWork: boolean = false;

    if ( hasComponent ) {
      session.receiptComponent.cards.forEach ( card => {
        if ( card.needsWork () ) {
          anyCardNeedsWork = true;
        }
      } );
    }

    return !hasComponent || !anyCardNeedsWork;
  }

  isRefundRequestComponentComplete ( session: Session ): boolean {
    return true;
  }

  /**
   * Is the Session, and all its components, complete?
   */
  isSessionComplete ( session: Session ): boolean {
    let ignoreComments: boolean = session.sessionClassType === SessionClassType.CALL_CENTER;

    return this.isSessionProperComplete ( session, ignoreComments )
      && this.isCallComponentComplete ( session )
      && this.isCardsComponentComplete ( session )
      && this.isCustomerComponentComplete ( session )
      && this.isDocumentsComponentComplete ( session )
      && this.isLawEnforcementComponentComplete ( session )
      && this.isMerchantComponentComplete ( session )
      && this.isReceiptComponentComplete ( session )
      && this.isRefundRequestComponentComplete ( session );
  }

  /**
   * Is the Session itself, meaning the General Component and Comments, complete?
   */
  isSessionProperComplete ( session: Session, ignoreComments: boolean ): boolean {
    return session.sessionType
      && session.queue
      && session.wrapUpCodeCategory
      && session.wrapUpCode
      && session.status
      && session.user
      && (ignoreComments || this.hasAtLeastOneCommentFromCurrentUser ( session ));
  }

}
