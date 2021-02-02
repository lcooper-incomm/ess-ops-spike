import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CsCoreAddress } from "@cscore/core-client-model";
import { MerchantComponent } from '../../../model/merchant-component';

const build = map ( value => new MerchantComponent ( value ) );

@Injectable ( {
  providedIn: 'root'
} )
export class MerchantComponentService {

  constructor ( private http: HttpClient ) {
  }

  updateOne ( request: UpdateMerchantComponentRequest ): Observable<MerchantComponent> {
    return this.http.put<MerchantComponent> ( '/rest/merchant-component/' + request.id, request )
      .pipe ( build );
  }
}

export interface UpdateMerchantComponentRequest {
  id: number;
  address: CsCoreAddress;
  contactName: string;
  contactPhone: string;
  contactTitle: string;
  deactivatedDate: Date;
  firstRedemptionAttemptedDate: Date;
  lastReloadedDate: Date;
  locationName: string;
  merchantLegacyId: string;
  merchantName: string;
  purchasedDate: Date;
}
