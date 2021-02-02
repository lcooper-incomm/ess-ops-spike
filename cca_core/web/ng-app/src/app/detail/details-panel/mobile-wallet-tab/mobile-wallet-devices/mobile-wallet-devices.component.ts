import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TokenDetail } from 'src/app/core/card/token-detail';
import { TokenDeviceTypes } from 'src/app/core/card/token-device';

@Component ( {
  selector: 'cca-mobile-wallet-devices',
  templateUrl: './mobile-wallet-devices.component.html',
  styleUrls: [ './mobile-wallet-devices.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class MobileWalletDevicesComponent {
  @Input () tokens: TokenDetail[];
  readonly TokenDeviceTypes = TokenDeviceTypes;

  formatExpirationDate ( value: string ): string {
    return value.substr ( 2, 2 ) + '/' + value.substr ( 0, 2 );
  }
}
