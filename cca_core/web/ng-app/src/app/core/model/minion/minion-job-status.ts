import { BaseEntity } from "./base-entity";

export class MinionJobStatus extends BaseEntity {

  statusType: MinionJobStatusType;

  constructor ( data: any = null ) {
    super ( data );
    if ( data ) {
      Object.assign ( this, data );

      if ( data.statusType ) {
        this.statusType = MinionJobStatusType[ <string>data.statusType ];
      }
    }
  }
}

export enum MinionJobStatusType {
  ACTIVE    = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  FAILED    = 'FAILED',
  SCHEDULED = 'SCHEDULED'
}
