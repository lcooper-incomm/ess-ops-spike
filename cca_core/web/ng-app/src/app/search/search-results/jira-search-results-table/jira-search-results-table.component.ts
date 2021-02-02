import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { AppStateType } from "../../../app-state-type.enum";
import { SearchState } from "../../../core/search/search-state";
import * as _ from "lodash";
import { Issue } from "../../../core/issue/issue";
import { AbstractSearchResultsTableComponent } from "../abstract-search-results-table/abstract-search-results-table.component";

@Component ( {
  selector: 'cca-jira-search-results-table',
  templateUrl: './jira-search-results-table.component.html',
  styleUrls: [ './jira-search-results-table.component.scss' ]
} )
export class JiraSearchResultsTableComponent extends AbstractSearchResultsTableComponent implements OnInit {

  dataSource                 = new MatTableDataSource<Issue> ();
  displayedColumns: string[] = [ 'date', 'key', 'customerName', 'summary', 'status', 'assignee' ];

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  private textFilter: string;

  ngOnInit () {
    this.sort.disableClear              = true;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.sortingDataAccessor = ( issue: Issue, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'customerName':
          sortValue = (issue.fields && issue.fields.customerName) ? issue.fields.customerName.toLowerCase () : null;
          break;
        case 'date':
          sortValue = (issue.fields && issue.fields.createdDate) ? issue.fields.createdDate.value : null;
          break;
        case 'summary':
          sortValue = (issue.fields && issue.fields.summary) ? issue.fields.summary.toLowerCase () : null;
          break;
        case 'status':
          sortValue = (issue.fields && issue.fields.status) ? issue.fields.status.name.toLowerCase () : null;
          break;
        case 'key':
          sortValue = issue.key.toLowerCase ();
          break;
        case 'assignee':
          sortValue = (issue.fields && issue.fields.assignee) ? issue.fields.assignee.displayName.toLowerCase () : null;
          break;
        default:
          sortValue = issue[ property ];
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

  private filterResults ( issues: Issue[] ): Issue[] {
    if ( this.textFilter ) {
      let filter = this.textFilter.toLowerCase ();
      return _.filter ( issues, function ( issue: Issue ) {
        let status   = issue.fields.status;
        let assignee = issue.fields.assignee;
        return (issue.fields.createdDate && issue.fields.createdDate.displayValue.toLowerCase ().indexOf ( filter ) !== -1)
          || (issue.key && issue.key.toLowerCase ().indexOf ( filter ) !== -1)
          || (issue.fields.customerName && issue.fields.customerName.toLowerCase ().indexOf ( filter ) !== -1)
          || (issue.fields.summary && issue.fields.summary.toLowerCase ().indexOf ( filter ) !== -1)
          || (status && status.name && status.name.toLowerCase ().indexOf ( filter ) !== -1)
          || (assignee && assignee.displayName && assignee.displayName.toLowerCase ().indexOf ( filter ) !== -1);
      } );
    }
    return issues;
  }

}
