import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PermissionCategory} from '../../../core/auth/permission-category';

@Injectable()
export class PermissionCategoryService {

  constructor(private http: HttpClient) {}

  findAll(): Observable<PermissionCategory[]> {
    return this.http.get<PermissionCategory[]>('/rest/permission-category');
  }

  create(permissionCategory: PermissionCategory): Observable<PermissionCategory> {
    return this.http.post<PermissionCategory>(`/rest/permission-category`, permissionCategory);
  }

  delete(id: number): Observable<PermissionCategory> {
    return this.http.delete<PermissionCategory>(`/rest/permission-category/${id}`);
  }

  updateOne(permissionCategory: PermissionCategory): Observable<PermissionCategory> {
    return this.http.put<PermissionCategory>(`/rest/permission-category/${permissionCategory.id}`, permissionCategory);
  }
}
