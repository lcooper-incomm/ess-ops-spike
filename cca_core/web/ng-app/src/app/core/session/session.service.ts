import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, mergeAll } from "rxjs/operators";
import { Session } from './model/session';
import { SessionRequest } from "./model/session-request";
import { forkJoin, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { snapshot } from "../store-utils/store-utils";
import { AppStateType } from "../../app-state-type.enum";
import { SupportState } from "../support/support-state";
import { Page } from "../model/page";
import { UpdateSessionView } from "./model/update-session-view";
import { Selection } from "./model/selection";
import { Identifier } from "./model/identifier";
import { EditCaseRequest } from "../../case-workspace/edit-case-wizard/edit-case-request";
import { SessionType } from "./model/session-type";
import { SessionTypeType } from "./session-type-type.enum";
import {FlatPrivacyRequestComponent, PrivacyRequestComponent} from "./model/privacy-request-component";
import {EncorComponent} from './model/encor-component';
import {DisputeComponent} from './model/dispute-component';
import {DisputeTransaction} from '../action/vms-actions/models/vms-request-models';

const build = map ( value => new Session ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Session[] = [];
  values.forEach ( value => results.push ( new Session ( value ) ) );
  return results;
} );

const buildPage = map ( ( value: any ) => {
  let sessions: Session[] = [];
  value.content.forEach ( value => sessions.push ( new Session ( value ) ) );
  return new Page<Session> ( value, sessions );
} )

@Injectable ( {
  providedIn: 'root'
} )
export class SessionService {

  constructor ( private http: HttpClient,
                private store: Store<AppState> ) {
  }

  assignCase ( request: EditCaseRequest ): Observable<Session> {
    return this.http.put<Session> ( '/rest/session/' + request.id, request )
      .pipe ( map ( ( session ) => {
        return this.postProcessSession ( session );
      } ) )
  }

  cancelSession ( id: number ): Observable<any> {
    return this.http.put ( '/rest/session/' + id + '/cancel', {} );
  }

  changeType ( id: number, type: string ): Observable<any> {
    return this.http.put ( '/rest/session/' + id + '/type/' + type, null );
  }

  closeSession ( id: number ): Observable<any> {
    return this.http.post<Session> ( '/rest/session/' + id + '/close', null )
      .pipe ( build );
  }

  createSession ( request: SessionRequest ): Observable<Session> {
    return this.http.post<Session> ( '/rest/session', request )
      .pipe (
        map ( ( session: Session ) => {
          return this.postProcessSession ( session );
        } )
      );
  }

  findAllCasesRelatedToSelection ( selection: Selection<any> ): Observable<Session[]> {
    let tasks: Observable<Session[]>[] = [];

    selection.identifiers.forEach ( ( identifier: Identifier ) => {
      tasks.push ( this.findAllCasesRelatedToIdentifier ( identifier ) );
    } );

    return forkJoin ( tasks )
      .pipe ( mergeAll () );
  }

  findSession ( id: number | string, skipActivate: boolean = false ): Observable<Session> {
    let params = new HttpParams ()
      .set ( 'skipActivate', skipActivate ? 'true' : 'false' );

    return this.http.get<Session> ( '/rest/session/' + id, { params: params } )
      .pipe (
        map ( ( session: Session ) => {
          return this.postProcessSession ( session );
        } )
      );
  }

  findWorkspaceSessions ( page: number = 0, limit: number = 50 ) {
    let params: HttpParams = new HttpParams ()
      .set ( 'page', page.toString () )
      .set ( 'limit', limit.toString () );

    return this.http.get<Page<Session>> ( '/rest/workspace-session', { params: params } )
      .pipe ( buildPage );
  }

  postProcessSession ( session: Session ): Session {
    session                        = new Session ( session );
    let supportState: SupportState = snapshot ( this.store, AppStateType.SUPPORT_STATE );
    session.populateSessionDefinition ( supportState.sessionDefinitions );
    return session;
  }

  updateOne ( request: UpdateSessionView ): Observable<Session> {
    return this.http.put<Session> ( '/rest/session/' + request.id, request )
      .pipe ( map ( ( session ) => {
        return this.postProcessSession ( session );
      } ) );
  }

  updateOnePrivacyRequestComponent ( request: PrivacyRequestComponent ): Observable<PrivacyRequestComponent> {
    return this.http.put<PrivacyRequestComponent>('/rest/session/privacy-request', request);
  }

  updateOneEncorComponent ( request: EncorComponent ): Observable<EncorComponent> {
    return this.http.put<EncorComponent>('/rest/session/encor', request);
  }

  updateOneDisputeTransaction ( request: DisputeTransaction ): Observable<DisputeTransaction> {
    return this.http.put<DisputeTransaction>('/rest/session/dispute-transaction', request);
  }

  /**
   * Filter out Complaint type for selects to prevent users from creating a complaint session.
   *
   * @param sessionTypes
   */
  filterSessionTypes (sessionTypes: SessionType[]): SessionType[] {
    return sessionTypes.filter( (sessionType: SessionType ) => sessionType.name !== SessionTypeType.COMPLAINT && sessionType.name !== SessionTypeType.PRIVACY_REQUEST );
  }

  changeStatusAwaitingToActive(sessionId: number): Observable<any> {
    return this.http.put(`/rest/session/${sessionId}/status/awaiting-to-active`, {});
  }

  private findAllCasesRelatedToIdentifier ( identifier: Identifier ): Observable<Session[]> {
    return this.http.get ( `/rest/session/related/identifier/${identifier.id}` )
      .pipe (
        map ( ( sessions: Session[] ) => {
          let processedSessions: Session[] = [];
          sessions.forEach ( ( session: Session ) => processedSessions.push ( this.postProcessSession ( session ) ) );
          return processedSessions;
        } )
      );
  }
}
