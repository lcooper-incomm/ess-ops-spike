import { Node } from "./node";
import { CsCoreTimestamp } from "@cscore/core-client-model";

export class BusinessUnit extends Node {

  description: string;
  createDate: CsCoreTimestamp;

  constructor ( data: any ) {
    super ( data );
    if ( data.createDate ) {
      this.createDate = new CsCoreTimestamp ( data.createDate );
    }
  }
}
