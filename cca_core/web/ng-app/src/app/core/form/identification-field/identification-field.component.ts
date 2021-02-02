import { Component, Input, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../cca-base-component";
import { FormGroup } from "@angular/forms";
import { SecurityService } from "../../security/security.service";
import { IdentificationTypeType } from "./identification-type-type.enum";
import { Permission } from "../../auth/permission";
import { IdentificationType } from '../../customer/identification-type';
import { IdentificationTypeService } from '../../customer/identification-type.service';

@Component ( {
  selector: 'cca-identification-field',
  templateUrl: './identification-field.component.html',
  styleUrls: [ './identification-field.component.scss' ]
} )
export class IdentificationFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  numberControlName: string = 'identificationId';
  @Input ()
  placeholder: string       = 'Identification';
  @Input ()
  typeControlName: string   = 'identificationType';

  IdentificationType                       = IdentificationTypeType;
  isIdentificationTypeMenuEnabled: boolean = false;
  hasDriversLicensePermission: boolean     = false;
  hasPassportPermission: boolean           = false;
  hasSocialInsurancePermission: boolean    = false;
  hasSocialSecurityPermission: boolean     = false;
  tooltip: string;

  identificationTypes: IdentificationType[] = [];

  constructor ( private securityService: SecurityService, private identificationTypeService: IdentificationTypeService ) {
    super ();
  }

  ngOnInit () {
    this.setOptionPermissionFlags ();
    this.toggleIdentificationTypeMenuState ();
    this.setIdentificationTypeOptions ();
    this.setPlaceholder ();
    this.setTooltip ();
    this.toggleIdentificationNumberEnabledState ();
  }

  clear (): void {
    this.form.get ( this.numberControlName ).reset ();
    this.form.get ( this.typeControlName ).reset ();
    this.form.get ( this.numberControlName ).disable ();
    this.setPlaceholder ();
    this.setTooltip ();
  }

  setIdentificationType ( type: IdentificationTypeType ): void {
    this.form.get ( this.typeControlName ).setValue ( type );
    this.form.get ( this.numberControlName ).enable ();
    this.setPlaceholder ();
    this.setTooltip ();
  }

  private setIdentificationTypeOptions (): void {
    this.identificationTypes = this.identificationTypeService.getUSOptions ();

    // Auto select single identification type
    let identificationType = this.form.get ( this.typeControlName );
    if ( !identificationType ) {
      if ( this.identificationTypes.length === 1 ) {
        this.form.get ( this.typeControlName ).setValue ( this.identificationTypes[ 0 ].type );
      }
    }
  }

  private setOptionPermissionFlags (): void {
    this.hasDriversLicensePermission  = this.securityService.hasPermission ( Permission.VMS_SEARCH_BY_DRIVERS_LICENSE_NUMBER );
    this.hasPassportPermission        = this.securityService.hasPermission ( Permission.VMS_SEARCH_BY_PASSPORT );
    this.hasSocialInsurancePermission = this.securityService.hasPermission ( Permission.VMS_SEARCH_BY_SOCIAL_INSURANCE_NUMBER );
    this.hasSocialSecurityPermission  = this.securityService.hasPermission ( Permission.VMS_SEARCH_BY_SOCIAL_SECURITY_NUMBER );
  }

  private setPlaceholder () {
    if ( this.form.get ( this.typeControlName ) ) {
      const identificationType: IdentificationTypeType = this.form.get ( this.typeControlName ).value;
      switch ( identificationType ) {
        case IdentificationTypeType.DRIVERS_LICENSE:
        case IdentificationTypeType.PASSPORT:
        case IdentificationTypeType.SOCIAL_INSURANCE_NUMBER:
        case IdentificationTypeType.SOCIAL_SECURITY_NUMBER:
          this.placeholder = IdentificationTypeService.findUSOptionByType ( identificationType ).description;
          break;
        default:
          this.placeholder = 'Identification';
          break;
      }
    }
  }

  private setTooltip (): void {
    const identificationType = this.form.get ( this.typeControlName );
    if ( identificationType && identificationType.value ) {
      this.tooltip = null;
    } else {
      this.tooltip = 'Select an Identification Type';
    }
  }

  private toggleIdentificationNumberEnabledState (): void {
    const identificationNumber = this.form.get ( this.numberControlName );

    if ( identificationNumber ) {
      const identificationType = this.form.get ( this.typeControlName );
      if ( identificationType && identificationType.value ) {
        identificationNumber.enable ();
      } else {
        identificationNumber.disable ();
      }
    }
  }

  private toggleIdentificationTypeMenuState (): void {
    this.isIdentificationTypeMenuEnabled = this.hasDriversLicensePermission
      || this.hasPassportPermission
      || this.hasSocialInsurancePermission
      || this.hasSocialSecurityPermission;
  }
}
