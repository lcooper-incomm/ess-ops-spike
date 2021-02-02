import { Directive, HostListener, Input } from '@angular/core';

@Directive ( {
  selector: '[ccaClickSwallower]'
} )
export class ClickSwallowerDirective {

  @Input ()
  preventDefault: boolean = true;

  @HostListener ( 'click', [ '$event' ] )
  onClick ( event: any ): void {
    event.stopPropagation ();
    if ( this.preventDefault ) {
      event.preventDefault ();
    }
  }
}

