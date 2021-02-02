import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MaplesCard, MaplesOrderItemCard } from '@cscore/maples-client-model';
import { Card } from 'src/app/core/card/card';
import { SpinnerSize } from 'src/app/core/spinner/spinner-size.enum';
import { CsCoreStatus } from 'src/app/core/model/cs-core-status';

@Component ( {
  selector: 'cca-selection-child-card',
  templateUrl: './selection-child-card.component.html',
  styleUrls: [ './selection-child-card.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class SelectionChildCardComponent {
  @Input () card: Card | MaplesCard | MaplesOrderItemCard;
  @Input () isActive: boolean    = false;
  @Input () isSearching: boolean = false;

  readonly SpinnerSize = SpinnerSize;

  get cardIdentifier (): string {
    const identifier = this.card instanceof MaplesOrderItemCard ? this.card.serialNumber : this.card.identifiers.pan;
    return `**${identifier ? identifier.slice ( -4 ) : ''}`;
  }

  get identifierTooltipText (): string {
    return this.card instanceof MaplesOrderItemCard ? this.card.serialNumber : null;
  }

  get isServeCard (): boolean {
    return this.card instanceof MaplesCard;
  }

  get isFsapiCard (): boolean {
    return this.card instanceof Card || this.card instanceof MaplesOrderItemCard;
  }

  getStatus (): CsCoreStatus | string | null {
    if ( this.card instanceof Card ) {
      return this.card.getStatusByPlatform ( this.card.platform );
    } else if ( this.card instanceof MaplesOrderItemCard ) {
      return this.card.status;
    } else {
      return null;
    }
  }
}
