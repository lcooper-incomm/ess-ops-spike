import { CsCoreTimestamp } from "@cscore/core-client-model";
import { User } from "../user/user";
import { SessionQueue } from "../session/model/session-queue";
import { WrapUpCode } from "../session/model/wrap-up-code";
import { WrapUpCodeCategory } from "../session/model/wrap-up-code-category";
import { Identifier } from "../session/model/identifier";

export class CommentDetailResponse {
  ani: string;
  callbackNumber: string;
  callerName: string;
  closedDate: CsCoreTimestamp;
  createdBy: User;
  createdDate: CsCoreTimestamp;
  dnis: string;
  identifiers: Identifier[] = [];
  queue: SessionQueue;
  sessionId: string;
  wrapUpCode: WrapUpCode;
  wrapUpCodeCategory: WrapUpCodeCategory;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );
      if ( data.closedDate ) {
        this.closedDate = new CsCoreTimestamp ( data.closedDate );
      }
      if ( data.createdBy ) {
        this.createdBy = new User ( data.createdBy );
      }
      if ( data.createdDate ) {
        this.createdDate = new CsCoreTimestamp ( data.createdDate );
      }
      if ( data.identifiers ) {
        this.identifiers = data.identifiers.map ( ( identifier: any ) => new Identifier ( identifier ) );
      }
      if ( data.queue ) {
        this.queue = new SessionQueue ( data.queue );
      }
      if ( data.wrapUpCode ) {
        this.wrapUpCode = new WrapUpCode ( data.wrapUpCode );
      }
      if ( data.wrapUpCodeCategory ) {
        this.wrapUpCodeCategory = new WrapUpCodeCategory ( data.wrapUpCodeCategory );
      }
    }
  }
}
