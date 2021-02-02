import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MaplesPartner} from '@cscore/maples-client-model';
import {CcaBaseComponent} from '../../cca-base-component';
import {GenericOption} from '../../model/generic-option';
import {SecurityService} from '../../security/security.service';
import {Permission} from '../../auth/permission';

@Component ( {
  selector: 'cca-bol-partner-field',
  templateUrl: './bol-partner-field.component.html',
  styleUrls: [ './bol-partner-field.component.scss' ]
} )
export class BolPartnerFieldComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;
  @Input ()
  controlName: string = 'bolPartner';
  @Input ()
  placeholder: string = 'Partner';

  partnerOptions: GenericOption<MaplesPartner>[] = [];

  constructor ( private securityService: SecurityService ) {
    super ();
  }

  ngOnInit () {
    this.buildOptions ();
  }

  private buildOptions (): void {
    if ( this.securityService.hasPermission ( Permission.SEARCH_BY_AMEX_BOL ) ) {
      this.partnerOptions.push ({
        displayValue: 'Amex',
        value: MaplesPartner.AXBOL
      } );
    }
    if ( this.securityService.hasPermission ( Permission.SEARCH_BY_MASTERCARD_BOL ) ) {
      this.partnerOptions.push ({
        displayValue: 'Mastercard',
        value: MaplesPartner.MBOL
      } );
    }
    if ( this.securityService.hasPermission ( Permission.SEARCH_BY_VANILLA_BOL ) ) {
      this.partnerOptions.push ({
        displayValue: 'Vanilla',
        value: MaplesPartner.VANILLA
      } );
    }
    if ( this.securityService.hasPermission ( Permission.SEARCH_BY_WALMART_BOL ) ) {
      this.partnerOptions.push ({
        displayValue: 'Walmart',
        value: MaplesPartner.WALMART
      } );
    }
  }
}
