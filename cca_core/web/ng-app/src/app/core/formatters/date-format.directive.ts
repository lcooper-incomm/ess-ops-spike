import { Directive, HostListener, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

@Directive ( {
  selector: '[ccaDateFormat]'
} )
export class DateFormatDirective {

  @Input ()
  ccaDateFormat: FormControl;

  constructor () {
  }

  @HostListener ( 'input' ) enforceDateFormat (): void {
    if ( this.ccaDateFormat ) {
      let value: string = this.ccaDateFormat.value;
      if ( value ) {
        //Remove all non-date digits
        value = value.replace ( /([^0-9/])/g, '' );

        //Must be prepended with 0, or otherwise be a two-digit month value
        if ( (value.length === 1 && value !== '0' && value !== '1') || value === '1/' ) {
          value = '0' + value;
        }
        //If we get to our third character, and it's not a /, insert one
        if ( value.length === 3 && !value.endsWith ( '/' ) ) {
          value = value.substring ( 0, 2 ) + '/' + value.substring ( 2, 3 );
        }
        //If we get to our sixth character, and it's not a /, insert one
        if ( value.length === 6 && !value.endsWith ( '/' ) ) {
          value = value.substring ( 0, 5 ) + '/' + value.substring ( 5, 6 );
        }
        //Cannot exceed 10 digits
        if ( value.length > 10 ) {
          value = value.substring ( 0, 10 );
        }
      }
      this.ccaDateFormat.setValue ( value );
    }
  }
}
