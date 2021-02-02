import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { ControlPanelRoutingService } from 'src/app/control-panel/routing/control-panel-routing.service';

@Injectable ( {
  providedIn: 'root'
} )
export class ControlPanelGuard implements CanActivate, CanActivateChild {

  constructor ( private controlPanelRoutingService: ControlPanelRoutingService ) {
  }

  /**
   * Redirects to the last visited child route
   *
   * @param route
   * @param state
   */
  canActivate ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> {
    return this.controlPanelRoutingService.redirectControlPanel ( state.url ).pipe (
      mapTo ( true )
    );
  }

  /**
   * Saves the child route in the state, for redirect when coming back to control panel later
   *
   * @param route
   * @param state
   */
  canActivateChild ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    this.controlPanelRoutingService.saveChildRoute ( state.url );
    return true;
  }
}
