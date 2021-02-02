import { ProductType } from "./product-type";
import { PlatformType } from "../platform/platform-type.enum";

export class ProductDescription {

  id: string;
  code: string;
  description: string;
  issuer: ProductDescriptionIssuer;
  name: string;

  types: ProductType[] = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.types = [];

      if ( data.types ) {
        data.types.forEach ( type => this.types.push ( new ProductType ( type ) ) );
      }
    }
  }
}

export class ProductDescriptionIssuer {
  bank: string;
  country: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}

export class ProductDescriptionContainer {

  platform: PlatformType;

  descriptions: ProductDescription[] = [];

  constructor ( platform: PlatformType, descriptions: ProductDescription[] ) {
    this.platform = platform;

    if ( descriptions ) {
      this.descriptions = descriptions;
    }
  }
}
