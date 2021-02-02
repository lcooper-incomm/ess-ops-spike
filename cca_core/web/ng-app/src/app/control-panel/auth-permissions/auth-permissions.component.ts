import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import * as _ from 'lodash';
import {CcaBaseComponent} from '../../core/cca-base-component';
import {organizePermissionsIntoCategories} from './permissions-util';
import {ControlPanelGroupsService} from '../control-panels/groups/control-panel-groups.service';
import {filterByString} from '../control-panels/control-panel-utils';
import {SpinnerComponent} from '../../core/spinner/spinner.component';
import {ControlPanelRolesService} from '../control-panels/roles/control-panel-roles.service';
import {Permission} from '../../core/auth/permission';
import {Group} from '../../core/auth/group';
import {Role} from '../../core/auth/role';
import {SpinnerSize} from '../../core/spinner/spinner-size.enum';
import {ControlPanelPermissionService} from '../control-panels/permissions/control-panel-permission.service';

@Component ( {
  selector: 'cca-auth-permissions',
  templateUrl: './auth-permissions.component.html',
  styleUrls: [ './auth-permissions.component.scss' ]
} )
export class AuthPermissionsComponent extends CcaBaseComponent implements OnInit {
  allPermissions: Permission[]      = [];
  archPermissions: Permission[]     = [];
  assignedPermissions: Permission[] = [];
  filteredByCategory: string;
  filteredByPermissions: string;
  entityId: number;
  isLoading: boolean                = false;
  permissions: Permission[]         = [];
  permissionsForm: FormGroup;
  SpinnerSize                       = SpinnerSize;

  @ViewChildren ( 'catSpinner' ) catSpinners: QueryList<SpinnerComponent>;
  @ViewChildren ( 'permissionSpinner' ) permissionSpinners: QueryList<SpinnerComponent>;

  @Input ()
  group: Group;

  @Input ()
  role: Role;

  constructor ( private groupService: ControlPanelGroupsService,
                private permissionsService: ControlPanelPermissionService,
                private rolesService: ControlPanelRolesService ) {
    super ();
  }

  ngOnInit () {
    this.setEntityId ();
    this.initForms ();
    this.buildPermissions ();
  }

  toggleCategory ( checked: boolean, categoryId: string, i ) {
    let spinner = this.findCatSpinner ( i );
    spinner.start ();
    checked ? this.addCategory ( categoryId, spinner ) : this.removeCategory ( categoryId, spinner );
  }

  togglePermission ( checked: boolean, permissionId: string, i, j ) {
    let spinner = this.findPermissionSpinner ( i, j );
    spinner.start ();
    checked ? this.addPermission ( permissionId, spinner ) : this.removePermission ( permissionId, spinner );
  }

  private buildPermissions () {
    if ( this.group ) {
      this.updateModel ( this.group );
    } else if ( this.role ) {
      this.updateModel ( this.role );
    }
    this.findAllPermissions ();
  }

  private initForms (): void {
    this.permissionsForm = new FormGroup ( {
      categoriesControl: new FormControl ( null ),
      permissionsControl: new FormControl ( null )
    } );
    this.subscribePermissionsFormChanges ();
  }

  private updateModel ( data ) {
    this.assignedPermissions = _.cloneDeep ( data.permissions );
  }

  private setEntityId () {
    if ( this.group ) {
      this.entityId = this.group.id;
    } else if ( this.role ) {
      this.entityId = this.role.id;
    }
  }

  private setPermissionsFlag ( obj ) {
    obj.forEach ( category => {
      category.permissions.forEach ( permission => {
        permission.isAssigned = this.isPermissionAssigned ( permission );
      } );
    } );
    obj.forEach ( category => {
      category.isAssigned = this.isCategoryAssigned ( category );
    } );
    this.permissions     = _.cloneDeep ( obj );
    this.archPermissions = this.permissions;
  }

  private isCategoryAssigned ( category ) {
    return category.permissions.every ( permission => permission.isAssigned );
  }

  private isPermissionAssigned ( permission ) {
    let it = this.assignedPermissions.find ( o => o.id === permission.id );
    return (it ? true : false);
  }

  /**
   * Split Services to support roles and groups
   */

  private findAllPermissions () {
    let observable: Observable<Permission[]>;
    this.isLoading = true;

    if ( this.group ) {
      observable = this.permissionsService.findAll ();
    } else if ( this.role ) {
      observable = this.permissionsService.findAllByGroupId ( this.role.group.id );
    }

    if ( observable ) {
      observable
        .pipe ( finalize ( () => this.isLoading = false ) )
        .subscribe ( ( data ) => {
          this.allPermissions = _.cloneDeep ( data );
          this.refreshPermissions();
        } );
    }
  }

  private addPermission ( permissionId, spinner ) {
    let observable: Observable<any>;

    if ( this.group ) {
      observable = this.groupService.addPermission ( this.entityId, permissionId );
    } else if ( this.role ) {
      observable = this.rolesService.addPermission ( this.entityId, permissionId );
    }

    if ( observable ) {
      observable
        .subscribe ( ( data ) => {
          spinner.stop ();
          this.updateModel ( data );
          this.refreshPermissions();
        } );
    }
  }

  private removePermission ( permissionId, spinner ) {
    let observable: Observable<any>;

    if ( this.group ) {
      observable = this.groupService.removePermission ( this.entityId, permissionId );
    } else if ( this.role ) {
      observable = this.rolesService.removePermission ( this.entityId, permissionId );
    }

    if ( observable ) {
      observable
        .subscribe ( ( data ) => {
          spinner.stop ();
          this.updateModel ( data );
          this.refreshPermissions();
        } );
    }
  }

  private addCategory ( categoryId, spinner ) {
    let observable: Observable<any>;

    if ( this.group ) {
      observable = this.groupService.addCategory ( this.entityId, categoryId );
    } else if ( this.role ) {
      observable = this.rolesService.addCategory ( this.entityId, categoryId );
    }

    if ( observable ) {
      observable
        .subscribe ( ( data ) => {
          spinner.stop ();
          this.updateModel ( data );
          this.refreshPermissions();
        } );
    }
  }

  private removeCategory ( categoryId, spinner ) {
    let observable: Observable<any>;

    if ( this.group ) {
      observable = this.groupService.removeCategory ( this.entityId, categoryId );
    } else if ( this.role ) {
      observable = this.rolesService.removeCategory ( this.entityId, categoryId );
    }
    if ( observable ) {
      observable
        .subscribe ( ( data ) => {
          spinner.stop ();
          this.updateModel ( data );
          this.refreshPermissions();
        } );
    }
  }

  findCatSpinner ( i ) {
    let spinners = this.catSpinners.toArray ();
    return spinners[ i ];
  }

  private findPermissionSpinner ( i, j ) {
    return this.permissionSpinners.toArray ().find ( obj => obj.id === i + '-' + j );
  }

  private subscribePermissionsFormChanges (): void {
    this.addSubscription (
      this.permissionsForm.valueChanges
        .subscribe ( {
          next: value => {
            this.filteredByCategory    = value.categoriesControl;
            this.filteredByPermissions = value.permissionsControl;
            this.refreshPermissions();
          }
        } )
    );
  }

  /**
   * Combine setting the flagged permissions and then filter permissions for viewing.
   */
  private refreshPermissions(): void {
    this.setPermissionsFlag(organizePermissionsIntoCategories(this.allPermissions));
    const filter: string = this.permissionsForm.get('permissionsControl').value;
    if (filter && filter.length > 0) {
      this.filterPermissions(filter);
    }
  }

  private filterPermissions ( str ) {
    this.permissions = _.cloneDeep ( this.archPermissions );
    _.forEach ( this.permissions, ( value: any ) => {
      value.permissions = filterByString ( value.permissions, str, 'displayName' );
      return value.permissions;
    } );
  }

}
