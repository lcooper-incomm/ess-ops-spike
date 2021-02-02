import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AppStateType } from "../../../app-state-type.enum";
import { SessionState } from "../../../core/session/session-state";
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { Selection } from "../../../core/session/model/selection";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { FormControl } from "@angular/forms";
import { MaplesOrder, MaplesOrderNotification } from "@cscore/maples-client-model";
import { SpinnerComponent } from "../../../core/spinner/spinner.component";
import { OrderNotificationsService } from "./order-notifications.service";
import { ToastFactory } from "../../../toast/toast-factory.service";
import { WizardRunner } from "../../../core/wizard/wizard-runner/wizard-runner.service";
import { NotificationWizard } from "./notification-wizard/notification-wizard";
import { Permission } from "../../../core/auth/permission";
import { SecurityService } from "../../../core/security/security.service";
import { finalize, flatMap, map } from "rxjs/operators";
import { OrderService } from "../../../core/order/order.service";
import { SetSelectionDataAction } from "../../../core/session/action/session-actions";
import * as _ from "lodash";

@Component ( {
  selector: 'cca-order-notifications-tab',
  templateUrl: './order-notifications-tab.component.html',
  styleUrls: [ './order-notifications-tab.component.scss' ]
} )
export class OrderNotificationsTabComponent extends CcaBaseComponent implements OnInit {
  dataSource: MatTableDataSource<MaplesOrderNotification> = new MatTableDataSource<MaplesOrderNotification> ();
  displayedColumns: string[]                        = [ 'templateName', 'sentDate', 'updatedDate', 'status', 'resend' ];
  filterControl                                     = new FormControl ();
  hasPermission: boolean;
  selection: Selection<any>;
  tooltipText: string;

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;
  @ViewChildren ( 'resendSpinners' )
  resendSpinners: QueryList<SpinnerComponent>;

  constructor ( private orderNotificationService: OrderNotificationsService,
                private orderService: OrderService,
                private store: Store<AppState>,
                private securityService: SecurityService,
                private toast: ToastFactory,
                private wizardRunner: WizardRunner ) {
    super ();
  }

  ngOnInit () {
    this.sort.disableClear              = true;
    this.dataSource.sort                = this.sort;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.filterPredicate     = ( notification: MaplesOrderNotification, filterValue: string ) => {
      if ( filterValue ) {
        filterValue = filterValue.toLowerCase ();
      }
      return (notification.templateCode && notification.templateCode.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (notification.sentDate && notification.sentDate.displayValue.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (notification.updatedDate && notification.updatedDate.displayValue.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (notification.status && notification.status.message.toLowerCase ().indexOf ( filterValue ) !== -1)
    };
    this.dataSource.sortingDataAccessor = ( item, property ) => {
      let sortValue: any;

      switch ( property ) {
        case 'templateCode':
          sortValue = item.templateCode ? item.templateCode.toLowerCase () : null;
          break;
        case 'sentDate':
          sortValue = item.sentDate ? item.sentDate.value : null;
          break;
        case 'updatedDate':
          sortValue = item.sentDate ? item.updatedDate.value : null;
          break;
        case 'status':
          sortValue = (item.status && item.status.message) ? item.status.message.toLowerCase () : null;
          break;
        default:
          sortValue = item[ property ];
          break;
      }
      return sortValue;
    };

    this.hasPermission = this.securityService.hasPermission ( Permission.RESEND_ORDER_NOTIFICATION );
    this.subscribeToSessionState ();
  }

  public applyFilter ( filterValue: string ): void {
    this.dataSource.filter = filterValue.trim ().toLowerCase ();
  }

  public openNotificationDetails ( row: MaplesOrderNotification ) {
    let wizard             = new NotificationWizard ();
    wizard.model.data      = row;
    wizard.model.selection = this.selection;
    this.wizardRunner.run ( wizard );
  }

  public resendNotification ( id: number ) {
    let spinner = this.findResendSpinners ( id );
    spinner.start ();
    this.orderNotificationService.resendOne ( id, this.selection.simplePartner )
      .pipe (
        flatMap ( ( notification: MaplesOrderNotification ) => {
          this.successToast ( 'Successfully resent Notification' );
          return this.orderService.findOneById ( this.selection.getOrder ().id,
              this.selection.getMaplesPlatform(),
              this.selection.simplePartner ) // Return this in flatMap to have this observable executed in chain
            .pipe ( map ( ( order: MaplesOrder ) => {
              this.selection.data = order;
              this.store.dispatch ( new SetSelectionDataAction ( this.selection ) ); // Updates the Store's copy of the Order
            } ) );
        } ),
        finalize ( () => spinner.stop () )
      ).subscribe ();
  }

  private findResendSpinners ( id ): SpinnerComponent {
    return this.resendSpinners.toArray ().find ( obj => obj.id === id );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state ) {
            this.selection = state.selection;
            if ( this.selection && this.selection.getOrder () ) {
              this.dataSource.data = this.selection.getOrder ().notifications;
            } else {
              this.dataSource.data = [];
            }
          }
        } )
    );
  }

  private successToast ( message: string ) {
    this.toast.success ( message );
  }

  private padLeft ( value: any ): string {
    return _.padEnd ( value, 15 );
  }

  private setTooltipText ( row: MaplesOrderNotification ): void {
    this.tooltipText =
      `
${this.padLeft ( 'ID' )}${this.truncate ( row.id )}
${this.padLeft ( 'ECNS ID' )}${this.truncate ( row.ecnsId )}
${this.padLeft ( 'Template ID' )}${this.truncate ( row.templateId )}
${this.padLeft ( 'Template Code' )}${this.truncate ( row.templateCode )}
      `;
  }

  private truncate ( value: any ): string {
    return _.truncate ( value, { length: 30 } );
  }

}
