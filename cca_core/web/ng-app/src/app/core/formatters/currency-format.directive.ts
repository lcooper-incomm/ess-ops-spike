import { Directive, HostListener, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

@Directive ( {
  selector: '[ccaCurrencyFormat]'
} )
export class CurrencyFormatDirective {

  @Input ()
  ccaCurrencyFormat: FormControl;

  constructor () {
  }

  @HostListener ( 'input' ) format (): void {
    if ( this.ccaCurrencyFormat ) {
      let value: string = this.ccaCurrencyFormat.value;
      if ( value ) {
        value = value.replace ( /([^0-9.])/g, '' );
        //Can only have a single decimal point
        if ( value.lastIndexOf ( '.' ) !== value.indexOf ( '.' ) ) {
          value = value.substring ( 0, value.length - 1 );
        }
        //Ensure only two values after the decimal
        if ( value.indexOf ( '.' ) !== -1 && value.length > value.indexOf ( '.' ) + 2 ) {
          value = new Number ( value ).toFixed ( 2 );
        }
        this.ccaCurrencyFormat.setValue ( value );
      }
    }
  }
}
