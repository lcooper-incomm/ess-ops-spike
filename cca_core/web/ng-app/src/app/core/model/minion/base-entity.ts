import { CsCoreTimestamp } from "@cscore/core-client-model";

export abstract class BaseEntity {

  id: number;
  createdDate: CsCoreTimestamp;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
      else {
        this.createdDate = new CsCoreTimestamp( new Date() );
      }
    }
  }

}
