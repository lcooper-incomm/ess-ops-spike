import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CcaBaseComponent } from 'src/app/core/cca-base-component';

@Component ( {
  selector: 'cca-customer-account-contact-form',
  templateUrl: './customer-account-contact-form.component.html',
  styleUrls: [ './customer-account-contact-form.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class EditCustomerAccountContactFormComponent extends CcaBaseComponent {
  @Input () form: FormGroup;

  ngOnInit (): void {
    this.addSubscription (
      this.form.get ( 'physicalAddress' ).valueChanges.subscribe ( () => {
        const isMailingSameAsPhysical = this.form.get ( 'isMailingSameAsPhysical' ).value;
        if ( isMailingSameAsPhysical ) {
          this.copyPhysicalToMailing ();
        }
      } )
    );
  }

  /**
   * If the user toggles the checkbox, we will either set all Mailing Address fields to match Physical, or null them out
   */
  toggleMailingAddress (): void {
    const isMailingSameAsPhysical   = this.form.get ( 'isMailingSameAsPhysical' ).value;
    if ( isMailingSameAsPhysical ) {
      this.copyPhysicalToMailing ()
    } else {
      this.clearMailingAddress ();
    }
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
