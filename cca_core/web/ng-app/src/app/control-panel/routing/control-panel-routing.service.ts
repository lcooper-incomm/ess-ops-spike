import { Injectable } from '@angular/core';
import { AppStateType } from 'src/app/app-state-type.enum';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state';
import { Observable, of, from } from 'rxjs';
import { Router } from '@angular/router';
import { RoutePath } from '../../core/routing/route-path.enum';
import { ControlPanelChildRouteAction } from '../../core/control-panel/action/control-panel-type-action';

function isControlPanelRoot ( url: string ) {
  return url.replace ( '/', '' ) === RoutePath.CONTROL_PANEL;
}

@Injectable ( {
  providedIn: 'root'
} )
export class ControlPanelRoutingService {

  constructor (
    private router: Router,
    private store: Store<AppState>,
  ) {
  }

  /**
   * Redirects from /control-panel to last visited child of /control-panel
   *
   * If we are at a child route, or if there is no last visited child route, no redirect occurs
   *
   * @param url
   * @returns `true` if redirected, `false` otherwise
   */
  redirectControlPanel ( url: string ): Observable<boolean> {
    if ( isControlPanelRoot ( url ) ) {
      return this.store.select ( AppStateType.CONTROL_PANEL_STATE )
        .pipe (
          switchMap ( state => {
            if ( state.lastVisitedChildRoute ) {
              return from ( this.router.navigateByUrl ( state.lastVisitedChildRoute ) );
            } else {
              return of ( false );
            }
          } ),
        );
    } else {
      return of ( false );
    }
  }

  /**
   * Saves the child route in the state, for redirect when coming back to control panel later
   *
   * @param url
   */
  saveChildRoute ( url: string ): void {
    if ( !isControlPanelRoot ( url ) ) {
      this.store.dispatch ( new ControlPanelChildRouteAction ( url ) );
    }
  }
}
