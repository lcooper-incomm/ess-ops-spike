import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Partner} from '../session/selection/partner';

const build = map(value => new Partner(value));

const buildAll = map((values: any[]) => {
  let results: Partner[] = [];
  values.forEach(value => results.push(new Partner(value)));
  return results;
});

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Partner[]> {
    return this.http.get<Partner[]>('/rest/partner')
      .pipe(buildAll);
  }

  findAllGrantedPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>('/rest/partner/granted')
      .pipe(buildAll);
  }

  create(partner: Partner): Observable<Partner> {
    return this.http.post<Partner>(`/rest/partner`, partner)
      .pipe(build);
  }

  updateOne(partner: Partner): Observable<Partner> {
    return this.http.put<Partner>(`/rest/partner`, partner)
      .pipe(build);
  }
}
