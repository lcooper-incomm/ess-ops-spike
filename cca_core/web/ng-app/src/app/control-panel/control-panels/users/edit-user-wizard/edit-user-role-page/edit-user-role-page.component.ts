import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Permission } from "../../../../../core/auth/permission";
import { EditUserWizard } from "../edit-user-wizard";
import { ControlPanelUsersService } from "../../control-panel-users.service";
import { forkJoin, Observable } from "rxjs";
import { User } from "../../../../../core/user/user";
import { Role } from "../../../../../core/auth/role";
import { ControlPanelRolesService } from "../../../roles/control-panel-roles.service";
import * as _ from "lodash";
import { map } from "rxjs/operators";
import { RoleMembershipType } from "../../../../../core/constant/role-membership-type.enum";
import { SecurityService } from "../../../../../core/security/security.service";
import { ToastFactory } from "../../../../../toast/toast-factory.service";

@Component ( {
  selector: 'cca-edit-user-role-page',
  templateUrl: './edit-user-role-page.component.html',
  styleUrls: [ './edit-user-role-page.component.scss' ]
} )
export class EditUserRolePageComponent extends WizardPage<EditUserWizard> implements OnInit {

  key: string               = 'roles-page';
  wizardForm: FormGroup     = new FormGroup ( {} );
  permissions: Permission[] = [];
  masterRoles: Role[]       = [];
  roles: Role[]             = [];
  archRolesSelect: Role[]   = [];
  typeSelect: any[]         = [ {
    "displayName": "Administrator", "type": "ADMIN"
  }, { "displayName": "Administrator and Member", "type": "BOTH" }, { "displayName": "Member", "type": "MEMBER" } ];

  constructor ( private roleService: ControlPanelRolesService,
                private securityService: SecurityService,
                private toastFactory: ToastFactory,
                private userService: ControlPanelUsersService ) {
    super ();
    this.isBackable       = true;
    this.isCloseable      = true;
    this.isDeletable      = false;
    this.backButtonText   = 'Back';
    this.deleteButtonText = 'Delete Group';
  }

  ngOnInit () {
    this.initForms ();
    this.findAdmins ();
    this.findMembers ();
  }

  onDelete (): Observable<User> {
    return this.userService.deleteUser ( this.wizard.model.user.id );
  }

  onLoad (): Observable<any> {
    let observables: Observable<any>[] = [];

    observables.push ( this.findAllAdminOfRoles () );
    observables.push ( this.findAllMemberOfRoles () );

    return forkJoin ( observables )
      .pipe ( map ( ( results: Role[][] ) => {
        this.roles = [];
        results.forEach ( ( resultsArray: Role[] ) => {
          this.roles.push.apply ( this.roles, resultsArray );
        } );
      } ) );
  }

  public addAdminToRole ( id: number, uid: number ): void {
    this.roleService.addAdminToRole ( id, uid )
      .subscribe ( ( role: Role ) => {
        this.toastFactory.success ( 'User added as Role Administrator successfully' );
        role.membershipType = RoleMembershipType.ADMINISTRATOR;
        this.roles          = [ ...this.roles, role ];
        this.initMasterSelect ();
      } )
  }

  public addMemberToRole ( id: number, uid: number ): void {
    this.roleService.addMemberToRole ( id, uid )
      .subscribe ( ( role: Role ) => {
        this.toastFactory.success ( 'User added as Role Member successfully' );
        role.membershipType = RoleMembershipType.MEMBER;
        this.roles          = [ ...this.roles, role ];
        this.initMasterSelect ();
      } )
  }

  public findAllAdminOfRoles (): Observable<Role[]> {
    return this.roleService.findAllAdminOfRoles ( this.wizard.model.user.id )
      .pipe ( map ( ( roles: Role[] ) => {
        roles.forEach ( ( role: Role ) => {
          role.membershipType = RoleMembershipType.ADMINISTRATOR;
        } );
        return roles;
      } ) );
  }

  private findAllMemberOfRoles (): Observable<Role[]> {
    return this.roleService.findAllMemberOfRoles ( this.wizard.model.user.id )
      .pipe ( map ( ( roles: Role[] ) => {
        roles.forEach ( ( role: Role ) => {
          role.membershipType = RoleMembershipType.MEMBER;
        } );
        return roles;
      } ) );
  }

  public findAdmins (): void {
    let uid = this.securityService.getCurrentUser ().id;
    this.roleService.findAllAdminOfRoles ( uid )
      .subscribe ( ( role: Role[] ) => {
        this.archRolesSelect.push.apply ( this.archRolesSelect, role );
        this.initMasterSelect ();

      } )
  }

  public findMembers (): void {
    let uid = this.securityService.getCurrentUser ().id;
    this.roleService.findAllMemberOfRoles ( uid )
      .subscribe ( ( role: Role[] ) => {
        this.archRolesSelect.push.apply ( this.archRolesSelect, role );
        this.initMasterSelect ();
      } )
  }

  initMasterSelect (): void {
    let masterRoles  = this.archRolesSelect;
    this.masterRoles = _.filter ( masterRoles, ( masterRole: Role ) => {
      return !_.find ( this.roles, ( role: Role ) => {
        return role.id === masterRole.id;
      } )
    } )
  }

  private initForms (): void {
    this.wizardForm = new FormGroup ( {
      roleControl: new FormControl ( null, [ Validators.required ] ),
      typeControl: new FormControl ( null, [ Validators.required ] )
    } );

    this.subscribeWizardFormChanges ()
  }

  private subscribeWizardFormChanges (): void {
    this.addSubscription (
      this.wizardForm.valueChanges
        .subscribe ( {
          next: value => {
            if ( value.roleControl && value.typeControl ) {
              this.addUserToRole ( value );
            }
          }
        } )
    );
  }

  private addUserToRole ( value ): void {

    if ( value.typeControl == "ADMIN" || value.typeControl == "BOTH" ) {
      this.addAdminToRole ( value.roleControl, this.wizard.model.user.id );
    }
    if ( value.typeControl == "MEMBER" || value.typeControl == "BOTH" ) {
      this.addMemberToRole ( value.roleControl, this.wizard.model.user.id );
    }
    this.clearSelects ()
  }

  private clearSelects () {
    this.wizardForm.reset ()
  }

  updateRoles ( event: Role ): void {
    this.roles = _.reject ( this.roles, ( role: Role ) => {
      return role.id === event.id;
    } );
    this.initMasterSelect ()
  }
}
