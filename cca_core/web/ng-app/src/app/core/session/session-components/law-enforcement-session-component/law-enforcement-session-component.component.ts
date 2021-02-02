import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { LawEnforcementComponent } from '../../model/law-enforcement-component';

@Component ( {
  selector: 'cca-law-enforcement-session-component',
  templateUrl: './law-enforcement-session-component.component.html',
  styleUrls: [ './law-enforcement-session-component.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class LawEnforcementSessionComponentComponent {
  @Input () component: LawEnforcementComponent;
}
