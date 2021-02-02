import { Injectable } from '@angular/core';
import { Job, JobFilePassword, JobQueueResponse } from "../model/minion/job";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

const buildJob = map ( value => new Job ( value ) );

const buildJobQueue = map ( value => new JobQueueResponse ( value ) );

const buildPassword = map ( value => new JobFilePassword ( value ) );

const buildAllJobs = map ( ( values: any[] ) => {
  let results: Job[] = [];
  values.forEach ( value => results.push ( new Job ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class JobService {

  constructor ( private http: HttpClient ) {
  }

  public bulkChangeStatus ( request: Job, orderId: string ): Observable<any> {
    let params: HttpParams = new HttpParams ()
      .set ( 'orderId', orderId.toString () );

    return this.http.post<any> ( `/rest/job/change-status`, request, { params: params } );
  }

  public findOneById ( id: number ): Observable<Job> {
    return this.http.get<Job> ( `/rest/job/${id}` )
      .pipe ( buildJob );
  }

  public findAll ( username: string, page: number = 0, pageSize: number = 50 ): Observable<JobQueueResponse> {
    let params = new HttpParams ()
      .set ( 'page', page.toString () )
      .set ( 'pageSize', pageSize.toString () );

    if ( username ) {
      params = params.append ( 'username', username );
    }

    return this.http.get<Job[]> ( `/rest/job/`, { params: params } )
      .pipe ( buildJobQueue );
  }

  public downloadMinionFile ( jobFile ): Observable<any> {
    let params = new HttpParams ()
      .set ( 'filename', jobFile.name )
    return this.http.get<any> ( `/rest/file/minion/${jobFile.uuid}`, { params: params } )
  }

  public getloadMinionFilePassword ( jobFile ): Observable<JobFilePassword> {
    return this.http.get<JobFilePassword> ( `/rest/file/minion/${jobFile.uuid}/password` )
      .pipe ( buildPassword );
  }

  public export ( jobId ): Observable<any> {
    return this.http.get<any> ( `/rest/job/${jobId}/export` )
  }
}

