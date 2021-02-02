import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { CcaBaseComponent } from "../../../../core/cca-base-component";

@Component ( {
  selector: 'cca-cardholder-information-form',
  templateUrl: './cardholder-information-form.component.html',
  styleUrls: [ './cardholder-information-form.component.scss' ]
} )
export class CardholderInformationFormComponent extends CcaBaseComponent implements OnInit {
  @Input () form: FormGroup;
            isMailingSameAsPhysical: boolean = true;

  constructor () {
    super ()
  }

  ngOnInit () {
    this.subscribeToPhysicalAddressFormChanges ();
  }

  private subscribeToPhysicalAddressFormChanges (): void {
    this.addSubscription (
      this.form.get ( 'physicalAddress' ).valueChanges.subscribe ( {
          next: value => {
            if ( this.isMailingSameAsPhysical ) {
              this.copyPhysicalToMailing ()
            }
          }
        } )
    );
  }

  /**
   * If the user toggles the checkbox, we will either set all Mailing Address fields to match Physical, or null them out
   */
  toggleMailingAddress (): void {
    if ( this.isMailingSameAsPhysical ) {
      this.copyPhysicalToMailing ()
    } else {
      this.clearMailingAddress ();
    }
    this.isMailingSameAsPhysical = !this.isMailingSameAsPhysical
  }

  copyPhysicalToMailing (): void {
    const mailingAddress: FormGroup = (<FormGroup>this.form.get ( 'mailingAddress' ));
    const physicalAddress           = this.form.get ( 'physicalAddress' ).value;
    mailingAddress.get ( 'line1' ).setValue ( physicalAddress.line1 );
    mailingAddress.get ( 'line2' ).setValue ( physicalAddress.line2 );
    mailingAddress.get ( 'city' ).setValue ( physicalAddress.city );
    mailingAddress.get ( 'state' ).setValue ( physicalAddress.state );
    mailingAddress.get ( 'postalCode' ).setValue ( physicalAddress.postalCode );
    mailingAddress.get ( 'country' ).setValue ( physicalAddress.country );
  }

  clearMailingAddress (): void {
    const mailingAddress: FormGroup = (<FormGroup>this.form.get ( 'mailingAddress' ));
    mailingAddress.get ( 'line1' ).setValue ( null );
    mailingAddress.get ( 'line2' ).setValue ( null );
    mailingAddress.get ( 'city' ).setValue ( null );
    mailingAddress.get ( 'state' ).setValue ( null );
    mailingAddress.get ( 'postalCode' ).setValue ( null );
    mailingAddress.get ( 'country' ).setValue ( null );
  }
}
