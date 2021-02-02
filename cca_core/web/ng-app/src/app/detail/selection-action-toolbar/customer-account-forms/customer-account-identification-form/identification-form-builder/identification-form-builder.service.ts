import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { IdentificationType } from '../../../../../core/customer/identification-type';
import { Occupation } from '../../../../../core/customer/occupation';
import { ReasonCode } from '../../../../../core/action/product-action-reason-code';
import { map } from 'rxjs/operators';
import { ProductActionReasonCodeType } from 'src/app/core/action/product-action-reason-code-type.enum';
import { IdentificationTypeService } from 'src/app/core/customer/identification-type.service';
import { OccupationService } from 'src/app/core/customer/occupation.service';
import { ProductActionReasonCodeService } from 'src/app/core/action/product-action-reason-code.service';
import { PlatformType } from 'src/app/core/platform/platform-type.enum';

export interface CanadianIdentificationFormOptions {
  identificationTypes: IdentificationType[];
  occupations: Occupation[];
  noTaxpayerIdReasons: ReasonCode[];
}

@Injectable ( {
  providedIn: 'root'
} )
export class IdentificationFormBuilderService {

  static readonly OTHER_REASON_CODE = '3';

  constructor (
    private identificationTypeService: IdentificationTypeService,
    private occupationService: OccupationService,
    private productActionReasonCodeService: ProductActionReasonCodeService,
  ) {
  }

  loadCanadianFormOptions ( platform: PlatformType ): Observable<CanadianIdentificationFormOptions> {
    return forkJoin (
      this.loadIdentificationTypes (),
      this.loadOccupations (),
      this.loadNoTaxpayerIdReasons ( platform )
    ).pipe (
      map ( ( [ identificationTypes, occupations, noTaxpayerIdReasons ] ) => {
        return {
          identificationTypes,
          occupations,
          noTaxpayerIdReasons,
        }
      } )
    );
  }

  private loadIdentificationTypes (): Observable<IdentificationType[]> {
    return this.identificationTypeService
      .findAll ()
      .pipe ( map ( types => types.filter ( type => type.country === 'CA' ) ) );
  }

  private loadNoTaxpayerIdReasons ( platform: PlatformType ): Observable<ReasonCode[]> {
    return this.productActionReasonCodeService.findAllByPlatformAndType ( platform, ProductActionReasonCodeType.NO_TAXPAYER_ID );
  }

  private loadOccupations (): Observable<Occupation[]> {
    return this.occupationService.findAll ();
  }

  static buildForm ( isCanadian: boolean ): FormGroup {
    return isCanadian ? this.buildCanadianForm () : this.buildUSForm ();
  }

  private static buildCanadianForm (): FormGroup {

    return new FormGroup ( {
      occupation: new FormControl ( null, [ Validators.required ] ),
      identificationType: new FormControl ( null, [ Validators.required ] ),
      identificationNumber: new FormControl ( null, [ Validators.required ] ),
      identificationCountry: new FormControl ( { value: 'Canada (CA)', disabled: true } ),
      identificationProvince: new FormControl ( null, [ Validators.required ] ),
      expirationDate: new FormControl ( null, [ Validators.required ] ),
      verificationDate: new FormControl ( null ),
      taxpayerId: new FormControl ( null ),
      noTaxpayerIdReason: new FormControl ( null ),
      residence: new FormControl ( null, [ Validators.required ] ),
      noTaxpayerIdReasonDescription: new FormControl ( null )
    } );
  }

  private static buildUSForm (): FormGroup {
    return new FormGroup ( {
      identificationType: new FormControl ( null, [ Validators.required ] ),
      identificationNumber: new FormControl ( null, [ Validators.required ] ),
    } );
  }
}
