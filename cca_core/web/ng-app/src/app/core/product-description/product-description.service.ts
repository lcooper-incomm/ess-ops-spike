import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { PlatformType } from "../platform/platform-type.enum";
import { Observable, of } from "rxjs";
import { ProductDescription, ProductDescriptionContainer } from "./product-description";
import { map } from "rxjs/operators";
import { RequestQueryParam } from "../routing/request-query-param.enum";
import { Store } from "@ngrx/store";
import { AppStateType } from "../../app-state-type.enum";
import { SupportState } from "../support/support-state";
import { snapshot } from "../store-utils/store-utils";
import * as _ from "lodash";
import { SetProductDescriptionContainerAction } from "../support/support-actions";

const build = map ( value => new ProductDescription ( value ) );

const buildAll = map ( ( values: any[] ) => {
  let results: ProductDescription[] = [];
  values.forEach ( value => results.push ( new ProductDescription ( value ) ) );
  return results;
} );

@Injectable ( {
  providedIn: 'root'
} )
export class ProductDescriptionService {

  constructor ( private http: HttpClient,
                private store: Store<AppStateType> ) {
  }

  findAllByPlatform ( platform: PlatformType ): Observable<ProductDescription[]> {
    let supportState: SupportState = snapshot ( this.store, AppStateType.SUPPORT_STATE );
    if ( supportState && supportState.productDescriptionContainers ) {
      let container: ProductDescriptionContainer = _.find ( supportState.productDescriptionContainers, ( container: ProductDescriptionContainer ) => container.platform === platform );
      if ( container ) {
        return of ( container.descriptions );
      }
    }

    let params: HttpParams = new HttpParams ()
      .set ( RequestQueryParam.PLATFORM, platform );

    return this.http.get<ProductDescription[]> ( '/rest/product-description', { params: params } )
      .pipe (
        buildAll,
        map ( ( descriptions: ProductDescription[] ) => {
          let container = new ProductDescriptionContainer ( platform, descriptions );
          this.store.dispatch ( new SetProductDescriptionContainerAction ( container ) );
          return descriptions;
        } )
      );
  }
}
