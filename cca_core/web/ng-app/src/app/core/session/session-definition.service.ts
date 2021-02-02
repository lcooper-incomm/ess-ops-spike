import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {SessionClass} from "./model/session-class";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../../app-state";
import {SessionTypeType} from "./session-type-type.enum";
import {AuthenticationState} from "../../auth/authentication-state";
import {snapshot} from "../store-utils/store-utils";
import {AppStateType} from "../../app-state-type.enum";
import {SupportState} from "../support/support-state";
import {SessionType} from "./model/session-type";
import * as _ from "lodash";
import {SecurityService} from "../security/security.service";
import {getSessionStatusTypeDisplayValue, SessionStatusType} from "./model/session-status-type.enum";
import {SessionStatusOption} from './model/session-status-option';
import {SessionClassType} from "./session-class-type.enum";

const build = map(value => new SessionClass(value));

const buildAll = map((values: any[]) => {
  let results: SessionClass[] = [];
  for (let sessionClass of values) {
    results.push(new SessionClass(sessionClass));
  }
  return results;
});

@Injectable ( {
  providedIn: 'root'
} )
export class SessionDefinitionService {

  constructor ( private http: HttpClient,
                private securityService: SecurityService,
                private store: Store<AppState> ) {
  }

  findAll (): Observable<SessionClass[]> {
    return this.http.get ( '/rest/session-definition/session-class' )
      .pipe ( buildAll );
  }

  findAllSessionStatuses (): Observable<SessionStatusType[]> {
    return this.http.get ( '/rest/session-definition/status' )
      .pipe ( map ( ( values: string[] ) => {
        let statuses: SessionStatusType[] = [];

        values.forEach ( ( value: string ) => {
          statuses.push ( SessionStatusType[ value ] );
        } );

        return statuses;
      } ) );
  }

  getComponentDisplayName ( component: string ): string {
    switch ( component ) {
      case 'CALL_COMPONENT':
        return 'Call Component';
      case 'CARDS_COMPONENT':
        return 'Cards Component';
      case 'CUSTOMER_COMPONENT':
        return 'Customer Component';
      case 'DOCUMENTS_COMPONENT':
        return 'Documents Component';
      case 'GENERAL_COMPONENT':
        return 'General Component';
      case 'LAW_ENFORCEMENT_COMPONENT':
        return 'Law Enforcement Component';
      case 'MERCHANT_COMPONENT':
        return 'Merchant Component';
      case 'RECEIPT_COMPONENT':
        return 'Receipt Component';
      case 'REFUND_REQUEST_COMPONENT':
        return 'Refund Request Component';
      default:
        return component;
    }
  }

  getComponentDisplayNames ( components: string[] ): string[] {
    let displayNames = [];

    components.forEach ( ( component ) => {
      displayNames.push ( this.getComponentDisplayName ( component ) );
    } );

    return displayNames;
  }

  getExpandedStatuses ( statuses: string[] ): SessionStatusOption[] {
    let expandedStatuses = [];

    statuses.forEach(status => {
      let expandedStatus         = new SessionStatusOption();
      expandedStatus.displayName = getSessionStatusTypeDisplayValue(status);
      expandedStatus.systemName  = status;
      expandedStatuses.push(expandedStatus);
    });

    return expandedStatuses;
  }

  getPermittedCaseTypesForCaseWorkspace(): SessionType[] {
    const supportState: SupportState = snapshot(this.store, AppStateType.SUPPORT_STATE);
    const caseClass: SessionClass    = supportState.sessionDefinitions.find((sessionClass: SessionClass) => {
      return sessionClass.getType() === SessionClassType.CASE;
    });
    return caseClass.sessionTypes.filter((sessionType: SessionType) => {
      const permissionName = `CASE_SEARCH_SESSION_TYPE_${sessionType.name}`;
      return this.securityService.hasPermission(permissionName);
    });
  }

  getPermittedCaseTypesForRaiseCase(): SessionType[] {
    let supportState: SupportState = snapshot(this.store, AppStateType.SUPPORT_STATE);
    let caseClass: SessionClass    = supportState.sessionDefinitions.find((sessionClass: SessionClass) => {
      return sessionClass.getType() === SessionClassType.CASE;
    });
    return caseClass.sessionTypes.filter((sessionType: SessionType) => {
      if (sessionType.getType() === SessionTypeType.COMPLAINT) {
        return false;
      } else {
        const permissionName = `RAISE_${sessionType.permission.systemName}`;
        return this.securityService.hasPermission(permissionName);
      }
    });
  }

  getPermittedDefinitions(excludeThisSessionType: SessionTypeType = null): SessionClass[] {
    let authenticationState: AuthenticationState = snapshot(this.store, AppStateType.AUTHENTICATION_STATE);
    let supportState: SupportState               = snapshot(this.store, AppStateType.SUPPORT_STATE);

    //Make a copy of our cached definitions
    let copyOfSessionDefinitions = _.cloneDeep(supportState.sessionDefinitions);
    copyOfSessionDefinitions.forEach((sessionClass: SessionClass) => {
      let service               = this;
      //Filter out the excluded type, if any provided, and any we don't have permission for
      sessionClass.sessionTypes = _.filter(sessionClass.sessionTypes, function (sessionType: SessionType) {
        return (!excludeThisSessionType || excludeThisSessionType !== sessionType.name)
          && (!sessionType.permission || service.securityService.hasPermission ( sessionType.permission.systemName ));
      } );
    } );

    //Remove session classes that no longer have permitted session types
    copyOfSessionDefinitions = _.reject ( copyOfSessionDefinitions, function ( sessionClass: SessionClass ) {
      return !sessionClass.sessionTypes.length;
    } );

    return copyOfSessionDefinitions;
  }

  getAllSessionTypes (): SessionType[] {
    let supportState: SupportState      = snapshot ( this.store, AppStateType.SUPPORT_STATE );
    let fullDefinitions: SessionClass[] = supportState.sessionDefinitions;
    let types: SessionType[]            = [];

    fullDefinitions.forEach ( ( definition: SessionClass ) => {
      types.push.apply ( types, definition.sessionTypes );
    } );

    return types;
  }
}
