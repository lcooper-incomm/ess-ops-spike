import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Group } from "../../../core/auth/group";

const build = map ( value => new Group ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: Group[] = [];
  values.forEach ( value => results.push ( new Group ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class ControlPanelGroupsService {

  constructor ( private http: HttpClient ) {
  }

  public active ( id ): Observable<Group> {
    return this.http.put ( `/rest/group/${id}/active`, {} )
      .pipe ( build );
  }

  public addCategory ( id, pid ): Observable<Group> {
    return this.http.post ( `/rest/group/${id}/category/${pid}`, {} )
      .pipe ( build );
  }

  public addOwnerToGroup ( id, uid ): Observable<Group> {
    return this.http.post ( `/rest/group/${id}/owner/${uid}`, {} )
      .pipe ( build );
  }

  public addPermission ( id, pid ): Observable<Group> {
    return this.http.post ( `/rest/group/${id}/permission/${pid}`, {} )
      .pipe ( build );
  }

  public createGroup ( data, id ): Observable<Group> {
    if ( id ) {
      const params = new HttpParams ().set ( 'copyGroupId', id );
      return this.http.post ( `/rest/group/`, data, { params } )
        .pipe ( build );
    } else {
      return this.http.post ( `/rest/group/`, data )
        .pipe ( build );
    }
  }

  public deleteGroup ( id ): Observable<Group> {
    return this.http.delete ( `/rest/group/${id}` )
      .pipe ( build );
  }

  public findAll (): Observable<Group[]> {
    return this.http.get ( `/rest/group` )
      .pipe ( buildAll );
  }

  public findAllByPermissionId ( permissionId: number ): Observable<Group[]> {
    return this.http.get ( `/rest/permission/${permissionId}/group` )
      .pipe ( buildAll );
  }

  public findOne ( id ): Observable<Group> {
    return this.http.get ( `/rest/group/${id}` )
      .pipe ( build );
  }

  public inactive ( id ): Observable<Group> {
    return this.http.delete ( `/rest/group/${id}/active` )
      .pipe ( build );
  }

  public removeCategory ( id, pid ): Observable<Group> {
    return this.http.delete ( `/rest/group/${id}/category/${pid}` )
      .pipe ( build );
  }

  public removeOwner ( oid, id ): Observable<Group> {
    return this.http.delete ( `/rest/group/${id}/owner/${oid}` )
      .pipe ( build );
  }

  public removePermission ( id, pid ): Observable<Group> {
    return this.http.delete ( `/rest/group/${id}/permission/${pid}` )
      .pipe ( build );
  }

  public updateGroup ( data ): Observable<Group> {
    return this.http.put ( `/rest/group/`, data )
      .pipe ( build );
  }

}
