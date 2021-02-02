import { SessionTypeType } from "../session-type-type.enum";
import { SessionStatusType } from "./session-status-type.enum";

export class UpdateSessionView {

  id: number;
  categoryId: number;
  queueId: number;
  sessionType: SessionTypeType;
  status: SessionStatusType;
  teamId: number;
  userId: number;
  wrapUpCodeId: number;
  summary: string;

}
