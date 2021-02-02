import { Injectable } from '@angular/core';
import { AccountHolder } from 'src/app/core/customer/update-account-request';
import { DateService } from 'src/app/core/date/date.service';
import { FlatCustomerIdentification } from 'src/app/core/customer/customer-identification';
import { IdentificationFormBuilderService } from 'src/app/detail/selection-action-toolbar/customer-account-forms/customer-account-identification-form/identification-form-builder/identification-form-builder.service';
import { IdentificationTypeType } from 'src/app/core/form/identification-field/identification-type-type.enum';
import { RegisterVmsCardRequest } from '../models/vms-request-models';
import {
  IdentificationData,
  isCanadianIdentificationData,
  RegisterVmsCardWizardModel
} from './register-vms-card-wizard';

@Injectable ( {
  providedIn: 'root'
} )
export class RegisterVmsCardRequestBuilderService {

  constructor ( private dateService: DateService ) {
  }

  buildRegisterCardRequest ( model: RegisterVmsCardWizardModel ): RegisterVmsCardRequest {
    return {
      accountHolder: this.buildAccountHolder ( model ),
      challengeInfo: model.challengeInfo,
      productCode: model.card.codes.length && model.card.codes[ 0 ].code, // TODO: what if there are multiple?
      productType: model.card.productType,
      starterCardNumber: model.card.identifiers.pan,
    }
  }

  private buildAccountHolder ( model: RegisterVmsCardWizardModel ): AccountHolder {
    const personal       = model.personal;
    const contact        = model.contact;
    const identification = model.identification;

    const baseData: AccountHolder = {
      ...personal,
      dateOfBirth: personal.dateOfBirth && this.dateService.convertMMDDYYYYToYYYYMMDD ( personal.dateOfBirth ),
      email: contact.email,
      identification: RegisterVmsCardRequestBuilderService.buildIdentification ( identification ),
      addresses: [ contact.mailingAddress, contact.physicalAddress ],
      phoneNumbers: [ contact.mobilePhone, contact.homePhone ].filter ( phone => !!phone ),
    };

    if ( isCanadianIdentificationData ( identification ) ) {
      const noTaxIdReasonCode = identification.taxpayerId && identification.noTaxpayerIdReason && identification.noTaxpayerIdReason.reasonCode;
      return {
        ...baseData,
        occupation: identification.occupation,
        tax: {
          isTaxResidentofCanada: identification.type.type === IdentificationTypeType.SOCIAL_INSURANCE_NUMBER,
          noTaxIdReasonCode,
          noTaxIdReasonDescription: noTaxIdReasonCode === IdentificationFormBuilderService.OTHER_REASON_CODE ? identification.noTaxpayerIdReasonDescription : null,
          payerId: identification.taxpayerId,
          taxJurisdictionResidence: identification.residence,
        },
      };
    } else {
      return baseData;
    }
  }

  private static buildIdentification ( identification: IdentificationData ): FlatCustomerIdentification {
    // TODO: need issuedBy = '' for Canadian?
    return new FlatCustomerIdentification ( {
      ...identification,
      type: identification.type.type,
    } );
  }
}
