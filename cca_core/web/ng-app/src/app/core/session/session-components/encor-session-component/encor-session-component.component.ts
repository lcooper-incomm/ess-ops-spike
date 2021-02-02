import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {EncorComponent} from '../../model/encor-component';

@Component({
  selector: 'cca-encor-session-component',
  templateUrl: './encor-session-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EncorSessionComponentComponent {
  @Input() component: EncorComponent;
}
