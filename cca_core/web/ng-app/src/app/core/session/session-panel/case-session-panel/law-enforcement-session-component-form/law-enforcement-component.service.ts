import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { LawEnforcementComponent } from "../../../model/law-enforcement-component";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const build = map ( value => new LawEnforcementComponent ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class LawEnforcementComponentService {

  constructor ( private http: HttpClient ) {
  }

  updateOne ( request: any ): Observable<LawEnforcementComponent> {
    return this.http.put<LawEnforcementComponent> ( '/rest/law-enforcement-component/' + request.id, request )
      .pipe ( build );
  }
}
