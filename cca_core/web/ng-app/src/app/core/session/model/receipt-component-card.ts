import { CsCoreCurrency } from "@cscore/gringotts";

export class ReceiptComponentCard {

  id: number;
  initialLoadAmount: CsCoreCurrency;
  packageVan: string;
  productType: string;
  serialNumber: string;
  van: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.initialLoadAmount ) {
        this.initialLoadAmount = new CsCoreCurrency ( data.initialLoadAmount );
      }
    }
  }

  flatten (): FlatReceiptComponentCard {
    return new FlatReceiptComponentCard ( {
      ...this,
      initialLoadAmount: this.initialLoadAmount ? this.initialLoadAmount.value.toFixed ( 2 ) : null
    } );
  }

  needsWork (): boolean {
    return !this.van || this.van.length !== 4;
  }
}

export class FlatReceiptComponentCard {

  id: number;
  initialLoadAmount: string;
  packageVan: string;
  productType: string;
  serialNumber: string;
  van: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }

}
