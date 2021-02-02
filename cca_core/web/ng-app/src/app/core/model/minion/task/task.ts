import { MinionTaskStatus } from "./minion-task-status";
import { BaseEntity } from "../base-entity";
import * as _ from "lodash";
import { CsCoreTimestamp } from "@cscore/core-client-model";
import { FsapiStatusType } from "../../../status/fsapi-status/fsapi-status-type.enum";

export class Task extends BaseEntity {
  comment: string;
  createdDate: CsCoreTimestamp;
  id: number;
  partner: any;
  persistent: boolean              = false;
  platform: any;
  reason: string;
  serialNumber: string;
  status: MinionTaskStatus;
  submitterName: string;
  taskOrder: number;
  targetStatus: FsapiStatusType;
  taskStatuses: MinionTaskStatus[] = [];
  taskType: MinionTaskType;

  constructor ( data: any = null ) {
    super ( data );
    if ( data ) {
      Object.assign ( this, data );
      this.taskStatuses = [];

      if ( data.taskType ) {
        this.taskType = MinionTaskType[ <string>data.taskType ];
      }
      if ( !data.taskOrder ) {
        this.taskOrder = 0;
      }
      if ( data.taskStatuses ) {
        let tempStatuses: MinionTaskStatus[] = [];
        data.taskStatuses.forEach ( status => tempStatuses.push ( new MinionTaskStatus ( status ) ) );
        this.taskStatuses = _.sortBy ( tempStatuses, [ 'createdDate.value' ], [ 'desc' ] );
      }
    }
  }

  // this presupposes that the task statuses are already sorted by createdDate, which the minion-client task converter will do
  public getCurrentTaskStatus (): MinionTaskStatus {
    let sortedList = _.sortBy ( this.taskStatuses, [ 'createdDate.value' ], [ 'desc' ] );
    return sortedList.length ? sortedList[ 0 ] : null;
  }

}



export enum MinionTaskType {
  ADJUST_BALANCE           = 'ADJUST_BALANCE',
  CHANGE_STATUS            = 'CHANGE_STATUS',
  CLOSE_VMS_CARD           = 'CLOSE_VMS_CARD',
  DEACTIVATE               = 'DEACTIVATE',
  PRODUCT_DETAILS          = 'PRODUCT_DETAILS',
  SEND_EMAIL               = 'SEND_EMAIL',
  SEND_FORM                = 'SEND_FORM',
  SEND_DISPUTE_DOCUMENTS   = 'SEND_DISPUTE_DOCUMENTS',
  SEND_ACCOUNT_STATEMENT   = 'SEND_ACCOUNT_STATEMENT',
  SEND_DIRECT_DEPOSIT_FORM = 'SEND_DIRECT_DEPOSIT_FORM',
  SAVE_FILE                = 'SAVE_FILE'
}
