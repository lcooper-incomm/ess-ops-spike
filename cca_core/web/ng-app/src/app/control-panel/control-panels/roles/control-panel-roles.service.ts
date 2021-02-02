import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Role } from "../../../core/auth/role";

const build = map ( value => new Role ( value ) );

const buildAll = map ( ( values: Role[] ) => {
  let results: Role[] = [];
  values.forEach ( value => results.push ( new Role ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class ControlPanelRolesService {

  constructor ( private http: HttpClient ) {
  }

  public active ( roleId ): Observable<Role> {
    return this.http.put ( `rest/role/${roleId}/active`, {} )
      .pipe ( build );
  }

  public createRole ( formData, roleId: string ): Observable<Role> {
    if ( roleId ) {
      const params = new HttpParams ().set ( 'copyRoleId', roleId );
      return this.http.post ( `/rest/role/`, formData, { params } )
        .pipe ( build );
    } else {
      return this.http.post ( `/rest/role/`, formData )
        .pipe ( build );
    }
  }

  public addAdminToRole ( roleId, userId ): Observable<Role> {
    return this.http.post ( `/rest/role/${roleId}/admin/${userId}`, {} )
      .pipe ( build );
  }

  public addCategory ( roleId, categoryId ): Observable<Role> {
    return this.http.post ( `/rest/role/${roleId}/category/${categoryId}`, {} )
      .pipe ( build );
  }

  public addMemberToRole ( roleId, userId ): Observable<Role> {
    return this.http.post ( `/rest/role/${roleId}/member/${userId}`, {} )
      .pipe ( build );
  }

  public addPermission ( roleId, permissionId ): Observable<Role> {
    return this.http.post ( `/rest/role/${roleId}/permission/${permissionId}`, {} )
      .pipe ( build );

  }

  public deleteRole ( roleId ): Observable<Role> {
    return this.http.delete ( `/rest/role/${roleId}` )
      .pipe ( build );
  }

  public findAllAdminOfRoles ( userId: number ): Observable<Role[]> {
    return this.http.get ( `/rest/user/${userId}/role/admin` )
      .pipe ( buildAll );
  }

  public findAllRoles ( permissionId ): Observable<Role[]> {
    return this.http.get ( `/rest/permission/${permissionId}/role` )
      .pipe ( buildAll );
  }

  public findAllMemberOfRoles ( userId ): Observable<Role[]> {
    return this.http.get ( `/rest/user/${userId}/role/member` )
      .pipe ( buildAll );
  }

  public findOne ( roleId: number ): Observable<Role> {
    return this.http.get ( `/rest/role/${roleId}` )
      .pipe ( build );
  }

  public inactive ( roleId ): Observable<Role> {
    return this.http.delete ( `/rest/role/${roleId}/active` )
      .pipe ( build );
  }

  public removeAdminFromRole ( userId, roleId ): Observable<Role> {
    return this.http.delete ( `/rest/role/${roleId}/admin/${userId}` )
      .pipe ( build );
  }

  public removePermissionFromRole ( roleId, permissionId ): Observable<Role> {
    return this.http.delete ( `/rest/role/${roleId}/permission/${permissionId}` )
      .pipe ( build );
  }

  public removeCategory ( roleId, categoryId ): Observable<Role> {
    return this.http.delete ( `/rest/role/${roleId}/category/${categoryId}` )
      .pipe ( build );
  }

  public removeMemberFromRole ( memberId, roleId ): Observable<Role> {
    return this.http.delete ( `/rest/role/${roleId}/member/${memberId}` )
      .pipe ( build );
  }

  public removePermission ( roleId, permissionId ): Observable<Role> {
    return this.http.delete ( `/rest/role/${roleId}/permission/${permissionId}` )
      .pipe ( build );
  }

  public updateRole ( data ): Observable<Role> {
    return this.http.put ( `/rest/role/`, data )
      .pipe ( build );
  }
}
