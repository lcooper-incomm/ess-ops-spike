import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CsCoreStatus } from '../../model/cs-core-status';
import { PlatformType } from '../../platform/platform-type.enum';

@Component ( {
  selector: 'cca-card-status',
  templateUrl: './card-status.component.html',
  styleUrls: [ './card-status.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class CardStatusComponent {
  @Input () status: CsCoreStatus | string;
  @Input () platform: PlatformType;

  readonly PlatformType = PlatformType;
}
