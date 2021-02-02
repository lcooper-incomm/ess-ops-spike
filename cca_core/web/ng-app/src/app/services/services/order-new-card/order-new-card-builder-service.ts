import { CsCoreAddress, CsCoreAddressType, CsCorePhoneNumber, CsCorePhoneNumberType } from "@cscore/core-client-model";
import { AccountHolder, CardIdentificationData, OrderCardRequest } from "./order-card-request-models";
import { ChallengeInfo } from "../../../core/action/vms-actions/models/vms-request-models";
import { FormGroup } from "@angular/forms";

export class OrderNewCardBuilderService {
  buildRequest ( wizardForm: FormGroup, challengeInfo: ChallengeInfo ): OrderCardRequest {
    let form              = wizardForm.getRawValue ();
    let request           = new OrderCardRequest;
    request.accountHolder = this.buildAccountHolder ( form );
    request.productCode   = form.productCodeSelect.code;
    request.productType   = form.productTypeSelect.vmsId;
    request.challengeInfo = challengeInfo;

    return request;
  }

  private buildAccountHolder ( form: any ): AccountHolder {
    let request               = new AccountHolder ();
    request.addresses         = this.buildAddresses ( form.mailingAddress, form.physicalAddress );
    request.dateOfBirth       = this.convertFromDob ( form.dateOfBirth );
    request.dob               = form.dateOfBirth;
    request.email             = form.email;
    request.firstName         = form.firstName;
    request.identification    = this.buildIdentification ( form );
    request.lastName          = form.lastName;
    request.mothersMaidenName = form.mothersMaidenName;
    request.phoneNumbers      = this.buildPhoneNumbers ( form.mobilePhone, form.homePhone );

    return request
  }

  private buildAddresses ( mail: CsCoreAddress, physical: CsCoreAddress ): CsCoreAddress[] {
    let addresses = [];
    mail.type     = CsCoreAddressType.MAILING;
    addresses.push ( mail );
    physical.type = CsCoreAddressType.PHYSICAL;
    addresses.push ( physical );
    return addresses
  }

  private buildIdentification ( form: any ): CardIdentificationData {
    let identification            = new CardIdentificationData ();
    identification.type           = form.identificationType;
    identification.number         = form.identificationNumber;
    identification.issuedBy       = '';
    identification.issuanceDate   = '';
    identification.expirationDate = '';

    return identification
  }

  private buildPhoneNumbers ( mobile: CsCorePhoneNumber, home: CsCorePhoneNumber ): CsCorePhoneNumber[] {
    let phoneNumbers = [];
    let mobilePhone  = this.buildMobilePhoneNumber ( mobile );
    phoneNumbers.push ( mobilePhone );

    if ( home ) {
      let homePhone = this.buildHomePhoneNumber ( home );
      phoneNumbers.push ( homePhone );
    }
    return phoneNumbers;
  }

  private convertFromDob ( str ) {
    let parts = str.split ( '/' );
    return parts[ 2 ] + '-' + parts[ 0 ] + '-' + parts[ 1 ];
  }

  private buildHomePhoneNumber ( homePhone: CsCorePhoneNumber ): CsCorePhoneNumber {
    if ( homePhone ) {
      return new CsCorePhoneNumber ( {
        number: homePhone,
        type: CsCorePhoneNumberType.LANDLINE
      } );
    }
    return null;
  }

  private buildMobilePhoneNumber ( mobilePhone: CsCorePhoneNumber ): CsCorePhoneNumber {
    if ( mobilePhone ) {
      return new CsCorePhoneNumber ( {
        number: mobilePhone,
        type: CsCorePhoneNumberType.MOBILE
      } );
    }
    return null;
  }

  getHomePhone ( phoneNumbers: CsCorePhoneNumber[] ): CsCorePhoneNumber {
    return phoneNumbers.find ( number => number.type === 'LANDLINE' )
  }

  getMobilePhone ( phoneNumbers: CsCorePhoneNumber[] ): CsCorePhoneNumber {
    return phoneNumbers.find ( number => number.type === 'MOBILE' )
  }

  getMailingAddress ( addresseses: CsCoreAddress[] ): CsCoreAddress {
    return addresseses.find ( address => address.type === 'MAILING' )
  }

  getPhysicalAddress ( addresseses: CsCoreAddress[] ): CsCoreAddress {
    return addresseses.find ( address => address.type === 'PHYSICAL' )
  }
}
