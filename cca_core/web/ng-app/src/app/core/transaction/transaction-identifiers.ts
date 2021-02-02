export class TransactionIdentifiers {

  accountNumber: string;
  acquirerNetworkId: string;
  ani: string;
  arn: string;
  can: string;
  cardHolderZipCode: string;
  cardName: string;
  cardOwningFinancialId: string;
  cashierId: string;
  encryptedPin: string;
  fromAccount: string;
  issuerNetworkId: string;
  headerId: string;
  logCvvMatch: string;
  merchantId: string;
  networkId: string;
  notOnUsMask: string;
  pan: string;
  panLastFour: string;
  pin: string;
  processorId: string;
  receiptNumber: string;
  replacementPan: string;
  reversalReason: string;
  serialNumber: string;
  sourceRefNum: string;
  termFild: string;
  tid: string;
  toAccount: string;
  toPan: string;
  traceNumber: string;
  track2Data: string;
  van: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( this.pan && !this.panLastFour ) {
        this.panLastFour = this.pan.slice ( -4 );
      }
    }
  }

}
