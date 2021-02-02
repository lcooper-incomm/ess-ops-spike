import { SelectionType } from "../../../session/model/selection-type.enum";
import { SelectionGroupItem } from "./selection-group-item";
import * as _ from "lodash";

export class SelectionGroup {

  displayValue: string;
  isCollapsed: boolean = false;
  isSelected: boolean  = false;
  type: SelectionType;

  selections: SelectionGroupItem[] = [];

  getItemBySelectionId ( selectionId: number ): SelectionGroupItem {
    let index = _.findIndex ( this.selections, function ( selectionGroupItem: SelectionGroupItem ) {
      return selectionGroupItem.selection.id === selectionId;
    } );
    return index >= 0 ? this.selections[ index ] : null;
  }

  getSelectedItems (): SelectionGroupItem[] {
    return _.filter ( this.selections, function ( selection: SelectionGroupItem ) {
      return selection.isSelected;
    } );
  }
}
