import { CustomerAccountInfo } from "./customer-account-info";
import { CustomerIdentification } from "./customer-identification";
import {
  CsCoreAddress,
  CsCoreAddressType,
  CsCorePhoneNumber,
  CsCorePhoneNumberType,
  CsCoreTimestamp
} from "@cscore/core-client-model";
import { Occupation } from "./occupation";
import { Tax } from "./tax";
import { TokenProvisioningStatusType } from "./token-provisioning-status-type.enum";
import { CustomerFlags } from "./customer-flags";
import { CustomerIdentifiers } from "./customer-identifiers";
import { Card } from "../card/card";
import { CustomerDocument } from "./customer-document";
import { RedemptionDelay } from "./redemption-delay";
import * as _ from "lodash";
import { FsapiStatusType } from "../status/fsapi-status/fsapi-status-type.enum";
import { CustomerKyc } from "./customer-kyc";
import { TokenDetail } from "../card/token-detail";
import { PlatformType } from "../platform/platform-type.enum";
import { CustomerVelocity } from "./customer-velocity";
import { RelatedAccount } from "./related-account";

export class Customer {

  id: string;
  accounts: CustomerAccountInfo;
  businessName: string;
  cardType: string;
  dateOfBirth: string;
  emailAddress: string;
  firstName: string;
  flags: CustomerFlags;
  identification: CustomerIdentification;
  identifiers: CustomerIdentifiers;
  isCanadian: boolean           = false;
  isActiveUnregistered: boolean = false;
  isRegistered: boolean         = false;
  isMomentumMc: boolean         = false;
  isMomentumVisa: boolean       = false;
  isTitaniumMc: boolean         = false;
  isVmsGiftCard: boolean        = false;
  kyc: CustomerKyc;
  lastMonthlyFeeDate: CsCoreTimestamp;
  lastName: string;
  middleName: string;
  mothersMaidenName: string;
  onlineAccountStatus: string;
  nextMonthlyFeeDate: CsCoreTimestamp;
  occupation: Occupation;
  productCode: string;
  productName: string;
  productType: string;
  programDescription: string;
  programId: string;
  registrationDate: CsCoreTimestamp;
  tax: Tax;
  tokenProvisioningStatus: TokenProvisioningStatusType;
  tokens: TokenDetail[]         = [];
  useCanadianDispute: boolean   = false;

  addresses: CsCoreAddress[]          = [];
  cards: Card[]                       = [];
  documents: CustomerDocument[]       = [];
  phoneNumbers: CsCorePhoneNumber[]   = [];
  redemptionDelays: RedemptionDelay[] = [];
  relatedAccounts: RelatedAccount[]   = [];
  velocities: CustomerVelocity[]      = [];

  constructor ( data: any, platform?: PlatformType ) {
    if ( data ) {
      Object.assign ( this, data );
      this.addresses        = [];
      this.cards            = [];
      this.documents        = [];
      this.phoneNumbers     = [];
      this.redemptionDelays = [];
      this.relatedAccounts  = [];
      this.tokens           = [];
      this.velocities       = [];

      this.flags       = new CustomerFlags ( data.flags );
      this.identifiers = new CustomerIdentifiers ( data.identifiers );

      if ( data.accounts ) {
        this.accounts = new CustomerAccountInfo ( data.accounts );
      }
      if ( data.identification ) {
        this.identification = new CustomerIdentification ( data.identification );
      }
      if ( data.kyc ) {
        this.kyc = new CustomerKyc ( data.kyc );
      }
      if ( data.lastMonthlyFeeDate ) {
        this.lastMonthlyFeeDate = new CsCoreTimestamp ( data.lastMonthlyFeeDate );
      }
      if ( data.nextMonthlyFeeDate ) {
        this.nextMonthlyFeeDate = new CsCoreTimestamp ( data.nextMonthlyFeeDate );
      }
      if ( data.occupation ) {
        this.occupation = new Occupation ( data.occupation );
      }
      if ( data.relatedAccounts ) {
        data.relatedAccounts.forEach ( relatedAccount => this.relatedAccounts.push ( new RelatedAccount ( relatedAccount ) ) );
      }
      if ( data.registrationDate ) {
        this.registrationDate = new CsCoreTimestamp ( data.registrationDate );
      }
      if ( data.tax ) {
        this.tax = new Tax ( data.tax );
      }
      if ( data.tokenProvisioningStatus ) {
        this.tokenProvisioningStatus = TokenProvisioningStatusType[ <string>data.tokenProvisioningStatus ];
      }

      //Set isRegistered to true if identification or lastName or dateOfBirth exist.
      //This is needed for search results as flags.isRegistered is not returned by APLS search.
      this.isRegistered = !!this.identification
        && ( (!!this.identification.type && this.identification.type.toLowerCase () !== 'null' && !!this.identification.number)
          || !!this.lastName
          || !!this.dateOfBirth);

      this.isVmsGiftCard = platform === PlatformType.CCL || (this.cardType && this.cardType.toLowerCase ().includes ( 'gift' ));

      if ( data.addresses ) {
        data.addresses.forEach ( address => this.addresses.push ( new CsCoreAddress ( address ) ) );
      }
      if ( data.cards ) {
        let cards = [];
        data.cards.forEach ( card => {
          let newCard           = new Card ( card );
          newCard.isVmsGiftCard = this.isVmsGiftCard;
          cards.push ( newCard );
          if ( newCard.tokens.length ) {
            this.tokens.push.apply ( this.tokens, newCard.tokens );
          }
        } );

        //Sort cards by activation date, with null being first
        this.cards = _.orderBy ( cards, ( card: Card ) => {
          let activationDate = new Date ().getTime ();
          if ( card.activation && card.activation.activationDate ) {
            activationDate = card.activation.activationDate.value.getTime ();
          }
          return activationDate;
        }, 'desc' );
      }
      if ( data.documents ) {
        data.documents.forEach ( document => this.documents.push ( new CustomerDocument ( document ) ) );
      }
      if ( data.phoneNumbers ) {
        data.phoneNumbers.forEach ( phoneNumber => this.phoneNumbers.push ( new CsCorePhoneNumber ( phoneNumber ) ) );
      }
      if ( data.redemptionDelays ) {
        data.redemptionDelays.forEach ( delay => this.redemptionDelays.push ( new RedemptionDelay ( delay ) ) );
      }
      if ( data.tokens ) {
        data.tokens.forEach ( token => {
          this.tokens.push ( new TokenDetail ( token ) );
        } );
      }
      if ( data.velocities ) {
        data.velocities.forEach ( velocity => {
          this.velocities.push ( new CustomerVelocity ( velocity ) );
        } )
      }

      let activeUnregisteredCard = this.getCardByStatus ( FsapiStatusType.ACTIVE_UNREGISTERED );
      this.isActiveUnregistered  = !!activeUnregisteredCard;
    }
  }

  getAddressByType ( type: CsCoreAddressType ): CsCoreAddress {
    return _.find ( this.addresses, function ( address: CsCoreAddress ) {
      return address.type === type;
    } );
  }

  getCardByStatus ( type: FsapiStatusType ): Card {
    return _.find ( this.cards, ( card: Card ) => {
      let cardStatus = card.getStatusByPlatform ( card.platform );
      return cardStatus ? cardStatus.name === type : false;
    } )
  }

  getDisplayName (): string {
    return `${this.firstName || ''} ${this.lastName || ''}`;
  }

  getPhoneNumberByType ( type: CsCorePhoneNumberType ): CsCorePhoneNumber {
    return _.find ( this.phoneNumbers, function ( phoneNumber: CsCorePhoneNumber ) {
      return phoneNumber.type === type;
    } );
  }

  getPreferredAddress (): CsCoreAddress {
    let address = this.getAddressByType ( CsCoreAddressType.MAILING );
    if ( !address || address.isInvalid () ) {
      address = this.getAddressByType ( CsCoreAddressType.PHYSICAL );
    }
    if ( (!address || address.isInvalid ()) && this.addresses.length ) {
      address = this.addresses[ 0 ];
      //If even this address is garbage, don't return one at all...
      if ( address.isInvalid () ) {
        address = null;
      }
    }
    return address;
  }

  getPreferredPhone (): CsCorePhoneNumber {
    let phone = this.getPhoneNumberByType ( CsCorePhoneNumberType.MOBILE );
    if ( !phone ) {
      phone = this.getPhoneNumberByType ( CsCorePhoneNumberType.HOME );
    }
    if ( !phone && this.phoneNumbers.length ) {
      phone = this.phoneNumbers[ 0 ];
    }
    return phone;
  }

  getPrimaryCard (): Card {
    let primaryCard: Card;

    //Look first for an ACTIVE card
    primaryCard = _.find ( this.cards, function ( card: Card ) {
      return card.getFsapiStatus () === FsapiStatusType.ACTIVE
        || card.getFsapiStatus () === FsapiStatusType.ACTIVE_UNREGISTERED;
    } );

    //Then look for the newest card, excluding any that have not yet been activated
    if ( !primaryCard ) {
      let filteredCards: Card[] = <Card[]>_.filter ( this.cards, ( card: Card ) => {
        return card.activation && card.activation.activationDate;
      } );
      filteredCards             = <Card[]>_.orderBy ( filteredCards, function ( card: Card ) {
        return card.activation.activationDate.value;
      }, [ 'desc' ] );
      primaryCard               = filteredCards[ 0 ];
    }

    return primaryCard;
  }

  getCardByLastFour( lastFour: string ): Card {
    return ( this.cards ) ? this.cards.find( (card: Card) => card.identifiers.panLastFour === lastFour ) : undefined;
  }
}
