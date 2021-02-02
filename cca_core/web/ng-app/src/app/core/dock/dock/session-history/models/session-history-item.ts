import { User } from "src/app/core/user/user";
import { CsCoreTimestamp } from "@cscore/core-client-model";
import { SessionHistoryItemType } from './session-history-item-type';

export class SessionHistoryItem {
  description: string;
  date: CsCoreTimestamp;
  type: SessionHistoryItemType;
  user: User;

  constructor ( data?: { [ key: string ]: any } ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.date ) {
        this.date = new CsCoreTimestamp ( data.date );
      }

      if ( data.user ) {
        this.user = new User ( data.user );
      }
    }
  }
}

export class StatusChangeSessionHistoryItem extends SessionHistoryItem {
  fromStatus: string;
  toStatus: string;
}

export function parseSessionHistoryItem ( data?: { [ key: string ]: any } ): SessionHistoryItem {
  switch ( data.type ) {
    case SessionHistoryItemType.STATUS_CHANGE:
      return new StatusChangeSessionHistoryItem ( data );
    default:
      return new SessionHistoryItem ( data );
  }
}
