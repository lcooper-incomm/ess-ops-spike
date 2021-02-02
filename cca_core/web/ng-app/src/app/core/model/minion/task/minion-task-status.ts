import { BaseEntity } from "../base-entity";
import { CsCoreTimestamp } from "@cscore/core-client-model";

export class MinionTaskStatus extends BaseEntity {

  createdDate: CsCoreTimestamp;
  id: number;
  message: string;
  type: MinionTaskStatusType;

  constructor( data: any = null ) {
    super();
    if( data ) {
      Object.assign( this, data );

      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp( data.createdDate );
      }
      if ( data.type ) {
        this.type = MinionTaskStatusType[ <string>data.type ];
      }
    }
  }
}

export enum MinionTaskStatusType {
  DONE    = 'DONE',
  ERROR   = 'ERROR',
  PENDING = 'PENDING'
}
