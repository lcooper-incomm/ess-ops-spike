import { BaseEntity } from "./base-entity";
import { CsCoreTimestamp } from "@cscore/core-client-model";
import { MinionJobStatusType } from "./minion-job-status";
import { MinionTaskType, Task } from "./task/task";
import { MinionTaskStatus } from "./task/minion-task-status";

export class Job extends BaseEntity {
  comment: string;
  createdDate: CsCoreTimestamp;
  completeCount: number;
  completePercent: number;
  failedCount: number;
  failedPercent: number;
  id: number;
  identifier: string;
  ipAddress: string;
  name: string;
  owner: JobOwner;
  pendingCount: number;
  pendingPercent: number;
  status: JobStatus;

  files: JobFile[]           = [];
  statusHistory: JobStatus[] = [];
  tasks: Task[]              = [];

  constructor ( data: any = null ) {
    super ( data );
    if ( data ) {
      Object.assign ( this, data );

      this.files         = [];
      this.statusHistory = [];
      this.tasks         = [];

      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
      if ( data.files && data.files.length ) {
        data.files.forEach ( file => this.files.push ( new JobFile ( file ) ) );
      }
      if ( data.owner ) {
        this.owner = new JobOwner ( data.owner );
      }
      if ( data.status ) {
        this.status = new JobStatus ( data.status );
      }
      if ( data.statusHistory && data.statusHistory.length ) {
        data.statusHistory.forEach ( status => this.statusHistory.push ( new JobStatus ( status ) ) );
      }
      if ( data.tasks && data.tasks.length ) {
        data.tasks.forEach ( task => this.tasks.push ( new Task ( task ) ) );
      }
    }
  }
}

export class JobFile {
  content: null;
  createdDate: CsCoreTimestamp;
  isEncrypted: boolean;
  expirationDate: CsCoreTimestamp;
  id: number;
  name: string;
  password: string;
  uuid: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
    }
  }
}

export class JobOwner {
  emailAddress: string;
  id: number;
  name: string;
  username: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}

export class JobFilePassword {
  password: string;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
    }
  }
}

export class JobQueueResponse {
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;

  content: Job[] = [];

  constructor ( data: any = null ) {

    if ( data ) {
      Object.assign ( this, data );
      this.content = [];

      if ( data.content && data.content.length ) {
        data.content.forEach ( job => this.content.push ( new Job ( job ) ) );
      }
    }
  }
}

export class JobStatus {
  id: number;
  createdDate: CsCoreTimestamp;
  message: string;
  type: MinionJobStatusType;

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
    }
  }
}

export class JobTask {
  attachFile: boolean;
  bcc: boolean;
  cc: boolean;
  comment: string;
  createdDate: CsCoreTimestamp;
  emailTemplate: string;
  id: number;
  order: number;
  recipient: string;
  sender: string;
  status: MinionTaskStatus;
  subject: string;
  type: MinionTaskType;

  statusHistory: MinionTaskStatus[] = [];
  taskStatuses: MinionTaskStatus[]  = [];

  constructor ( data: any = null ) {

    if ( data ) {
      Object.assign ( this, data );

      this.statusHistory = [];
      this.taskStatuses  = [];

      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
      if ( data.statusHistory && data.statusHistory.length ) {
        data.statusHistory.forEach ( status => this.statusHistory.push ( new MinionTaskStatus ( status ) ) );
      }
      if ( data.taskStatuses && data.taskStatuses.length ) {
        data.taskStatuses.forEach ( status => this.taskStatuses.push ( new MinionTaskStatus ( status ) ) );
      }
    }
  }
}

