import { Component, OnInit, ViewChild } from '@angular/core';
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { Selection } from "../../../core/session/model/selection";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { AppStateType } from "../../../app-state-type.enum";
import { SessionState } from "../../../core/session/session-state";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { SpinnerComponent } from "../../../core/spinner/spinner.component";
import { CustomerAlertsService } from "../../../core/customer/customer-alerts.service";
import { finalize } from "rxjs/operators";
import { CustomerAlert, CustomerAlertsInfo } from "../../../core/customer/customer-alert";
import { SetSelectionCustomerAlertsAction } from "../../../core/session/action/session-actions";
import { WizardRunner } from "../../../core/wizard/wizard-runner/wizard-runner.service";
import { UpdateCustomerAlertWizard } from "./update-customer-alert-wizard/update-customer-alert-wizard";
import * as _ from "lodash";
import { Card } from '../../../core/card/card';
import { CsCoreStatus } from "../../../core/model/cs-core-status";
import { FsapiStatusType } from "../../../core/status/fsapi-status/fsapi-status-type.enum";

@Component ( {
  selector: 'cca-customer-alerts-tab',
  templateUrl: './customer-alerts-tab.component.html',
  styleUrls: [ './customer-alerts-tab.component.scss' ]
} )
export class CustomerAlertsTabComponent extends CcaBaseComponent implements OnInit {

  dataSource                        = new MatTableDataSource<CustomerAlert> ();
  displayedColumns: string[]        = [ 'name', 'description', 'value', 'delivery', 'status' ];
  isAlertManagementEnabled: boolean = true;
  selection: Selection<any>;

  @ViewChild ( 'alertsSpinner' )
  spinner: SpinnerComponent;
  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  private isInitialLoadTriggered: boolean = false;

  constructor ( private customerAlertsService: CustomerAlertsService,
                private store: Store<AppState>,
                private wizardRunner: WizardRunner ) {
    super ();
  }

  ngOnInit () {
    this.initDataSource ();
    this.subscribeToSessionState ();
  }

  openEditDialog ( alert: CustomerAlert ): void {
    if ( this.isAlertManagementEnabled ) {
      let wizard             = new UpdateCustomerAlertWizard ();
      wizard.model.alert     = _.clone ( alert );
      wizard.model.selection = this.selection;
      this.wizardRunner.run ( wizard )
        .afterClosed ()
        .subscribe ( () => this.loadAlerts () );
    }
  }

  private initDataSource (): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  private loadAlerts (): void {
    this.spinner.start ();

    this.customerAlertsService.findAllByCustomerId ( this.selection.getCustomer ().id )
      .pipe ( finalize ( () => this.spinner.stop () ) )
      .subscribe ( ( alerts: CustomerAlertsInfo ) => {
        this.store.dispatch ( new SetSelectionCustomerAlertsAction ( alerts ) );
      } );
  }

  private setAlertManagementFlag (): void {
    let isEnabled = true;

    if ( this.selection
      && this.selection.getCustomer () ) {
      let nonClosedOrExpiredCardCount = 0;
      this.selection.getCustomer ().cards.forEach ( ( card: Card ) => {
        let cardStatus: CsCoreStatus = card.getStatusByPlatform ( this.selection.platform );
        //Card only counts if it's not in Closed or Expired status, and is not actually Expired regardless of status
        if ( cardStatus
          && cardStatus.name !== FsapiStatusType.CLOSED
          && cardStatus.name !== FsapiStatusType.EXPIRED
          && (!card.expirationDate || card.expirationDate.value.getTime () > new Date ().getTime ()) ) {
          nonClosedOrExpiredCardCount++;
        }
      } );
      isEnabled = nonClosedOrExpiredCardCount > 0;
    }

    this.isAlertManagementEnabled = isEnabled;
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection ) {
            this.selection = state.selection;
            this.setAlertManagementFlag ();

            if ( state.selection.customerAlerts && state.selection.customerAlerts.alerts.length ) {
              this.dataSource.data = state.selection.customerAlerts.alerts;
            } else if ( this.selection.getCustomer () && !this.isInitialLoadTriggered ) {
              this.isInitialLoadTriggered = true;
              this.dataSource.data        = [];
              this.loadAlerts ();
            }
          }
        } )
    );
  }
}
