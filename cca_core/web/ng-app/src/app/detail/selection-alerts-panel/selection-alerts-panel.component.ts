import {Component, OnInit} from '@angular/core';
import {FraudCaseSelectionAlert, OrderJobInProgressSelectionAlert, SelectionAlert} from "./selection-alert";
import {Store} from "@ngrx/store";
import {AppState} from "../../app-state";
import {CcaBaseComponent} from "../../core/cca-base-component";
import {AppStateType} from "../../app-state-type.enum";
import {SessionState} from "../../core/session/session-state";
import {SelectionAlertType} from "./selection-alert-type.enum";
import {Selection} from "../../core/session/model/selection";
import {Session} from '../../core/session/model/session';
import * as _ from "lodash";
import {getSelectionTypeDisplayValue, SelectionType} from "../../core/session/model/selection-type.enum";
import {SetSelectionRelatedCasesAction, SetSelectionSelectedTabAction} from "../../core/session/action/session-actions";
import {SessionService} from "../../core/session/session.service";
import {SpinnerSize} from "../../core/spinner/spinner-size.enum";
import {finalize} from "rxjs/operators";
import {RelatedSessionsWizard} from './related-sessions/related-sessions-wizard';
import {WizardRunner} from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import {OrderService} from "../../core/order/order.service";
import {DetailTabType} from "../detail-tab-type.enum";

@Component ( {
  selector: 'cca-selection-alerts-panel',
  templateUrl: './selection-alerts-panel.component.html',
  styleUrls: [ './selection-alerts-panel.component.scss' ]
} )
export class SelectionAlertsPanelComponent extends CcaBaseComponent implements OnInit {

  alerts: SelectionAlert[]             = [];
  attemptedToLoadRelatedCases: boolean = false;
  header: string;
  isAlertAwareSelectionType: boolean   = false;
  isLoading: boolean                   = false;
  SpinnerSize                          = SpinnerSize;

  private currentSelectionType: string;
  private currentSessionId: number;
  private selection: Selection<any>;

  constructor ( private orderService: OrderService,
                private sessionService: SessionService,
                private store: Store<AppState>,
                private wizardRunner: WizardRunner ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
  }

  alertClicked ( alert: SelectionAlert ): void {
    if ( alert instanceof FraudCaseSelectionAlert ) {
      this.openRelatedSessionsDialog ( alert );
    } else if ( alert instanceof OrderJobInProgressSelectionAlert ) {
      this.openRelatedJobsTab ();
    }
  }

  private buildAlerts (): void {
    this.alerts = [];
    this.buildJobInProgressAlert ();
    this.buildOrderOnHoldAlert ();
    this.buildRelatedCaseAlerts ();
    this.buildCustomerAccountAlerts();
    this.buildHeader ();
  }

  private buildHeader (): void {
    this.header = `${this.currentSelectionType ? this.currentSelectionType + ' ' : ''}Alerts (${this.alerts.length})`;
  }

  private buildJobInProgressAlert (): void {
    // Only show this alert if the orderId is found in a Job with status SCHEDULED or ACTIVE
    if (this.selection.relatedJobs.length) {
      let alert      = new OrderJobInProgressSelectionAlert ();
      alert.priority = 2;
      alert.type     = SelectionAlertType.JOB_IN_PROGRESS;
      this.alerts.push ( alert );
    }
  }

  private buildOrderOnHoldAlert (): void {
    if ( this.selection.type === SelectionType.ORDER && this.selection.getOrder () && this.selection.getOrder ().alerts.isOnHold ) {
      let alert         = new SelectionAlert ();
      alert.isClickable = false;
      alert.priority    = 2;
      alert.type        = SelectionAlertType.ORDER_ON_HOLD;
      this.alerts.push ( alert );
    }
  }

  private buildRelatedCaseAlerts (): void {
    // Only show this alert if one or more related cases are found
    if ( this.selection.relatedCases.length ) {
      // We don't want to show an alert if the related case is THIS case
      let filteredCases: Session[] = _.filter ( this.selection.relatedCases, ( session: Session ) => {
        return session.id !== this.currentSessionId;
      } );

      let openCases: Session[] = _.filter ( filteredCases, ( session: Session ) => {
        return !session.closedDate;
      } );

      let pastCases: Session[] = _.filter ( filteredCases, ( session: Session ) => {
        return !!session.closedDate;
      } );

      if ( openCases.length ) {
        let alert          = new FraudCaseSelectionAlert ();
        alert.priority     = 1;
        alert.type         = SelectionAlertType.FRAUD_CASE;
        alert.relatedCases = [ ...openCases ];
        this.alerts.push ( alert );
      }
      if ( pastCases.length ) {
        let alert          = new FraudCaseSelectionAlert ();
        alert.priority     = 4;
        alert.type         = SelectionAlertType.FRAUD_CASE_HISTORY;
        alert.relatedCases = [ ...pastCases ];
        this.alerts.push ( alert );
      }
    }
  }

  /**
   * Special case for Customer Account (SERVE) because these cases are handled by their system and not CCA.
   */
  buildCustomerAccountAlerts(): void {
    if (this.selection.getCustomerAccount().features && this.selection.getCustomerAccount().features.isRedBanner) {
      let alert         = new SelectionAlert();
      alert.priority    = 1;
      alert.type        = SelectionAlertType.FRAUD_CUSTOMER_ACCOUNT;
      alert.isClickable = false;
      this.alerts.push(alert);
    }
  }

  private loadRelatedCases (): void {
    if ( !this.attemptedToLoadRelatedCases && this.isAlertAwareSelectionType ) {
      this.isLoading                   = true;
      this.attemptedToLoadRelatedCases = true;
      this.sessionService.findAllCasesRelatedToSelection ( this.selection )
        .pipe ( finalize ( () => this.isLoading = false ) )
        .subscribe ( ( cases: Session[] ) => {
          this.selection.relatedCases = cases;
          this.store.dispatch ( new SetSelectionRelatedCasesAction ( this.selection ) );
        } );
    }
  }

  private openRelatedJobsTab (): void {
    this.selection.selectedTab = DetailTabType.RELATED_JOBS;
    this.store.dispatch ( new SetSelectionSelectedTabAction ( this.selection ) );
  }

  private openRelatedSessionsDialog ( alert: FraudCaseSelectionAlert ): void {
    let wizard                   = new RelatedSessionsWizard ();
    wizard.model.sessions        = alert.relatedCases;
    wizard.model.selectedSession = alert.relatedCases[ 0 ];
    this.wizardRunner.run ( wizard );
  }

  private setIsAlertAwareSelectionType (): void {
    this.isAlertAwareSelectionType = this.selection && _.includes([SelectionType.ACCOUNT, SelectionType.CUSTOMER, SelectionType.CUSTOMER_ACCOUNT, SelectionType.ORDER, SelectionType.CARD], this.selection.type);
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.session ) {
            this.currentSessionId = state.session.id;
          }
          if ( state && state.selection ) {
            // If this is a new selection to the component, reset the flags that trigger loading the required pieces
            let isNewSelection = !this.selection || this.selection.id !== state.selection.id;
            if ( isNewSelection ) {
              this.attemptedToLoadRelatedCases = false;
            }

            this.selection = state.selection;
            if ( this.selection ) {
              this.currentSelectionType = getSelectionTypeDisplayValue ( this.selection.type );
              this.setIsAlertAwareSelectionType ();
              if ( !this.selection.relatedCases.length && !this.attemptedToLoadRelatedCases ) {
                this.loadRelatedCases ();
              }
            }

            this.buildAlerts ();
          }
        } )
    );
  }
}
