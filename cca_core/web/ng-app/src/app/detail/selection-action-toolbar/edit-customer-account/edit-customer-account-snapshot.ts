import { Customer } from "../../../core/customer/customer";
import { CsCoreAddress, CsCoreAddressType, CsCorePhoneNumber, CsCorePhoneNumberType } from "@cscore/core-client-model";

export class EditCustomerAccountSnapshot {
  dateOfBirth: string;
  emailAddress: string;
  firstName: string;
  homePhone: string;
  identificationExpirationDate: string;
  identificationNumber: string;
  identificationProvince: string;
  identificationType: string;
  identificationVerificationDate: string;
  lastName: string;
  mailingAddressCity: string;
  mailingAddressCountry: string;
  mailingAddressLine1: string;
  mailingAddressLine2: string;
  mailingAddressPostalCode: string;
  mailingAddressState: string;
  mobilePhone: string;
  mothersMaidenName: string;
  noTaxpayerIdReasonCode: string;
  noTaxpayerIdReasonDescription: string;
  occupation: string;
  physicalAddressCity: string;
  physicalAddressCountry: string;
  physicalAddressLine1: string;
  physicalAddressLine2: string;
  physicalAddressPostalCode: string;
  physicalAddressState: string;
  taxJurisdictionResidence: string;
  taxpayerId: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }

  getIdentificationFormSnapshot (): IdentificationFormSnapshot {
    return {
      identificationExpirationDate: this.identificationExpirationDate,
      identificationNumber: this.identificationNumber,
      identificationProvince: this.identificationProvince,
      identificationType: this.identificationType,
      identificationVerificationDate: this.identificationVerificationDate,
      noTaxpayerIdReasonCode: this.noTaxpayerIdReasonCode,
      noTaxpayerIdReasonDescription: this.noTaxpayerIdReasonDescription,
      occupation: this.occupation,
      taxJurisdictionResidence: this.taxJurisdictionResidence,
      taxpayerId: this.taxpayerId,
    }
  }

  getHomePhoneNumber (): CsCorePhoneNumber {
    if ( this.homePhone ) {
      return new CsCorePhoneNumber ( {
        number: this.homePhone,
        type: CsCorePhoneNumberType.LANDLINE
      } );
    }
    return null;
  }

  getMailingAddress (): CsCoreAddress {
    if ( this.mailingAddressLine1
      || this.mailingAddressLine2
      || this.mailingAddressCity
      || this.mailingAddressState
      || this.mailingAddressPostalCode
      || this.mailingAddressCountry ) {
      return new CsCoreAddress ( {
        line1: this.mailingAddressLine1,
        line2: this.mailingAddressLine2,
        city: this.mailingAddressCity,
        state: this.mailingAddressState,
        postalCode: this.mailingAddressPostalCode,
        country: this.mailingAddressCountry,
        type: CsCoreAddressType.MAILING
      } )
    }
    return null;
  }

  getMobilePhoneNumber (): CsCorePhoneNumber {
    if ( this.mobilePhone ) {
      return new CsCorePhoneNumber ( {
        number: this.mobilePhone,
        type: CsCorePhoneNumberType.MOBILE
      } );
    }
    return null;
  }

  getPhysicalAddress (): CsCoreAddress {
    if ( this.physicalAddressLine1
      || this.physicalAddressLine2
      || this.physicalAddressCity
      || this.physicalAddressState
      || this.physicalAddressPostalCode
      || this.physicalAddressCountry ) {
      return new CsCoreAddress ( {
        line1: this.physicalAddressLine1,
        line2: this.physicalAddressLine2,
        city: this.physicalAddressCity,
        state: this.physicalAddressState,
        postalCode: this.physicalAddressPostalCode,
        country: this.physicalAddressCountry,
        type: CsCoreAddressType.PHYSICAL
      } )
    }
    return null;
  }

  static build ( customer: Customer ): EditCustomerAccountSnapshot {
    const mailingAddress  = customer.getAddressByType ( CsCoreAddressType.MAILING );
    const physicalAddress = customer.getAddressByType ( CsCoreAddressType.PHYSICAL );
    const homePhone       = customer.getPhoneNumberByType ( CsCorePhoneNumberType.LANDLINE );
    const mobilePhone     = customer.getPhoneNumberByType ( CsCorePhoneNumberType.MOBILE );

    const identification = customer.identification;
    const occupation     = customer.occupation;
    const tax            = customer.tax;

    const snapshot                          = new EditCustomerAccountSnapshot ();
    snapshot.dateOfBirth                    = customer.dateOfBirth;
    snapshot.emailAddress                   = customer.emailAddress;
    snapshot.firstName                      = customer.firstName;
    snapshot.homePhone                      = homePhone ? homePhone.number : null;
    snapshot.identificationProvince         = identification ? identification.stateProvince : null;
    snapshot.identificationExpirationDate   = (identification && identification.expirationDate) ? identification.expirationDate.getDateOnly () : null;
    snapshot.identificationNumber           = identification ? identification.number : null;
    snapshot.identificationType             = identification ? identification.type : null;
    snapshot.identificationVerificationDate = (identification && identification.verificationDate) ? identification.verificationDate.getDateOnly () : null;
    snapshot.lastName                       = customer.lastName;
    snapshot.mailingAddressCity             = mailingAddress ? mailingAddress.city : null;
    snapshot.mailingAddressCountry          = mailingAddress ? mailingAddress.country : null;
    snapshot.mailingAddressLine1            = mailingAddress ? mailingAddress.line1 : null;
    snapshot.mailingAddressLine2            = mailingAddress ? mailingAddress.line2 : null;
    snapshot.mailingAddressPostalCode       = mailingAddress ? mailingAddress.postalCode : null;
    snapshot.mailingAddressState            = mailingAddress ? mailingAddress.state : null;
    snapshot.mobilePhone                    = mobilePhone ? mobilePhone.number : null;
    snapshot.mothersMaidenName              = customer.mothersMaidenName;
    snapshot.noTaxpayerIdReasonCode         = tax ? tax.noTaxIdReasonCode : null;
    snapshot.noTaxpayerIdReasonDescription  = tax ? tax.noTaxIdReasonDescription : null;
    snapshot.occupation                     = occupation ? occupation.type : null;
    snapshot.physicalAddressCity            = physicalAddress ? physicalAddress.city : null;
    snapshot.physicalAddressCountry         = physicalAddress ? physicalAddress.country : null;
    snapshot.physicalAddressLine1           = physicalAddress ? physicalAddress.line1 : null;
    snapshot.physicalAddressLine2           = physicalAddress ? physicalAddress.line2 : null;
    snapshot.physicalAddressPostalCode      = physicalAddress ? physicalAddress.postalCode : null;
    snapshot.physicalAddressState           = physicalAddress ? physicalAddress.state : null;
    snapshot.taxJurisdictionResidence       = tax ? tax.taxJurisdictionResidence : null;
    snapshot.taxpayerId                     = tax ? tax.payerId : null;

    return snapshot;
  }
}

export interface IdentificationFormSnapshot {
  identificationExpirationDate: string;
  identificationNumber: string;
  identificationProvince: string;
  identificationType: string;
  identificationVerificationDate: string;
  noTaxpayerIdReasonCode: string;
  noTaxpayerIdReasonDescription: string;
  occupation: string;
  taxJurisdictionResidence: string;
  taxpayerId: string;
}

export interface PersonalFormSnapshot {
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  mothersMaidenName: string;
}

export interface ContactFormSnapshot {
  emailAddress: string;
  homePhone: string;
  mailingAddressCity: string;
  mailingAddressCountry: string;
  mailingAddressLine1: string;
  mailingAddressLine2: string;
  mailingAddressPostalCode: string;
  mailingAddressState: string;
  mobilePhone: string;
  physicalAddressCity: string;
  physicalAddressCountry: string;
  physicalAddressLine1: string;
  physicalAddressLine2: string;
  physicalAddressPostalCode: string;
  physicalAddressState: string;
}
