import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { IdentificationType } from "./identification-type";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import { SupportState } from "../support/support-state";
import { snapshot } from "../store-utils/store-utils";
import { AppStateType } from "../../app-state-type.enum";
import { map } from "rxjs/operators";
import { LoadIdentificationTypesAction } from "../support/support-actions";
import { IdentificationTypeType } from '../form/identification-field/identification-type-type.enum';
import { Permission } from '../auth/permission';
import { SecurityService } from '../security/security.service';

@Injectable ( {
  providedIn: 'root'
} )
export class IdentificationTypeService {

  constructor ( private securityService: SecurityService,
                private http: HttpClient,
                private store: Store<AppState> ) {
  }

  findAll (): Observable<IdentificationType[]> {
    let supportState: SupportState = snapshot ( this.store, AppStateType.SUPPORT_STATE );
    if ( supportState.identificationTypes.length ) {
      return of ( supportState.identificationTypes );
    } else {
      return this.http.get ( '/rest/identification-type' )
        .pipe ( map ( ( values: any[] ) => {
          let results: IdentificationType[] = [];
          values.forEach ( value => results.push ( new IdentificationType ( value ) ) );
          this.store.dispatch ( new LoadIdentificationTypesAction ( results ) );
          return results;
        } ) );
    }
  }

  getUSOptions (): IdentificationType[] {
    const identificationTypes: IdentificationType[] = [];

    if ( this.securityService.hasPermission ( Permission.VMS_SEARCH_BY_DRIVERS_LICENSE_NUMBER ) ) {
      identificationTypes.push ( IdentificationTypeService.US_OPTIONS.get ( IdentificationTypeType.DRIVERS_LICENSE ) );
    }

    if ( this.securityService.hasPermission ( Permission.VMS_SEARCH_BY_PASSPORT ) ) {
      identificationTypes.push ( IdentificationTypeService.US_OPTIONS.get ( IdentificationTypeType.PASSPORT ) );
    }

    if ( this.securityService.hasPermission ( Permission.VMS_SEARCH_BY_SOCIAL_INSURANCE_NUMBER ) ) {
      identificationTypes.push ( IdentificationTypeService.US_OPTIONS.get ( IdentificationTypeType.SOCIAL_INSURANCE_NUMBER ) );
    }

    if ( this.securityService.hasPermission ( Permission.VMS_SEARCH_BY_SOCIAL_SECURITY_NUMBER ) ) {
      identificationTypes.push ( IdentificationTypeService.US_OPTIONS.get ( IdentificationTypeType.SOCIAL_SECURITY_NUMBER ) );
    }

    return identificationTypes;
  }

  static findUSOptionByType ( type: IdentificationTypeType ): IdentificationType {
    return this.US_OPTIONS.get ( type );
  }

  private static readonly US_OPTIONS: Map<IdentificationTypeType, IdentificationType> = new Map ( [
    [
      IdentificationTypeType.DRIVERS_LICENSE,
      {
        country: 'US',
        description: 'Driver\'s License',
        type: IdentificationTypeType.DRIVERS_LICENSE,
      }
    ],
    [
      IdentificationTypeType.PASSPORT,
      {
        country: 'US',
        description: 'Passport',
        type: IdentificationTypeType.PASSPORT,
      }
    ],
    [
      IdentificationTypeType.SOCIAL_INSURANCE_NUMBER,
      {
        country: 'US',
        description: 'Social Insurance Number',
        type: IdentificationTypeType.SOCIAL_INSURANCE_NUMBER,
      }
    ],
    [
      IdentificationTypeType.SOCIAL_SECURITY_NUMBER,
      {
        country: 'US',
        description: 'Social Security Number',
        type: IdentificationTypeType.SOCIAL_SECURITY_NUMBER,
      }
    ],
  ] );

}
