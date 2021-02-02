import {Injectable} from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {SearchTypeContainer} from "../search/search-type-container";
import {Logger} from "../../logging/logger.service";
import {SearchResultType, SearchService} from '../search/search.service';
import {finalize, flatMap, switchMap} from "rxjs/operators";
import {AppState} from "../../app-state";
import {Store} from '@ngrx/store';
import {SetSearchResultsAction} from "../search/action/set-search-results-action";
import {RoutingService} from "../routing/routing.service";
import {RoutePath} from "../routing/route-path.enum";
import {UrlQueryParam} from "../routing/url-query-param.enum";
import {Issue} from "../issue/issue";
import {SearchTypeType} from "../search/search-type/search-type-type.enum";
import * as _ from "lodash";
import {AddSelectionToSessionWorkflow} from "./add-selection-to-session-workflow.service";
import {SessionState} from "../session/session-state";
import {snapshot} from "../store-utils/store-utils";
import {AppStateType} from "../../app-state-type.enum";
import {CallComponent} from "../session/model/call-component";
import {Session} from "../session/model/session";
import {SessionQueue} from "../session/model/session-queue";
import {SelectionType} from "../session/model/selection-type.enum";
import {SearchState} from "../search/search-state";
import {PlatformType} from "../platform/platform-type.enum";
import {SearchParameterValueType} from "../search/search-type/search-parameter-value-type.enum";
import {Partner} from "../session/selection/partner";
import {SupportState} from "../support/support-state";
import {TransitionService} from "../transition/transition.service";
import {SessionTypeType} from "../session/session-type-type.enum";
import {Card} from "../card/card";
import {MaplesAccount, MaplesCard, MaplesCustomer, MaplesOrder, MaplesStatus} from '@cscore/maples-client-model';
import {SelectionDataType} from '../session/model/selection';
import {tenDigitPhoneNumber} from "../utils/string-utils";
import {SelectSearchTypeAction} from "../search/action/select-search-type-action";
import {SetSearchParametersAction} from "../search/action/set-search-parameters-action";
import {CustomerVerificationService} from 'src/app/search/search-results/abstract-search-results-table/customer-verification/customer-verification.service';
import {VerifiedField} from "../../search/search-results/abstract-search-results-table/authenticate-customer/verified-fields";

@Injectable ( {
  providedIn: 'root'
} )
export class ForwardingSearchWorkflow {

  constructor ( private addSelectionToSessionWorkflow: AddSelectionToSessionWorkflow,
                private customerVerificationService: CustomerVerificationService,
                private logger: Logger,
                private routingService: RoutingService,
                private searchService: SearchService,
                private store: Store<AppState>,
                private transitionService: TransitionService ) {
  }

  run ( searchTypeContainer: SearchTypeContainer, isUserInitiatedSearch: boolean = true ): Observable<any> {
    this.logger.debug('ForwardingSearchWorkflow: run');

    if ( isUserInitiatedSearch ) {
      //TODO: Optimize
      this.store.dispatch ( new SelectSearchTypeAction ( searchTypeContainer.searchType.type ) );
      this.store.dispatch ( new SetSearchParametersAction ( searchTypeContainer.parameters ) );
    }

    return this.searchService.search ( searchTypeContainer )
      .pipe (
        flatMap ( ( results: any[] ) => {
          return this.handleSearchResults ( searchTypeContainer, results, isUserInitiatedSearch );
        } ),
        finalize ( () => {
          this.logger.debug('ForwardingSearchWorkflow: Finalize run');
        } )
      );
  }

  runForCallConnect (): Observable<any> {
    this.logger.debug('ForwardingSearchWorkflow: runForCallConnect');

    let sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
    let session                    = sessionState.session;

    if ( !session ) {
      this.logger.warn ( 'Attempted to run Forwarding Search for Call Connect without a Session available!' );
      return of ( null );
    } else if ( !session.queue ) {
      this.logger.warn ( 'Attempted to run Forwarding Search for Call Connect on a Session without a Queue available!' );
      return of ( null );
    } else if ( !session.callComponent ) {
      this.logger.warn ( 'Attempted to run Forwarding Search for Call Connect on a Session without a Call Component available!' );
      return of ( null );
    } else {
      return this.searchFromCallComponent ( session )
        .pipe ( finalize ( () => {
          this.transitionService.off ();
          this.logger.debug('ForwardingSearchWorkflow: Finalize runForCallConnect');
        } ) );
    }
  }

  private autoSelectSearchResult ( searchTypeContainer: SearchTypeContainer, results: SelectionDataType[] ): Observable<any> {
    this.logger.debug('ForwardingSearchWorkflow: autoSelectSearchResult');

    let result = results[ 0 ];
    this.transitionService.on ();
    return this.addSelectionToSessionWorkflow.runForSearchResult ( searchTypeContainer, result );
  }

  /**
   * In some situations, we need to filter out search results
   */
  private filterSearchResults<T extends SearchResultType> ( searchTypeContainer: SearchTypeContainer, results: T[] ): T[] {
    switch ( searchTypeContainer.searchType.type ) {
      case SearchTypeType.SERVE:
        this.filterAccountCards ( results as MaplesAccount[], searchTypeContainer.parameters );
        return results;
      case SearchTypeType.CCL_GIFT:
      case SearchTypeType.VMS_GPR:
      case SearchTypeType.VMS_GIFT:
        return this.filterCardSearchResults ( results as (Card | MaplesCard)[], searchTypeContainer.parameters ) as T[];
      default:
        return results;
    }
  }

  private filterAccountCards ( accounts: MaplesAccount[], parameters: Map<string, any> ): void {
    accounts.forEach ( account => {
      account.cards = this.filterCardsBySearchParameter ( account.cards, parameters );
    } );
  }

  private filterCardSearchResults<T extends Card | MaplesCard> ( results: T[], parameters: Map<string, any> ): T[] {
    let filteredResults: T[] = [];

    let sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
    /*
    If this is a CALL session, and it doesn't yet have any selections, and at least one result matches the callComponent's
    lastFour, then filter. Else, don't filter.
     */
    if ( sessionState.session
      && sessionState.session.sessionTypeType === SessionTypeType.CALL
      && !sessionState.session.selections.length
      && sessionState.session.callComponent.lastFour ) {
      filteredResults = results.filter ( item => {
        const card: Card = item as Card;
        return card.identifiers.pan && card.identifiers.pan.slice ( -4 ) === sessionState.session.callComponent.lastFour;
      } );
      if ( !filteredResults.length ) {
        filteredResults = results;
      }
    } else {
      /*
      Regardless of session type, if we searched on a card-related field, filter search results down to only those that
      match the given criteria.
       */
      filteredResults = this.filterCardsBySearchParameter ( results, parameters );
    }

    return filteredResults;
  }

  private filterCardsBySearchParameter<T extends Card | MaplesCard> ( cards: T[], parameters: Map<string, any> ): T[] {
    if ( !!parameters.get ( SearchParameterValueType.SERIAL_NUMBER ) ) {
      return cards.filter ( card => card.identifiers.serialNumber === parameters.get ( SearchParameterValueType.SERIAL_NUMBER ) );
    } else if ( !!parameters.get ( SearchParameterValueType.PAN_GPR ) ) {
      return cards.filter ( card => !!card.identifiers.pan && card.identifiers.pan.slice ( -4 ) === parameters.get ( SearchParameterValueType.PAN_GPR ).slice ( -4 ) );
    } else if ( !!parameters.get ( SearchParameterValueType.CARD_ID ) ) {
      return cards.filter ( card => card.identifiers.cardId === parameters.get ( SearchParameterValueType.CARD_ID ) );
    } else {
      return cards;
    }
  }

  private getPartnerByDnis ( dnis: string ): Partner {
    let supportState: SupportState = snapshot ( this.store, AppStateType.SUPPORT_STATE );
    const partner                  = supportState.partners.find ( ( partner: Partner ) => {
      return partner.ivrDnis && partner.ivrDnis.toLowerCase ().includes ( dnis.toLowerCase ().replace ( /[^0-9]/g, '' ) );
    } );
    if ( !partner ) {
      this.logger.warn ( 'No partner found for provided DNIS', dnis );
    }
    return partner;
  }

  private getSearchTypeContainerForSession ( session: Session ): SearchTypeContainer {
    let searchType: SearchTypeType;

    switch ( session.queue.type ) {
      case SelectionType.ACCOUNT:
        searchType = SearchTypeType.VANILLA_DIRECT;
        break;
      case SelectionType.CUSTOMER:
        searchType = SearchTypeType.VMS_GPR;
        break;
      case SelectionType.CUSTOMER_ACCOUNT:
        searchType = SearchTypeType.SERVE;
        break;
      case SelectionType.LOCATION:
        searchType = SearchTypeType.LOCATION;
        break;
      case SelectionType.ORDER:
        searchType = SearchTypeType.ECOMM_ORDER;
        break;
      case SelectionType.CARD:
        switch ( session.callComponent.platform ) {
          case PlatformType.DDP:
            searchType = SearchTypeType.DDP;
            break;
          case PlatformType.GREENCARD:
            searchType = SearchTypeType.FINANCIAL_GIFT;
            break;
          case PlatformType.SRL:
            searchType = SearchTypeType.VRN_SWIPE_RELOAD;
            break;
          default:
            searchType = SearchTypeType.FASTCARD_FASTPIN;
            break;
        }
        break;
      default:
        this.logger.warn ( 'Unable to determine which Search Type to use for this Session', session );
        return null;
    }

    let searchState: SearchState = snapshot ( this.store, AppStateType.SEARCH_STATE );
    return _.find ( searchState.searchTypeContainers, function ( searchTypeContainer: SearchTypeContainer ) {
      return searchTypeContainer.searchType.type === searchType;
    } );
  }

  /**
   * For JIRA search results, once a result is selected, we actually forward to the Services page, where they can
   * continue the full details lookup without affecting their current session. We used to support JIRA as a selection
   * type, but no longer do. They don't want these attached to sessions.
   */
  private handleJiraSearchResult ( result: Issue ): Observable<any> {
    this.logger.info ( 'Routing User to JIRA Services page...' );

    let queryParams                                = {};
    queryParams[ UrlQueryParam.SERVICES_ISSUE_ID ] = result.key;

    return of ( this.routingService.navigateTo ( RoutePath.SERVICES_JIRA_LOOKUP, queryParams ) );
  }

  private handleSearchResults<T extends SearchResultType> ( searchTypeContainer: SearchTypeContainer, results: T[], isUserInitiatedSearch: boolean = true ): Observable<any> {
    this.logger.debug('ForwardingSearchWorkflow: handleSearchResults');

    let filteredResults: T[] = this.filterSearchResults ( searchTypeContainer, results );

    if ( isUserInitiatedSearch ) {
      this.store.dispatch ( new SetSearchResultsAction ( filteredResults ) );
    }

    if ( filteredResults.length === 1 && !searchTypeContainer.requiresSearchPageInteraction () ) {
      if ( searchTypeContainer.searchType.type === SearchTypeType.JIRA ) {
        return this.handleJiraSearchResult ( filteredResults[ 0 ] as Issue );
      } else {
        // Assumption: Session search results require search page interaction, so they won't reach this branch
        return this.autoSelectSearchResult ( searchTypeContainer, filteredResults as SelectionDataType[] );
      }
    } else if ( isUserInitiatedSearch || searchTypeContainer.requiresSearchPageInteraction () ) {
      return this.handleNormalResultsFlow ( searchTypeContainer, filteredResults );
    } else {
      throw new Error ( 'No Results Found' );
    }
  }

  private handleNormalResultsFlow ( searchTypeContainer: SearchTypeContainer, results: SearchResultType[] ): Observable<any> {
    this.logger.debug('ForwardingSearchWorkflow: handleNormalResultsFlow');

    let doNavigateToSearch: boolean = true;

    // Do some handling specific to each search type
    switch ( searchTypeContainer.searchType.type ) {
      case SearchTypeType.CCL_GIFT:
      case SearchTypeType.VMS_GIFT:
      case SearchTypeType.VMS_GPR:
        let autoSelectedResult: any;

        /*
        Typically, for Customer results, multiple results will mean simply multiple results. Sometimes, however, we may
        be able to auto-select a result for the user, if certain criteria are met.
         */
        if ( results.length === 1 ) {
          autoSelectedResult = results[ 0 ];
        }
        /*
        If all results are from the same customer, and we didn't use a card-specific field (which is handled in the
        filtering step prior to this), then we can choose the customer's primary card by default. Note that it doesn't
        matter which result we use to find the customer's primary card, as they're all from the same customer. But, we
        do need to make sure we pick the 1st level card (directly from results), and not card.customer.cards[n], or else
        that grandchild-level card won't have the customer associated to it properly...
         */
        else if ( results.length && this.isSingleCustomerPresentInResults ( results as Card[] ) && this.isSearchCustomerRelated ( searchTypeContainer ) ) {
          let primaryCard: Card = (<Card>results[ 0 ]).customer.getPrimaryCard ();
          autoSelectedResult    = _.find ( results, function ( card: Card ) {
            return card.identifiers.pan === primaryCard.identifiers.pan;
          } );
        }

        // If we have an auto-selected result, open the verification dialog for it
        if ( autoSelectedResult ) {
          doNavigateToSearch = this.triggerCustomerVerificationWizard ( searchTypeContainer, autoSelectedResult );
        }
        break;
      case SearchTypeType.SERVE:
        let serveAutoSelectedResult: any;

        if ( results.length === 1 ) {
          serveAutoSelectedResult = results[ 0 ];
        } else if ( results.length && this.isSingleServeCustomerPresentInResults ( results as MaplesAccount[] ) ) {
          // Return the account with the open card.
          serveAutoSelectedResult = _.find( results, function( account: MaplesAccount) {
            const openCard: MaplesCard = account.cards.find((card: MaplesCard) => {
              const openStatus: MaplesStatus = card.statuses.find((status: MaplesStatus) => {
                return status.name === 'OPEN';
              });
              return openStatus !== undefined;
            });
            return openCard !== undefined;
          });
        }

        // If we have an auto-selected result, open the verification dialog for it
        if ( serveAutoSelectedResult ) {
          doNavigateToSearch = this.triggerCustomerVerificationWizard ( searchTypeContainer, serveAutoSelectedResult );
        }
        break;
      case SearchTypeType.ECOMM_ORDER:
        if ( results.length === 1 ) {
          doNavigateToSearch = this.triggerCustomerVerificationWizard ( searchTypeContainer, results[ 0 ] as Card );
        }
        break;
      case SearchTypeType.ENCOR:
        if ( results.length === 1 ) {
          doNavigateToSearch = this.triggerCustomerVerificationWizard ( searchTypeContainer, results[ 0 ] as MaplesCustomer );
        }
        break;
    }

    // Finally, navigate to Search unless an auto select is navigating to Detail
    if (doNavigateToSearch) {
      return this.navigateToSearch();
    } else {
      this.transitionService.setIgnoreOff(true);
      return of(null);
    }
  }

  navigateToSearch(): Observable<any> {
    if ( !this.routingService.isOn ( RoutePath.SEARCH ) ) {
      let subject = new Subject ();
      this.routingService.navigateToSearch ()
        .then ( function () {
          subject.next ();
          subject.complete ();
        } );
      return subject;
    } else {
      return of ( null );
    }
  }

  /**
   * Search is customer-related (which matters when determining whether to auto-select a search result) if it's a customer
   * search type, and if the search parameters are NOT card-specific parameters.
   */
  private isSearchCustomerRelated ( searchTypeContainer: SearchTypeContainer ): boolean {
    return searchTypeContainer.searchType.selectionType === SelectionType.CUSTOMER
      && !searchTypeContainer.parameters.get ( SearchParameterValueType.PAN_GPR )
      && !searchTypeContainer.parameters.get ( SearchParameterValueType.SERIAL_NUMBER )
      && !searchTypeContainer.parameters.get ( SearchParameterValueType.CARD_ID );
  }

  private isSingleCustomerPresentInResults ( results: Card[] ): boolean {
    let isSingleCustomer = true;

    let customerId = results[ 0 ].customer.id;
    results.forEach ( result => {
      if ( result.customer.id !== customerId ) {
        isSingleCustomer = false;
      }
    } );

    return isSingleCustomer;
  }

  private isSingleServeCustomerPresentInResults ( results: MaplesAccount[] ): boolean {
    let isSingleCustomer = true;

    let customerId = results[ 0 ].customer.id;
    for (let i = 1; i < results.length; i++) {
      if (results[i].customer.id !== customerId) {
        isSingleCustomer = false;
        break;
      }
    }

    return isSingleCustomer;
  }

  private searchFromCallComponent ( session: Session ): Observable<any> {
    this.logger.debug('ForwardingSearchWorkflow: searchFromCallComponent');

    let component: CallComponent = session.callComponent;
    let queue: SessionQueue      = session.queue;

    let searchTypeContainer: SearchTypeContainer = this.getSearchTypeContainerForSession ( session );
    searchTypeContainer.parameters.clear ();

    switch ( queue.type ) {
      case SelectionType.ACCOUNT:
        if ( component.accountNumber ) {
          searchTypeContainer.parameters.set ( SearchParameterValueType.ACCOUNT_NUMBER, component.accountNumber );
        } else {
          this.logger.warn ( 'No accountNumber available with which to do Call Connect search', session );
          this.store.dispatch(new SelectSearchTypeAction(searchTypeContainer.searchType.type));
          return of(this.routingService.navigateToSearch());
        }
        break;
      case SelectionType.CUSTOMER:
        // First, find the partner
        let partner: Partner;
        if ( component.originalDnis ) {
          partner = this.getPartnerByDnis ( component.originalDnis );
          if ( partner ) {
            searchTypeContainer.parameters.set ( SearchParameterValueType.PARTNER, partner.type );
          } else {
            this.logger.warn ( 'No partner available with which to do Call Connect search', session );
            this.store.dispatch(new SelectSearchTypeAction(searchTypeContainer.searchType.type));
            return of(this.routingService.navigateToSearch());
          }
        }

        // Then find what we're searching on
        if ( component.proxyNumber ) {
          searchTypeContainer.parameters.set ( SearchParameterValueType.PROXY_NUMBER, component.proxyNumber );
        } else if ( component.serialNumber ) {
          searchTypeContainer.parameters.set ( SearchParameterValueType.SERIAL_NUMBER, component.serialNumber );
        } else {
          this.logger.warn ( 'No proxyNumber or serialNumber available with which to do Call Connect search', session );
          this.store.dispatch(new SelectSearchTypeAction(searchTypeContainer.searchType.type));
          return of(this.routingService.navigateToSearch());
        }
        break;
      case SelectionType.CUSTOMER_ACCOUNT:
          if ( component.accountId) {
            let verification: VerifiedField = {
              isLastFourSsnVerified: component.isLastFourSsnVerified,
              isDateOfBirthVerified: component.isDateOfBirthVerified,
              isCardVerified: component.isCardVerified
            };

            searchTypeContainer.parameters.set( 'verification', verification);
            searchTypeContainer.parameters.set ( SearchParameterValueType.ACCOUNT_NUMBER, component.accountId);
          } else {
            this.logger.warn('No account id available with which to do Call Connect search', session);
            this.store.dispatch(new SelectSearchTypeAction(searchTypeContainer.searchType.type));
            return of(this.routingService.navigateToSearch());
          }
        break;
      case SelectionType.LOCATION:
        if ( component.ani ) {
          component.ani = tenDigitPhoneNumber ( component.ani );
          searchTypeContainer.parameters.set ( SearchParameterValueType.PHONE_NUMBER, component.ani );
        } else {
          this.logger.warn ( 'No ANI available with which to do Call Connect search', session );
          this.store.dispatch(new SelectSearchTypeAction(searchTypeContainer.searchType.type));
          return of(this.routingService.navigateToSearch());
        }
        break;
      case SelectionType.ORDER:
        if ( component.orderNumber ) {
          searchTypeContainer.parameters.set ( SearchParameterValueType.ORDER_NUMBER, component.orderNumber );
        } else {
          this.logger.warn ( 'No orderNumber available with which to do Call Connect search', session );
          this.store.dispatch(new SelectSearchTypeAction(searchTypeContainer.searchType.type));
          return of(this.routingService.navigateToSearch());
        }
        break;
      case SelectionType.CARD:
        if ( component.serialNumber ) {
          searchTypeContainer.parameters.set ( SearchParameterValueType.SERIAL_NUMBER, component.serialNumber );
        } else if ( component.van ) {
          searchTypeContainer.parameters.set ( SearchParameterValueType.VAN, component.van );
        } else if ( component.pin ) {
          searchTypeContainer.parameters.set ( SearchParameterValueType.PIN, component.pin );
        } else {
          this.logger.warn ( 'No serialNumber, van, or pin available with which to do Call Connect search', session )
          this.store.dispatch(new SelectSearchTypeAction(searchTypeContainer.searchType.type));
          return of(this.routingService.navigateToSearch());
        }
        break;
      default:
        this.logger.warn ( 'Unsupported Queue Selection Type for Forwarding Search for Call Connect' );
        return of ( null );
    }

    return this.run ( searchTypeContainer );
  }

  private triggerCustomerVerificationWizard ( searchTypeContainer: SearchTypeContainer, result: MaplesAccount | Card | MaplesCustomer | MaplesOrder ): boolean {
    this.logger.debug('ForwardingSearchWorkflow: triggerCustomerVerificationWizard');

    if ( this.customerVerificationService.isVerificationDialogRequired ( searchTypeContainer ) ) {
      this.customerVerificationService.runCustomerVerificationWizard(result, searchTypeContainer)
        .pipe (
          switchMap ( isVerified => {
            if ( isVerified ) {
              return this.addSelectionToSessionWorkflow.runForSearchResult ( searchTypeContainer, result )
            } else {
              return of ( null );
            }
          } ),
          finalize ( () => this.transitionService.off () )
        )
        .subscribe ();

      return true;
    } else {
      this.addSelectionToSessionWorkflow.runForSearchResult(searchTypeContainer, result)
        .pipe(
          finalize(() => this.transitionService.off())
        )
        .subscribe();
      return false;
    }
  }
}
