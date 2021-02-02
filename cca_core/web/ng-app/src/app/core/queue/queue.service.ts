import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { SessionQueue } from "../session/model/session-queue";
import { SessionTypeType } from '../session/session-type-type.enum';
import { map } from "rxjs/operators";
import { SecurityService } from "../security/security.service";
import * as _ from "lodash";

const build = map ( value => new SessionQueue ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: SessionQueue[] = [];
  values.forEach ( value => results.push ( new SessionQueue ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class QueueService {

  constructor ( private http: HttpClient,
                private securityService: SecurityService ) {
  }

  findAll (): Observable<SessionQueue[]> {
    return this.http.get<SessionQueue[]> ( '/rest/queue' )
      .pipe ( buildAll );
  }

  findAllCaseQueues (): Observable<SessionQueue[]> {
    return this.http.get<SessionQueue[]> ( '/rest/case/queue' )
      .pipe ( buildAll );
  }

  findAllPermitted (): Observable<SessionQueue[]> {
    return this.findAll ()
      .pipe ( map ( ( queues: SessionQueue[] ) => {
        return _.filter ( queues, ( queue: SessionQueue ) => {
          return this.securityService.hasPermission ( queue.permission.systemName );
        } );
      } ) );
  }

  findAllBySessionType ( sessionType: SessionTypeType ): Observable<SessionQueue[]> {
    let params = new HttpParams ();
    if (sessionType) {
      params = params.set ( 'sessionType', sessionType );
    }

    return this.http.get<SessionQueue[]> ( '/rest/queue', { params: params } )
      .pipe ( buildAll );
  }

  findOne ( id: number ): Observable<SessionQueue> {
    return this.http.get ( `/rest/queue/${id}` )
      .pipe ( build );
  }

  create( sessionQueue: SessionQueue ): Observable<any> {
    return this.http.post( `/rest/queue`, sessionQueue)
      .pipe( build );
  }

  updateOne( sessionQueue: SessionQueue ): Observable<any> {
    return this.http.put( `/rest/queue/${sessionQueue.id}`, sessionQueue)
      .pipe( build );
  }
}
