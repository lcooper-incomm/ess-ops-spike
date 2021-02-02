export class TransactionFlags {

  isBillable: boolean            = false;
  isCardPresent: boolean         = false;
  isDigitalProduct: boolean      = false;
  isDisputable: boolean          = false;
  isFraudulent: boolean          = false;
  isInDispute: boolean           = false;
  isPartial: boolean             = false;
  isPassThru: boolean            = false;
  isPaymentCreated: boolean      = false;
  isPending: boolean             = false;
  isReversalTransaction: boolean = false;
  isSwipeReload: boolean         = false;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }

}
