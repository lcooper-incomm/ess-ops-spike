import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CallComponent } from "../../model/call-component";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

const build = map ( value => new CallComponent ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class CallComponentService {

  constructor ( private http: HttpClient ) {
  }

  updateOne ( request: CallComponent ): Observable<CallComponent> {
    return this.http.put<CallComponent> ( '/rest/call-component/' + request.id, request )
      .pipe ( build );
  }
}
