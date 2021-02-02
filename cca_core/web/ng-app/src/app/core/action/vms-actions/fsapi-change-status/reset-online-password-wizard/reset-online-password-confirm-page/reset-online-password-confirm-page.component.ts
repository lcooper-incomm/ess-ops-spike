import { Component } from '@angular/core';
import { WizardPage } from "../../../../../wizard/wizard-page";
import { ResetOnlinePasswordWizard } from "../reset-online-password-wizard";
import { FormGroup } from "@angular/forms";
import { Observable, of } from 'rxjs';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { map, catchError } from 'rxjs/operators';
import { UpdateAccountRequest } from 'src/app/core/customer/update-account-request';
import { UpdateAccountActionType } from 'src/app/core/customer/update-account-action-type.enum';

@Component ( {
  selector: 'cca-reset-online-password-confirm-page',
  templateUrl: './reset-online-password-confirm-page.component.html',
  styleUrls: [ './reset-online-password-confirm-page.component.scss' ]
} )
export class ResetOnlinePasswordConfirmPageComponent extends WizardPage<ResetOnlinePasswordWizard> {
  key: string             = 'confirmation-page';
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor ( private customerService: CustomerService ) {
    super();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'No';
    this.nextButtonText  = 'Yes';
  }

  onNext (): Observable<string> {
    this.wizard.model.actionFailed = false;
    return this.customerService
      .resetOnlinePassword ( this.wizard.model.customer.id, this.buildRequest () )
      .pipe (
        map ( () => 'result-page' ),
        catchError ( () => {
          this.wizard.model.actionFailed = true;
          return of ( 'result-page' );
        } )
      );
  }

  private buildRequest (): UpdateAccountRequest {
    return new UpdateAccountRequest ( {
      action: UpdateAccountActionType.RESET_PASSWORD,
    } );
  }
}
