import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RefundRequestComponent } from "../../../model/refund-request-component";
import { map } from "rxjs/operators";

const build = map ( value => new RefundRequestComponent ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class RefundRequestComponentService {

  constructor ( private http: HttpClient ) {
  }

  updateOne ( request: any ): Observable<RefundRequestComponent> {
    return this.http.put<RefundRequestComponent> ( '/rest/refund-request-component/' + request.id, request )
      .pipe ( build );
  }
}
