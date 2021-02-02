import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { RefundOrderActionWizard } from "../refund-order-action-wizard";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { OrderService } from "../../../../core/order/order.service";
import { PlatformType } from "../../../../core/platform/platform-type.enum";

@Component ( {
  selector: 'cca-refund-order-action-review',
  templateUrl: './refund-order-action-review.component.html',
  styleUrls: [ './refund-order-action-review.component.scss' ]
} )
export class RefundOrderActionReviewComponent extends WizardPage<RefundOrderActionWizard> implements OnInit {
  key: string           = 'review-page';
  PlatformType          = PlatformType;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private orderService: OrderService ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
  }

  ngOnInit () {
  }

  onNext (): Observable<any> {
    return this.orderService.refundOne ( this.wizard.model.orderId,
        this.wizard.model.request,
        this.wizard.model.selection.getMaplesPlatform(),
        this.wizard.model.selection.simplePartner )
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
