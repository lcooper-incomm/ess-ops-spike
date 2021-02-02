import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from './user';
import { Permission } from "../auth/permission";
import { map } from "rxjs/operators";
import * as _ from "lodash";
import { RequestQueryParam } from "../routing/request-query-param.enum";

const build = map ( value => new User ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: User[] = [];
  values.forEach ( value => results.push ( new User ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class UserService {

  constructor ( private http: HttpClient ) {
  }

  findAuthenticatedUser (): Observable<User> {
    return this.http.get<User> ( '/rest/user/current' )
      .pipe ( build );
  }

  hasAllOfThesePermissions ( user: User, names: string[] ): boolean {
    let hasPermission = true;
    for ( var i = 0; i < names.length; i++ ) {
      hasPermission = this.hasPermission ( user, names[ i ] );
      if ( !hasPermission ) {
        break;
      }
    }
    return hasPermission;
  }

  hasAnyOfThesePermissions ( user: User, names: string[] ): boolean {
    let hasPermission = false;
    for ( var i = 0; i < names.length; i++ ) {
      hasPermission = this.hasPermission ( user, names[ i ] );
      if ( hasPermission ) {
        break;
      }
    }
    return hasPermission;
  }

  /**
   * Finds any permissions with given prefix, and then calls hasAnyOfThesePermissions so that systemAdministrator and
   * isActive checks can be made.
   */
  hasAnyPermissionWithPrefix ( user: User, prefix: string ): boolean {
    if ( user ) {
      let permissions = _.map ( _.filter ( user.permissions, function ( permission: Permission ) {
        return permission.isActive && permission.systemName.indexOf ( prefix ) === 0;
      } ), 'systemName' );
      return this.hasAnyOfThesePermissions ( user, permissions );
    }
    return false;
  }

  hasPermission ( user: User, name: string ): boolean {
    return user
      && !!_.find ( user.permissions, function ( permission: Permission ) {
        return permission.isActive && permission.systemName === name;
      } );
  }

  isSystemAdministrator ( user: User ): boolean {
    return user
      && user.isSystemAdministrator;
  }

  search ( queryString: string ): Observable<User[]> {
    let params = new HttpParams ()
      .set ( RequestQueryParam.Q, queryString );

    return this.http.get ( '/rest/user/search', { params: params } )
      .pipe ( buildAll );
  }

  updateOne ( user: User ): Observable<User> {
    let request = _.cloneDeep ( _.omit ( user, [ 'groups', 'roles', 'permissions' ] ) );

    return this.http.put ( '/rest/user', request )
      .pipe ( build );
  }

}
