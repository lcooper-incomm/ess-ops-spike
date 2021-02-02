import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _ from "lodash";
import { filterByString, orderBy } from "../../profile-utils";
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { AppStateType } from "../../../app-state-type.enum";

@Component ( {
  selector: 'cca-profile-roles',
  templateUrl: './profile-roles.component.html',
  styleUrls: [ './profile-roles.component.scss' ]
} )
export class ProfileRolesComponent extends CcaBaseComponent implements OnInit {
  currentRoles;
  @Output () currentTotal = new EventEmitter ( true );
  @Output () totalRoles   = new EventEmitter ( true );
  archiveRoles: any;
  rolesControl            = new FormControl ( '' );

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
            this.currentRoles = orderBy ( authenticationState.user.roles, 'displayName' );
            this.archiveRoles = _.cloneDeep ( this.currentRoles );
          }
        }
      } )
    );
  }

  ngAfterViewInit () {
    this.getTotal ();
    this.rolesControl.valueChanges.subscribe ( value => {
      this.currentRoles = filterByString ( this.archiveRoles, value );
      value ? this.currentTotalChanged () : this.clearTotalChanged ();
    } );
  }

  getTotal () {
    if ( this.archiveRoles ) {
      this.totalRoles.emit ( this.archiveRoles.length );
    }
  }

  currentTotalChanged () {
    if ( this.currentRoles ) {
      this.currentTotal.emit ( this.currentRoles.length + ' of ' );
    }
  }

  clearTotalChanged () {
    this.currentTotal.emit ();
  }

}
