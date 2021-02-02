import { CsCoreAddress, CsCoreTimestamp } from "@cscore/core-client-model";

export class MerchantComponent {

  id: number;
  address: CsCoreAddress;
  contactName: string;
  contactPhone: string;
  contactTitle: string;
  deactivatedDate: CsCoreTimestamp;
  firstRedemptionAttemptedDate: CsCoreTimestamp;
  lastReloadedDate: CsCoreTimestamp;
  locationName: string;
  merchantLegacyId: string;
  merchantName: string;
  purchasedDate: CsCoreTimestamp;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.address ) {
        this.address = new CsCoreAddress ( data.address );
      }
      if ( data.deactivatedDate ) {
        this.deactivatedDate = new CsCoreTimestamp ( data.deactivatedDate );
      }
      if ( data.firstRedemptionAttemptedDate ) {
        this.firstRedemptionAttemptedDate = new CsCoreTimestamp ( data.firstRedemptionAttemptedDate );
      }
      if ( data.lastReloadedDate ) {
        this.lastReloadedDate = new CsCoreTimestamp ( data.lastReloadedDate );
      }
      if ( data.purchasedDate ) {
        this.purchasedDate = new CsCoreTimestamp ( data.purchasedDate );
      }
    }
  }

  flatten (): FlatMerchantComponent {
    return new FlatMerchantComponent ( {
      ...this,
      deactivatedDate: this.deactivatedDate ? this.deactivatedDate.value : null,
      firstRedemptionAttemptedDate: this.firstRedemptionAttemptedDate ? this.firstRedemptionAttemptedDate.value : null,
      lastReloadedDate: this.lastReloadedDate ? this.lastReloadedDate.value : null,
      purchasedDate: this.purchasedDate ? this.purchasedDate.value : null
    } );
  }
}

export class FlatMerchantComponent {

  id: number;
  city: string;
  contactName: string;
  contactPhone: string;
  contactTitle: string;
  deactivatedDate: Date;
  firstRedemptionAttemptedDate: Date;
  lastReloadedDate: Date;
  line1: string;
  line2: string;
  locationName: string;
  merchantLegacyId: string;
  merchantName: string;
  postalCode: string;
  purchasedDate: Date;
  state: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
