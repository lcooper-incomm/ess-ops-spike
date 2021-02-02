import { DockSelectionsTabState } from "./dock-selections-tab-state";
import { DockSelectionsTabActionType } from "./dock-selections-tab-action-type.enum";
import { PayloadAction } from "../../../payload-action";
import { SessionActionType } from "../../../session/action/session-action-type.enum";
import * as _ from "lodash";
import { SelectionGroup } from "./selection-group";
import { Selection } from "../../../session/model/selection";
import { SelectionGroupItem } from "./selection-group-item";
import { getSelectionTypeDisplayValue, SelectionType } from "../../../session/model/selection-type.enum";
import { OrderActionType } from "../../../order/action/order-action-type.enum";

export const DEFAULT_DOCK_SELECTIONS_TAB_STATE: DockSelectionsTabState = {
  filter: null,
  groups: [],
  isBulkModeEnabled: false
};

export function dockSelectionsTabReducer ( state: DockSelectionsTabState = DEFAULT_DOCK_SELECTIONS_TAB_STATE, action: PayloadAction ): DockSelectionsTabState {
  let newState: DockSelectionsTabState;

  let selection: Selection<any>;
  let selectionGroup: SelectionGroup;
  let selectionGroupItem: SelectionGroupItem;

  switch ( action.type ) {
    case SessionActionType.ADD_SELECTION:
      newState = {
        ...state
      };

      selection      = action.payload;

      //First, try to find an existing group to add the new selection to
      selectionGroup = findSelectionGroupByType ( newState, selection.type );
      if ( selectionGroup ) {
        //Make sure the selection doesn't already exist in the group before adding it
        const existingSelection = selectionGroup.selections.find ( item => item.selection.id === action.payload.id );
        if ( !existingSelection ) {
          selectionGroup.selections.push ( new SelectionGroupItem ( selection ) );
        }
      }
      //Else, create the group
      else {
        selectionGroup              = new SelectionGroup ();
        selectionGroup.displayValue = getSelectionTypeDisplayValue ( selection.type );
        selectionGroup.type         = selection.type;
        selectionGroup.selections.push ( new SelectionGroupItem ( selection ) );
        newState.groups.push ( selectionGroup );
      }

      break;
    case DockSelectionsTabActionType.CLEAR_STATE:
      newState = DEFAULT_DOCK_SELECTIONS_TAB_STATE;
      break;
    case OrderActionType.LOAD_ORDER_ITEMS_FOR_SELECTION:
      newState = {
        ...state
      };

      selection          = action.payload;
      selectionGroup     = findSelectionGroupByType ( newState, selection.type );
      if ( selectionGroup ) {
        selectionGroupItem = selectionGroup.getItemBySelectionId ( selection.id );
        if ( selectionGroupItem
          && selectionGroupItem.selection
          && selectionGroupItem.selection.data ) {
          selectionGroupItem.selection.orderItems = selection.orderItems;
        } else {
          console.error ( 'Failed to find matching Selection in the Dock Selections Tab to update its description!', action.payload );
        }
      } else {
        console.error ( 'Failed to find matching selection group to update its order items' );
      }

      break;
    case SessionActionType.REMOVE_SELECTION:
      newState = {
        ...state
      };

      selection      = action.payload;
      selectionGroup = findSelectionGroupByType ( newState, selection.type );
      if ( selectionGroup ) {
        //Find and remove the selection from its group
        let index = _.findIndex ( selectionGroup.selections, ( item: SelectionGroupItem ) => {
          return item.selection.id === selection.id;
        } );
        selectionGroup.selections.splice ( index, 1 );

        //If that group is now empty, remove that group
        if ( !selectionGroup.selections.length ) {
          let groupIndex = _.findIndex ( newState.groups, ( group: SelectionGroup ) => {
            return group.type === selectionGroup.type;
          } );
          newState.groups.splice ( groupIndex, 1 );
        }
      } else {
        console.error ( 'Failed to find matching selection group to update its order items' );
      }
      break;
    case DockSelectionsTabActionType.SET_FILTER:
      newState = {
        ...state,
        filter: action.payload
      };

      //Reset all items' pagination
      newState.groups.forEach ( ( group: SelectionGroup ) => {
        group.selections.forEach ( ( selection: SelectionGroupItem ) => {
          selection.paginationPage = 0;
        } );
      } );
      break;
    case DockSelectionsTabActionType.SET_GROUP_COLLAPSED:
      newState = {
        ...state
      };

      selectionGroup             = findSelectionGroupByType ( newState, action.payload.type );
      selectionGroup.isCollapsed = action.payload.isCollapsed;
      break;
    case DockSelectionsTabActionType.SET_GROUP_SELECTED:
      newState = {
        ...state
      };

      selectionGroup            = findSelectionGroupByType ( newState, action.payload.type );
      selectionGroup.isSelected = action.payload.isSelected;

      selectionGroup.selections.forEach ( ( selection: SelectionGroupItem ) => {
        selection.isSelected = selectionGroup.isSelected;
      } );
      break;
    case DockSelectionsTabActionType.SET_GROUPS:
      newState = {
        ...state,
        groups: action.payload
      };
      break;
    case DockSelectionsTabActionType.SET_IS_BULK_MODE_ENABLED:
      newState = {
        ...state,
        isBulkModeEnabled: action.payload
      };

      //If we just enabled bulk mode, we need to collapse all selections
      if ( action.payload ) {
        newState.groups.forEach ( ( group: SelectionGroup ) => {
          group.selections.forEach ( ( item: SelectionGroupItem ) => {
            item.isCollapsed = true;
          } )
        } );
      }
      break;
    case SessionActionType.SET_SELECTION_DATA:
      newState = {
        ...state
      };

      selection          = action.payload;
      selectionGroup     = findSelectionGroupByType ( newState, selection.type );
      if ( selectionGroup ) {
        selectionGroupItem = selectionGroup.getItemBySelectionId ( selection.id );
        if ( selectionGroupItem ) {
          selectionGroupItem.selection.data = selection.data;
        } else {
          console.error ( 'Failed to find matching Selection in the Dock Selections Tab to update its description!', action.payload );
        }
      }
      break;
    case SessionActionType.SET_SELECTION_DESCRIPTION:
      newState = {
        ...state
      };

      selection          = action.payload;
      selectionGroup     = findSelectionGroupByType ( newState, selection.type );
      selectionGroupItem = selectionGroup.getItemBySelectionId ( selection.id );
      if ( selectionGroupItem ) {
        selectionGroupItem.selection.description = selection.description;
      } else {
        console.error ( 'Failed to find matching Selection in the Dock Selections Tab to update its data!', action.payload );
      }
      break;
    case DockSelectionsTabActionType.SET_SELECTION_COLLAPSED:
      newState = {
        ...state
      };

      selectionGroup                 = findSelectionGroupByType ( newState, action.payload.selection.type );
      selectionGroupItem             = selectionGroup.getItemBySelectionId ( action.payload.id );
      selectionGroupItem.isCollapsed = action.payload.isCollapsed;
      break;
    case SessionActionType.SET_SELECTION_HIERARCHY:
      newState = {
        ...state
      };

      selectionGroup                         = findSelectionGroupByType ( newState, SelectionType.LOCATION );
      selectionGroupItem                     = selectionGroup.getItemBySelectionId ( action.payload.id );
      selectionGroupItem.selection.hierarchy = action.payload.hierarchy;
      break;
    case DockSelectionsTabActionType.SET_SELECTION_PAGINATION_PAGE:
      newState = {
        ...state
      };

      selectionGroup                    = findSelectionGroupByType ( newState, action.payload.selection.type );
      selectionGroupItem                = selectionGroup.getItemBySelectionId ( action.payload.id );
      selectionGroupItem.paginationPage = action.payload.paginationPage;
      break;
    case DockSelectionsTabActionType.SET_SELECTION_SELECTED:
      newState = {
        ...state
      };

      selectionGroup                = findSelectionGroupByType ( newState, action.payload.selection.type );
      selectionGroupItem            = selectionGroup.getItemBySelectionId ( action.payload.id );
      selectionGroupItem.isSelected = action.payload.isSelected;
      break;
    case DockSelectionsTabActionType.SET_SELECTION_SELECTED_CARD:
      newState = {
        ...state
      };

      selectionGroup                            = findSelectionGroupByType ( newState, SelectionType.CUSTOMER );
      selectionGroupItem                        = selectionGroup.getItemBySelectionId ( action.payload.id );
      selectionGroupItem.selection.selectedCard = action.payload.selectedCard;
      break;
    case DockSelectionsTabActionType.SET_SELECTION_SELECTED_CUSTOMER_ACCOUNT_CARD:
      newState = {
        ...state
      };

      selectionGroup                                           = findSelectionGroupByType ( newState, SelectionType.CUSTOMER_ACCOUNT );
      selectionGroupItem                                       = selectionGroup.getItemBySelectionId ( action.payload.id );
      selectionGroupItem.selection.selectedCustomerAccountCard = action.payload.selectedCustomerAccountCard;
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}

function findSelectionGroupByType ( state: DockSelectionsTabState, type: SelectionType ): SelectionGroup {
  return state.groups.find ( group => group.type === type );
}
