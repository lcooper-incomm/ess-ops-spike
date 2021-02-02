import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { SessionHistoryItem } from '../models/session-history-item';
import { SessionHistoryItemType } from '../models/session-history-item-type';
import { getSessionStatusTypeDisplayValue } from '../../../../session/model/session-status-type.enum';

@Component ( {
  selector: 'cca-session-history-item',
  templateUrl: './session-history-item.component.html',
  styleUrls: [ './session-history-item.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class SessionHistoryItemComponent {
  @Input () item: SessionHistoryItem;

  readonly SessionHistoryItemType = SessionHistoryItemType;

  getStatusDisplayValue ( status: string ): string {
    return getSessionStatusTypeDisplayValue ( status );
  }
}
