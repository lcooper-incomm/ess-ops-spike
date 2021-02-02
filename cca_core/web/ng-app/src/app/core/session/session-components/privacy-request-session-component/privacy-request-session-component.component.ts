import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {PrivacyRequestComponent} from '../../model/privacy-request-component';

@Component({
  selector: 'cca-privacy-request-session-component',
  templateUrl: './privacy-request-session-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivacyRequestSessionComponentComponent {
  @Input() component: PrivacyRequestComponent;
}
