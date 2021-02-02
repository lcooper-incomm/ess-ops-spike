import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Session } from 'src/app/core/session/model/session';
import { Card } from 'src/app/core/card/card';
import { Selection } from 'src/app/core/session/model/selection';
import { Customer } from 'src/app/core/customer/customer';

@Component ( {
  selector: 'cca-selection-to-cards-component',
  templateUrl: './selection-to-cards-component.component.html',
  styleUrls: [ './selection-to-cards-component.component.scss' ]
} )
export class SelectionToCardsComponentComponent {
  @Input () card: Card;
  @Input () form: FormGroup;
  @Input () selection: Selection<Customer | Card>;
  @Input () session: Session;
}
