import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _ from "lodash";
import { filterByString, orderBy } from "../../profile-utils";
import { AppStateType } from "../../../app-state-type.enum";
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";

@Component ( {
  selector: 'cca-profile-permissions',
  templateUrl: './profile-permissions.component.html',
  styleUrls: [ './profile-permissions.component.scss' ]
} )

export class ProfilePermissionsComponent extends CcaBaseComponent implements OnInit {
  @Output () currentTotal     = new EventEmitter ( true );
  @Output () totalPermissions = new EventEmitter ( true );

  currentPermissions;
  archivePermissions: any;
  permissionsControl = new FormControl ( '' );

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
            this.currentPermissions = orderBy ( authenticationState.user.permissions, 'displayName' );
            this.archivePermissions = _.cloneDeep ( this.currentPermissions );
          }
        }
      } )
    );
  }

  ngAfterViewInit () {
    this.getTotalPermissions ();
    this.permissionsControl.valueChanges.subscribe ( value => {
      this.currentPermissions = filterByString ( this.archivePermissions, value );
      value ? this.currentTotalChanged () : this.clearTotalChanged ();
    } );
  }

  getTotalPermissions () {
    if ( this.archivePermissions ) {
      this.totalPermissions.emit ( this.archivePermissions.length );
    }
  }

  currentTotalChanged () {
    if ( this.currentPermissions.length ) {
      this.currentTotal.emit ( this.currentPermissions.length + ' of ' );
    }
  }

  clearTotalChanged () {
    this.currentTotal.emit ();
  }
}
