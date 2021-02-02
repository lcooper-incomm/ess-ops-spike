import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Permission } from '../auth/permission';
import { map } from "rxjs/operators";

const build = map ( value => new Permission ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Permission[] = [];
  values.forEach ( value => results.push ( new Permission ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class PermissionService {

  constructor ( private http: HttpClient ) {
  }

  findAllForUserId ( id: number ): Observable<Permission[]> {
    return this.http.get<Permission[]> ( '/rest/user/' + id + '/permission' )
      .pipe ( buildAll );
  }
}
