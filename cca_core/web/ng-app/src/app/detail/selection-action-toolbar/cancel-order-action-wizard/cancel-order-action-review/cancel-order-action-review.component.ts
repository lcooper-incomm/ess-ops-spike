import { Component } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { CancelOrderActionWizard } from "../cancel-order-action-wizard";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { OrderService } from "../../../../core/order/order.service";
import { PlatformType } from "../../../../core/platform/platform-type.enum";

@Component ( {
  selector: 'cca-cancel-order-action-review',
  templateUrl: './cancel-order-action-review.component.html',
  styleUrls: [ './cancel-order-action-review.component.scss' ]
} )
export class CancelOrderActionReviewComponent extends WizardPage<CancelOrderActionWizard> {
  key: string           = 'review-page';
  PlatformType          = PlatformType;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private orderService: OrderService ) {
    super ();
  }

  ngOnInit (): void {
    this.isBackable      = this.wizard.model.selection.platform === PlatformType.BOL;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = this.wizard.model.selection.platform === PlatformType.BOL ? 'Cancel' : 'No';
    this.nextButtonText  = 'Yes';
  }

  onNext (): Observable<any> {
    return this.orderService.cancelOne ( this.wizard.model.orderId,
        this.wizard.model.request,
        this.wizard.model.selection.getMaplesPlatform(),
        this.wizard.model.selection.simplePartner )
      .pipe (
        catchError ( () => {
          this.wizard.model.isFailed = true;
          return 'confirmation-page';
        } ),
        map ( ( value ) => {
          return 'confirmation-page';
        } )
      );
  }

}
