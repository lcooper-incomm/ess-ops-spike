import { Component, Input, OnInit } from '@angular/core';
import { FraudCaseSelectionAlert, SelectionAlert } from "../selection-alert";
import { SelectionAlertType } from "../selection-alert-type.enum";
import { getSessionTypeDisplayName, SessionTypeType } from "../../../core/session/session-type-type.enum";
import { Session } from "../../../core/session/model/session";
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { AppStateType } from "../../../app-state-type.enum";
import { SessionState } from "../../../core/session/session-state";
import { getSelectionTypeDisplayValue } from "../../../core/session/model/selection-type.enum";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { SessionClassType } from "../../../core/session/session-class-type.enum";

@Component ( {
  selector: 'cca-selection-alert',
  templateUrl: './selection-alert.component.html',
  styleUrls: [ './selection-alert.component.scss' ]
} )
export class SelectionAlertComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  alert: SelectionAlert;

  body: string;
  color: string;
  icon: string;
  title: string = 'Alert';

  private currentSelectionType: string;
  private currentSessionIsCase: boolean = false;

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToSessionState ();
    this.setBody ();
    this.setIcon ();
    this.setColor ();
    this.setTitle ();
  }

  private getCountByTypeBreakdown ( cases: Session[] ): any[] {
    let counts = new Map<SessionTypeType, number> ();

    cases.forEach ( ( session: Session ) => {
      if ( counts.has ( session.sessionTypeType ) ) {
        counts.set ( session.sessionTypeType, counts.get ( session.sessionTypeType ) + 1 );
      } else {
        counts.set ( session.sessionTypeType, 1 );
      }
    } );

    let results: any[] = [];

    counts.forEach ( ( count: number, type: SessionTypeType ) => {
      results.push ( {
        displayValue: getSessionTypeDisplayName ( type ),
        value: count
      } );
    } )

    return results;
  }

  private setBody (): void {
    let count: number = 0;
    switch ( this.alert.type ) {
      case SelectionAlertType.FRAUD_CASE:
        count     = (<FraudCaseSelectionAlert>this.alert).relatedCases.length;
        this.body = `This ${this.currentSelectionType} is involved in ${count} ${this.currentSessionIsCase ? 'other' : ''} open Fraud ${count === 1 ? 'Case' : 'Cases'}.`;
        break;
      case SelectionAlertType.FRAUD_CASE_HISTORY:
        count     = (<FraudCaseSelectionAlert>this.alert).relatedCases.length;
        this.body = `This ${this.currentSelectionType} has been involved in ${count} past Fraud ${count === 1 ? 'Case' : 'Cases'}.`;
        break;
      case SelectionAlertType.FRAUD_CUSTOMER_ACCOUNT:
        this.body = `Account Concern: Transfer to APS.`;
        break;
      case SelectionAlertType.JOB_IN_PROGRESS:
        this.body = `This Order has one or more Jobs in progress.`;
        break;
      case SelectionAlertType.ORDER_ON_HOLD:
        this.body = 'This Order has been placed On Hold.';
        break;
    }
  }

  private setIcon (): void {
    switch ( this.alert.type ) {
      case SelectionAlertType.FRAUD_CASE:
        this.icon = 'user-secret';
        break;
      case SelectionAlertType.FRAUD_CASE_HISTORY:
        this.icon = 'history';
        break;
      default:
        this.icon = 'exclamation-triangle';
    }
  }

  private setColor (): void {
    switch ( this.alert.type ) {
      case SelectionAlertType.FRAUD_CASE:
      case SelectionAlertType.JOB_IN_PROGRESS:
        this.color = 'red';
        break;
      case SelectionAlertType.FRAUD_CASE_HISTORY:
        this.color = 'grey';
        break;
    }
  }

  private setTitle (): void {
    switch ( this.alert.type ) {
      case SelectionAlertType.FRAUD_CASE:
      case SelectionAlertType.FRAUD_CUSTOMER_ACCOUNT:
        this.title = 'Involved in Fraud Case';
        break;
      case SelectionAlertType.FRAUD_CASE_HISTORY:
        this.title = 'Fraud Case History';
        break;
      case SelectionAlertType.JOB_IN_PROGRESS:
        this.title = 'Job in Progress';
        break;
      case SelectionAlertType.ORDER_ON_HOLD:
        this.title = 'Order On Hold';
        break;
    }
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection ) {
            this.currentSelectionType = getSelectionTypeDisplayValue ( state.selection.type );
          }
          if ( state && state.session ) {
            this.currentSessionIsCase = state.session.sessionClassType === SessionClassType.CASE;
          }
        } )
    );
  }

}
