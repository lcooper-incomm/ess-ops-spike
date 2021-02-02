import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { NotificationWizard } from "../notification-wizard";
import { FormGroup } from "@angular/forms";
import { MaplesOrderNotification } from "@cscore/maples-client-model";
import { OrderNotificationsService } from "../../order-notifications.service";
import { Observable, of } from "rxjs";
import { ToastFactory } from "../../../../../toast/toast-factory.service";
import { SecurityService } from "../../../../../core/security/security.service";
import { Permission } from "../../../../../core/auth/permission";
import { WizardWidth } from "../../../../../core/wizard/wizard-width.enum";
import { PlatformType } from "../../../../../core/platform/platform-type.enum";

@Component ( {
  selector: 'cca-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: [ './notification-details.component.scss' ]
} )
export class NotificationDetailsComponent extends WizardPage<NotificationWizard> implements OnInit {
  emailTemplate: any;
  key: string           = 'form-page';
  PlatformType          = PlatformType;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private orderNotificationService: OrderNotificationsService,
                private securityService: SecurityService,
                private  toast: ToastFactory ) {
    super ();
    this.isCloseable    = true;
    this.isNextable     = false;
    this.nextButtonText = 'Resend'
    this.width          = WizardWidth.LARGE;
  }

  ngOnInit () {
    this.getEmailTemplate ( this.wizard.model.data.id );
    this.isNextable = this.securityService.hasPermission ( Permission.RESEND_ORDER_NOTIFICATION );
  }

  onNext (): Observable<string> {
    this.resendNotification ( this.wizard.model.data.id );
    return of ( 'form-page' );
  }

  public getEmailTemplate ( id: number ) {
    this.orderNotificationService.findOne ( id, this.wizard.model.selection.simplePartner )
      .subscribe ( ( data: MaplesOrderNotification ) => {
        this.emailTemplate = data.content;
      } )
  }

  public resendNotification ( id: number ) {
    this.orderNotificationService.resendOne ( id, this.wizard.model.selection.simplePartner )
      .subscribe ( ( data: MaplesOrderNotification ) => {
        this.successToast ( 'Successfully resent Notification' );
      } )
  }

  private successToast ( message: string ) {
    this.toast.success ( message );
  }

}
