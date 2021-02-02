import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { FormGroup } from "@angular/forms";
import { ReplaceFsapiCardWizard } from "../replace-fsapi-card-wizard";
import { Observable } from "rxjs";
import { CustomerService } from "../../../../core/customer/customer.service";
import { catchError, map } from "rxjs/operators";
import { WizardWidth } from "../../../../core/wizard/wizard-width.enum";
import { FsapiGenericResponse } from "../../../../core/model/fsapi-generic-response";

@Component ( {
  selector: 'cca-replace-fsapi-card-review',
  templateUrl: './replace-fsapi-card-review.component.html',
  styleUrls: [ './replace-fsapi-card-review.component.scss' ]
} )
export class ReplaceFsapiCardReviewComponent extends WizardPage<ReplaceFsapiCardWizard> implements OnInit {
  key: string           = 'review-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private customerService: CustomerService ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
    this.width           = WizardWidth.MEDIUM;
  }

  ngOnInit () {
  }

  onNext (): Observable<any> {
    return this.customerService.replaceCard ( this.wizard.model.customerId, this.wizard.model.request )
      .pipe (
        catchError ( () => {
          this.wizard.model.isFailed = true;
          return 'confirmation-page';
        } ),
        map ( ( value: FsapiGenericResponse ) => {
          this.wizard.model.newCardNumber = value.newPan;
          return 'confirmation-page';
        } )
      );

  }
}
