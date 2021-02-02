import { IssueFields } from "./issue-fields";
import { Comment } from "../model/comment";

export class Issue {

  id: string;
  expand: string;
  fields: IssueFields;
  key: string;

  comments: Comment[] = [];

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      this.comments = [];

      if ( data.fields ) {
        this.fields = new IssueFields ( data.fields );
      }

      if ( data.comments ) {
        data.comments.forEach ( comment => this.comments.push ( new Comment ( comment ) ) );
      }
    }
  }
}


