import { CaseSearchRequest } from "./case-search-request";
import { Session } from "../core/session/model/session";
import { Team } from "../core/auth/team";
import { SessionQueue } from "../core/session/model/session-queue";
import { GenericOption } from "../core/model/generic-option";
import { SessionStatusType } from "../core/session/model/session-status-type.enum";
import { Page } from "../core/model/page";

export class CaseWorkspaceState {
  request: CaseSearchRequest;
  results: Page<Session>;
  queueMap: Map<string, SessionQueue[]>;
  queues: SessionQueue[];
  statusOptions: GenericOption<SessionStatusType>[];
  teams: Team[];
}
