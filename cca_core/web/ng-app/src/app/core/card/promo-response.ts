import { CsCoreTimestamp } from "@cscore/core-client-model";
import { CsCoreStatus } from "../model/cs-core-status";

export class PromoResponse {

  orderConfirmId: string;
  promoCode: string;
  processedDate: CsCoreTimestamp;
  receivedDate: CsCoreTimestamp;
  shippedDate: CsCoreTimestamp;
  shippingStatus: CsCoreStatus;
  success: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.processedDate ) {
        this.processedDate = new CsCoreTimestamp ( data.processedDate );
      }
      if ( data.receivedDate ) {
        this.receivedDate = new CsCoreTimestamp ( data.receivedDate );
      }
      if ( data.shippedDate ) {
        this.shippedDate = new CsCoreTimestamp ( data.shippedDate );
      }
      if ( data.shippingStatus ) {
        this.shippingStatus = new CsCoreStatus ( data.shippingStatus );
      }
    }
  }
}
