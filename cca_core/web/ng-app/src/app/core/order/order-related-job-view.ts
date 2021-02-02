import {User} from "../user/user";
import {CsCoreTimestamp} from "@cscore/core-client-model";
import {MinionJobStatusType} from "../model/minion/minion-job-status";

export class OrderRelatedJobView {

  id: number;
  orderId: number;
  jobId: number;
  targetStatus: string;
  createdDate: CsCoreTimestamp;
  createdBy: User;
  isJobComplete: boolean = false;
  currentJobStatus: MinionJobStatusType;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
      if ( data.createdBy ) {
        this.createdBy = new User ( data.createdBy );
      }
      if ( data.currentJobStatus ) {
        this.currentJobStatus = MinionJobStatusType[ <string>data.currentJobStatus ];
      }
    }
  }

}
