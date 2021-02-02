import {Injectable} from '@angular/core';
import {Session} from "../model/session";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SessionClassType} from "../session-class-type.enum";
import {CcaValidators} from "../../validators/cca-validators";
import {AuthenticationState} from "../../../auth/authentication-state";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app-state";
import {snapshot} from "../../store-utils/store-utils";
import {AppStateType} from "../../../app-state-type.enum";
import {CustomerComponent} from "../model/customer-component";
import {CallComponent} from "../model/call-component";
import {CcaFormBuilder} from "../../form/cca-form-builder.service";
import {MerchantComponent} from "../model/merchant-component";
import {RefundRequestComponent} from "../model/refund-request-component";
import {LawEnforcementComponent} from "../model/law-enforcement-component";
import {DocumentsComponent} from "../model/documents-component";
import {CardsComponent} from "../model/cards-component";
import {ReceiptComponent} from "../model/receipt-component";
import {ComplaintComponent, FlatComplaintComponent} from "../model/complaint-component";
import {SessionState} from '../session-state';
import {CommentRequest} from '../../model/comment-request';
import {PrivacyRequestComponent} from "../model/privacy-request-component";
import {EncorComponent} from '../model/encor-component';

@Injectable ( {
  providedIn: 'root'
} )
export class SessionFormBuilder {

  constructor ( private formBuilder: CcaFormBuilder,
                private store: Store<AppState> ) {
  }

  build ( session: Session ): FormGroup {
    const controls: {[key: string]: FormGroup} = {};
    if ( session ) {
      controls.generalComponent  = this.buildGeneralComponentForm ( session );
      controls.commentsComponent = this.buildCommentComponentForm ( session );

      if ( session.callComponent ) {
        controls.callComponent = this.buildCallComponentForm ( session.callComponent );
      }
      if ( session.cardsComponent ) {
        controls.cardsComponent = this.buildCardsComponentForm ( session.cardsComponent );
      }
      if ( session.complaintComponent ) {
        controls.complaintComponent = this.buildComplaintComponentForm ( session.complaintComponent );
      }
      if ( session.customerComponent ) {
        controls.customerComponent = this.buildCustomerComponentForm ( session.customerComponent );
      }
      if ( session.documentsComponent ) {
        controls.documentsComponent = this.buildDocumentsComponentForm ( session.documentsComponent );
      }
      if ( session.encorComponent ) {
        controls.encorComponent = this.buildEncorComponentForm ( session.encorComponent );
      }
      if ( session.lawEnforcementComponent ) {
        controls.lawEnforcementComponent = this.buildLawEnforcementComponentForm ( session.lawEnforcementComponent );
      }
      if ( session.merchantComponent ) {
        controls.merchantComponent = this.buildMerchantComponentForm ( session.merchantComponent );
      }
      if ( session.privacyRequestComponent ) {
        controls.privacyRequestComponent = this.buildPrivacyRequestComponentForm ( session.privacyRequestComponent );
      }
      if ( session.receiptComponent ) {
        controls.receiptComponent = this.buildReceiptComponentForm ( session.receiptComponent );
      }
      if ( session.refundRequestComponent ) {
        controls.refundRequestComponent = this.buildRefundRequestComponentForm ( session.refundRequestComponent );
      }
    }

    return new FormGroup ( controls );
  }

  buildComplaintComponentForm ( component: ComplaintComponent | FlatComplaintComponent, inWizard: boolean = false ): FormGroup {
    return new FormGroup ( {
      bank: new FormControl ( component.bank, [ Validators.required ] ),
      accountNumber: new FormControl ( component.accountNumber, [ Validators.maxLength ( 128 ) ] ),
      firstName: new FormControl ( component.firstName, [ Validators.required, Validators.maxLength ( 64 ) ] ),
      lastName: new FormControl ( component.lastName, [ Validators.required, Validators.maxLength ( 64 ) ] ),
      category: new FormControl ( component.category, [ Validators.required ] ),
      source: new FormControl ( component.source, [ Validators.required ] ),
      summary: new FormControl ( component.summary, Validators.maxLength ( 128 ) ),
      complaint: this.formBuilder.comment ( component.complaint, true ),
      resolution: new FormControl ( component.resolution, inWizard ? []: [Validators.required] ),
      resolutionDate: new FormControl ( component.resolutionDate ),
      postalCode: this.formBuilder.postalCode ( component.postalCode ),
      priority: new FormControl(component.priority),
      cause: new FormControl ( component.cause ),
      isRegulatory: new FormControl ( component.isRegulatory ),
      enhancementsNeeded: this.formBuilder.comment ( component.enhancementsNeeded ),
      type: new FormControl ( component.type ),
      department: new FormControl ( component.department ),
      discriminationType: new FormControl ( component.discriminationType ),
      compensation: new FormControl ( component.compensation, [ Validators.maxLength ( 64 ) ] )
    } );
  }

  buildCustomerComponentForm ( component: CustomerComponent ): FormGroup {
    return new FormGroup ( {
      firstName: new FormControl ( component.firstName, [ Validators.required ] ),
      lastName: new FormControl ( component.lastName, [ Validators.required ] ),
      dateOfBirth: this.formBuilder.date ( component.dateOfBirth ),
      emailAddress: this.formBuilder.emailAddress ( component.emailAddress ),
      phoneNumber: new FormControl ( component.phoneNumber, [] ),
      ani: new FormControl ( component.ani, [] ),
      contactMethod: new FormControl ( component.contactMethod, [] ),
      callbackTime: new FormControl ( component.callbackTime, [] ),
      language: new FormControl ( component.language, [] ),
      address: this.formBuilder.address ( component.address )
    } );
  }

  buildMerchantComponentForm ( component: MerchantComponent ): FormGroup {
    return new FormGroup ( {
      merchantName: new FormControl ( component.merchantName, [] ),
      merchantLegacyId: new FormControl ( component.merchantLegacyId ),
      locationName: new FormControl ( component.locationName, [] ),
      contactName: new FormControl ( component.contactName, [] ),
      contactTitle: new FormControl ( component.contactTitle, [] ),
      contactPhone: new FormControl ( component.contactPhone, [] ),
      address: this.formBuilder.address ( component.address ),
      purchasedDate: new FormControl ( component.purchasedDate ? component.purchasedDate.value : null, [] ),
      firstRedemptionAttemptedDate: new FormControl ( component.firstRedemptionAttemptedDate ? component.firstRedemptionAttemptedDate.value : null, [] ),
      lastReloadedDate: new FormControl ( component.lastReloadedDate ? component.lastReloadedDate.value : null, [] ),
      deactivatedDate: new FormControl ( component.deactivatedDate ? component.deactivatedDate.value : null, [] )
    } );
  }

  buildPrivacyRequestComponentForm ( component: PrivacyRequestComponent ): FormGroup {
    return new FormGroup ( {
      productId: new FormControl( component.productId, [ Validators.required ] ),
      firstName: new FormControl( component.firstName, [ Validators.required ] ),
      lastName: new FormControl( component.lastName, [ Validators.required ] ),
      phoneNumber: new FormControl( component.phoneNumber, [ Validators.required ] ),
      email: new FormControl( component.email ),
      account: new FormControl( component.account ),
      jobTitle: new FormControl( component.jobTitle ),
      address: this.formBuilder.address ( component.address, true ),
      comment: new FormControl( component.comment, [ Validators.required, Validators.minLength ( 5 ), Validators.maxLength ( 500 ) ] )
    } );
  }

  buildReceiptComponentForm ( component: ReceiptComponent ): FormGroup {
    let transactionDate: string = component.transactionDate ? component.transactionDate.displayValue : null;
    if ( transactionDate ) {
      transactionDate = transactionDate.split ( ' ' )[ 0 ].trim ();
    }

    const transactionAmount: string = component.transactionAmount ? new Number ( component.transactionAmount.value ).toFixed ( 2 ) : null;
    const totalAmount: string       = component.totalAmount ? new Number ( component.totalAmount.value ).toFixed ( 2 ) : null;

    return new FormGroup ( {
      receiptId: new FormControl ( component.receiptId, [] ),
      transactionDate: new FormControl ( transactionDate, [] ),
      transactionTime: new FormControl ( component.transactionTime, [] ),
      transactionAmount: new FormControl ( transactionAmount, [] ),
      totalAmount: new FormControl ( totalAmount, [] ),
      paymentMethod: new FormControl ( component.paymentMethod, [] )
    } );
  }

  buildEncorComponentForm ( component: EncorComponent ): FormGroup {
    return new FormGroup ( {
      priority: new FormControl ( component.priority, [] ),
      customerId: new FormControl ( component.customerId, [Validators.required] ),
      orderId: new FormControl ( component.orderId, [] ),
      issueType: new FormControl ( component.issueType, [] ),
      complaintType: new FormControl ( component.complaintType, [] )
    } );
  }

  private buildCallComponentForm ( component: CallComponent ): FormGroup {
    const controls: {[key: string]: FormControl} = {
      callerName: new FormControl ( component.callerName, [ Validators.required ] ),
      callbackNumber: new FormControl ( component.callbackNumber, [ CcaValidators.lengthEquals ( 10 ) ] ),
      ani: new FormControl ( component.ani ),
      dnis: new FormControl ( component.dnis )
    };

    //DNIS is required if a UID is present
    if ( component.uid ) {
      controls.dnis.setValidators ( [ Validators.required ] );
    }

    return new FormGroup ( controls );
  }

  private buildCardsComponentForm ( component: CardsComponent ): FormGroup {
    return new FormGroup ( {
      isComplete: new FormControl ( !component.needsWork (), Validators.requiredTrue )
    } );
  }

  private buildCommentComponentForm ( session: Session ): FormGroup {
    const authenticationState: AuthenticationState = snapshot ( this.store, AppStateType.AUTHENTICATION_STATE );
    const userId: number                           = authenticationState.user.id;

    const sessionState: SessionState     = snapshot ( this.store, AppStateType.SESSION_STATE );
    const pendingComment: CommentRequest = sessionState.pendingComment;

    return new FormGroup ( {
      comment: new FormControl ( pendingComment && pendingComment.content || '', [ Validators.minLength ( 5 ), Validators.maxLength ( 500 ), CcaValidators.needsCommentFromUser ( userId, session ) ] ),
      isPrivate: new FormControl ( !!pendingComment && !!pendingComment.isPrivate )
    } );
  }

  private buildDocumentsComponentForm ( component: DocumentsComponent ): FormGroup {
    return new FormGroup ( {} );
  }

  private buildGeneralComponentForm ( session: Session ): FormGroup {
    let controls: {[key: string]: FormControl} = {
      summary: new FormControl ( session.summary, [ Validators.maxLength ( 64 ) ] ),
      category: new FormControl ( session.wrapUpCodeCategory, [ Validators.required ] ),
      queue: new FormControl ( session.queue, [ Validators.required ] ),
      wrapUpCode: new FormControl ( session.wrapUpCode, [ Validators.required ] )
    };

    if ( session.sessionClassType === SessionClassType.CASE ) {
      controls.status   = new FormControl ( session.status.value, [ Validators.required ] );
      controls.team     = new FormControl ( session.team );
      controls.assignee = new FormControl ( session.user, [ Validators.required ] );
    }

    return new FormGroup ( controls );
  }

  private buildLawEnforcementComponentForm ( component: LawEnforcementComponent ): FormGroup {
    return new FormGroup ( {
      agency: new FormControl ( component.agency, [] ),
      badgeNumber: new FormControl ( component.badgeNumber, [] ),
      caseNumber: new FormControl ( component.caseNumber, [] )
    } );
  }

  private buildRefundRequestComponentForm ( component: RefundRequestComponent ): FormGroup {
    return new FormGroup ( {
      name: new FormControl ( component.name, [] ),
      ani: new FormControl ( component.ani, [] ),
      amount: new FormControl ( component.amount ? new Number ( component.amount.value ).toFixed ( 2 ) : null, [] ),
      requestedDate: new FormControl ( component.requestedDate ? component.requestedDate.value : null, [] ),
      approvedDate: new FormControl ( component.approvedDate ? component.approvedDate.value : null, [] ),
      address: this.formBuilder.address ( component.address )
    } );
  }
}
