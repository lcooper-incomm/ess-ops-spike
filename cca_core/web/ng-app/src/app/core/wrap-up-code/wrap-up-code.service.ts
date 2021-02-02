import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {WrapUpCode} from '../session/model/wrap-up-code';

const build = map(value => new WrapUpCode(value));

const buildAll = map((values: any[]) => {
  let results: WrapUpCode[] = [];
  values.forEach(value => results.push(new WrapUpCode(value)));
  return results;
});

@Injectable({
  providedIn: 'root'
})
export class WrapUpCodeService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<WrapUpCode[]> {
    return this.http.get<WrapUpCode[]>('/rest/wrap-up-code')
      .pipe(buildAll);
  }

  findAllByCategoryId(id: number): Observable<WrapUpCode[]> {
    return this.http.get<WrapUpCode[]>('/rest/category/' + id + '/wrap-up-code')
      .pipe(buildAll);
  }

  findOne(id: number): Observable<WrapUpCode> {
    return this.http.get<WrapUpCode>(`/rest/wrap-up-code/${id}`)
      .pipe(build);
  }

  create(code: WrapUpCode): Observable<WrapUpCode> {
    return this.http.post<WrapUpCode>(`/rest/wrap-up-code`, code)
      .pipe(build);
  }

  updateOne(code: WrapUpCode): Observable<WrapUpCode> {
    return this.http.put<WrapUpCode>(`/rest/wrap-up-code/${code.id}`, code)
      .pipe(build);
  }

}
