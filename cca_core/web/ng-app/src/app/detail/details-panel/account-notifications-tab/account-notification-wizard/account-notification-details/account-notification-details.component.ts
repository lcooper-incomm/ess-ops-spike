import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { ToastFactory } from "../../../../../toast/toast-factory.service";
import { WizardWidth } from "../../../../../core/wizard/wizard-width.enum";
import { PlatformType } from "../../../../../core/platform/platform-type.enum";
import { AccountNotificationWizard } from "../account-notification-wizard";
import { CustomerAccountService } from "../../../../../core/customer-account/customer-account.service";
import {MaplesAccountNotification, MaplesResultMessageResponse} from "@cscore/maples-client-model";
import { SetSelectionAccountNotificationsAction } from "../../../../../core/session/action/session-actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";

@Component ( {
  selector: 'cca-account-notification-details',
  templateUrl: './account-notification-details.component.html',
  styleUrls: [ './account-notification-details.component.scss' ]
} )
export class AccountNotificationDetailsComponent extends WizardPage<AccountNotificationWizard> implements OnInit {
  emailTemplate: any;
  key: string           = 'form-page';
  PlatformType          = PlatformType;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private store: Store<AppState>,
                private customerAccountService: CustomerAccountService,
                private toast: ToastFactory ) {
    super ();
    this.isCloseable    = true;
    this.isNextable     = true;
    this.nextButtonText = 'Resend';
    this.width          = WizardWidth.LARGE;
  }

  ngOnInit () {
    if ( this.wizard.model.data.template ) {
      this.emailTemplate = this.wizard.model.data.template;
    } else {
      this.getEmailTemplate ();
    }
  }

  onNext (): Observable<string> {
    this.resendNotification ( this.wizard.model.data.id );
    return of ( 'form-page' );
  }

  /**
   * Call the notification by message id to get the template details.  Then update the accountNotifications in the selection
   * so this detail call is only called once for this selection.
   */
  public getEmailTemplate (): void {
    this.customerAccountService.findNotification ( this.wizard.model.selection.getCustomerAccount().id, this.wizard.model.data.id, this.wizard.model.platform )
      .subscribe ( ( data: MaplesAccountNotification ) => {
        this.emailTemplate = data.template;
        this.wizard.model.data.template = data.template;

        this.wizard.model.selection.accountNotifications.find((accountNotification: MaplesAccountNotification) => accountNotification.id === this.wizard.model.data.id ).template = data.template;
        this.store.dispatch ( new SetSelectionAccountNotificationsAction ( this.wizard.model.selection ) );
      } );
  }

  public resendNotification ( id: string ) {
    this.customerAccountService.resendNotification( this.wizard.model.selection.getCustomerAccount().id, id, this.wizard.model.selection.platform )
      .subscribe ( ( data: MaplesResultMessageResponse ) => {
        this.successToast ( 'Successfully resent Notification' );
      } )
  }

  private successToast ( message: string ) {
    this.toast.success ( message );
  }

}
