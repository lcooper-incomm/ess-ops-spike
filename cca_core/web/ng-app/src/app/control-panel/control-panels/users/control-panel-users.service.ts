import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { User } from "../../../core/user/user";
import { Group } from "../../../core/auth/group";

const build = map ( value => new User ( value ) );

const buildAll = map ( ( values: User[] ) => {
  let results: User[] = [];
  values.forEach ( value => results.push ( new User ( value ) ) );
  return results;
} );

const buildAllGroup = map ( ( values: any[] ) => {
  let results: Group[] = [];
  values.forEach ( value => results.push ( new Group ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class ControlPanelUsersService {

  constructor ( private http: HttpClient ) {
  }

  public active ( userId ): Observable<User> {
    return this.http.put ( `/rest/user/${userId}/active`, {} )
      .pipe ( build );
  }

  public createUser ( userId: User ): Observable<User> {
    return this.http.post ( `/rest/user`, userId )
      .pipe ( build );
  }

  public deleteUser ( userId: number ): Observable<User> {
    return this.http.delete ( `/rest/user/${userId}` )
      .pipe ( build );
  }

  public findAll (): Observable<User[]> {
    return this.http.get ( `/rest/user` )
      .pipe ( buildAll );
  }

  public findAllGroups ( userId: number ): Observable<Group[]> {
    return this.http.get ( `/rest/user/${userId}/group` )
      .pipe ( buildAllGroup );
  }

  public findAllWhereUsernameStartsWith ( id, str ): Observable<User[]> {
    return this.http.get ( `/rest/user/search?q=${str}` )
      .pipe ( buildAll );
  }

  public inactive ( userId: number ): Observable<User> {
    return this.http.delete ( `/rest/user/${userId}/active` )
      .pipe ( build );
  }

  public updateUser ( userId: User ): Observable<User> {
    return this.http.put ( `/rest/user/`, userId )
      .pipe ( build );
  }
}
