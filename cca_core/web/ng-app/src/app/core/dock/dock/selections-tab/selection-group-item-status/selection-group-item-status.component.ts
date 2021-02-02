import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Selection, SelectionDataType } from 'src/app/core/session/model/selection';

@Component ( {
  selector: 'cca-selection-group-item-status',
  templateUrl: './selection-group-item-status.component.html',
  styleUrls: [ './selection-group-item-status.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class SelectionGroupItemStatusComponent {
  @Input () selection: Selection<SelectionDataType>;
}
