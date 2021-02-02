import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { VersionAndEnvironmentView } from "./version-and-environment-view";
import { map } from "rxjs/operators";

const build = map ( ( value: any ) => new VersionAndEnvironmentView ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class CanaryService {

  constructor ( private http: HttpClient ) {
  }

  findEnvVersion (): Observable<VersionAndEnvironmentView> {
    return this.http.get ( '/rest/canary/env-version' )
      .pipe ( build );
  }
}
