import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ApsLocation } from '../../aps/aps-models';

@Component ( {
  selector: 'cca-deactivation-locations',
  templateUrl: './deactivation-locations.component.html',
  styleUrls: [ './deactivation-locations.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class DeactivationLocationsComponent {
  @Input () location: ApsLocation;
  @Input () shortPayLocation: ApsLocation;
  @Input () overrideShortPay: boolean = false;

  get useShortPay (): boolean {
    return this.shortPayLocation && !this.overrideShortPay;
  }
}
