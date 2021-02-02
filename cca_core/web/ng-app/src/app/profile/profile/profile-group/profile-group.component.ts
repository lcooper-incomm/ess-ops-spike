import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _ from "lodash";
import { filterByString, orderBy } from "../../profile-utils";
import { AppStateType } from "../../../app-state-type.enum";
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";

@Component ( {
  selector: 'cca-profile-group',
  templateUrl: './profile-group.component.html',
  styleUrls: [ './profile-group.component.scss' ]
} )
export class ProfileGroupComponent extends CcaBaseComponent implements OnInit {
  currentGroups;
  @Output () currentTotal = new EventEmitter ( true );
  @Output () totalGroups  = new EventEmitter ( true );
  archiveGroups: any;
  groupsControl           = new FormControl ( '' );

  constructor ( private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    this.subscribeToAuthenticationState ();
  }

  private subscribeToAuthenticationState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.AUTHENTICATION_STATE ).subscribe ( {
        next: authenticationState => {
          if ( authenticationState ) {
            this.currentGroups = orderBy ( authenticationState.user.groups, 'displayName' );
            this.archiveGroups = _.cloneDeep ( this.currentGroups );
          }
        }
      } )
    );
  }

  ngAfterViewInit () {
    this.getTotal ();
    this.groupsControl.valueChanges.subscribe ( value => {
      this.currentGroups = filterByString ( this.archiveGroups, value );
      value ? this.currentTotalChanged () : this.clearTotalChanged ();
    } );
  }

  getTotal () {
    if ( this.archiveGroups ) {
      this.totalGroups.emit ( this.archiveGroups.length );
    }
  }

  currentTotalChanged () {
    if ( this.currentGroups ) {
      this.currentTotal.emit ( this.currentGroups.length + ' of ' );
    }
  }

  clearTotalChanged () {
    this.currentTotal.emit ();
  }
}
