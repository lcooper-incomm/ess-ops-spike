import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EditPermissionWizard } from "../edit-permission-wizard";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ControlPanelPermissionService } from "../../control-panel-permission.service";
import { Role } from "../../../../../core/auth/role";
import { ControlPanelRolesService } from "../../../roles/control-panel-roles.service";
import { SecurityService } from "../../../../../core/security/security.service";
import { filterByString } from "../../../control-panel-utils";
import * as _ from "lodash";

@Component ( {
  selector: 'cca-edit-permission-roles-page',
  templateUrl: './edit-permission-roles-page.component.html',
  styleUrls: [ './edit-permission-roles-page.component.scss' ]
} )
export class EditPermissionRolesPageComponent extends WizardPage<EditPermissionWizard> implements OnInit {
  archRoles: Role[]       = [];
  archRolesSelect: Role[] = [];
  filterForm: FormGroup   = new FormGroup ( {} );
  key: string             = 'roles-page';
  masterRoles: Role[]     = [];
  roles: Role[]           = [];
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor ( private permissionService: ControlPanelPermissionService,
                private roleService: ControlPanelRolesService,
                private securityService: SecurityService ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
  }

  ngOnInit () {
    this.initForms ();
    this.findAdmins ();
  }

  onLoad (): Observable<any> {
    return this.roleService.findAllRoles ( this.wizard.model.permission.id )
      .pipe ( map ( ( roles: Role[] ) => {
        this.roles     = roles
        this.archRoles = _.cloneDeep ( this.roles );
      } ) );
  }

  public updateRole ( event: Role ): void {
    this.roles = _.reject ( this.roles, ( role: Role ) => {
      return role.id === event.id;
    } );
    this.clearSelect ();
    this.archRoles = _.cloneDeep ( this.roles );
    this.initMasterSelect ();
  }

  private addPermissionToRole ( roleId: number ): void {
    this.roleService.addPermission ( roleId, this.wizard.model.permission.id )
      .subscribe ( ( role: Role ) => {
        this.roles = [ ...this.roles, role ];
        this.clearSelect ();
        this.archRoles = _.cloneDeep ( this.roles );
        this.initMasterSelect ();
      } )
  }

  private clearSelect (): void {
    this.wizardForm.reset ()
  }

  private findAdmins (): void {
    let uid = this.securityService.getCurrentUser ().id;
    this.roleService.findAllAdminOfRoles ( uid )
      .subscribe ( ( role: Role[] ) => {
        this.archRolesSelect.push.apply ( this.archRolesSelect, role );
        this.initMasterSelect ();

      } )
  }

  private initForms (): void {
    this.wizardForm = new FormGroup ( {
      roleControl: new FormControl ( null, [ Validators.required ] )
    } );
    this.filterForm = new FormGroup ( {
      roleFilter: new FormControl ( null, [ Validators.required ] )
    } );
    this.subscribeWizardFormChanges ();
    this.subscribeFilterFormChanges ();
  }

  private initMasterSelect (): void {
    let masterRoles  = this.archRolesSelect;
    this.masterRoles = _.filter ( masterRoles, ( masterRole: Role ) => {
      return !_.find ( this.roles, ( role: Role ) => {
        return role.id === masterRole.id;
      } )
    } )
  }

  private subscribeFilterFormChanges (): void {
    this.addSubscription (
      this.filterForm.valueChanges
        .subscribe ( {
          next: value => {
            this.roles = filterByString ( this.archRoles, value.roleFilter, 'displayName' );
          }
        } )
    );
  }

  private subscribeWizardFormChanges (): void {
    this.addSubscription (
      this.wizardForm.valueChanges
        .subscribe ( {
          next: value => {
            if ( value.roleControl ) {
              this.addPermissionToRole ( value.roleControl );
            }
          }
        } )
    );
  }
}
