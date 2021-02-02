import {CardActivation} from "./card-activation";
import {Customer} from "../customer/customer";
import {CsCoreCode, CsCoreTimestamp} from "@cscore/core-client-model";
import {CardLimits} from "./card-limits";
import {PlatformType} from "../platform/platform-type.enum";
import {PromoResponse} from "./promo-response";
import {Location} from "../node/location/location";
import {CardRedemptionInfo} from "./card-redemption-info";
import {CardAlerts} from "./card-alerts";
import {CardAmounts} from "./card-amounts";
import {CardIdentifiers} from "./card-identifiers";
import {CardAccountHistory} from "./card-account-history";
import {CsCoreContact} from "../model/cs-core-contact";
import {FeePlan} from "../model/fee-plan";
import {MultiPack} from "./multi-pack";
import {RelatedCard} from "./related-card";
import {CsCoreStatus, CsCoreStatusType} from "../model/cs-core-status";
import {TokenDetail} from "./token-detail";
import {FsapiStatusType} from "../status/fsapi-status/fsapi-status-type.enum";

export class Card {
  activation: CardActivation;
  alerts: CardAlerts;
  amounts: CardAmounts;
  customer: Customer;
  expirationDate: CsCoreTimestamp;
  identifiers: CardIdentifiers;
  isSearching: boolean   = false;
  institution: string;
  inventoryDate: CsCoreTimestamp;
  isVmsGiftCard: boolean = false;
  lastRenewalDate: CsCoreTimestamp;
  limits: CardLimits;
  note: string;
  ownerType: string;
  platform: PlatformType;
  productCategory: string;
  productDescription: string;
  productGroup: string;
  productOwner: string;
  productType: string;
  promoInfo: PromoResponse;
  purchaseLocation: Location;
  redemption: CardRedemptionInfo;
  renewalFrequency: number;
  srlData: Card;

  accountHistories: CardAccountHistory[] = [];
  codes: CsCoreCode[]                    = [];
  contacts: CsCoreContact[]              = [];
  feePlans: FeePlan[]                    = [];
  multiPacks: MultiPack[]                = [];
  relatedCards: RelatedCard[]            = [];
  statuses: CsCoreStatus[]               = [];
  tokens: TokenDetail[]                  = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.accountHistories = [];
      this.codes            = [];
      this.contacts         = [];
      this.feePlans         = [];
      this.multiPacks       = [];
      this.relatedCards     = [];
      this.statuses         = [];
      this.tokens           = [];

      this.alerts      = new CardAlerts ( data.alerts );
      this.amounts     = new CardAmounts ( data.amounts );
      this.identifiers = new CardIdentifiers ( data.identifiers );

      const platform: PlatformType | null = data.platform && PlatformType[ <string>data.platform ];

      if ( data.activation ) {
        this.activation = new CardActivation ( data.activation );
      }
      if ( data.customer ) {
        this.customer = new Customer ( data.customer, platform );
      }
      if ( data.expirationDate ) {
        this.expirationDate = new CsCoreTimestamp ( data.expirationDate );
      }
      if ( data.inventoryDate ) {
        this.inventoryDate = new CsCoreTimestamp ( data.inventoryDate );
      }
      if ( data.lastRenewalDate ) {
        this.lastRenewalDate = new CsCoreTimestamp ( data.lastRenewalDate );
      }
      if ( data.limits ) {
        this.limits = new CardLimits ( data.limits );
      }
      if ( platform ) {
        this.platform = PlatformType[ <string>data.platform ];
      }
      if ( data.promoInfo ) {
        this.promoInfo = new PromoResponse ( data.promoInfo );
      }
      if ( data.purchaseLocation ) {
        this.purchaseLocation = new Location ( data.purchaseLocation );
      }
      if ( data.redemption ) {
        this.redemption = new CardRedemptionInfo ( data.redemption );
      }
      if ( data.accountHistories ) {
        data.accountHistories.forEach ( history => this.accountHistories.push ( new CardAccountHistory ( history ) ) );
      }
      if ( data.codes ) {
        data.codes.forEach ( code => this.codes.push ( new CsCoreCode ( code ) ) );
      }
      if ( data.contacts ) {
        data.contacts.forEach ( contact => this.contacts.push ( new CsCoreContact ( contact ) ) );
      }
      if ( data.feePlans ) {
        data.feePlans.forEach ( feePlan => this.feePlans.push ( new FeePlan ( feePlan ) ) );
      }
      if ( data.multiPacks ) {
        data.multiPacks.forEach ( multiPack => this.multiPacks.push ( new MultiPack ( multiPack ) ) );
      }
      if ( data.relatedCards ) {
        data.relatedCards.forEach ( card => this.relatedCards.push ( new RelatedCard ( card ) ) );
      }
      if ( data.statuses ) {
        data.statuses.forEach ( status => this.statuses.push ( new CsCoreStatus ( status ) ) );
      }
      if ( data.tokens ) {
        data.tokens.forEach ( token => this.tokens.push ( new TokenDetail ( token ) ) );
      }

      //Set unmasked PAN field if not already set
      if ( this.identifiers.pan && !this.identifiers.panMasked ) {
        this.identifiers.panMasked = this.identifiers.pan;
      }
    }
  }

  getStatusByPlatform ( platform: PlatformType ): CsCoreStatus {
    return this.statuses.find ( ( status: CsCoreStatus ) => {
      return status.type === CsCoreStatusType.PLATFORM && status.platform === platform;
    } );
  }

  getStatusByType ( type: CsCoreStatusType ): CsCoreStatus {
    return this.statuses.find ( ( status: CsCoreStatus ) => {
      return status.type === type;
    } );
  }

  /**
   * Clean the status value that FSAPI provides to a more normalized enum-style value. Use this
   * instead of getting the status by platform and using its raw value to avoid potential issues.
   */
  getFsapiStatus (): FsapiStatusType {
    let status: CsCoreStatus = this.getStatusByPlatform ( this.platform );
    if ( status ) {
      return FsapiStatusType[ status.name || 'UNKNOWN' ];
    }
    return null;
  }

  getIsPinSetDisplayValue (): string {
    return (this.alerts && this.alerts.isPinSet) ? 'Yes' : 'No';
  }

  isExclusiveInCommProduct (): boolean {
    return this.isInCommSupportedProduct ()
      && !!this.getStatusByPlatform ( PlatformType.INCOMM );
  }

  isInCommSupportedProduct (): boolean {
    const supportedPlatforms = [ PlatformType.CCL, PlatformType.GREENCARD, PlatformType.INCOMM, PlatformType.VMS,PlatformType.SEJ ];
    return !!this.statuses.find ( ( status: CsCoreStatus ) => {
      return supportedPlatforms.includes ( status.platform );
    } );
  }
}
