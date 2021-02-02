import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { ResendDeliveryActionWizard } from "../resend-delivery-action-wizard";
import { PlatformType } from "../../../../core/platform/platform-type.enum";
import { FormGroup } from "@angular/forms";
import { OrderService } from "../../../../core/order/order.service";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Component ( {
  selector: 'cca-resend-delivery-review',
  templateUrl: './resend-delivery-review.component.html',
  styleUrls: [ './resend-delivery-review.component.scss' ]
} )
export class ResendDeliveryReviewComponent extends WizardPage<ResendDeliveryActionWizard> implements OnInit {
  key: string           = 'review-page';
  PlatformType          = PlatformType;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private orderService: OrderService ) {
    super ();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
  }

  ngOnInit () {
  }

  onNext (): Observable<any> {
    return this.orderService.resendDeliveryEmail ( this.wizard.model.selection.getOrder ().number, this.wizard.model.selection.simplePartner )
      .pipe (
        catchError ( () => {
          this.wizard.model.isFailed = true;
          return 'confirmation-page';
        } ),
        map ( ( value: any ) => {
          return 'confirmation-page';
        } )
      );
  }
}
