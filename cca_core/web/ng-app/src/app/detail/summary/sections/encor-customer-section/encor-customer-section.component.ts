import {Component, HostBinding, Input} from '@angular/core';
import {MaplesCustomer} from '@cscore/maples-client-model';
import {Selection} from '../../../../core/session/model/selection';

@Component({
  selector: 'cca-encor-customer-section',
  templateUrl: './encor-customer-section.component.html'
})
export class EncorCustomerSectionComponent {

  @HostBinding('class') classes: string = 'summary-section-container';

  @Input()
  selection: Selection<MaplesCustomer>;

}
