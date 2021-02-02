import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mapTo } from 'rxjs/operators';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { FsapiStatusType } from 'src/app/core/status/fsapi-status/fsapi-status-type.enum';
import { ModifiedUpdateCardStatusRequest } from '../../models/vms-request-models';
import {
  ContactData,
  EnrollmentType,
  EnrollmentTypeCode,
  IdentificationData,
  PersonalData,
  RegisterVmsCardPage,
  RegisterVmsCardWizard,
} from '../register-vms-card-wizard';
import { RegisterVmsCardRequestBuilderService } from '../register-vms-card-request-builder.service';
import { WizardConfirmationPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-confirmation-page';
import { WizardWidth } from 'src/app/core/wizard/wizard-width.enum';

@Component ( {
  selector: 'cca-register-vms-card-confirmation-page',
  templateUrl: './register-vms-card-confirmation-page.component.html',
  styleUrls: [ './register-vms-card-confirmation-page.component.scss' ],
} )
export class RegisterVmsCardConfirmationPageComponent extends WizardConfirmationPage<RegisterVmsCardWizard> {
  key: string           = RegisterVmsCardPage.CONFIRMATION;

  readonly EnrollmentTypeCode = EnrollmentTypeCode;

  constructor ( private customerService: CustomerService, private requestBuilder: RegisterVmsCardRequestBuilderService ) {
    super ();
    this.width = WizardWidth.MEDIUM;

  }

  get cardNumber (): string {
    return this.wizard.model.card.identifiers.pan;
  }

  get contact (): ContactData {
    return this.wizard.model.contact;
  }

  get enrollmentType (): EnrollmentType {
    return this.wizard.model.enrollmentType;
  }

  get identification (): IdentificationData {
    return this.wizard.model.identification;
  }

  get isCanadian (): boolean {
    return this.wizard.model.customer.isCanadian;
  }

  get personal (): PersonalData {
    return this.wizard.model.personal;
  }

  get postalCode (): string {
    return this.wizard.model.postalCode;
  }

  onNext (): Observable<string> {
    this.wizard.model.success = true;
    return this.sendRequest ()
      .pipe (
        catchError ( () => {
          this.wizard.model.success = false;
          return of ( RegisterVmsCardPage.RESULT );
        } ),
      )
  }

  private sendRequest (): Observable<string> {
    const customerId = this.wizard.model.customer.id;

    if ( this.wizard.model.enrollmentType.code === EnrollmentTypeCode.SPEND_DOWN ) {
      return this.customerService
        .changeCardStatus ( customerId, this.buildChangeStatusRequest () )
        .pipe ( mapTo ( RegisterVmsCardPage.RESULT ) );
    } else {
      const createSession = this.wizard.model.createSession;
      const partner       = this.wizard.model.partner;
      const platform      = this.wizard.model.platform;
      const request       = this.requestBuilder.buildRegisterCardRequest ( this.wizard.model );

      return this.customerService
        .registerCard ( customerId, request, platform, partner, createSession )
        .pipe (
          map ( result => {
            if ( result.productRegistrationResponseData && result.productRegistrationResponseData.challengeInfo ) {
              this.wizard.model.challengeInfo                                            = result.productRegistrationResponseData.challengeInfo;
              this.wizard.pages.get ( RegisterVmsCardPage.CHALLENGE ).instance.isIgnored = false;
              return RegisterVmsCardPage.CHALLENGE;
            } else {
              return RegisterVmsCardPage.RESULT;
            }
          } ),
        );
    }
  }

  private buildChangeStatusRequest (): ModifiedUpdateCardStatusRequest {
    return new ModifiedUpdateCardStatusRequest ( {
      currentStatus: this.wizard.model.card.getFsapiStatus (),
      panLastFour: this.wizard.model.card.identifiers.panLastFour,
      postalCode: this.wizard.model.postalCode,
      value: FsapiStatusType.CARD_ACTIVATION,
    } );
  }
}
