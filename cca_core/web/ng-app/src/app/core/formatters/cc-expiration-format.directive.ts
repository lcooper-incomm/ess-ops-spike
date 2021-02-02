import {Directive, HostListener, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Directive({
  selector: '[ccaCcExpirationFormat]'
})
export class CcExpirationFormatDirective {

  @Input()
  ccaCcExpirationFormat: FormControl;

  constructor() {
  }

  @HostListener('input') format(): void {
    if (this.ccaCcExpirationFormat) {
      let value: string = this.ccaCcExpirationFormat.value;
      if (value) {
        if (value.length === 2) {
          value = value + '/'
        }
        value = value.replace(/([^0-9\/])/g, '');
      }
      this.ccaCcExpirationFormat.setValue(value);
    }
  }
}



