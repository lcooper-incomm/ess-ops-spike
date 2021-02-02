import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SelectionGroupItem } from '../selection-group-item';

@Component ( {
  selector: 'cca-selection-drawer-paginator',
  templateUrl: './selection-drawer-paginator.component.html',
  styleUrls: [ './selection-drawer-paginator.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class SelectionDrawerPaginatorComponent {
  @Input () selectionGroupItem: SelectionGroupItem;
  @Output () page = new EventEmitter<number> ();

  previous (): void {
    if ( !this.selectionGroupItem.isOnFirstPage () ) {
      this.page.emit ( this.selectionGroupItem.paginationPage - 1 );
    }
  }

  next (): void {
    if ( !this.selectionGroupItem.isOnLastPage () ) {
      this.page.emit ( this.selectionGroupItem.paginationPage + 1 );
    }
  }
}
