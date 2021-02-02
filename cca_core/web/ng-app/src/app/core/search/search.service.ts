import {Injectable} from '@angular/core';
import {SearchTypeContainer} from "./search-type-container";
import {Observable, of} from "rxjs";
import {Logger} from "../../logging/logger.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../app-state";
import {SelectSearchTypeAction} from "./action/select-search-type-action";
import {SearchTypeType} from "./search-type/search-type-type.enum";
import {ClearSearchResultsAction} from "./action/clear-search-results-action";
import {SessionSearchService} from "./session-search.service";
import {SelectionType} from "../session/model/selection-type.enum";
import {CardSearchService} from "./card-search.service";
import {LocationSearchService} from "./location-search.service";
import {AccountSearchService} from "./account-search.service";
import {CustomerSearchService} from "./customer-search.service";
import {IssueSearchService} from "./issue-search.service";
import {SearchingAction} from './action/set-searching-action';
import {finalize} from 'rxjs/operators';
import {OrderService} from "../order/order.service";
import {SearchParameterValueType} from "./search-type/search-parameter-value-type.enum";
import {CustomerAccountSearchService} from './customer-account-search.service';
import {SelectionDataType} from '../session/model/selection';
import {Session} from '../session/model/session';
import {AlderSearchType} from "../order/alder-search-type.enum";
import {MaplesCustomerSearchService} from './maples-customer-search.service';
import {SearchType} from "./search-type/search-type";

export type SearchResultType = SelectionDataType | Session;

@Injectable ( {
  providedIn: 'root'
} )
export class SearchService {

  constructor ( private accountSearchService: AccountSearchService,
                private cardSearchService: CardSearchService,
                private customerAccountService: CustomerAccountSearchService,
                private customerSearchService: CustomerSearchService,
                private issueSearchService: IssueSearchService,
                private locationSearchService: LocationSearchService,
                private logger: Logger,
                private maplesCustomerSearchService: MaplesCustomerSearchService,
                private orderService: OrderService,
                private sessionSearchService: SessionSearchService,
                private store: Store<AppState> ) {
  }

  search ( searchTypeContainer: SearchTypeContainer ): Observable<SearchResultType[]> {
    // TODO: Optimize
    this.updateSelectedSearchType ( searchTypeContainer.searchType.type );
    this.clearSearchResults ();
    this.updateSearching ( true );

    return this.delegateSearch ( searchTypeContainer ).pipe (
      finalize ( () => {
        this.updateSearching ( false );
      } )
    );

  }

  private clearSearchResults (): void {
    this.store.dispatch ( new ClearSearchResultsAction () );
  }

  private delegateSearch ( searchTypeContainer: SearchTypeContainer ): Observable<SearchResultType[]> {
    let observable: Observable<SearchResultType[]>;

    // Session search and KYC search don't yield Selection results, so we can't key off of the selectionType
    if ( searchTypeContainer.searchType.type === SearchTypeType.SESSION ) {
      observable = this.sessionSearchService.search ( searchTypeContainer );
    } else if ( searchTypeContainer.searchType.type === SearchTypeType.KYC_FAILURE ) {
      searchTypeContainer.parameters.set ( SearchParameterValueType.SEARCH_TYPE, 'kyc' );
      observable = this.customerSearchService.search ( searchTypeContainer );
    }
    // But we can key off of selectionType for all the other search types
    else switch (searchTypeContainer.searchType.selectionType) {
        case SelectionType.ACCOUNT:
          observable = this.accountSearchService.search(searchTypeContainer);
          break;
        case SelectionType.CUSTOMER:
          observable = this.customerSearchService.searchAsCards(searchTypeContainer);
          break;
        case SelectionType.CUSTOMER_ACCOUNT:
          observable = this.customerAccountService.search(searchTypeContainer);
          break;
        case SelectionType.JIRA:
          observable = this.issueSearchService.search(searchTypeContainer);
          break;
        case SelectionType.LOCATION:
          this.trimSearchParameters(searchTypeContainer.parameters);
          observable = this.locationSearchService.search(searchTypeContainer);
          break;
        case SelectionType.MAPLES_CUSTOMER:
          observable = this.maplesCustomerSearchService.search(searchTypeContainer);
          break;
        case SelectionType.ORDER:
          if (searchTypeContainer.parameters.get(SearchParameterValueType.ALDER_SEARCH_TYPE) == AlderSearchType.CARD) {
            // TODO add service for ALDER CARD
          } else {
            observable = this.orderService.search(searchTypeContainer, searchTypeContainer.parameters.get(SearchParameterValueType.BOL_PARTNER));
          }

          break;
        case SelectionType.CARD:
          observable = this.cardSearchService.search(searchTypeContainer);
          break;
        default:
          this.logger.error('Unsupported SearchType', searchTypeContainer.searchType.type);
          observable = of(null);
          break;
      }

    return observable;
  }

  private updateSelectedSearchType ( searchType: SearchTypeType ): void {
    this.store.dispatch ( new SelectSearchTypeAction ( searchType ) );
  }

  private updateSearching ( searching: boolean ): void {
    this.store.dispatch ( new SearchingAction ( searching ) );
  }

  private trimSearchParameters(searchParameters: Map<string, any>) : void {
    searchParameters.forEach((key: string, value: any) => {
      if (value) {
        searchParameters.set(key, value.trimRight().trimLeft());
      }
    });
  }

}
