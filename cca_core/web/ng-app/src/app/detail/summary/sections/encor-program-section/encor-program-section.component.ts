import {Component, HostBinding, Input} from '@angular/core';
import {MaplesCustomer} from '@cscore/maples-client-model';
import {Selection} from '../../../../core/session/model/selection';

@Component({
  selector: 'cca-encor-program-section',
  templateUrl: './encor-program-section.component.html'
})
export class EncorProgramSectionComponent {

  @HostBinding('class') classes: string = 'summary-section-container';

  @Input()
  selection: Selection<MaplesCustomer>;

}
