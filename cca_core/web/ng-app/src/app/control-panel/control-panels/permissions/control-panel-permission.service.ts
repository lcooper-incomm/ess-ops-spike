import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Permission } from "../../../core/auth/permission";
import { HttpClient } from "@angular/common/http";
import { PermissionCategory } from 'src/app/core/auth/permission-category';

const build = map ( value => new Permission ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Permission[] = [];
  values.forEach ( value => results.push ( new Permission ( value ) ) );
  return results;
} );

const buildAllCategories = map ( ( values: any[] ) => {
  let results: PermissionCategory[] = [];
  values.forEach ( value => results.push ( new PermissionCategory ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class ControlPanelPermissionService {

  constructor ( private http: HttpClient ) {
  }

  public active ( id ): Observable<Permission> {
    return this.http.put ( `rest/permission/${id}/active`, {} )
      .pipe ( build );
  }

  public findAll (): Observable<Permission[]> {
    return this.http.get ( `/rest/permission` )
      .pipe ( buildAll );
  }

  public findAllByGroupId ( groupId: number ): Observable<Permission[]> {
    return this.http.get ( `/rest/group/${groupId}/permission` )
      .pipe ( buildAll );
  }

  public findAllCategories (): Observable<PermissionCategory[]> {
    return this.http.get ( `/rest/permission/category` )
      .pipe ( buildAllCategories );
  }

  public inactive ( id ): Observable<Permission> {
    return this.http.delete ( `/rest/permission/${id}/active` )
      .pipe ( build );
  }

  public removePermission ( id, pid ): Observable<Permission> {
    return this.http.delete ( `/rest/group/${id}/permission/${pid}` )
      .pipe ( build );
  }

  public updatePermission ( data ): Observable<Permission> {
    return this.http.put ( `/rest/permission/`, data )
      .pipe ( build );
  }
}
