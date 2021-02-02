import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl, FormGroup } from "@angular/forms";

@Directive ( {
  selector: '[ccaFormFieldToucher]'
} )
export class FormFieldToucherDirective {

  @Input ()
  ccaFormFieldToucher: FormGroup;

  constructor () {

  }

  @HostListener ( 'mouseenter' ) onHover () {
    if ( this.ccaFormFieldToucher ) {
      this.touchFormControls ( this.ccaFormFieldToucher );
    }
  }

  private touchFormControls ( formGroup: FormGroup ) {
    Object.keys ( formGroup.controls ).forEach ( key => {
      let control: AbstractControl = formGroup.get ( key );
      control.markAsTouched ();
      control.markAsDirty ();

      if ( control instanceof FormGroup ) {
        this.touchFormControls ( control );
      }
    } );
  }
}
