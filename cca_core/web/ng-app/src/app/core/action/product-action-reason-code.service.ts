import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { PlatformType } from "../platform/platform-type.enum";
import { Observable, of } from "rxjs";
import { ProductActionReasonCode, ReasonCode } from "./product-action-reason-code";
import { SupportState } from "../support/support-state";
import { snapshot } from "../store-utils/store-utils";
import { AppStateType } from "../../app-state-type.enum";
import { RequestQueryParam } from "../routing/request-query-param.enum";
import { map } from "rxjs/operators";
import { SetProductReasonCodesAction } from "../support/support-actions";
import { ProductActionReasonCodeType } from "./product-action-reason-code-type.enum";

@Injectable ( {
  providedIn: 'root'
} )
export class ProductActionReasonCodeService {

  constructor ( private http: HttpClient,
                private store: Store<AppState> ) {
  }

  findAllByPlatform ( platform: PlatformType, partner: string = null ): Observable<ProductActionReasonCode[]> {
    const supportState: SupportState = snapshot ( this.store, AppStateType.SUPPORT_STATE );
    const reasonCodes                = supportState.productActionReasonCodes.get ( platform );
    if ( reasonCodes && reasonCodes.length ) {
      return of ( reasonCodes );
    } else {
      let params = new HttpParams ()
        .set ( RequestQueryParam.PLATFORM, platform )
        .set ( RequestQueryParam.PARTNER, 'INCOMM' )
        .set ( 'sessionId', '999999' );

      if ( partner ) {
        params = params.set ( RequestQueryParam.PARTNER, partner );
      }

      return this.http.get ( '/rest/action/reason', { params: params } )
        .pipe ( map ( ( values: any[] ) => {
          const results: ProductActionReasonCode[] = values.map ( value => new ProductActionReasonCode ( value ) );
          this.store.dispatch ( new SetProductReasonCodesAction ( results, platform ) );
          return results;
        } ) )
    }
  }

  findAllByPlatformAndType ( platform: PlatformType, type: ProductActionReasonCodeType, partner: string = null ): Observable<ReasonCode[]> {
    return this.findAllByPlatform ( platform, partner )
      .pipe ( map ( ( productActionReasonCodes: ProductActionReasonCode[] ) => {
        //For CCL Balance Adjustment, the value does NOT match VMS like we were expecting
        if ( platform === PlatformType.CCL && type === ProductActionReasonCodeType.ADJUST_BALANCE ) {
          type = ProductActionReasonCodeType.MANADJDRCR;
        }

        const parentContainer = productActionReasonCodes.find ( container => container.actionDescription === type );
        return parentContainer ? parentContainer.productReasons : [];
      } ) );
  }
}
