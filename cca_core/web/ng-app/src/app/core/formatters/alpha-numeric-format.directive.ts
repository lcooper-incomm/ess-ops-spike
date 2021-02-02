import { Directive, HostListener, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

@Directive ( {
  selector: '[ccaAlphaNumericFormat]'
} )
export class AlphaNumericFormatDirective {

  @Input ()
  ccaAlphaNumericFormat: FormControl;

  constructor () {
  }

  @HostListener ( 'input' ) enforceNumericValue (): void {
    if ( this.ccaAlphaNumericFormat ) {
      let value: string = this.ccaAlphaNumericFormat.value;
      if ( value ) {
        value = value.replace ( /([^0-9a-zA-Z])/g, '' );
      }
      this.ccaAlphaNumericFormat.setValue ( value );
    }
  }
}
