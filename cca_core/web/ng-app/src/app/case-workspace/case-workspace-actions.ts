import { PayloadAction } from "../core/payload-action";
import { Action } from "@ngrx/store";
import { KeyValuePair } from "../core/utils/key-value-pair";
import { Team } from "../core/auth/team";
import { CaseSearchRequest } from "./case-search-request";
import { Session } from "../core/session/model/session";
import { SessionQueue } from "../core/session/model/session-queue";
import { GenericOption } from "../core/model/generic-option";
import { SessionStatusType } from "../core/session/model/session-status-type.enum";
import { Page } from "../core/model/page";

export enum CaseWorkspaceActionType {
  CLEAR                = 'case-workspace-clear',
  LOAD_QUEUES          = 'case-workspace-load-queues',
  LOAD_QUEUES_INTO_MAP = 'case-workspace-load-queues-into-map',
  LOAD_STATUS_OPTIONS  = 'case-workspace-load-status-options',
  LOAD_TEAMS           = 'case-workspace-load-teams',
  SET_REQUEST          = 'case-workspace-set-request',
  SET_RESULTS          = 'case-workspace-set-results'
}

export class CaseWorkspaceClearAction implements Action {
  type = CaseWorkspaceActionType.CLEAR;
}

export class CaseWorkspaceLoadQueuesAction implements PayloadAction {
  payload: SessionQueue[];
  type = CaseWorkspaceActionType.LOAD_QUEUES;

  constructor ( payload: SessionQueue[] ) {
    this.payload = payload;
  }
}

export class CaseWorkspaceLoadQueuesIntoMapAction implements PayloadAction {
  payload: KeyValuePair;
  type = CaseWorkspaceActionType.LOAD_QUEUES_INTO_MAP;

  constructor ( payload: KeyValuePair ) {
    this.payload = payload;
  }
}

export class CaseWorkspaceLoadStatusOptionsAction implements PayloadAction {
  payload: GenericOption<SessionStatusType>[];
  type = CaseWorkspaceActionType.LOAD_STATUS_OPTIONS;

  constructor ( payload: GenericOption<SessionStatusType>[] ) {
    this.payload = payload;
  }
}

export class CaseWorkspaceLoadTeamsAction implements PayloadAction {
  payload: Team[];
  type = CaseWorkspaceActionType.LOAD_TEAMS;

  constructor ( payload: Team[] ) {
    this.payload = payload;
  }
}

export class CaseWorkspaceSetRequestAction implements PayloadAction {
  payload: CaseSearchRequest;
  type = CaseWorkspaceActionType.SET_REQUEST;

  constructor ( payload: CaseSearchRequest ) {
    this.payload = payload;
  }
}

export class CaseWorkspaceSetResultsAction implements PayloadAction {
  payload: Page<Session>;
  type = CaseWorkspaceActionType.SET_RESULTS;

  constructor ( payload: Page<Session> ) {
    this.payload = payload;
  }
}
