import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { CcaErrorMessages } from "./cca-error-messages";
import { ToastFactory } from "../../toast/toast-factory.service";
import { ToastDuration } from "../../toast/toast-duration.enum";

@Injectable ()
export class ErrorToastInterceptor implements HttpInterceptor {

  constructor ( private toastFactory: ToastFactory ) {
  }

  intercept ( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    return next.handle ( req )
      .pipe ( tap ( event => {

      }, ( error: HttpErrorResponse ) => {
        if ( error.status > 206
          && error.status !== 401 //the authentication-interceptor handles these
          && error.url.indexOf ( '/rest/user/current' ) === -1
          && error.url.indexOf ( '/authenticate' ) === -1 ) {
          let messages      = this.extractErrorMessages ( error );
          let correlationId = this.extractCorrelationId ( error );
          this.toast ( messages, correlationId );
        }
      } ) );
  }

  extractCorrelationId ( error: HttpErrorResponse ): string {
    let correlationId = error.headers.get ( 'core-correlation-id' );

    return correlationId;
  }

  extractErrorMessages ( error: HttpErrorResponse ): string[] {
    let errorMessages = [];

    let headerString = error.headers.get ( 'cca-error-messages' );
    if ( headerString ) {
      let response = new CcaErrorMessages ( JSON.parse ( headerString ) );
      errorMessages.push.apply ( errorMessages, response.messages );
    }

    return errorMessages;
  }

  toast ( errorMessages: string[], correlationId: string ): void {
    this.toastFactory.error ( 'Request failed with these messages:', errorMessages, ToastDuration.DEFAULT, correlationId );
  }
}
