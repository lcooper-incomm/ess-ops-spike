import { CsCoreTimestamp } from "@cscore/core-client-model";
import { User } from "../../user/user";
import { WrapUpCode } from "./wrap-up-code";
import { WrapUpCodeCategory } from "./wrap-up-code-category";
import { SessionQueue } from "./session-queue";
import { SessionClass } from "./session-class";
import { SessionType } from "./session-type";
import { CallComponent } from "./call-component";
import { CardsComponent } from "./cards-component";
import { Comment } from "../../model/comment";
import { CustomerComponent } from "./customer-component";
import { DocumentsComponent } from "./documents-component";
import { LawEnforcementComponent } from "./law-enforcement-component";
import { MerchantComponent } from "./merchant-component";
import { ReceiptComponent } from "./receipt-component";
import { RefundRequestComponent } from "./refund-request-component";
import { Team } from "../../auth/team";
import { Selection, SelectionDataType } from "./selection";
import { SessionClassType } from "../session-class-type.enum";
import { SessionTypeType } from "../session-type-type.enum";
import * as _ from "lodash";
import { SelectionType } from "./selection-type.enum";
import { SessionStatus } from "./session-status";
import { SessionStatusType } from "./session-status-type.enum";
import { DisputeComponent } from "./dispute-component";
import { ComplaintComponent } from "./complaint-component";
import { PrivacyRequestComponent } from "./privacy-request-component";
import {EncorComponent} from './encor-component';

export class Session {

  id: number;
  callComponent: CallComponent;
  cardsComponent: CardsComponent;
  closedDate: CsCoreTimestamp;
  complaintComponent: ComplaintComponent;
  createdBy: User;
  createdDate: CsCoreTimestamp;
  customerComponent: CustomerComponent;
  disputeComponent: DisputeComponent;
  documentsComponent: DocumentsComponent;
  encorComponent: EncorComponent;
  isWorkable: boolean = false;
  lawEnforcementComponent: LawEnforcementComponent;
  merchantComponent: MerchantComponent;
  modifiedBy: User;
  modifiedDate: CsCoreTimestamp;
  privacyRequestComponent: PrivacyRequestComponent;
  queue: SessionQueue;
  receiptComponent: ReceiptComponent;
  refundRequestComponent: RefundRequestComponent;
  sessionClass: SessionClass; //This must be populated separately, given definitions read from the server
  sessionClassType: SessionClassType;
  sessionType: SessionType; //This must be populated separately, given definitions read from the server
  sessionTypeType: SessionTypeType;
  status: SessionStatus;
  summary: string;
  team: Team;
  user: User;
  wrapUpCode: WrapUpCode;
  wrapUpCodeCategory: WrapUpCodeCategory;

  comments: Comment[]                        = [];
  selections: Selection<SelectionDataType>[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.comments   = [];
      this.selections = [];

      if ( data.callComponent ) {
        this.callComponent = new CallComponent ( data.callComponent );
      }
      if ( data.cardsComponent ) {
        this.cardsComponent = new CardsComponent ( data.cardsComponent );
      }
      if ( data.closedDate ) {
        this.closedDate = new CsCoreTimestamp ( data.closedDate );
      }
      if ( data.complaintComponent ) {
        this.complaintComponent = new ComplaintComponent ( data.complaintComponent );
      }
      if ( data.comments ) {
        data.comments.forEach ( comment => this.comments.push ( new Comment ( comment ) ) );
      }
      if ( data.createdBy ) {
        data.createdBy = new User ( data.createdBy );
      }
      if ( data.createdDate ) {
        data.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
      if ( data.customerComponent ) {
        this.customerComponent = new CustomerComponent ( data.customerComponent );
      }
      if ( data.disputeComponent ) {
        this.disputeComponent = new DisputeComponent ( data.disputeComponent );
      }
      if ( data.documentsComponent ) {
        this.documentsComponent = new DocumentsComponent ( data.documentsComponent );
      }
      if ( data.EncorComponent ) {
        this.encorComponent = new EncorComponent ( data.encorComponent );
      }
      if ( data.lawEnforcementComponent ) {
        this.lawEnforcementComponent = new LawEnforcementComponent ( data.lawEnforcementComponent );
      }
      if ( data.merchantComponent ) {
        this.merchantComponent = new MerchantComponent ( data.merchantComponent );
      }
      if ( data.modifiedBy ) {
        this.modifiedBy = new User ( data.modifiedBy );
      }
      if ( data.modifiedDate ) {
        this.modifiedDate = new CsCoreTimestamp ( data.modifiedDate );
      }
      if ( data.privacyRequestComponent ) {
        this.privacyRequestComponent = new PrivacyRequestComponent ( data.privacyRequestComponent );
      }
      if ( data.queue ) {
        this.queue = new SessionQueue ( data.queue );
      }
      if ( data.receiptComponent ) {
        this.receiptComponent = new ReceiptComponent ( data.receiptComponent );
      }
      if ( data.refundRequestComponent ) {
        this.refundRequestComponent = new RefundRequestComponent ( data.refundRequestComponent );
      }
      if ( data.selections ) {
        _.orderBy ( data.selections, 'id', 'asc' ).forEach ( selection => this.selections.push ( new Selection ( selection ) ) );
      }
      if ( data.sessionClass ) {
        this.sessionClassType = SessionClassType[ <string>data.sessionClass ];
      }
      if ( data.sessionType ) {
        this.sessionTypeType = SessionTypeType[ <string>data.sessionType ];
      }
      if ( data.status ) {
        this.status = new SessionStatus ( data.status );
      }
      if ( data.team ) {
        this.team = new Team ( data.team );
      }
      if ( data.user ) {
        this.user = new User ( data.user );
      }
      if ( data.wrapUpCode ) {
        this.wrapUpCode = new WrapUpCode ( data.wrapUpCode );
      }
      if ( data.wrapUpCodeCategory ) {
        this.wrapUpCodeCategory = new WrapUpCodeCategory ( data.wrapUpCodeCategory );
      }
    }
  }

  getSelectionById ( id: number ): Selection<any> {
    let index = _.findIndex ( this.selections, function ( selection: Selection<any> ) {
      return selection.id === id;
    } );
    return (index >= 0) ? this.selections[ index ] : null;
  }

  getSelectionCountOfType ( type: SelectionType ): number {
    let filteredSelections = _.filter ( this.selections, function ( selection: Selection<any> ) {
      return selection.type === type;
    } );
    return filteredSelections.length;
  }

  /**
   * A session is dirty if it:
   *   * has any selections,
   *   * is a CALL-type session with a UID, or
   *   * has any Case components with populated data
   *
   * A dirty session cannot be cancelled.
   */
  isDirty (): boolean {
    let isDirty: boolean = false;

    if ( this.selections.length ) {
      isDirty = true;
    }
    if ( this.callComponent && this.callComponent.uid ) {
      isDirty = true;
    }
    if ( this.isComponentDirty ( this.customerComponent, [ 'id' ] )
      || this.isComponentDirty ( this.merchantComponent, [ 'id' ] )
      || this.isComponentDirty ( this.receiptComponent, [ 'id' ] )
      || this.isComponentDirty ( this.cardsComponent, [ 'id' ] )
      || this.isComponentDirty ( this.lawEnforcementComponent, [ 'id' ] )
      || this.isComponentDirty ( this.refundRequestComponent, [ 'id', 'amount' ] ) ) {
      isDirty = true;
    }

    return isDirty;
  }

  isInClosedStatus (): boolean {
    return this.status.value === SessionStatusType.CLOSED
      || this.status.value === SessionStatusType.CANCELLED
      || this.status.value === SessionStatusType.FORCED_CLOSED;
  }

  isInSystemStatus (): boolean {
    return this.status.value === SessionStatusType.ABANDONED
      || this.status.value === SessionStatusType.QUEUED
      || this.status.value === SessionStatusType.VMS_SESSION_FAILED;
  }

  populateSessionDefinition ( definitions: SessionClass[] ): void {
    if ( this.sessionClassType ) {
      let sessionClass: SessionClassType = this.sessionClassType;
      this.sessionClass                  = _.find ( definitions, function ( definition: SessionClass ) {
        return definition.name === sessionClass;
      } );

      if ( this.sessionClass && this.sessionTypeType ) {
        let sessionType: SessionTypeType = this.sessionTypeType;
        this.sessionType                 = _.find ( this.sessionClass.sessionTypes, function ( definition: SessionType ) {
          return definition.name === sessionType;
        } );
      }
    }
  }

  private isComponentDirty ( component: any, excludedFields: string[] = [] ): boolean {
    if ( component ) {
      for ( var property in component ) {
        if ( property === 'address' ) {
          return this.isComponentDirty ( component[ property ], [ 'type' ] );
        } else if ( property === 'cards' || property === 'cardSets' ) {
          return !!component[ property ].length;
        } else if ( component.hasOwnProperty ( property ) && component[ property ] && !_.includes ( excludedFields, property ) ) {
          return true;
        }
      }
    }
    return false;
  }
}
