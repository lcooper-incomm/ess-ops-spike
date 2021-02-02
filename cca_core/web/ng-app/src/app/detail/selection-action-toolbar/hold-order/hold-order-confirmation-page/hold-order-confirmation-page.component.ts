import { Component } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { HoldOrderWizard, HoldOrderWizardPageType } from "../hold-order-wizard";
import { FormGroup } from "@angular/forms";
import { OrderService } from "../../../../core/order/order.service";
import { Observable, of } from "rxjs";
import { catchError, mapTo } from "rxjs/operators";
import { PlatformType } from "../../../../core/platform/platform-type.enum";
import { MaplesHoldOrderRequest } from "@cscore/maples-client-model";

@Component ( {
  selector: 'cca-hold-order-confirmation-page',
  templateUrl: './hold-order-confirmation-page.component.html',
  styleUrls: [ './hold-order-confirmation-page.component.scss' ]
} )
export class HoldOrderConfirmationPageComponent extends WizardPage<HoldOrderWizard> {

  key: string           = HoldOrderWizardPageType.CONFIRMATION_PAGE;
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

  onNext (): Observable<string> {
    let request = null;
    if ( this.wizard.model.selection.platform === PlatformType.BOL ) {
      request = new MaplesHoldOrderRequest ( {
        comment: this.wizard.model.comment
      } );
    }

    return this.orderService.holdOne ( this.wizard.model.selection.getOrder ().id,
        request, this.wizard.model.selection.getMaplesPlatform(),
        this.wizard.model.selection.simplePartner )
      .pipe (
        catchError ( ( err, caught ) => {
          this.wizard.model.isFailed = true;
          return of ( HoldOrderWizardPageType.RESULTS_PAGE );
        } ),
        mapTo ( HoldOrderWizardPageType.RESULTS_PAGE )
      );
  }
}
