import { Session } from "./model/session";
import { Selection, SelectionDataType } from "./model/selection";
import { Page } from "../model/page";
import { SessionHistoryItem } from "../dock/dock/session-history/models/session-history-item";
import { CommentRequest } from '../model/comment-request';

export class SessionState {

  history: Page<SessionHistoryItem>;
  isCollapsed: boolean;
  isSaving: boolean;
  lastSavedDate: Date;
  pendingComment: CommentRequest;
  selection: Selection<SelectionDataType>;
  session: Session;
  workspaceSessions: Page<Session>;
}
