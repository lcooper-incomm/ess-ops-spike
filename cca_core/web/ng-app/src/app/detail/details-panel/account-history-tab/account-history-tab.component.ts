import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { FormControl, FormGroup } from "@angular/forms";
import { CardAccountHistory } from "../../../core/card/card-account-history";
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { Selection } from "../../../core/session/model/selection";
import { SpinnerComponent } from "../../../core/spinner/spinner.component";
import { debounceTime } from "rxjs/operators";
import { AppStateType } from "../../../app-state-type.enum";
import { SessionState } from "../../../core/session/session-state";

@Component ( {
  selector: 'cca-account-history-tab',
  templateUrl: './account-history-tab.component.html',
  styleUrls: [ './account-history-tab.component.scss' ]
} )
export class AccountHistoryTabComponent extends CcaBaseComponent implements OnInit {

  dataSource                 = new MatTableDataSource<CardAccountHistory> ();
  displayedColumns: string[] = [ 'id', 'date', 'user', 'type', 'description', 'note' ];
  filterControl: FormControl;
  filterForm: FormGroup      = new FormGroup ( {} );
  selection: Selection<any>;

  @ViewChild ( 'historySpinner' )
  historySpinner: SpinnerComponent;
  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.initDataSource ();
    this.initForm ();
    this.subscribeToSessionState ();
    this.subscribeToFilterChanges ();
  }

  private initDataSource (): void {
    this.sort.disableClear              = true;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sort                = this.sort;
    this.dataSource.filterPredicate     = ( transaction: CardAccountHistory, filterValue: string ): boolean => {
      return (transaction.id && transaction.id.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (transaction.date && transaction.date.displayValue.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (transaction.username && transaction.username.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (transaction.updateType && transaction.updateType.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (transaction.description && transaction.description.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (transaction.note && transaction.note.toLowerCase ().indexOf ( filterValue ) !== -1);
    };
    this.dataSource.sortingDataAccessor = ( transaction: CardAccountHistory, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'date':
          sortValue = transaction.date ? transaction.date.value : null;
          break;
        case 'user':
          sortValue = transaction.username ? transaction.username.toLowerCase () : null;
          break;
        case 'type':
          sortValue = transaction.updateType ? transaction.updateType.toLowerCase () : null;
          break;
        case 'description':
          sortValue = transaction.description ? transaction.description.toLowerCase () : null;
          break;
        case 'note':
          sortValue = transaction.note ? transaction.note.toLowerCase () : null;
          break;
        default:
          sortValue = transaction[ property ];
          break;
      }

      return sortValue;
    };
  }

  private initForm (): void {
    this.filterControl = new FormControl ( '', [] );
    this.filterForm    = new FormGroup ( {
      filter: this.filterControl
    } );
  }

  private subscribeToFilterChanges (): void {
    this.addSubscription (
      this.filterControl.valueChanges
        .pipe ( debounceTime ( 500 ) )
        .subscribe ( ( value: string ) => {
          if ( value ) {
            value = value.trim ();
            value = value.toLowerCase ();
          }
          this.dataSource.filter = value;
        } )
    );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection ) {
            this.selection = state.selection;

            if ( this.selection.getCard () ) {
              this.dataSource.data = this.selection.getCard ().accountHistories;
            } else {
              this.dataSource.data = [];
            }
          }
        } )
    );
  }
}
