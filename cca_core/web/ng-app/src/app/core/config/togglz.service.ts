import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {TogglzType} from './togglz-type.enum';
import {AppState} from '../../app-state';
import {SupportState} from '../support/support-state';
import {snapshot} from '../store-utils/store-utils';
import {AppStateType} from '../../app-state-type.enum';
import {TogglzFeature} from './togglz-feature';

@Injectable({
  providedIn: 'root'
})
export class TogglzService {

  constructor(private http: HttpClient,
              private store: Store<AppState>) {
  }

  findAll(): Observable<Map<string, TogglzFeature>> {
    return this.http.get<Map<string, TogglzFeature>>('/rest/togglz');
  }

  /**
   * Update the status of the feature togglz.  Since the totality of the update is the status,
   * do it through a path variable rather than the body.
   *
   * @param name
   * @param isActive
   */
  updateOne(name: string, isActive: boolean): Observable<any> {
    return this.http.put(`/rest/togglz/${name}/${isActive}`, null);
  }

  isActive(type: TogglzType): boolean {
    let supportState: SupportState = snapshot(this.store, AppStateType.SUPPORT_STATE);
    return supportState.togglz[type].isActive;
  }
}
