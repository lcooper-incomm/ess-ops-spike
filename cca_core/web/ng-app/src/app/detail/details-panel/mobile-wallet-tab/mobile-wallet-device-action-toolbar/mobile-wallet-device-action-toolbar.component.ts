import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MobileWalletDeviceActionService } from 'src/app/detail/selection-action-toolbar/mobile-wallet-device-action.service';
import { ActionToolbarButtonStatus } from 'src/app/core/action-toolbar/action-toolbar-button-status';
import { TokenDetail } from 'src/app/core/card/token-detail';

@Component ( {
  selector: 'cca-mobile-wallet-device-action-toolbar',
  templateUrl: './mobile-wallet-device-action-toolbar.component.html',
  styleUrls: [ './mobile-wallet-device-action-toolbar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class MobileWalletDeviceActionToolbarComponent {
  actions: ActionToolbarButtonStatus[] = [];

  @Input ()
  set token ( token: TokenDetail ) {
    this.actions = this.actionService.doAllChecksForToken ( token );
  }

  constructor ( private actionService: MobileWalletDeviceActionService ) {
  }
}
