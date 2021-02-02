import { Directive, HostListener, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

@Directive ( {
  selector: '[ccaNumericFormat]'
} )
export class NumericFormatDirective {

  @Input ()
  ccaNumericFormat: FormControl;

  constructor () {
  }

  @HostListener ( 'input' ) enforceNumericValue (): void {
    if ( this.ccaNumericFormat ) {
      let value: string = this.ccaNumericFormat.value;
      if ( value ) {
        value = value.replace ( /([^0-9])/g, '' );
      }
      this.ccaNumericFormat.setValue ( value );
    }
  }
}
