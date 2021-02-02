import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { Observable } from "rxjs";
import { SessionState } from "../session/session-state";
import { snapshot } from "../store-utils/store-utils";
import { AppStateType } from "../../app-state-type.enum";
import { RequestQueryParam } from "../routing/request-query-param.enum";

@Injectable ()
export class SessionAwareInterceptor implements HttpInterceptor {

  constructor ( private store: Store<AppState> ) {
  }

  intercept ( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    if ( req.url.includes ( '/rest/' ) ) {
      let config: any = {
        setParams: {}
      };

      let sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
      if ( sessionState ) {
        //Handle Session parameters
        if ( sessionState.session ) {
          config.setParams.sessionId = sessionState.session.id;
        }

        //Handle Selection parameters
        if ( sessionState.selection ) {
          config.setParams.selectionId = sessionState.selection.id;

          if ( !req.params.get ( 'partner' ) && sessionState.selection.partner && req.url.indexOf ( '/order' ) === -1 ) {
            config.setParams.partner = sessionState.selection.partner.type;
          }

          if ( !req.params.get ( RequestQueryParam.PLATFORM ) ) {
            config.setParams.platform = sessionState.selection.platform;
          }
        }
      }

      return next.handle ( req.clone ( config ) );
    } else {
      return next.handle ( req );
    }
  }

}
