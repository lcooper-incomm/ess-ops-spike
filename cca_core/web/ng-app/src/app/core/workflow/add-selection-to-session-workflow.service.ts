import {Injectable, Injector} from '@angular/core';
import {Selection, SelectionDataType} from '../session/model/selection';
import {from, Observable, of} from "rxjs";
import {Logger} from "../../logging/logger.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../app-state";
import {SessionState} from "../session/session-state";
import {snapshot} from "../store-utils/store-utils";
import {AppStateType} from "../../app-state-type.enum";
import {SessionService} from "../session/session.service";
import {SessionRequest} from "../session/model/session-request";
import {SecurityService} from "../security/security.service";
import {SessionTypeType} from "../session/session-type-type.enum";
import {finalize, flatMap, tap} from "rxjs/operators";
import {Session} from "../session/model/session";
import {AddSelectionAction, AddSessionToWorkspaceAction,} from "../session/action/session-actions";
import {SelectionService} from "../session/selection/selection.service";
import {LoadSessionWorkflow} from './load-session-workflow.service';
import {SearchTypeType} from "../search/search-type/search-type-type.enum";
import {SearchTypeContainer} from '../search/search-type-container';
import {SelectionType} from "../session/model/selection-type.enum";
import {Card} from "../card/card";
import {SupportState} from "../support/support-state";
import {Partner} from "../session/selection/partner";
import {SearchParameterValueType} from "../search/search-type/search-parameter-value-type.enum";
import * as _ from "lodash";
import {RoutingService} from "../routing/routing.service";
import {TransitionService} from "../transition/transition.service";
import {TransactionService} from "../../detail/details-panel/transaction-history-tab/transaction.service";
import {LocalStorage} from "../local-storage/local-storage.service";
import {PlatformType} from "../platform/platform-type.enum";
import {LoadSelectionsWorkflow} from './load-selections-workflow.service';
import {MaplesTransactionService} from "../transaction/maples-transaction.service";
import {CustomerService} from '../customer/customer.service';

@Injectable ( {
  providedIn: 'root'
} )
export class AddSelectionToSessionWorkflow {

  constructor (
    private customerService: CustomerService,
    private injector: Injector,
    private loadSelectionsWorkflow: LoadSelectionsWorkflow,
    private localStorage: LocalStorage,
    private logger: Logger,
    private routingService: RoutingService,
    private securityService: SecurityService,
    private selectionService: SelectionService,
    private sessionService: SessionService,
    private store: Store<AppState>,
    private maplesTransactionService: MaplesTransactionService,
    private transactionService: TransactionService,
    private transitionService: TransitionService,
  ) {
  }

  run ( selection: Selection<any> ): Observable<any> {
    this.logger.debug('AddSelectionToSessionWorkflow: run');

    this.transitionService.on ();

    return this.createSessionIfNecessary ()
      .pipe (
        flatMap ( ( session: Session ) => {
          return this.addSelectionToSession ( selection, session )
            .pipe (
              flatMap(() => this.loadSelectionsWorkflow.loadSelectionData(selection)),
              flatMap ( () => this.navigateToDetails () )
            );
        } ),
        finalize ( () => {
          this.logger.debug('AddSelectionToSessionWorkflow: Finalize run');
        } )
      );
  }

  runForSearchResult ( searchTypeContainer: SearchTypeContainer, result: SelectionDataType ): Observable<any> {
    this.logger.debug('AddSelectionToSessionWorkflow: runForSearchResult');

    const selection = this.convertToSelection ( searchTypeContainer, result );

    this.handleSearchResultNavigation(selection, result)

    return this.run(selection)
      .pipe (
        finalize(() => {
          this.transitionService.setIgnoreOff(false);
          this.transitionService.off();
        })
      );
  }

  private addSelectionToSession ( selection: Selection<SelectionDataType>, session: Session ): Observable<Selection<SelectionDataType>> {
    this.logger.debug('AddSelectionToSessionWorkflow: addSelectionToSession');

    return this.selectionService.addOne ( session.id, selection )
      .pipe ( tap ( ( updatedSelection: Selection<SelectionDataType> ) => {
        selection.id                = updatedSelection.id;
        selection.identifiers       = updatedSelection.identifiers;
        selection.externalSessionId = updatedSelection.externalSessionId;
        this.store.dispatch ( new AddSelectionAction ( selection ) );
      } ) );
  }

  private convertToSelection ( searchTypeContainer: SearchTypeContainer, result: SelectionDataType ): Selection<SelectionDataType> {
    this.logger.debug('AddSelectionToSessionWorkflow: convertToSelection');

    const selection: Selection<SelectionDataType> = new Selection<SelectionDataType> ( {
      data: result,
      platform: result['platform'] || searchTypeContainer.searchType.platform,
      type: searchTypeContainer.searchType.selectionType
    } );

    // If CUSTOMER search, we need to un-invert the card/customer relationship
    if ( searchTypeContainer.searchType.selectionType === SelectionType.CUSTOMER ) {
      selection.data = (<Card>result).customer;
    }

    selection.description = selection.buildDescription ();

    // Add a Partner if necessary
    if ([SearchTypeType.VMS_GPR, SearchTypeType.VMS_GIFT, SearchTypeType.CCL_GIFT].includes(searchTypeContainer.searchType.type)) {
      let supportState: SupportState = snapshot(this.store, AppStateType.SUPPORT_STATE);
      selection.partner = supportState.partners.find((partner: Partner) => {
        return partner.type === searchTypeContainer.parameters.get(SearchParameterValueType.PARTNER);
      });
    } else if (selection.type === SelectionType.ORDER && selection.platform === PlatformType.BOL) {
      selection.simplePartner = searchTypeContainer.parameters.get(SearchParameterValueType.BOL_PARTNER);
    }

    // Add Identifier(s)
    selection.identifiers = Selection.buildIdentifiers(selection);

    this.localStorage.updateSelectionFromLocalStorage ( selection );

    if (selection.type !== SelectionType.CUSTOMER_ACCOUNT) {
      this.transactionService.setDefaultRequestForSelection ( selection );
    } else {
      this.maplesTransactionService.setDefaultRequestForSelection ( selection );
    }

    return selection;
  }

  private createSessionIfNecessary (): Observable<any> {
    let sessionState: SessionState = snapshot ( this.store, AppStateType.SESSION_STATE );
    if ( !!sessionState.session ) {
      return of ( sessionState.session );
    } else {
      let sessionType: SessionTypeType = SessionTypeType.GENERAL;

      let prefDefaultSessionType = this.securityService.getCurrentUser ().prefDefaultSessionType;
      if ( prefDefaultSessionType ) {
        sessionType = prefDefaultSessionType;
      }

      let request: SessionRequest = new SessionRequest ( {
        sessionType: sessionType
      } );

      return this.sessionService.createSession ( request )
        .pipe ( flatMap ( ( value: Session ) => {
          this.store.dispatch ( new AddSessionToWorkspaceAction ( value ) );
          let loadSessionWorkflow: LoadSessionWorkflow = this.injector.get ( LoadSessionWorkflow );
          return loadSessionWorkflow.loadSession ( value );
        } ) );
    }
  }

  private handleSearchResultNavigation(selection: Selection<SelectionDataType>, result: SelectionDataType): void {
    if (selection.type === SelectionType.CUSTOMER) {
      // Select the card corresponding to the search result
      // The actual card will be selected upon navigation to details page
      this.customerService.setQueryParamForCard(result as Card);
    }
  }

  private navigateToDetails (): Observable<boolean> {
    return from ( this.routingService.navigateToDetails () );
  }
}
