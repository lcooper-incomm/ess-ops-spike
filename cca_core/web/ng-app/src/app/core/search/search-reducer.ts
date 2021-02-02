import { SearchState } from "./search-state";
import { PayloadAction } from "../payload-action";
import { SearchActionType } from "./action/search-action-type.enum";
import { SearchTypeContainer } from "./search-type-container";
import { SearchType } from "./search-type/search-type";

export const DEFAULT_SEARCH_STATE: SearchState = {
  searching: false,
  searchTypes: [],
  searchTypeContainers: [],
  selectedSearchType: null,
  textFilter: null
};

export function searchReducer ( state: SearchState = DEFAULT_SEARCH_STATE, action: PayloadAction ): SearchState {
  let newState: SearchState;
  let index: number;

  switch ( action.type ) {
    case SearchActionType.CLEAR_CURRENT_SEARCH_TYPE:
      newState                                     = {
        ...state
      };
      newState.selectedSearchType.isSearchComplete = false;
      newState.selectedSearchType.parameters       = new Map<string, any> ();
      newState.selectedSearchType.results          = [];
      break;
    case SearchActionType.CLEAR_SEARCH_RESULTS:
      newState                                     = {
        ...state
      };
      newState.selectedSearchType.isSearchComplete = false;
      newState.selectedSearchType.results          = [];
      break;
    case SearchActionType.CLEAR_SEARCH_TYPES:
      newState = {
        ...state,
        searchTypeContainers: [],
        selectedSearchType: null
      };
      newState.searchTypes.forEach ( ( searchType: SearchType ) => {
        newState.searchTypeContainers.push ( new SearchTypeContainer ( searchType ) );
      } );

      // Reselect current search type
      if ( state.selectedSearchType ) {
        index                       = state.searchTypeContainers.findIndex ( container => container.searchType.type === action.payload );
        newState.selectedSearchType = newState.searchTypeContainers[ index ];
      }

      break;
    case SearchActionType.CLEAR_STATE:
      newState = DEFAULT_SEARCH_STATE;
      break;
    case SearchActionType.LOAD_SEARCH_TYPES:
      newState = {
        ...state,
        searchTypes: action.payload
      };

      newState.searchTypeContainers.length = 0;
      action.payload.forEach ( ( searchType: SearchType ) => {
        newState.searchTypeContainers.push ( new SearchTypeContainer ( searchType ) );
      } );
      break;
    case SearchActionType.SEARCHING:
      newState = {
        ...state,
        searching: action.payload
      };
      break;
    case SearchActionType.SELECT_SEARCH_TYPE:
      newState = {
        ...state
      };

      // Ensure we pass the reference, not a copy
      index = state.searchTypeContainers.findIndex ( container => container.searchType.type === action.payload );

      newState.selectedSearchType = newState.searchTypeContainers[ index ];
      break;
    case SearchActionType.SET_SEARCH_PARAMETERS:
      newState                               = {
        ...state
      };
      newState.selectedSearchType.parameters = action.payload;
      break;
    case SearchActionType.SET_SEARCH_RESULTS:
      newState                                     = {
        ...state
      };
      newState.selectedSearchType.isSearchComplete = true;
      newState.selectedSearchType.results          = action.payload;
      break;
    case SearchActionType.SET_TEXT_FILTER:
      newState = {
        ...state,
        textFilter: action.payload
      };
      break;
    case SearchActionType.UPDATE_SEARCH_TYPE:
      newState = {
        ...state
      };

      index = state.searchTypeContainers.findIndex ( container => container.searchType.type === action.payload );

      if ( index !== -1 ) {
        let searchTypeContainer              = newState.searchTypeContainers[ index ];
        searchTypeContainer.isSearchComplete = false;
        searchTypeContainer.parameters       = action.payload.parameters;
        searchTypeContainer.results          = []
      }
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
