import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { FormControl, FormGroup } from "@angular/forms";
import { PlatformType } from "../../../core/platform/platform-type.enum";
import { SpinnerComponent } from "../../../core/spinner/spinner.component";
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { debounceTime } from "rxjs/operators";
import { AppStateType } from "../../../app-state-type.enum";
import { SessionState } from "../../../core/session/session-state";
import { Terminal } from "../../../core/node/terminal/terminal";

@Component ( {
  selector: 'cca-location-terminals-tab',
  templateUrl: './location-terminals-tab.component.html',
  styleUrls: [ './location-terminals-tab.component.scss' ]
} )
export class LocationTerminalsTabComponent extends CcaBaseComponent implements OnInit {

  dataSource                 = new MatTableDataSource<Terminal> ();
  displayedColumns: string[] = [ 'id', 'date', 'number', 'status' ];
  filterControl: FormControl;
  filterForm: FormGroup      = new FormGroup ( {} );
  PlatformType               = PlatformType;

  @ViewChild ( 'terminalsSpinner' )
  terminalsSpinner: SpinnerComponent;
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
    this.dataSource.paginator       = this.paginator;
    this.dataSource.sort            = this.sort;
    this.dataSource.filterPredicate = ( terminal: Terminal, filterValue: string ): boolean => {
      let status = terminal.getStatusByPlatform ( PlatformType.MDM );

      return (terminal.id && terminal.id.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (terminal.createdDate && terminal.createdDate.displayValue.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (terminal.terminalNumber && terminal.terminalNumber.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (status && status.description && status.description.toLowerCase ().indexOf ( filterValue ) !== -1);
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
            this.dataSource.data = state.selection.terminals;
          }
        } )
    );
  }
}
