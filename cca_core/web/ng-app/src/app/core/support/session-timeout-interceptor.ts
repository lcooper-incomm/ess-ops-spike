import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ResetSessionTimeoutAction } from "./support-actions";

@Injectable ()
export class SessionTimeoutInterceptor implements HttpInterceptor {

  constructor ( private store: Store<AppState> ) {
  }

  intercept ( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    return next.handle ( req )
      .pipe ( tap ( event => {
        if ( event instanceof HttpResponse ) {
          if ( event.url.indexOf ( '/rest' ) !== -1 && event.status < 300 ) {
            this.store.dispatch ( new ResetSessionTimeoutAction () );
          }
        }
      } ) );
  }

}
