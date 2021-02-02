import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {CcaBaseComponent} from "../../cca-base-component";
import {debounceTime} from "rxjs/operators";
import {PostalCodeLookupResult, PostalCodeService} from "./postal-code.service";
import {StateProvinceService} from "../state-province-field/state-province.service";

@Component ( {
  selector: 'cca-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: [ './address-form.component.scss' ]
} )
export class AddressFormComponent extends CcaBaseComponent implements OnInit {

  @Input ()
  form: FormGroup;

  constructor(private postalCodeService: PostalCodeService,
              private stateProvinceService: StateProvinceService,
              private changeDetectorRef: ChangeDetectorRef) {
    super ();
  }

  ngOnInit () {
    this.watchPostalCode ();
    this.watchState ();
  }

  onStateSelection (): void {

  }

  /**
   * Allow dynamic setting of required validators to line1, city, state and zip.
   *
   * @param required
   */
  setRequired(required: boolean): void {
    let validators: ValidatorFn[] = (required) ? [Validators.required] : [];

    this.form.get('line1').setValidators(validators);
    this.form.get('city').setValidators(validators);
    this.form.get('state').setValidators(validators);
    this.form.get('postalCode').setValidators(validators);

    this.changeDetectorRef.detectChanges();
  }

  /**
   * Allow dynamic setting of fields to enable/disable.
   *
   * @param disabled
   */
  setDisabled(disabled: boolean): void {
    if (disabled) {
      this.form.get('line1').disable();
      this.form.get('line2').disable();
      this.form.get('city').disable();
      this.form.get('state').disable();
      this.form.get('postalCode').disable();
    } else {
      this.form.get('line1').enable();
      this.form.get('line2').enable();
      this.form.get('city').enable();
      this.form.get('state').enable();
      this.form.get('postalCode').enable();
    }

    this.changeDetectorRef.detectChanges();
  }

  private doPostalCodeLookup (): void {
    let postalCode = this.form.get ( 'postalCode' ).value;
    if ( postalCode ) {
      this.postalCodeService.lookup ( this.form.get ( 'postalCode' ).value )
        .subscribe ( {
          next: ( value: PostalCodeLookupResult ) => {
            if ( value && value.city ) {
              if ( !this.form.get ( 'city' ).value ) {
                this.form.get ( 'city' ).setValue ( value.city );
              }
              if ( !this.form.get ( 'state' ).value ) {
                this.form.get ( 'state' ).setValue ( value.state );
              }
              if ( value.country ) {
                this.form.get ( 'country' ).setValue ( value.country );
              }
            }
          }
        } );
    }
  }

  private watchPostalCode () {
    this.addSubscription (
      this.form.get ( 'postalCode' ).valueChanges
        .pipe ( debounceTime ( 500 ) )
        .subscribe ( {
          next: () => this.doPostalCodeLookup ()
        } )
    );
  }

  private watchState () {
    this.addSubscription (
      this.form.get ( 'state' ).valueChanges
        .subscribe ( {
          next: value => {
            if ( value ) {
              const countryGroup = this.stateProvinceService.getCountryGroupForState ( value );
              this.form.get ( 'country' ).setValue ( countryGroup.value );
            }
          }
        } )
    );
  }

}
