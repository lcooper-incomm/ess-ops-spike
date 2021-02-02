import { SearchType } from "./search-type/search-type";
import { SearchTypeContainer } from "./search-type-container";

export class SearchState {

  searchTypes: SearchType[];
  searchTypeContainers: SearchTypeContainer[];
  selectedSearchType: SearchTypeContainer;
  textFilter: string;
  searching: boolean;
}
