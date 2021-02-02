import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { RoutingService } from "../core/routing/routing.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ToastFactory } from "../toast/toast-factory.service";
import { AuthenticationService } from "./authentication.service";
import { LogoutType } from "./login/logout-type.enum";

@Injectable ()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor ( private authenticationService: AuthenticationService,
                private routingService: RoutingService,
                private toastFactory: ToastFactory ) {
  }

  intercept ( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    return next.handle ( req ).pipe (
      tap (
        () => {
        },
        ( error: HttpErrorResponse ) => {
          if ( error.status === 401 ) {
            let isRedirected = this.routingService.redirectToLoginIfNecessary ();
            if ( isRedirected ) {
              this.authenticationService.logout ( LogoutType.SERVER_RESTART );
            }
          }
        } ),
    );
  }
}
