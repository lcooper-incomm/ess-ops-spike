import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ToastFactory } from "../../toast/toast-factory.service";
import { ToastDuration } from "../../toast/toast-duration.enum";
import * as _ from "lodash";
import Timer = NodeJS.Timer;

@Injectable ()
export class BlameInterceptor implements HttpInterceptor {

  private delay: number                   = 1000 * 10;
  //private pendingRequests: Map<string, Timer> = new Map<string, Timer> ();
  private pendingRequests: RequestTimer[] = [];

  constructor ( private toastFactory: ToastFactory ) {
  }

  intercept ( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    this.startTimer ( req );
    return next.handle ( req )
      .pipe ( tap ( event => {
        if ( event instanceof HttpResponse ) {
          this.stopTimer ( event.url );
        }
      }, ( error: HttpErrorResponse ) => {
        this.stopTimer ( error.url );
      } ) );
  }

  private getBlamedSystemName ( request: HttpRequest<any> ): string {
    let systemName = 'CCA';

    let platform = request.params.get ( 'platform' );
    if ( platform ) {
      switch ( platform ) {
        default:
          systemName = platform;
          break;
      }
    }

    return systemName;
  }

  private startTimer ( request: HttpRequest<any> ): void {
    let identifier: string = request.url;
    let timer: Timer       = setTimeout ( () => {
      let blamedSystem = this.getBlamedSystemName ( request );
      this.toastFactory.warn ( blamedSystem + ' is taking longer than usual to respond. Bear with us...', null, ToastDuration.DEFAULT );
    }, this.delay );

    let requestTimer        = new RequestTimer ();
    requestTimer.identifier = identifier;
    requestTimer.timer      = timer;
    this.pendingRequests.push ( requestTimer );
  }

  private stopTimer ( url: string ): void {
    let identifier: string = url.replace ( /^.*\/\/[^\/]+/, '' );
    if ( identifier.indexOf ( "?" ) !== -1 ) {
      identifier = identifier.substring ( 0, identifier.indexOf ( "?" ) );
    }

    let requestTimerIndex = _.findIndex ( this.pendingRequests, function ( requestTimer: RequestTimer ) {
      return requestTimer.identifier === identifier;
    } );
    if ( requestTimerIndex !== -1 ) {
      let requestTimers: RequestTimer[] = this.pendingRequests.splice ( requestTimerIndex, 1 );
      if ( requestTimers.length ) {
        let requestTimer = requestTimers[ 0 ];
        if ( requestTimer && requestTimer.timer ) {
          clearTimeout ( requestTimer.timer );
        }
      }
    }
  }
}

class RequestTimer {
  identifier: string;
  timer: Timer;
}
