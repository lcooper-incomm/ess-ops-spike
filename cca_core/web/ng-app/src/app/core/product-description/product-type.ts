export class ProductType {

  id: string;
  description: string;
  name: string;
  upc: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }

}
