import { Component } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { ResumeOrderWizard, ResumeOrderWizardPageType } from "../resume-order-wizard";
import { FormGroup } from "@angular/forms";
import { OrderService } from "../../../../core/order/order.service";
import { Observable, of } from "rxjs";
import { catchError, mapTo } from "rxjs/operators";
import { PlatformType } from "../../../../core/platform/platform-type.enum";

@Component ( {
  selector: 'cca-resume-order-confirmation-page',
  templateUrl: './resume-order-confirmation-page.component.html',
  styleUrls: [ './resume-order-confirmation-page.component.scss' ]
} )
export class ResumeOrderConfirmationPageComponent extends WizardPage<ResumeOrderWizard> {

  key: string           = ResumeOrderWizardPageType.CONFIRMATION_PAGE;
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
    this.wizard.model.isFailed = false;
    return this.orderService.resumeOne ( this.wizard.model.selection.getOrder ().id, this.wizard.model.request, this.wizard.model.selection.simplePartner )
      .pipe (
        catchError ( ( err, caught ) => {
          this.wizard.model.isFailed = true;
          return of ( ResumeOrderWizardPageType.RESULTS_PAGE );
        } ),
        mapTo ( ResumeOrderWizardPageType.RESULTS_PAGE )
      );
  }
}
