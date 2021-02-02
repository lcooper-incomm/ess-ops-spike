import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {WrapUpCodeCategory} from '../session/model/wrap-up-code-category';

const build = map(value => new WrapUpCodeCategory(value));

const buildAll = map((values: any[]) => {
  let results: WrapUpCodeCategory[] = [];
  values.forEach(value => results.push(new WrapUpCodeCategory(value)));
  return results;
});

@Injectable({
  providedIn: 'root'
})
export class WrapUpCodeCategoryService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<WrapUpCodeCategory[]> {
    return this.http.get(`/rest/category`)
      .pipe(buildAll);
  }

  findAllByQueueId(id: number): Observable<WrapUpCodeCategory[]> {
    return this.http.get<WrapUpCodeCategory[]>('/rest/queue/' + id + '/category')
      .pipe(buildAll);
  }

  findOne(id: number): Observable<WrapUpCodeCategory> {
    return this.http.get(`/rest/category/${id}`)
      .pipe(build);
  }

  create(category: WrapUpCodeCategory): Observable<WrapUpCodeCategory> {
    return this.http.post(`/rest/category`, category)
      .pipe(build);
  }

  updateOne(category: WrapUpCodeCategory): Observable<WrapUpCodeCategory> {
    return this.http.put(`/rest/category/${category.id}`, category)
      .pipe(build);
  }
}
