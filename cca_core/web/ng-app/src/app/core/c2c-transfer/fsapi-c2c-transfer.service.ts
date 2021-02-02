import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { FsapiC2cRequest } from "./fsapi-c2c-request";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FsapiC2cTransferResponse } from "./fsapi-c2c-transfer-response";
import { RequestQueryParam } from "../routing/request-query-param.enum";
import { PlatformType } from "../platform/platform-type.enum";
import { FsapiC2cTransferApprovalRequest } from "./fsapi-c2c-transfer-approval-request";

const build = map ( value => new FsapiC2cRequest ( value ) );

const buildResponse = map ( value => new FsapiC2cTransferResponse ( value ) );

const buildApprovalResponse = map ( value => new FsapiC2cTransferApprovalRequest ( value ) );

const buildAllResponse = map ( ( values: any[] ) => {
  let results: FsapiC2cTransferResponse[] = [];
  values.forEach ( value => results.push ( new FsapiC2cTransferResponse ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class FsapiC2cTransferService {

  constructor ( private http: HttpClient ) {
  }

  request ( request: FsapiC2cRequest ): Observable<FsapiC2cRequest> {
    return this.http.post ( '/rest/c2c-request', request )
      .pipe ( build );
  }

  findAllPending (): Observable<FsapiC2cTransferResponse[]> {
    return this.http.get ( '/rest/c2c-request' )
      .pipe ( buildAllResponse );
  }

  getDetails ( id: number, platform: PlatformType ): Observable<FsapiC2cTransferResponse> {
    let params: HttpParams = new HttpParams ()
      .set ( RequestQueryParam.PLATFORM, platform );
    return this.http.get ( `/rest/c2c-request/${id}`, { params: params } )
      .pipe ( buildResponse );
  }

  approveC2CTransfer ( request: FsapiC2cTransferApprovalRequest ): Observable<FsapiC2cTransferApprovalRequest> {
    let params = new HttpParams ()
      .set ( RequestQueryParam.PLATFORM, request.platform );

    return this.http.put ( '/rest/c2c-request', request, { params: params } )
      .pipe ( buildApprovalResponse );
  }

}
