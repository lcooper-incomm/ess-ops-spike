import {Injectable} from '@angular/core';
import {Session} from "../../core/session/model/session";
import {Selection} from "../../core/session/model/selection";
import {forkJoin, Observable, of} from "rxjs";
import {ActionToolbarButtonStatus} from "../../core/action-toolbar/action-toolbar-button-status";
import {ActionService} from "./action-service";
import {SecurityService} from "../../core/security/security.service";
import {Permission} from "../../core/auth/permission";
import {PropertyService} from "../../core/config/property.service";
import {EcommOrderStatusType} from "../../core/status/ecomm-order-status/ecomm-order-status-type.enum";
import {PropertyType} from "../../core/model/property-type.enum";
import * as _ from "lodash";
import {RefundOrderActionWizard} from "./refund-order-action-wizard/refund-order-action-wizard";
import {WizardRunner} from "../../core/wizard/wizard-runner/wizard-runner.service";
import {MaplesOrder, MaplesPartner, MaplesPlatform, MaplesRefundOrderRequest} from "@cscore/maples-client-model";
import {CancelOrderActionWizard} from "./cancel-order-action-wizard/cancel-order-action-wizard";
import {PlatformType} from "../../core/platform/platform-type.enum";
import {HoldOrderWizard} from "./hold-order/hold-order-wizard";
import {ResumeOrderWizard} from "./resume-order/resume-order-wizard";
import {ResendDeliveryActionWizard} from "./resend-delivery-action-wizard/resend-delivery-action-wizard";
import {AlderResendEmailWizard} from './alder-resend-email-wizard/alder-resend-email-wizard';
import {IdentifierType} from '../../core/session/model/identifier-type.enum';

@Injectable ( {
  providedIn: 'root'
} )
export class OrderActionService extends ActionService {

  constructor ( private propertyService: PropertyService,
                protected securityService: SecurityService,
                private wizardRunner: WizardRunner ) {
    super ( securityService );

  }

  checkCancelOrder ( session: Session, selection: Selection<any> ): Observable<ActionToolbarButtonStatus> {

    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Cancel Order';
    action.isVisible = this.isSelectionDataLoaded ( selection );
    action.onClick   = () => {
      let wizard             = new CancelOrderActionWizard ();
      wizard.model.selection = selection;
      wizard.model.orderId   = selection.getOrder ().id;
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      let orderStatus = selection.getOrder ().status.current.status;

      // Must have permission
      if ( (this.isOnHold ( selection ) && !this.securityService.hasPermission ( Permission.CANCEL_ON_HOLD_ORDER ))
        || !this.securityService.hasPermission ( Permission.CANCEL_ORDER ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      // Must not be on hold if BOL
      else if ( selection.platform === PlatformType.BOL && selection.getOrder () && selection.getOrder ().alerts.isOnHold ) {
        action.disabledReason = 'Order must not be On Hold in order to perform this action.';
      }
      // Must be in eligible status
      else if ( !this.isEligibleForCancel ( orderStatus, selection.platform ) ) {
        action.disabledReason = 'Order must be in an eligible status to perform this action.';
      }
      //Must not already have a related job running in Minion
      else if (selection.relatedJobs.length > 0) {
        action.disabledReason = 'Please wait for the current job to finish.';
      }
    }

    return of ( action );
  }

  checkHoldOrder ( session: Session, selection: Selection<any> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Hold';
    action.isVisible = this.isSelectionDataLoaded ( selection );
    action.onClick   = () => {
      let wizard             = new HoldOrderWizard ();
      wizard.model.selection = selection;
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      let orderStatus = selection.getOrder ().status.current.status;

      // Must have permission
      if ( !this.securityService.hasPermission ( Permission.HOLD_ORDER ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      // Must not be a WALMART order
      else if ( selection.platform === PlatformType.BOL && selection.simplePartner === MaplesPartner.WALMART ) {
        action.disabledReason = 'Hold is not possible for Walmart Orders.';
      }
      // Must not be on hold if BOL
      else if ( selection.platform === PlatformType.BOL && selection.getOrder () && selection.getOrder ().alerts.isOnHold ) {
        action.disabledReason = 'Order must not be On Hold in order to perform this action.';
      }
      // Must not already be on hold
      else if ( this.isOnHold ( selection ) ) {
        action.disabledReason = 'Order must not already be on Hold to perform this action.';
      }
      // Must be in eligible status
      else if ( !this.isEligibleForHold ( orderStatus, selection.platform ) ) {
        action.disabledReason = 'Order must be in an eligible status to perform this action.';
      }
    }

    return of ( action );
  }

  checkRefundOrder ( session: Session, selection: Selection<any> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Refund';
    action.isVisible = this.isSelectionDataLoaded ( selection );
    action.onClick   = () => {
      let wizard             = new RefundOrderActionWizard ();
      wizard.model.selection = selection;
      wizard.model.order     = selection.getOrder ();
      wizard.model.orderId   = selection.getOrder ().id;
      wizard.model.request = new MaplesRefundOrderRequest();
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      let orderStatus = selection.getOrder ().status.current.status;
      let order       = selection.getOrder ();

      // Must have permission
      if ( !this.securityService.hasPermission ( Permission.CANCEL_ORDER_WITH_REFUND ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      // Must not be on hold if BOL
      else if ( selection.platform === PlatformType.BOL && selection.getOrder () && selection.getOrder ().alerts.isOnHold ) {
        action.disabledReason = 'Order must not be On Hold in order to perform this action.';
      }
      // Must be in eligible status
      else if ( !this.isEligibleForRefund ( orderStatus, selection.platform ) ) {
        action.disabledReason = 'Order must be in an eligible status to perform this action.';
      }
      // Must have certain required 'totals'
      else if ( !this.isEligibleForRefundByTotals ( order ) ) {
        action.disabledReason = 'Order is missing critical data for refund calculations.';
      }
    }

    return of ( action );
  }

  checkRequestHoldOrder ( session: Session, selection: Selection<any> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Request Hold';
    action.isVisible = this.isSelectionDataLoaded ( selection ) && !this.securityService.hasPermission ( Permission.HOLD_ORDER );
    action.onClick   = () => {
      //TODO create and "run" wizard here
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      let orderStatus = selection.getOrder ().status.current.status;

      //Must have permission
      if ( !this.securityService.hasPermission ( Permission.REQUEST_HOLD_ORDER ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //Must not already be on hold
      else if ( this.isOnHold ( selection ) ) {
        action.disabledReason = 'Order must not already be on Hold to perform this action.';
      }
      //Must be in eligible status
      else if ( !this.isEligibleForHold ( orderStatus, selection.platform ) ) {
        action.disabledReason = 'Order must be in an eligible status to perform this action.';
      }
    }

    return of ( action );
  }

  checkResendDelivery ( session: Session, selection: Selection<any> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Resend Delivery';
    action.isVisible = this.isSelectionDataLoaded ( selection ) && selection.platform === PlatformType.BOL;
    action.onClick   = () => {
      let wizard               = new ResendDeliveryActionWizard ();
      wizard.model.selection   = selection;
      wizard.model.orderNumber = selection.getOrder ().number;
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      // Must have permission
      if ( !this.securityService.hasPermission ( Permission.RESEND_DELIVERY ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      // Must be DIGITAL or MIXED order
      else if (selection.getOrder().type !== 'DIGITAL' && selection.getOrder().type !== 'MIXED') {
        action.disabledReason = 'Order must be a Digital or Mixed order to perform this action.';
      }
      // Must be active
      else if (selection.getOrder().status.current.status === 'CANCELLED'
          || selection.getOrder().status.current.status === 'CLOSED') {
        action.disabledReason = 'Orders must not be cancelled or closed.';
      }
    }

    return of ( action );
  }

  checkResendEmail(session: Session, selection: Selection<any>): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus();
    action.label     = 'Resend Email';
    action.isVisible = this.isSelectionDataLoaded(selection) && selection.platform === PlatformType.ALDER;
    action.onClick   = () => {
      let wizard                  = new AlderResendEmailWizard();
      wizard.model.selection      = selection;
      wizard.model.identifierType = IdentifierType.ORDER_ID;
      wizard.model.identifier     = selection.getOrder().id;
      this.wizardRunner.run(wizard);
    };

    if (this.isAbleToPerformActions(session, selection, action)) {
      // Must have permission
      if (!this.securityService.hasPermission(Permission.RESEND_ORDER_NOTIFICATION)) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
    }

    return of(action);
  }

  checkResumeOrder ( session: Session, selection: Selection<any> ): Observable<ActionToolbarButtonStatus> {
    let action       = new ActionToolbarButtonStatus ();
    action.label     = 'Resume';
    action.isVisible = this.isSelectionDataLoaded ( selection );
    action.onClick   = () => {
      let wizard             = new ResumeOrderWizard ();
      wizard.model.selection = selection;
      this.wizardRunner.run ( wizard );
    };

    if ( this.isAbleToPerformActions ( session, selection, action ) ) {
      let orderStatus = selection.getOrder ().status.current.status;
      //Must have permission
      if ( !this.securityService.hasPermission ( Permission.UNHOLD_ORDER ) ) {
        action.disabledReason = ActionService.NO_PERMISSION;
      }
      //Must not be a WALMART order
      else if ( selection.platform === PlatformType.BOL && selection.simplePartner === MaplesPartner.WALMART ) {
        action.disabledReason = 'Resume is not possible for Walmart Orders.';
      }
      //Must be on hold
      else if ( !this.isOnHold ( selection ) ) {
        action.disabledReason = 'Order must be on Hold to perform this action.';
      }
    }

    return of ( action );
  }

  doAllChecksForSelection ( session: Session, selection: Selection<any> ): Observable<ActionToolbarButtonStatus[]> {
    if (selection.getMaplesPlatform() === MaplesPlatform.ALDER) {
      return forkJoin([
        this.checkResendEmail(session, selection)
      ]);
    } else {
      return forkJoin ([
        this.checkCancelOrder ( session, selection ),
        this.checkHoldOrder ( session, selection ),
        this.checkRefundOrder ( session, selection ),
        this.checkRequestHoldOrder ( session, selection ),
        this.checkResumeOrder ( session, selection ),
        this.checkResendDelivery ( session, selection )
      ]);
    }
  }

  private isEligibleForCancel ( orderStatus: string, platform: PlatformType ): boolean {
    let eligibleStatuses = [];

    switch ( platform ) {
      case PlatformType.BOL:
        eligibleStatuses = this.propertyService.findOneValueFromSnapshot ( PropertyType.BOL_CANCEL_ORDER_SUPPORTED_STATUSES, true );
        break;
      case PlatformType.ECOMM:
        eligibleStatuses = this.propertyService.findOneValueFromSnapshot ( PropertyType.CANCEL_ORDER_SUPPORTED_STATUSES, true );
        break;
      default:
        break;
    }

    return !!_.find ( eligibleStatuses, ( status: string ) => {
      return status === orderStatus.toUpperCase ();
    } );
  }

  private isEligibleForHold ( orderStatus: string, platform: PlatformType ): boolean {
    let eligibleStatuses = [];

    switch ( platform ) {
      case PlatformType.BOL:
        eligibleStatuses = this.propertyService.findOneValueFromSnapshot ( PropertyType.BOL_HOLD_ORDER_SUPPORTED_STATUSES, true );
        break;
      case PlatformType.ECOMM:
        eligibleStatuses = this.propertyService.findOneValueFromSnapshot ( PropertyType.HOLD_ORDER_SUPPORTED_STATUSES, true );
        break;
      default:
        break;
    }

    return !!_.find ( eligibleStatuses, ( status: string ) => {
      return status === orderStatus.toUpperCase ();
    } );
  }

  private isEligibleForRefund ( orderStatus: string, platform: PlatformType ): boolean {
    let eligibleStatuses = [];

    switch ( platform ) {
      case PlatformType.BOL:
        eligibleStatuses = this.propertyService.findOneValueFromSnapshot ( PropertyType.BOL_REFUND_ORDER_SUPPORTED_STATUSES, true );
        break;
      case PlatformType.ECOMM:
        eligibleStatuses = this.propertyService.findOneValueFromSnapshot ( PropertyType.REFUND_ORDER_SUPPORTED_STATUSES, true );
        break;
      default:
        break;
    }

    return !!_.find ( eligibleStatuses, ( status: string ) => {
      return status === orderStatus.toUpperCase ();
    } );
  }

  private isEligibleForRefundByTotals ( order: MaplesOrder ): boolean {
    return !!order.totals.subtotal;
  }

  private isOnHold ( selection: Selection<MaplesOrder> ): boolean {
    if ( selection.platform === PlatformType.BOL ) {

      return selection.getOrder () && selection.getOrder ().alerts.isOnHold;
    } else {
      let orderStatus = selection.getOrder ().status.current.status;
      return orderStatus && orderStatus.toUpperCase () === EcommOrderStatusType.HOLDED;
    }

  }

}
