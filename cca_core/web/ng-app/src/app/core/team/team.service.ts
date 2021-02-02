import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Team} from '../auth/team';
import {SecurityService} from "../security/security.service";

const build = map(value => new Team(value));

const buildAll = map((values: any[]) => {
  let results: Team[] = [];
  values.forEach(value => results.push(new Team(value)));
  return results;
});

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient, private securityService: SecurityService) {
  }

  findOne(id: number): Observable<Team> {
    return this.http.get(`/rest/team/${id}`)
      .pipe(build);
  }

  findAll(fetchMembers: boolean = false): Observable<Team[]> {
    let params: HttpParams = new HttpParams().set('fetchMembers', fetchMembers.toString());

    return this.http.get<Team[]>('/rest/team', {params: params})
      .pipe(buildAll);
  }

  findAllPermittedForCaseWorkspace(): Observable<Team[]> {
    return this.findAll()
      .pipe(
        map(teams => teams.filter(team => this.securityService.hasPermission(team.casePermission.systemName)))
      );
  }

  create(team: Team): Observable<any> {
    return this.http.post(`/rest/team`, team)
      .pipe(build);
  }

  updateOne(team: Team): Observable<any> {
    return this.http.put(`/rest/team/${team.id}`, team)
      .pipe(build);
  }
}
