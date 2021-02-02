import {Component, ElementRef, Input, QueryList, ViewChildren} from '@angular/core';
import {Comment} from "../../model/comment";

@Component({
  selector: 'cca-dynamic-expansion-panel',
  templateUrl: './dynamic-expansion-panel.component.html',
  styleUrls: ['./dynamic-expansion-panel.component.scss']
})
export class DynamicExpansionPanelComponent {
  @Input()
  comments: Comment[];

  @Input()
  collapsedHeight: string = "100%";

  @Input()
  expandedHeight: string = "100%";

  @Input()
  isSelected: number;

  @ViewChildren('divs') divs: QueryList<ElementRef>;

  selectedComment: any;

  constructor() {
  }

  getComment(id) {
    this.divs.forEach((div: ElementRef) => {
      if (div.nativeElement.id === 'item-' + id) {
        this.selectedComment = div.nativeElement
      }
    });
    setTimeout(() => this.selectedComment.scrollIntoView(), 100);
  }

  // Workaround for angular mat-expansion panel bug that sows a flash of all panels open and then snaps them shut.
  disableAnimation = true;

  ngAfterViewInit(): void {
    // timeout required to avoid the'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(() => this.disableAnimation = false);
  }

  openGroup(id) {
    setTimeout(() => this.getComment(id));
  }
}
