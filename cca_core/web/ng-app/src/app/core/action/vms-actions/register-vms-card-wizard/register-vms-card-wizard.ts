import {AbstractWizard} from "src/app/core/wizard/abstract-wizard";
import {Customer} from "src/app/core/customer/customer";
import {WizardPage} from "src/app/core/wizard/wizard-page";
import {Type} from "@angular/core";
import {Selection} from "src/app/core/session/model/selection";
import {RegisterVmsCardValidationPageComponent} from "./register-vms-card-validation-page/register-vms-card-validation-page.component";
import {Card} from "src/app/core/card/card";
import {RegisterVmsCardEnrollmentTypePageComponent} from "./register-vms-card-enrollment-type-page/register-vms-card-enrollment-type-page.component";
import {RegisterVmsCardIdentificationPageComponent} from "./register-vms-card-identification-page/register-vms-card-identification-page.component";
import {RegisterVmsCardContactPageComponent} from "./register-vms-card-contact-page/register-vms-card-contact-page.component";
import {RegisterVmsCardPersonalPageComponent} from "./register-vms-card-personal-page/register-vms-card-personal-page.component";
import {Observable, of} from 'rxjs';
import {RegisterVmsCardConfirmationPageComponent} from "./register-vms-card-confirmation-page/register-vms-card-confirmation-page.component";
import {User} from '../../../user/user';
import {RegisterVmsCardResultPageComponent} from "./register-vms-card-result-page/register-vms-card-result-page.component";
import {CsCoreAddress, CsCorePhoneNumber} from "@cscore/core-client-model";
import {IdentificationType} from "src/app/core/customer/identification-type";
import {Occupation} from "src/app/core/customer/occupation";
import {ReasonCode} from "../../product-action-reason-code";
import {ChallengeInfo} from "../models/vms-request-models";
import {RegisterVmsCardChallengePageComponent} from "./register-vms-card-challenge-page/register-vms-card-challenge-page.component";
import {PlatformType} from "src/app/core/platform/platform-type.enum";
import {Partner} from "src/app/core/session/selection/partner";

export enum RegisterVmsCardPage {
  VALIDATION      = 'validation-page',
  ENROLLMENT_TYPE = 'enrollment-type-page',
  PERSONAL        = 'personal-page',
  CONTACT         = 'contact-page',
  IDENTIFICATION  = 'identification-page',
  CONFIRMATION    = 'confirmation-page',
  CHALLENGE       = 'challenge-page',
  RESULT          = 'result-page',
}

export class RegisterVmsCardWizard extends AbstractWizard<RegisterVmsCardWizardModel> {
  displayStepper: boolean = true;
  key: string             = 'register-vms-card';
  startingPageKey: string = RegisterVmsCardPage.VALIDATION;

  constructor () {
    super ();
    this.model     = new RegisterVmsCardWizardModel ();
    this.doRefresh = true;
  }

  buildCodexRequest ( formValue: any ): any {
    return {
      'wizard-key': this.key,
      'success': this.model.success,
    }
  }

  buildPlaceholders ( user: User, selection: Selection<any> ): void {
    super.buildPlaceholders ( user, selection );
    const numberToUse = this.model.card.identifiers.pan ? this.model.cardNumber : this.model.card.identifiers.panMasked;
    this.placeholderDictionary.addPlaceholder('CARD_NUMBER', numberToUse);
    this.placeholderDictionary.addPlaceholder('CALL_LOG_ID', selection.externalSessionId);
  }

  initPages ( pageMap: Map<string, Type<WizardPage<any>>> ): void {
    pageMap.set ( RegisterVmsCardPage.VALIDATION, RegisterVmsCardValidationPageComponent );
    pageMap.set ( RegisterVmsCardPage.ENROLLMENT_TYPE, RegisterVmsCardEnrollmentTypePageComponent );
    pageMap.set ( RegisterVmsCardPage.PERSONAL, RegisterVmsCardPersonalPageComponent );
    pageMap.set ( RegisterVmsCardPage.CONTACT, RegisterVmsCardContactPageComponent );
    pageMap.set ( RegisterVmsCardPage.IDENTIFICATION, RegisterVmsCardIdentificationPageComponent );
    pageMap.set ( RegisterVmsCardPage.CONFIRMATION, RegisterVmsCardConfirmationPageComponent );
    pageMap.set ( RegisterVmsCardPage.CHALLENGE, RegisterVmsCardChallengePageComponent );
    pageMap.set ( RegisterVmsCardPage.RESULT, RegisterVmsCardResultPageComponent );
  }

  preProcess (): Observable<any> {
    this.togglePersonalizedPagesVisibility ( false );

    // Skip validation page if PIN is already set
    if ( this.model.card.alerts.isPinSet && !this.model.isKycFailure ) {
      this.startingPageKey                                                 = RegisterVmsCardPage.ENROLLMENT_TYPE;
      this.pages.get ( RegisterVmsCardPage.VALIDATION ).instance.isIgnored = true;
    } else if ( this.model.isKycFailure ) {
      this.startingPageKey                                                 = RegisterVmsCardPage.PERSONAL;
      this.pages.get ( RegisterVmsCardPage.VALIDATION ).instance.isIgnored = true;
      this.model.enrollmentType                                            = {
        code: EnrollmentTypeCode.PERSONALIZED,
        description: 'Personalized Card',
      };
    }
    // Initially hide challenge page
    this.pages.get ( RegisterVmsCardPage.CHALLENGE ).instance.isIgnored = true;

    return of ( null );
  }

  togglePersonalizedPagesVisibility ( visible: boolean ) {
    if ( !this.model.isKycFailure ) {
      this.pages.get ( RegisterVmsCardPage.PERSONAL ).instance.isIgnored       = !visible;
      this.pages.get ( RegisterVmsCardPage.CONTACT ).instance.isIgnored        = !visible;
      this.pages.get ( RegisterVmsCardPage.IDENTIFICATION ).instance.isIgnored = !visible;
    } else {
      this.pages.get ( RegisterVmsCardPage.ENROLLMENT_TYPE ).instance.isIgnored = true;
    }
  }
}

export class RegisterVmsCardWizardModel {
  card: Card;
  cardNumber: string;
  challengeInfo: ChallengeInfo;
  contact: ContactData;
  createSession: boolean = false;
  customer: Customer;
  enrollmentType: EnrollmentType;
  externalSessionId: string;
  identification: IdentificationData;
  initialData: Customer;
  isKycFailure: boolean  = false;
  partner: Partner;
  personal: PersonalData;
  platform: PlatformType;
  postalCode: string;
  success: boolean       = true;
}

export interface PersonalData {
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  mothersMaidenName: string;
}

export interface ContactData {
  email: string;
  homePhone: CsCorePhoneNumber;
  mailingAddress: CsCoreAddress;
  mobilePhone: CsCorePhoneNumber;
  physicalAddress: CsCoreAddress;
}

export interface IdentificationData {
  number: string,
  type: IdentificationType,
}

export interface CanadianIdentificationData extends IdentificationData {
  country: string;
  expirationDate: string;
  occupation: Occupation;
  noTaxpayerIdReason: ReasonCode;
  noTaxpayerIdReasonDescription?: string;
  residence: string;
  stateProvince: string;
  verificationDate: string;
  taxpayerId: string;
}

export function isCanadianIdentificationData ( value: IdentificationData ): value is CanadianIdentificationData {
  return 'occupation' in value;
}

export interface EnrollmentType {
  code: EnrollmentTypeCode;
  description: string;
}

export enum EnrollmentTypeCode {
  PERSONALIZED = 'PERSONALIZED',
  SPEND_DOWN   = 'SPEND_DOWN',
}
