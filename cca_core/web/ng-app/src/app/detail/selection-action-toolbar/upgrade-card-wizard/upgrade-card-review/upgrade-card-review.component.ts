import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import { UpgradeCardWizard } from "../upgrade-card-wizard";
import { WizardWidth } from "../../../../core/wizard/wizard-width.enum";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { FsapiGenericResponse } from "../../../../core/model/fsapi-generic-response";
import { CustomerService } from "../../../../core/customer/customer.service";

@Component ( {
  selector: 'cca-upgrade-card-review',
  templateUrl: './upgrade-card-review.component.html',
  styleUrls: [ './upgrade-card-review.component.scss' ]
} )
export class UpgradeCardReviewComponent extends WizardPage<UpgradeCardWizard> implements OnInit {
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
    return this.customerService.updateAccount ( this.wizard.model.customerId, this.wizard.model.request )
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
