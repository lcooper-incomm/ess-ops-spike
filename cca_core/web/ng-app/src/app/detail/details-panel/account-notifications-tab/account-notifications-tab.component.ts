import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Store} from '@ngrx/store';
import {MaplesAccountNotification, MaplesResultMessageResponse} from '@cscore/maples-client-model';
import {AppState} from 'src/app/app-state';
import {CcaBaseComponent} from 'src/app/core/cca-base-component';
import {DataTableField} from 'src/app/core/model/data-table-field';
import {AppStateType} from '../../../app-state-type.enum';
import {SessionState} from '../../../core/session/session-state';
import {Selection} from "../../../core/session/model/selection";
import {AccountNotificationWizard} from "./account-notification-wizard/account-notification-wizard";
import {WizardRunner} from "../../../core/wizard/wizard-runner/wizard-runner.service";
import {SecurityService} from "../../../core/security/security.service";
import {SpinnerComponent} from "../../../core/spinner/spinner.component";
import {CustomerAccountService} from "../../../core/customer-account/customer-account.service";
import {PlatformType} from "../../../core/platform/platform-type.enum";
import {finalize, flatMap} from "rxjs/operators";
import {ToastFactory} from "../../../toast/toast-factory.service";

@Component ( {
  selector: 'cca-account-notifications-tab',
  templateUrl: './account-notifications-tab.component.html',
  styleUrls: [ './account-notifications-tab.component.scss' ]
} )
export class AccountNotificationsTabComponent extends CcaBaseComponent implements OnInit {

  columns: DataTableField<MaplesAccountNotification>[] = [
    {
      key: 'id',
      label: 'ID',
      getValue: ( notification: MaplesAccountNotification ) => notification.id,
    },
    {
      key: 'dateCreated',
      label: 'Date',
      getValue: ( notification: MaplesAccountNotification ) => notification.dateCreated && notification.dateCreated.displayValue,
    },
    {
      key: 'toAddress',
      label: 'To',
      getValue: ( notification: MaplesAccountNotification ) => notification.toAddress,
    },
    {
      key: 'subject',
      label: 'Subject',
      getValue: ( notification: MaplesAccountNotification ) => notification.subject,
    },
    {
      key: 'type',
      label: 'Type',
      getValue: ( notification: MaplesAccountNotification ) => notification.type,
    },
    {
      key: 'deliveryStatus',
      label: 'Status',
      getValue: ( notification: MaplesAccountNotification ) => notification.deliveryStatus,
    },
    {
      key: 'description',
      label: 'Template Description',
      getValue: ( notification: MaplesAccountNotification ) => notification.description,
    },
    {
      key: 'resend',
      label: 'Resend',
      getValue: ( notification: MaplesAccountNotification ) => notification.id,
    },
  ];

  selection: Selection<any>;
  dataSource: MatTableDataSource<MaplesAccountNotification> = new MatTableDataSource ();
  displayedColumns: string[]                          = this.columns.map ( column => column.key );
  filterForm: FormGroup                               = new FormGroup ( {
    filter: new FormControl ()
  } );

  @ViewChild ( MatPaginator ) paginator: MatPaginator;
  @ViewChild ( MatSort ) sort: MatSort;
  @ViewChildren ( 'resendSpinners' )
  resendSpinners: QueryList<SpinnerComponent>;

  constructor ( private store: Store<AppState>,
                private wizardRunner: WizardRunner,
                private securityService: SecurityService,
                private toast: ToastFactory,
                private accountService: CustomerAccountService) {
    super ();
  }

  ngOnInit () {
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.sortingDataAccessor = ( account: MaplesAccountNotification, property: string ) => {
      const matchingField = this.columns.find ( column => column.key === property );
      if ( matchingField ) {
        return matchingField.getValue ( account );
      } else {
        return account[ property ];
      }
    };

    this.subscribeToFilterChanges ();
    this.subscribeToSessionState ();
  }

  get headerText (): string {
    const count      = this.dataSource.data.length || 0;
    const itemString = this.dataSource.data.length === 1 ? 'Account Notification' : 'Account Notifications';
    return `${count} ${itemString}`;
  }

  public openAccountNotificationDetails ( row: MaplesAccountNotification ) {
    let wizard             = new AccountNotificationWizard ();
    wizard.model.data      = row;
    wizard.model.selection = this.selection;
    wizard.model.platform = this.selection.platform;
    this.wizardRunner.run ( wizard );
  }

  private subscribeToFilterChanges (): void {
    this.addSubscription (
      this.filterForm.get ( 'filter' ).valueChanges
        .subscribe ( ( value: string ) => {
          this.dataSource.filter = value && value.trim ().toLowerCase ();
        } )
    );
  }

  private findResendSpinners ( id ): SpinnerComponent {
    return this.resendSpinners.toArray ().find ( obj => obj.id === id );
  }

  public resendNotification ( id: string, event: MouseEvent ) {
    event.stopPropagation();
    let spinner = this.findResendSpinners ( id );
    spinner.start ();
    this.accountService.resendNotification(this.selection.data.id, id, PlatformType.SERVE)
      .pipe (
        flatMap ( ( response: MaplesResultMessageResponse ) => {
          this.successToast ( 'Successfully resent Notification' );
          return this.accountService.loadNotifications(this.selection);
        } ),
        finalize ( () => spinner.stop () )
      ).subscribe ();
  }

  private successToast ( message: string ) {
    this.toast.success ( message );
  }


  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.selection = state.selection;
          }

          if ( state && state.selection && state.selection.accountNotifications ) {
            this.dataSource.data = state.selection.accountNotifications;
          } else {
            this.dataSource.data = [];
          }
        } )
    );
  }
}
