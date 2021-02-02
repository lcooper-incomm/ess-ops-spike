import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SessionHistoryItem, parseSessionHistoryItem } from './models/session-history-item';
import { Page } from 'src/app/core/model/page';

const buildPage = map ( ( rawPage: any ) => {
  const content = rawPage.content.map ( ( item: any ) => parseSessionHistoryItem ( item ) );
  return new Page<SessionHistoryItem> ( rawPage, content );
} );

@Injectable ( {
  providedIn: 'root'
} )
export class SessionHistoryService {

  constructor ( private http: HttpClient ) {
  }

  findBySessionId ( sessionId: number, page: number = 0, limit: number = 50 ): Observable<Page<SessionHistoryItem>> {
    const params: HttpParams = new HttpParams ()
      .set ( 'page', page.toString () )
      .set ( 'limit', limit.toString () );

    return this.http.get ( `/rest/session/${sessionId}/history`, { params } )
      .pipe ( buildPage );
  }
}
