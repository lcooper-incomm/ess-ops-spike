import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { CaseRequest } from "./model/case-request";
import { Observable } from "rxjs";
import { Session } from "./model/session";
import { map } from "rxjs/operators";
import { CaseSearchRequest } from "../../case-workspace/case-search-request";
import { Page } from "../model/page";
import { SessionService } from "./session.service";
import { SecurityService } from "../security/security.service";
import {Logger} from '../../logging/logger.service';

const build = map ( ( data: any ) => new Session ( data ) );

const buildPage = map ( ( value: any ) => {
  let sessions: Session[] = [];
  value.content.forEach ( value => sessions.push ( new Session ( value ) ) );
  return new Page<Session> ( value, sessions );
} );

@Injectable ( {
  providedIn: 'root'
} )
export class CaseService {

  constructor ( private http: HttpClient,
                private securityService: SecurityService,
                private sessionService: SessionService,
                private logger: Logger) {
  }

  raiseOne ( request: CaseRequest ): Observable<Session> {
    return this.http.post ( '/rest/case', request )
      .pipe ( build );
  }

  search ( request: CaseSearchRequest, page: number = 0, limit: number = 50 ): Observable<Page<Session>> {
    let requestString = JSON.stringify ( request );
    let headers       = new HttpHeaders ()
      .set ( 'query', requestString );

    let sortDirection = request.sortDirection || 'ASC';
    let sortValue     = request.sortValue || 'createdDate';

    let params: HttpParams = new HttpParams ()
      .set ( 'page', page.toString () )
      .set ( 'limit', limit.toString () )
      .set ( 'sortDirection', sortDirection.toUpperCase () )
      .set ( 'sortValue', this.filterSortValue ( sortValue ) );

    return this.http.get ( '/rest/case/search', { headers: headers, params: params } )
      .pipe ( map ( ( results: any ) => {
        let sessions: Session[] = [];
        results.content.forEach ( value => {
          let session = this.sessionService.postProcessSession ( value );
          this.setIsWorkable ( session );
          sessions.push ( session );
        } );
        return new Page<Session> ( results, sessions );
      } ) );
  }

  private filterSortValue ( value: string ): string {
    let result: string;

    switch ( value ) {
      case 'assignee':
        result = 'user.displayName';
        break;
      case 'queue':
        result = 'queue.displayName';
        break;
      case 'sid':
        result = 'id';
        break;
      case 'team':
        result = 'team.displayName';
        break;
      case 'type':
        result = 'sessionType';
        break;
      default:
        result = value;
        break;
    }

    return result;
  }

  setIsWorkable ( session: Session ): void {
    try {
      let hasSessionTypePermission = this.securityService.hasPermission(session.sessionType.permission.systemName);
      let hasQueuePermission       = !session.queue || this.securityService.hasPermission(session.queue.permission.systemName);

      session.isWorkable = hasSessionTypePermission && hasQueuePermission;
    } catch (error) {
      this.logger.warn('setIsWorkable: sessionType or permission not set on the session');
    }
  }
}
