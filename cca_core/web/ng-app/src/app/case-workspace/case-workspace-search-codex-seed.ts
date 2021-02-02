import { SessionTypeType } from "../core/session/session-type-type.enum";
import { SessionStatusType } from "../core/session/model/session-status-type.enum";
import { CaseSearchRequest } from "./case-search-request";
import * as _ from "lodash";

export class CaseWorkspaceSearchCodexSeed {
  queueId: number;
  serialNumber: string;
  sessionType: SessionTypeType;
  sid: string;
  status: SessionStatusType;
  teamId: number;
  userId: number;
  van: string;

  enabledParameters: CaseWorkspaceSearchCodexFieldType[]     = [];
  highlightedParameters: CaseWorkspaceSearchCodexFieldType[] = [];
  populatedParameters: CaseWorkspaceSearchCodexFieldType[]   = [];
  requiredParameters: CaseWorkspaceSearchCodexFieldType[]    = [];

  constructor ( data: any = null ) {
    if ( data ) {
      Object.assign ( this, data );
      this.enabledParameters     = [];
      this.highlightedParameters = [];
      this.populatedParameters   = [];
      this.requiredParameters    = [];

      if ( data.enabledParameters ) {
        data.enabledParameters.forEach ( ( value: string ) => {
          this.enabledParameters.push ( CaseWorkspaceSearchCodexFieldType[ value ] );
        } )
      }
      if ( data.highlightedParameters ) {
        data.highlightedParameters.forEach ( ( value: string ) => {
          this.highlightedParameters.push ( CaseWorkspaceSearchCodexFieldType[ value ] );
        } )
      }
      if ( data.populatedParameters ) {
        data.populatedParameters.forEach ( ( value: string ) => {
          this.populatedParameters.push ( CaseWorkspaceSearchCodexFieldType[ value ] );
        } )
      }
      if ( data.requiredParameters ) {
        data.requiredParameters.forEach ( ( value: string ) => {
          this.requiredParameters.push ( CaseWorkspaceSearchCodexFieldType[ value ] );
        } )
      }
    }
  }

  isFieldEnabled ( field: CaseWorkspaceSearchCodexFieldType ): boolean {
    return _.includes ( this.enabledParameters, field );
  }

  isFieldRequired ( field: CaseWorkspaceSearchCodexFieldType ): boolean {
    return _.includes ( this.requiredParameters, field );
  }

  updateFromSearchRequest ( request: CaseSearchRequest ): void {
    if ( request ) {
      this.queueId      = request.queueId;
      this.serialNumber = request.serialNumber;
      this.sessionType  = request.sessionType;
      this.sid          = request.sid;
      this.status       = request.status;
      this.teamId       = request.teamId;
      this.userId       = request.userId;
      this.van          = request.van;

      this.setPopulatedParameters ();
    }
  }

  private setPopulatedParameters (): void {
    this.populatedParameters = [];
    if ( this.queueId ) {
      this.populatedParameters.push ( CaseWorkspaceSearchCodexFieldType.QUEUE );
    }
    if ( this.serialNumber ) {
      this.populatedParameters.push ( CaseWorkspaceSearchCodexFieldType.SERIAL_NUMBER );
    }
    if ( this.sessionType ) {
      this.populatedParameters.push ( CaseWorkspaceSearchCodexFieldType.CASE_TYPE );
    }
    if ( this.sid ) {
      this.populatedParameters.push ( CaseWorkspaceSearchCodexFieldType.CASE_ID );
    }
    if ( this.status ) {
      this.populatedParameters.push ( CaseWorkspaceSearchCodexFieldType.STATUS );
    }
    if ( this.teamId ) {
      this.populatedParameters.push ( CaseWorkspaceSearchCodexFieldType.TEAM );
    }
    if ( this.userId ) {
      this.populatedParameters.push ( CaseWorkspaceSearchCodexFieldType.ASSIGNEE );
    }
    if ( this.van ) {
      this.populatedParameters.push ( CaseWorkspaceSearchCodexFieldType.VAN );
    }
  }
}

export enum CaseWorkspaceSearchCodexFieldType {
  ASSIGNEE      = 'ASSIGNEE',
  CASE_ID       = 'CASE_ID',
  CASE_TYPE     = 'CASE_TYPE',
  QUEUE         = 'QUEUE',
  SERIAL_NUMBER = 'SERIAL_NUMBER',
  STATUS        = 'STATUS',
  TEAM          = 'TEAM',
  VAN           = 'VAN'
}
