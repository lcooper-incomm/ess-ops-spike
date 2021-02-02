import { Injectable } from '@angular/core';
import {
  AccountHolder,
  UpdateAccountDetail,
  UpdateAccountReasonType,
  UpdateAccountRequest
} from 'src/app/core/customer/update-account-request';
import { Customer } from 'src/app/core/customer/customer';
import { UpdateAccountActionType } from 'src/app/core/customer/update-account-action-type.enum';
import { CsCoreAddress, CsCoreAddressType, CsCorePhoneNumber, CsCorePhoneNumberType } from "@cscore/core-client-model";
import { FlatCustomerIdentification } from 'src/app/core/customer/customer-identification';
import { PlatformType } from 'src/app/core/platform/platform-type.enum';
import { Tax } from 'src/app/core/customer/tax';
import { Occupation } from 'src/app/core/customer/occupation';
import { IdentificationTypeType } from 'src/app/core/form/identification-field/identification-type-type.enum';
import { DateService } from 'src/app/core/date/date.service';
import { EditCustomerAccountSnapshot } from '../edit-customer-account-snapshot';

@Injectable ( {
  providedIn: 'root'
} )
export class UpdateAccountRequestBuilder {

  constructor ( private dateService: DateService ) {
  }

  buildRequest (
    snapshot: EditCustomerAccountSnapshot,
    action: UpdateAccountActionType,
    customer: Customer,
    platform: PlatformType,
    occupation: Occupation,
    comment: string,
    reason: string,
  ): UpdateAccountRequest {
    const isActiveUnregistered = customer.isActiveUnregistered;
    const isCanadian           = customer.isCanadian;

    const request = new UpdateAccountRequest ( {
      action,
      comment,
      reason,
    } );

    const homePhone: CsCorePhoneNumber = !snapshot.homePhone ? null : new CsCorePhoneNumber ( {
      number: snapshot.homePhone,
      type: CsCorePhoneNumberType.LANDLINE
    } );

    const mobilePhone: CsCorePhoneNumber = !snapshot.mobilePhone ? null : new CsCorePhoneNumber ( {
      number: snapshot.mobilePhone,
      type: CsCorePhoneNumberType.MOBILE
    } );

    const physicalAddress = new CsCoreAddress ( {
      line1: snapshot.physicalAddressLine1,
      line2: snapshot.physicalAddressLine2,
      city: snapshot.physicalAddressCity,
      state: snapshot.physicalAddressState,
      postalCode: snapshot.physicalAddressPostalCode,
      country: snapshot.physicalAddressCountry,
      type: CsCoreAddressType.PHYSICAL
    } );

    //If this is active-unregistered, overwrite all but the postalCode with these values
    if ( isActiveUnregistered ) {
      if ( isCanadian ) {
        physicalAddress.line1   = '13575 Commerce Parkway';
        physicalAddress.line2   = 'Suite 110';
        physicalAddress.city    = 'Richmond';
        physicalAddress.state   = 'BC';
        physicalAddress.country = 'CA';
      } else {
        physicalAddress.line1   = '4246 S Riverboat Road';
        physicalAddress.line2   = 'Suite 250';
        physicalAddress.city    = 'Taylorsville';
        physicalAddress.state   = 'UT';
        physicalAddress.country = 'US';
      }
    }

    const identification            = new FlatCustomerIdentification ();
    identification.type             = snapshot.identificationType;
    identification.number           = snapshot.identificationNumber;
    identification.expirationDate   = snapshot.identificationExpirationDate;
    identification.verificationDate = snapshot.identificationVerificationDate;
    identification.stateProvince    = snapshot.identificationProvince;

    const accountHolder = new AccountHolder ( {
      addresses: [ physicalAddress ],
      email: snapshot.emailAddress,
      firstName: snapshot.firstName,
      identification: identification,
      lastName: snapshot.lastName,
      mothersMaidenName: snapshot.mothersMaidenName,
      phoneNumbers: [ homePhone, mobilePhone ]
    } );

    if ( !isActiveUnregistered ) {
      const dateOfBirth = snapshot.dateOfBirth ? this.dateService.convertMMDDYYYYToYYYYMMDD ( snapshot.dateOfBirth ) : null;

      const mailingAddress = new CsCoreAddress ( {
        line1: snapshot.mailingAddressLine1,
        line2: snapshot.mailingAddressLine2,
        city: snapshot.mailingAddressCity,
        state: snapshot.mailingAddressState,
        postalCode: snapshot.mailingAddressPostalCode,
        country: snapshot.mailingAddressCountry,
        type: CsCoreAddressType.MAILING
      } );

      accountHolder.addresses.push ( mailingAddress );
      accountHolder.dateOfBirth = dateOfBirth;

      if ( platform === PlatformType.VMS && isCanadian ) {
        const tax = new Tax ( {
          payerId: snapshot.taxpayerId,
          taxJurisdictionResidence: snapshot.taxJurisdictionResidence,
          noTaxIdReasonDescription: snapshot.noTaxpayerIdReasonDescription,
          noTaxIdReasonCode: snapshot.noTaxpayerIdReasonCode,
          isTaxResidentofCanada: snapshot.identificationType === IdentificationTypeType.SOCIAL_INSURANCE_NUMBER,
        } );

        accountHolder.occupation = occupation;
        accountHolder.tax        = tax;
      }
      //Overwrite the reason and dateOfBirth values for CCL
      else if ( platform === PlatformType.CCL ) {
        accountHolder.dateOfBirth = '1970-01-01';
        request.reason            = UpdateAccountReasonType.WRONG_DATE_OF_BIRTH;
      }
    }

    const accountDetail         = new UpdateAccountDetail ();
    accountDetail.accountHolder = accountHolder;

    request.accountDetail = accountDetail;
    return request;
  }
}
