import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailSupportService {

  constructor( private http: HttpClient ) {

  }

  public sendEmail(data): Observable<any> {
    if( data ) {
      return this.http.post( `/rest/job/email/`, data );
    }
    return of ( null );
  }
}
