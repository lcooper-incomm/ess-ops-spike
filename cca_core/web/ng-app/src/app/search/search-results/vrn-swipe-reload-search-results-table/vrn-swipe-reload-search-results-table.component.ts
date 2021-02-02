import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Card } from "../../../core/card/card";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { AppStateType } from "../../../app-state-type.enum";
import { SearchState } from "../../../core/search/search-state";
import { CsCoreStatus } from "../../../core/model/cs-core-status";
import { PlatformType } from "../../../core/platform/platform-type.enum";
import * as _ from "lodash";
import { AbstractSearchResultsTableComponent } from "../abstract-search-results-table/abstract-search-results-table.component";
import { Workflow } from "../../../core/workflow/workflow.service";
import { Selection } from "../../../core/session/model/selection";
import { Identifier } from "../../../core/session/model/identifier";
import { snapshot } from "../../../core/store-utils/store-utils";
import { SearchTypeContainer } from "../../../core/search/search-type-container";
import { SearchParameterValueType } from "../../../core/search/search-type/search-parameter-value-type.enum";
import { IdentifierType } from "../../../core/session/model/identifier-type.enum";
import { SearchTypeType } from "../../../core/search/search-type/search-type-type.enum";
import { SearchService } from "../../../core/search/search.service";
import { ToastFactory } from "../../../toast/toast-factory.service";
import { AddSelectionToSessionWorkflow } from "../../../core/workflow/add-selection-to-session-workflow.service";
import { SelectionType } from "../../../core/session/model/selection-type.enum";
import { TransitionService } from "../../../core/transition/transition.service";
import { finalize } from "rxjs/operators";
import { CustomerVerificationService } from '../abstract-search-results-table/customer-verification/customer-verification.service';

@Component ( {
  selector: 'cca-vrn-swipe-reload-search-results-table',
  templateUrl: './vrn-swipe-reload-search-results-table.component.html',
  styleUrls: [ './vrn-swipe-reload-search-results-table.component.scss' ]
} )
export class VrnSwipeReloadSearchResultsTableComponent extends AbstractSearchResultsTableComponent implements OnInit {

  dataSource                 = new MatTableDataSource<Card> ();
  displayedColumns: string[] = [ 'serialNumber', 'controlNumber', 'pan', 'description', 'headerId', 'activationDate', 'status', 'amount' ];

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  private textFilter: string;

  constructor (
    private addSelectionToSessionWorkflow: AddSelectionToSessionWorkflow,
    customerVerificationService: CustomerVerificationService,
    private searchService: SearchService,
    store: Store<AppState>,
    private toastFactory: ToastFactory,
    private transitionService: TransitionService,
    workflow: Workflow,
  ) {
    super ( customerVerificationService, store, workflow );
  }

  ngOnInit () {
    this.sort.disableClear              = true;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.sortingDataAccessor = ( card: Card, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'activationDate':
          sortValue = (card.activation && card.activation.activationDate) ? card.activation.activationDate.value : null;
          break;
        case 'description':
          sortValue = card.productDescription ? card.productDescription.toLowerCase () : null;
          break;
        case 'headerId':
          sortValue = card.identifiers.headerId ? card.identifiers.headerId.toLowerCase () : null;
          break;
        case 'status':
          let status = card.getStatusByPlatform ( PlatformType.SRL );
          sortValue  = (status && status.description) ? status.description.toLowerCase () : 'unavailable';
          break;
        case 'serialNumber':
          sortValue = card.identifiers.serialNumber;
          break;
        case 'controlNumber':
          sortValue = card.identifiers.controlNumber;
          break;
        case 'pan':
          sortValue = card.identifiers.pan;
          break;
        case 'amount':
          sortValue = (card.amounts && card.amounts.reloadAmount) ? card.amounts.reloadAmount.value : null;
          break;
        default:
          sortValue = card[ property ];
          break;
      }

      return sortValue;
    };
    this.subscribeToSearchState ();
  }

  selectResult ( card: Card ): void {
    let selection = new Selection<Card> ( {
      type: SelectionType.CARD,
      platform: PlatformType.SRL,
      identifiers: [ this.getSrlSearchIdentifier () ]
    } );

    let searchState: SearchState                 = snapshot ( this.store, AppStateType.SEARCH_STATE );
    let searchTypeContainer: SearchTypeContainer = _.cloneDeep ( _.find ( searchState.searchTypeContainers, ( searchTypeContainer: SearchTypeContainer ) => {
      return searchTypeContainer.searchType.type === SearchTypeType.FASTCARD_FASTPIN;
    } ) );
    searchTypeContainer.clear ();
    searchTypeContainer.parameters.set ( SearchParameterValueType.SERIAL_NUMBER, card.identifiers.serialNumber );

    this.searchService.search ( searchTypeContainer )
      .subscribe ( ( results: Card[] ) => {
        if ( results && results.length && results.length === 1 ) {
          let identifier      = new Identifier ();
          identifier.platform = PlatformType.INCOMM;
          identifier.type     = IdentifierType.SERIALNUMBER;
          identifier.value    = card.identifiers.serialNumber;

          selection.identifiers.push ( identifier );
          selection.data               = results[ 0 ];
          selection.getCard ().srlData = card;
          selection.description        = selection.buildDescription ();

          this.addSelectionToSessionWorkflow.run ( selection )
            .pipe ( finalize ( () => this.transitionService.off () ) )
            .subscribe ();
        } else {
          this.toastFactory.info ( 'No further details are currenty available.' );
        }
      } );
  }

  private getSrlSearchIdentifier (): Identifier {
    let identifier      = new Identifier ();
    identifier.platform = PlatformType.SRL;

    let searchState: SearchState                 = snapshot ( this.store, AppStateType.SEARCH_STATE );
    let searchTypeContainer: SearchTypeContainer = searchState.selectedSearchType;

    if ( searchTypeContainer.parameters.get ( SearchParameterValueType.REVERSE_VRN ) ) {
      identifier.type  = IdentifierType.REVERSEVRN;
      identifier.value = searchTypeContainer.parameters.get ( SearchParameterValueType.REVERSE_VRN );
    } else if ( searchTypeContainer.parameters.get ( SearchParameterValueType.REVERSE_VRN_BY_CONTROL_NUMBER ) ) {
      identifier.type  = IdentifierType.REVERSEVRNBYCONTROLNUMBER;
      identifier.value = searchTypeContainer.parameters.get ( SearchParameterValueType.REVERSE_VRN_BY_CONTROL_NUMBER );
    }

    return identifier;
  }

  private subscribeToSearchState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SEARCH_STATE ).subscribe ( {
        next: ( searchState: SearchState ) => {
          if ( searchState ) {
            this.textFilter = searchState.textFilter;
            if ( searchState.selectedSearchType ) {
              this.dataSource.data = this.filterResults ( searchState.selectedSearchType.results );
            } else {
              this.dataSource.data = [];
            }
          }
        }
      } )
    );
  }

  private filterResults ( cards: Card[] ): Card[] {
    if ( this.textFilter ) {
      let filter = this.textFilter.toLowerCase ();
      return _.filter ( cards, function ( card: Card ) {
        let status: CsCoreStatus = card.getStatusByPlatform ( PlatformType.INCOMM );
        return (card.identifiers.serialNumber && card.identifiers.serialNumber.indexOf ( filter ) !== -1)
          || (card.identifiers.controlNumber && card.identifiers.controlNumber.indexOf ( filter ) !== -1)
          || (card.identifiers.pan && card.identifiers.pan.indexOf ( filter ) !== -1)
          || (card.productDescription && card.productDescription.toLowerCase ().indexOf ( filter ) !== -1)
          || (card.identifiers.headerId && card.identifiers.headerId.indexOf ( filter ) !== -1)
          || (card.activation && card.activation.activationDate && card.activation.activationDate.displayValue.toLowerCase ().indexOf ( filter ) !== -1)
          || (status && status.description && status.description.toLowerCase ().indexOf ( filter ) !== -1)
          || (card.amounts.reloadAmount && card.amounts.reloadAmount.displayValue.indexOf ( filter ) !== -1);
      } );
    }
    return cards;
  }

}
