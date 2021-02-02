import { Component, OnInit } from '@angular/core';
import { CcaBaseComponent } from "../../core/cca-base-component";

@Component ( {
  selector: 'cca-profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.scss' ]
} )
export class ProfileComponent extends CcaBaseComponent implements OnInit {
  totalPermissions;
  totalRoles;
  totalGroups;
  filteredPermissions;
  filteredRoles;
  filteredGroups;

  constructor () {
    super ();
  }

  ngOnInit () {
  }

  displayTotalRoles ( total ) {
    if ( total ) {
      this.totalRoles = total;
    }
  }

  displayTotalGroups ( total ) {
    if ( total ) {
      this.totalGroups = total;
    }
  }

  displayTotal ( total ) {
    if ( total ) {
      this.totalPermissions = total;
    }
  }

  displayCurrentPermissions ( filtered ) {
      this.filteredPermissions = filtered;
  }

  displayCurrentRoles ( filtered ) {
      this.filteredRoles = filtered;
  }

  displayCurrentGroups ( filtered ) {
      this.filteredGroups = filtered;
  }
}
