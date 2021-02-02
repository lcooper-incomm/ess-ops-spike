import {Component, OnInit, ViewChild} from '@angular/core';
import {CcaBaseComponent} from "../../../core/cca-base-component";
import {Selection} from "../../../core/session/model/selection";
import {Store} from "@ngrx/store";
import {AppState} from "../../../app-state";
import {AppStateType} from "../../../app-state-type.enum";
import {SessionState} from "../../../core/session/session-state";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {SpinnerComponent} from "../../../core/spinner/spinner.component";
import {WizardRunner} from "../../../core/wizard/wizard-runner/wizard-runner.service";
import {MaplesAlert, MaplesAlertPreference} from "@cscore/maples-client-model";

@Component({
  selector: 'cca-account-alerts-tab',
  templateUrl: './account-alerts-tab.component.html',
  styleUrls: ['./account-alerts-tab.component.scss']
})
export class AccountAlertsTabComponent extends CcaBaseComponent implements OnInit {

  dataSource                        = new MatTableDataSource<MaplesAlert>();
  displayedColumns: string[]        = ['name', 'frequency', 'value', 'delivery', 'status'];
  isAlertManagementEnabled: boolean = true;
  selection: Selection<any>;

  @ViewChild('alertsSpinner')
  spinner: SpinnerComponent;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  private isInitialLoadTriggered: boolean = false;

  constructor(
    private store: Store<AppState>,
    private wizardRunner: WizardRunner) {
    super();
  }

  ngOnInit() {
    this.initDataSource();
    this.subscribeToSessionState();
  }

  //TODO commented out until APLS portion is complete
  //openEditDialog ( alert: any ): void {
  //  if ( this.isAlertManagementEnabled ) {
  //    let wizard = new UpdateAccountAlertWizard ();
  //    wizard.model.alert = _.clone ( alert );
  //    wizard.model.selection = this.selection;
  //    this.wizardRunner.run ( wizard )
  //      .afterClosed ()
  //      .subscribe ( () => this.loadAlerts () );
  //  }
  //}

  private initDataSource(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;

    this.dataSource.sortingDataAccessor = ( alert: MaplesAlert, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'name':
          let name  = alert.type ? alert.type : null;
          sortValue = name ? name.toLowerCase () : null;
          break;
        case 'frequency':
          sortValue  = alert.schedule ? alert.schedule.frequency : null;
          break;
        case 'value':
          sortValue  = alert.threshold ? alert.threshold.value : null;
          break;
        case 'delivery':
          sortValue  = alert.preference? this.getDeliveryMethod(alert.preference) : null;
          break;
        case 'status':
          sortValue  = alert.enabled? "active" : "inactive";
          break;
        default:
          sortValue = alert[ property ];
          break;
      }

      return sortValue;
    };
  }

  private loadAlerts(): void {
    this.spinner.start();

    this.dataSource.data = this.selection.data.alerts.map(alert => {
      return new MaplesAlert(alert)
    })

    this.spinner.stop()
  }

  private formatName(name: string): string {
    const formattedName = name.replace(/([A-Z])/g, " $1");
    return formattedName;
  }

  private getDeliveryMethod(preference: MaplesAlertPreference): string {
    let delivery = null;
    if (preference.email == "true" && preference.sms == "true") {
      delivery = "BOTH";
    } else if (preference.email == "true") {
      delivery = "EMAIL";
    } else if (preference.sms == "true") {
      delivery = "MOBILE";
    } else {
      delivery = "OFF";
    }

    return delivery;
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state && state.selection) {
            this.selection = state.selection;

            if (state.selection.data && this.isInitialLoadTriggered) {
              this.dataSource.data = this.selection.data.alerts.map(alert => {
                return new MaplesAlert(alert)
              })
            } else if (this.selection.getCustomer() && !this.isInitialLoadTriggered) {
              this.isInitialLoadTriggered = true;
              this.dataSource.data        = [];
              this.loadAlerts();
            }
          }
        })
    );
  }
}
