export class CardIdentifiers {

  can: string;
  cardId: string;
  controlNumber: string;
  dcmsId: string;
  headerId: string;
  merchantId: string;
  min: string;
  packId: string;
  pan: string;
  panLastFour: string;
  panMasked: string;
  panUnmasked: string;
  passthruTransactionId: string;
  pin: string;
  replacementPan: string;
  replacementPanMasked: string;
  serialNumber: string;
  spNumber: string;
  transactionId: string;
  upc: string;
  van: string;
  vendorId: string;
  vendorPin: string;
  vendorSerialNumber: string;
  vendorSpn: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}
