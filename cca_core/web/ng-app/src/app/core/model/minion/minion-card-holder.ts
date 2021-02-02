import { CsCoreAddress } from "@cscore/core-client-model";

export class MinionCardHolder {

  address: CsCoreAddress;
  firstName: string;
  lastName: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.address ) {
        this.address = new CsCoreAddress ( data.address );
      }
    }
  }

}
