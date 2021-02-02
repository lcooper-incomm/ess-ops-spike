import { SearchType } from "./search-type/search-type";
import { SearchTypeType } from "./search-type/search-type-type.enum";
import * as _ from "lodash";

export class SearchTypeContainer {

  isSearchComplete: boolean    = false;
  parameters: Map<string, any> = new Map<string, any> ();
  results: any[]               = [];
  searchType: SearchType;

  private static readonly searchTypesRequiringSearchPageInteraction: SearchTypeType[] = [
    SearchTypeType.ALDER,
    SearchTypeType.ECOMM_ORDER,
    SearchTypeType.ENCOR,
    SearchTypeType.LOTTERY,
    SearchTypeType.SERVE,
    SearchTypeType.SESSION,
    SearchTypeType.VMS_GIFT,
    SearchTypeType.VMS_GPR
  ];

  constructor ( searchType: SearchType ) {
    this.searchType = searchType;
  }

  clear (): void {
    this.parameters = new Map<string, any> ();
    this.results    = [];
  }

  requiresSearchPageInteraction (): boolean {
    return _.includes ( SearchTypeContainer.searchTypesRequiringSearchPageInteraction, this.searchType.type );
  }

  updateFromForm ( data: any ): void {
    if ( data ) {
      this.parameters.clear ();
      this.results          = [];
      this.isSearchComplete = false;
      for ( let property in data ) {
        if ( data.hasOwnProperty ( property ) ) {
          this.parameters.set ( property, data[ property ] );
        }
      }
    }
  }
}
