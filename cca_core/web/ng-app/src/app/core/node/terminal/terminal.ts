import { Node } from "../node";
import { CsCoreTimestamp } from "@cscore/core-client-model";

export class Terminal extends Node {

  country: string;
  createdDate: CsCoreTimestamp;
  isHidden: boolean = false;
  locationId: string;
  terminalNumber: string;

  constructor ( data: any ) {
    super ( data );

    if ( data.createdDate ) {
      this.createdDate = new CsCoreTimestamp ( data.createdDate );
    }
  }
}
