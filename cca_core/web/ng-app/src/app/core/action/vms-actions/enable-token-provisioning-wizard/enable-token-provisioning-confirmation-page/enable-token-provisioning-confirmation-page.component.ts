import { Component } from '@angular/core';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { EnableTokenProvisioningWizard } from '../enable-token-provisioning-wizard';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap, switchMap, map } from 'rxjs/operators';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { UpdateAccountRequest } from 'src/app/core/customer/update-account-request';
import { UpdateAccountActionType } from 'src/app/core/customer/update-account-action-type.enum';
import { TokenProvisioningStatusType } from 'src/app/core/customer/token-provisioning-status-type.enum';

@Component ( {
  selector: 'cca-enable-token-provisioning-confirmation-page',
  templateUrl: './enable-token-provisioning-confirmation-page.component.html',
  styleUrls: [ './enable-token-provisioning-confirmation-page.component.scss' ]
} )
export class EnableTokenProvisioningConfirmationPageComponent extends WizardPage<EnableTokenProvisioningWizard> {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private customerService: CustomerService ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
  }

  onNext (): Observable<string> {
    this.wizard.model.success   = true;
    this.wizard.model.supported = false;
    return this.customerService
      .updateAccount ( this.wizard.model.selection.getCustomer ().id, this.buildRequest () )
      .pipe (
        switchMap ( this.getUpdatedProvisioningStatus.bind ( this ) ),
        tap ( status => this.wizard.model.supported = status === TokenProvisioningStatusType.SUPPORTED ),
        catchError ( () => {
          this.wizard.model.success = false;
          return of ( null );
        } ),
        mapTo ( 'result-page' ),
      );
  }

  private getUpdatedProvisioningStatus (): Observable<TokenProvisioningStatusType> {
    return this.customerService
      .findOneById ( this.wizard.model.selection.getCustomer ().id, this.wizard.model.selection.platform, this.wizard.model.selection.partner )
      .pipe (
        map ( customer => customer.tokenProvisioningStatus ),
        catchError ( () => of ( TokenProvisioningStatusType.UNSUPPORTED ) ),
      );
  }

  private buildRequest (): UpdateAccountRequest {
    return new UpdateAccountRequest ( {
      accountDetail: {},
      action: this.wizard.model.isOverrideApplied ?
        UpdateAccountActionType.UNLOCK_ACCOUNT_WITH_OVERRIDE_FOR_TOKEN_PROVISIONING :
        UpdateAccountActionType.UNLOCK_ACCOUNT_FOR_TOKEN_PROVISIONING,
      comment: this.wizard.model.comment,
    } );
  }
}
