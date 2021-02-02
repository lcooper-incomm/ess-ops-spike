import { JiraUser } from "./jira-user";
import { CsCoreTimestamp } from "@cscore/core-client-model";
import { IssueStatus } from "./issue-status";
import { IssueComponent } from "./issue-component";

export class IssueFields {

  assignee: JiraUser;
  createdDate: CsCoreTimestamp;
  customerName: string;
  customerPhone: string;
  description: string;
  reporter: JiraUser;
  status: IssueStatus;
  summary: string;
  updatedDate: CsCoreTimestamp;

  components: IssueComponent[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.components = [];

      if ( data.assignee ) {
        this.assignee = new JiraUser ( data.assignee );
      }
      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
      if ( data.reporter ) {
        this.reporter = new JiraUser ( data.reporter );
      }
      if ( data.status ) {
        this.status = new IssueStatus ( data.status );
      }
      if ( data.updatedDate ) {
        this.updatedDate = new CsCoreTimestamp ( data.updatedDate );
      }

      if ( data.components ) {
        data.components.forEach ( component => this.components.push ( new IssueComponent ( component ) ) );
      }
    }
  }
}
