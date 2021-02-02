import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Session } from "../../../core/session/model/session";
import { AppStateType } from "../../../app-state-type.enum";
import { SearchState } from "../../../core/search/search-state";
import * as _ from "lodash";
import { AbstractSearchResultsTableComponent } from "../abstract-search-results-table/abstract-search-results-table.component";
import { WizardRunner } from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import { ViewSessionWizard } from 'src/app/core/session/view-session-wizard/view-session-wizard';
import { SearchTypeContainer } from 'src/app/core/search/search-type-container';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app-state';
import { Workflow } from '../../../core/workflow/workflow.service';
import { CustomerVerificationService } from '../abstract-search-results-table/customer-verification/customer-verification.service';

@Component ( {
  selector: 'cca-session-search-results-table',
  templateUrl: './session-search-results-table.component.html',
  styleUrls: [ './session-search-results-table.component.scss' ]
} )
export class SessionSearchResultsTableComponent extends AbstractSearchResultsTableComponent implements OnInit {

  dataSource                 = new MatTableDataSource<Session> ();
  displayedColumns: string[] = [ 'sid', 'created', 'type', 'queue', 'status', 'action' ];

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  private selectedSearchType: SearchTypeContainer;
  private textFilter: string;

  constructor (
    customerVerificationService: CustomerVerificationService,
    store: Store<AppState>,
    private wizardRunner: WizardRunner,
    workflow: Workflow,
  ) {
    super ( customerVerificationService, store, workflow );
  }

  ngOnInit () {
    this.sort.disableClear              = true;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.sortingDataAccessor = ( session: Session, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'sid':
          sortValue = session.id;
          break;
        case 'created':
          sortValue = session.createdDate ? session.createdDate.value : null;
          break;
        case 'queue':
          let queue = session.queue;
          sortValue = (queue && queue.displayName) ? queue.displayName.toLowerCase () : null;
          break;
        case 'type':
          sortValue = session.sessionTypeType ? session.sessionTypeType.toString ().toLowerCase () : null;
          break;
        case 'status':
          sortValue = session.status ? session.status.displayValue.toLowerCase () : null;
          break;
        default:
          sortValue = session[ property ];
          break;
      }

      return sortValue;
    };
    this.subscribeToSearchState ();
  }

  private subscribeToSearchState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SEARCH_STATE ).subscribe ( {
        next: ( searchState: SearchState ) => {
          if ( searchState ) {
            this.selectedSearchType = searchState.selectedSearchType;
            this.textFilter         = searchState.textFilter;
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

  private filterResults ( sessions: Session[] ): Session[] {
    if ( this.textFilter ) {
      let filter = this.textFilter.toLowerCase ();
      return _.filter ( sessions, function ( session: Session ) {
        return session.id.toString ().indexOf ( filter ) !== -1
          || session.createdDate.displayValue.indexOf ( filter ) !== -1
          || (!session.sessionType && 'not assigned'.indexOf ( filter ) !== -1)
          || (session.sessionType && session.sessionType.displayName.toLowerCase ().indexOf ( filter ) !== -1)
          || (!session.queue && 'not assigned'.indexOf ( filter ) !== -1)
          || (session.queue && session.queue.displayName.toLowerCase ().indexOf ( filter ) !== -1)
          || session.status.displayValue.toString ().toLowerCase ().indexOf ( filter ) !== -1;
      } );
    }
    return sessions;
  }

  selectResult ( result: Session, skipVerificationDialog: boolean = false ): void {
    const wizard            = new ViewSessionWizard ();
    wizard.model.session    = result;
    wizard.model.searchType = this.selectedSearchType;
    this.wizardRunner.run ( wizard );
  }
}
