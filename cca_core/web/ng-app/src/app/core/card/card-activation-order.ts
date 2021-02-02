export class CardActivationOrder {

  ipAddress: string;
  orderId: string;
  trackingNumber: string;
  type: string;
  url: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
