import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, OperatorFunction } from 'rxjs';
import {
  ActivateB2bCardRequest,
  ActivateGiftCardReplacementRequest,
  AdjustGreencardBalanceRequest,
  GreencardActionRequest,
  MerchandiseReleaseRequest,
  GreencardReleasePreAuthRequest,
  GiftCardReplacementRequest,
  StatusChangeRequest,
  TransferCardRequest,
} from './greencard-action-request-models';
import {
  ActivateB2bCardResponse,
  ActivateGiftCardReplacementResponse,
  AdjustGreencardBalanceResponse,
  GreencardActionResponse,
  ReleasePreAuthResponse,
  GiftCardReplacementResponse,
  ProgramLimits,
  StatusChangeResponse,
  TransferCardResponse,
} from './greencard-action-response-models';

const buildActivateB2b      = map ( value => new ActivateB2bCardResponse ( value ) );
const buildActivateGiftCard = map ( value => new ActivateGiftCardReplacementResponse ( value ) );
const buildAdjustBalance    = map ( value => new AdjustGreencardBalanceResponse ( value ) );
const buildAdjustStatus     = map ( value => new StatusChangeResponse ( value ) );
const buildProgramLimits    = map ( ( value: { [ key: string ]: any } ) => new ProgramLimits ( value ) );
const buildReleasePreauth   = map ( value => new ReleasePreAuthResponse ( value ) );
const buildReplaceCard = map ( value => new GiftCardReplacementResponse ( value ) );


@Injectable ( {
  providedIn: 'root'
} )
export class GreencardActionService {

  private static basePath = '/rest/action/greencard';

  constructor ( private http: HttpClient ) {
  }

  public activateB2BCard ( request: ActivateB2bCardRequest ): Observable<ActivateB2bCardResponse> {
    return this.doPost ( '/activateB2BCard', request, buildActivateB2b );
  }

  public activateGiftCardReplacement ( request: ActivateGiftCardReplacementRequest ): Observable<ActivateGiftCardReplacementResponse> {
    return this.doPost ( '/activateGiftCardReplacement', request, buildActivateGiftCard );
  }

  public adjustBalance ( request: AdjustGreencardBalanceRequest ): Observable<AdjustGreencardBalanceResponse> {
    return this.doPost ( '/balanceAdjustment', request, buildAdjustBalance );
  }

  public changeStatus ( request: StatusChangeRequest ): Observable<StatusChangeResponse> {
    return this.doPost ( '/changestatus', request, buildAdjustStatus );
  }

  public releaseMerchandise ( request: MerchandiseReleaseRequest ): Observable<ProgramLimits> {
    return this.doPost ( '/merchandiseRelease', request, buildProgramLimits );
  }

  public releasePreAuth ( request: GreencardReleasePreAuthRequest ): Observable<ReleasePreAuthResponse> {
    return this.doPost ( '/preauthrelease', request, buildReleasePreauth );
  }

  public replaceCard ( request: GiftCardReplacementRequest, reorder: boolean ): Observable<GiftCardReplacementResponse> {
    return this.doPost ( '/replacecard', request, buildReplaceCard, { reorder: reorder.toString () } );
  }

  public transferCard ( request: TransferCardRequest ): Observable<TransferCardResponse> {
    return this.doPost ( '/cardTransfer', request, map ( value => value ) );
  }

  private doPost<T extends GreencardActionRequest, S extends GreencardActionResponse> (
    path: string,
    request: T,
    buildFn: OperatorFunction<any, S>,
    params?: HttpParams | { [ param: string ]: string | string[] },
  ): Observable<S> {
    if ( request ) {
      return this.http
        .post ( `${GreencardActionService.basePath}${path}`, request, { params } )
        .pipe ( buildFn );
    }
  }
}
