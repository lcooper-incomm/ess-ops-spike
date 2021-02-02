import { Selection, SelectionDataType } from "../../../session/model/selection";
import * as _ from "lodash";
import { SelectionType } from "../../../session/model/selection-type.enum";

export class SelectionGroupItem {

  id: number;
  isCollapsed: boolean       = true;
  isCollapsible: boolean     = false;
  isSelected: boolean        = false;
  paginationPage: number     = 0;
  paginationPageSize: number = 15;
  selection: Selection<SelectionDataType>;

  constructor ( selection: Selection<SelectionDataType> ) {
    this.id            = selection.id;
    this.selection     = selection;
    this.isCollapsible = _.includes ( [ SelectionType.CUSTOMER, SelectionType.CUSTOMER_ACCOUNT, SelectionType.ORDER ], selection.type );
  }

  getCurrentPageNumber (): number {
    return this.paginationPage + 1;
  }

  getMaxPageNumber (): number {
    return Math.ceil ( this.getTotalChildrenCount () / this.paginationPageSize );
  }

  getTotalChildrenCount (): number {
    if ( this.selection.type === SelectionType.CUSTOMER ) {
      return this.selection.getCustomer ().cards.length;
    } else if ( this.selection.type === SelectionType.CUSTOMER_ACCOUNT ) {
      return this.selection.getCustomerAccount ().cards.length;
    } else if ( this.selection.type === SelectionType.ORDER ) {
      return this.selection.getAllCardsInOrder ().length;
    }
  }

  isOnFirstPage (): boolean {
    return this.paginationPage === 0;
  }

  isOnLastPage (): boolean {
    return this.paginationPage === (this.getMaxPageNumber () - 1);
  }
}
