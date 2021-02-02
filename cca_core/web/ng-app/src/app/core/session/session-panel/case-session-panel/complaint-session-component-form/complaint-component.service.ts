import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ComplaintComponent } from "../../../model/complaint-component";

const build = map ( value => new ComplaintComponent ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class ComplaintComponentService {

  constructor ( private http: HttpClient ) {
  }

  updateOne ( request: ComplaintComponent ): Observable<ComplaintComponent> {
    return this.http.put<ComplaintComponent> ( '/rest/complaint-component/' + request.id, request )
      .pipe ( build );
  }
}
