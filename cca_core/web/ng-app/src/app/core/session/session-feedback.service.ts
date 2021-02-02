import { Injectable } from '@angular/core';
import { Session } from "./model/session";
import { SessionValidator } from "./session-validator.service";
import { SessionTypeType } from "./session-type-type.enum";

@Injectable ( {
  providedIn: 'root'
} )
export class SessionFeedbackService {

  constructor ( private sessionValidator: SessionValidator ) {

  }

  /**
   * Get all missing pieces required in order to close the given Session.
   *
   * For a Call session, also provide a reference to the Comment field, as any value in that field qualifies as the
   * comment from the current user, and will be saved on close.
   */
  getClosureFeedback ( session: Session, inProgressComment: boolean = false ): string[] {
    let missingComponents = [];

    if ( session ) {
      this.validateGeneralComponent ( session, missingComponents, inProgressComment );
      this.validateCallComponent ( session, missingComponents );
      this.validateCardsComponent ( session, missingComponents );
      this.validateComplaintComponent ( session, missingComponents );
      this.validateCustomerComponent ( session, missingComponents );
      this.validateDocumentsComponent ( session, missingComponents );
      this.validateLawEnforcementComponent ( session, missingComponents );
      this.validateMerchantComponent ( session, missingComponents );
      this.validateReceiptComponent ( session, missingComponents );
      this.validateRefundRequestComponent ( session, missingComponents );
    }

    return missingComponents;
  }

  private validateCallComponent ( session: Session, missingComponents: string[] ): void {
    if ( session.callComponent ) {
      if ( !session.callComponent.callerName ) {
        missingComponents.push ( 'Call Component - Caller Name' );
      }
      if ( session.callComponent.uid && !session.callComponent.dnis ) {
        missingComponents.push ( 'Call Component - DNIS' );
      }
    }
  }

  private validateCardsComponent ( session: Session, missingComponents: string[] ): void {
    if ( !this.sessionValidator.isCardsComponentComplete ( session ) ) {
      missingComponents.push ( 'Cards Component - At least one Card needs attention' );
    }
  }

  private validateComplaintComponent ( session: Session, missingComponents: string[] ): void {
    if ( session.complaintComponent ) {
      if ( !session.complaintComponent.resolution ) {
        missingComponents.push ( 'Complaint Component - Resolution' );
      }

    }
  }

  private validateCustomerComponent ( session: Session, missingComponents: string[] ): void {
    if ( session.customerComponent ) {
      if ( !session.customerComponent.firstName ) {
        missingComponents.push ( 'Customer Component - First Name' );
      }
      if ( !session.customerComponent.lastName ) {
        missingComponents.push ( 'Customer Component - Last Name' );
      }
    }
  }

  private validateDocumentsComponent ( session: Session, missingComponents: string[] ): void {

  }

  private validateLawEnforcementComponent ( session: Session, missingComponents: string[] ): void {

  }

  private validateMerchantComponent ( session: Session, missingComponents: string[] ): void {

  }

  private validateReceiptComponent ( session: Session, missingComponents: string[] ): void {
    if ( !this.sessionValidator.isReceiptComponentComplete ( session ) ) {
      missingComponents.push ( 'Receipt Component - At least one Card needs attention' );
    }
  }

  private validateRefundRequestComponent ( session: Session, missingComponents: string[] ): void {

  }

  validateGeneralComponent ( session: Session, missingComponents: string[], inProgressComment: boolean = false ): void {
    if ( !session.sessionType ) {
      missingComponents.push ( 'General Component - Session Type' );
    }
    if ( !session.queue ) {
      missingComponents.push ( 'General Component - Queue' );
    }
    if ( !session.wrapUpCodeCategory ) {
      missingComponents.push ( 'General Component - Category' )
    }
    if ( !session.wrapUpCode ) {
      missingComponents.push ( 'General Component - Wrap-Up Code' );
    }
    if ( !session.status ) {
      missingComponents.push ( 'General Component - Status' );
    }
    if ( !session.user ) {
      missingComponents.push ( 'General Component - Assignee' );
    }
    //In-progress comments are only valid for CALL sessions
    if ( (session.sessionTypeType === SessionTypeType.CALL && !inProgressComment && !this.sessionValidator.hasAtLeastOneCommentFromCurrentUser ( session ))
      || (session.sessionTypeType !== SessionTypeType.CALL && !this.sessionValidator.hasAtLeastOneCommentFromCurrentUser ( session )) ) {
      missingComponents.push ( 'General Component - At least one Comment from you' );
    }
  }
}
