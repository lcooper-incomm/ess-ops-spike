import { CsCoreTimestamp } from "@cscore/core-client-model";

export class ProductClassification {

  id: string;
  code: string;
  createdDate: CsCoreTimestamp;
  description: string;
  name: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
    }
  }
}
