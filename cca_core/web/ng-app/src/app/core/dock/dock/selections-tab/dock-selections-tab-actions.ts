import { Action } from "@ngrx/store";
import { DockSelectionsTabActionType } from "./dock-selections-tab-action-type.enum";
import { PayloadAction } from "../../../payload-action";
import { SelectionGroup } from "./selection-group";
import { SelectionGroupItem } from "./selection-group-item";
import { Selection } from "../../../session/model/selection";
import { MaplesAccount } from "@cscore/maples-client-model";
import { Customer } from "src/app/core/customer/customer";

export class ClearDockSelectionsTabAction implements Action {
  type = DockSelectionsTabActionType.CLEAR_STATE;
}

export class SetDockSelectionsTabFilterAction implements PayloadAction {
  payload: string;
  type = DockSelectionsTabActionType.SET_FILTER;

  constructor ( payload: string ) {
    this.payload = payload;
  }
}

export class SetDockSelectionsTabGroupsAction implements PayloadAction {
  payload: SelectionGroup[];
  type = DockSelectionsTabActionType.SET_GROUPS;

  constructor ( payload: SelectionGroup[] ) {
    this.payload = payload;
  }
}

export class SetDockSelectionsTabGroupIsCollapsedAction implements PayloadAction {
  payload: SelectionGroup;
  type = DockSelectionsTabActionType.SET_GROUP_COLLAPSED;

  constructor ( payload: SelectionGroup ) {
    this.payload = payload;
  }
}

export class SetDockSelectionsTabGroupIsSelectedAction implements PayloadAction {
  payload: SelectionGroup;
  type = DockSelectionsTabActionType.SET_GROUP_SELECTED;

  constructor ( payload: SelectionGroup ) {
    this.payload = payload;
  }
}

export class SetDockSelectionsTabSelectionIsCollapsedAction implements PayloadAction {
  payload: SelectionGroupItem;
  type = DockSelectionsTabActionType.SET_SELECTION_COLLAPSED;

  constructor ( payload: SelectionGroupItem ) {
    this.payload = payload;
  }
}

export class SetDockSelectionsTabSelectionIsSelectedAction implements PayloadAction {
  payload: SelectionGroupItem;
  type = DockSelectionsTabActionType.SET_SELECTION_SELECTED;

  constructor ( payload: SelectionGroupItem ) {
    this.payload = payload;
  }
}

export class SetDockSelectionsTabSelectionSelectedCardAction implements PayloadAction {
  payload: Selection<Customer>;
  type = DockSelectionsTabActionType.SET_SELECTION_SELECTED_CARD;

  constructor ( payload: Selection<Customer> ) {
    this.payload = payload;
  }
}

export class SetDockSelectionsTabSelectionSelectedCustomerAccountCardAction implements PayloadAction {
  payload: Selection<MaplesAccount>;
  type = DockSelectionsTabActionType.SET_SELECTION_SELECTED_CUSTOMER_ACCOUNT_CARD;

  constructor ( payload: Selection<MaplesAccount> ) {
    this.payload = payload;
  }
}

export class SetDockSelectionsTabIsBulkModeEnabledAction implements PayloadAction {
  payload: boolean;
  type = DockSelectionsTabActionType.SET_IS_BULK_MODE_ENABLED;

  constructor ( payload: boolean ) {
    this.payload = payload;
  }
}

export class SetDockSelectionsTabSelectionPaginationPageAction implements PayloadAction {
  payload: SelectionGroupItem;
  type = DockSelectionsTabActionType.SET_SELECTION_PAGINATION_PAGE;

  constructor ( payload: SelectionGroupItem ) {
    this.payload = payload;
  }
}


