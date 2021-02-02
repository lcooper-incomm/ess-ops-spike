import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CsCoreStatusType, CsCoreStatus } from 'src/app/core/model/cs-core-status';
import { PlatformType, isFsapiPlatform } from 'src/app/core/platform/platform-type.enum';
import { CsCoreCurrency } from "@cscore/gringotts";
import { Card } from 'src/app/core/card/card';
import { Selection } from 'src/app/core/session/model/selection';
import { Customer } from 'src/app/core/customer/customer';

@Component ( {
  selector: 'cca-selection-card-information',
  templateUrl: './selection-card-information.component.html',
  styleUrls: [ './selection-card-information.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class SelectionCardInformationComponent {
  @Input () card: Card;
  @Input () selection: Selection<Customer | Card>;

  get balance (): CsCoreCurrency {
    if ( isFsapiPlatform ( this.platform ) ) {
      return this.selection.getCustomer ().accounts.spending.availableBalance;
    } else if ( this.platform === PlatformType.GREENCARD ) {
      return this.card.amounts.availableBalance;
    } else {
      return this.card.amounts.denomination;
    }
  }

  get platform (): PlatformType {
    return this.card.platform;
  }

  get status (): CsCoreStatus {
    return this.card.getStatusByType ( CsCoreStatusType.PLATFORM );
  }
}
