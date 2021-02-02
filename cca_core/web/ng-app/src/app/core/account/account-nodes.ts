import { Biller } from "../node/biller";
import { Node } from "../node/node";

export class AccountNodes {

  biller: Biller;

  merchants: Node[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.merchants = [];

      if ( data.biller ) {
        this.biller = new Biller ( data.biller );
      }

      if ( data.merchants ) {
        data.merchants.forEach ( merchant => this.merchants.push ( new Node ( merchant ) ) );
      }
    }
  }
}
