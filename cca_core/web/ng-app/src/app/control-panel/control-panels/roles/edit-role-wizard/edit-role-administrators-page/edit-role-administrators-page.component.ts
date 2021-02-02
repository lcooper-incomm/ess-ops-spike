import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { ControlPanelRolesService } from "../../control-panel-roles.service";
import { EditRoleWizard } from "../edit-role-wizard";
import { debounceTime } from "rxjs/operators";
import { filterByString } from "../../../control-panel-utils";
import { ControlPanelGroupsService } from "../../../groups/control-panel-groups.service";
import * as _ from "lodash";
import { ToastFactory } from "../../../../../toast/toast-factory.service";
import { User } from "../../../../../core/user/user";
import { Role } from "../../../../../core/auth/role";
import { ControlPanelUsersService } from "../../../users/control-panel-users.service";
import { MatAutocompleteSelectedEvent } from "@angular/material";

@Component ( {
  selector: 'cca-edit-role-administrators-page',
  templateUrl: './edit-role-administrators-page.component.html',
  styleUrls: [ './edit-role-administrators-page.component.scss' ]
} )
export class EditRoleAdministratorsPageComponent extends WizardPage<EditRoleWizard> implements OnInit {
  addAdminControl         = new FormControl ();
  admins: User[]          = [];
  archAdmins: User[]      = [];
  filteredOptions: User[] = [];
  key: string             = 'administrators-page';
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor ( private groupService: ControlPanelGroupsService,
                private rolesService: ControlPanelRolesService,
                private userService: ControlPanelUsersService,
                private toast: ToastFactory ) {
    super ();
    this.isCloseable      = true;
    this.isDeletable      = false;
    this.isNextable       = true;
    this.isBackable       = true;
    this.deleteButtonText = 'Delete Role';
    this.nextButtonText   = 'Next';
  }

  addAdmin ( event: MatAutocompleteSelectedEvent ): void {
    let value: User = event.option.value;
    let user = this.getUserId ( this.filteredOptions, value );
    this.rolesService.addAdminToRole ( this.wizard.model.role.id, user.id )
      .pipe ( debounceTime ( 300 ) )
      .subscribe ( ( data: Role ) => {
        this.admins     = _.cloneDeep ( data.admins );
        this.archAdmins = _.cloneDeep ( data.admins );
        this.successToast ( 'Successfully updated Administrators' );
        event.option.deselect ()
      } )
  }
  
  ngOnInit () {
    this.initForm ();
    this.manageDelete ();
    this.admins     = this.wizard.model.role.admins;
    this.archAdmins = _.cloneDeep ( this.admins );
  }

  onDelete (): Observable<any> {
    return this.rolesService.deleteRole ( this.wizard.model.role.id );
  }

  onNext (): Observable<string> {
    return of ( 'members-page' );
  }

  public displayNull (): null {
    return null;
  }

  public updateAdmins ( event ) {
    this.admins     = event.admins;
    this.archAdmins = _.cloneDeep ( this.admins );
    this.successToast ( 'Successfully updated Administrators' );
  }

  private getUserId ( obj, uname ) {
    return (_.find ( obj, [ 'username', uname ] ));
  }

  private findOwners ( id, str ): void {
    this.userService.findAllWhereUsernameStartsWith ( id, str )
      .subscribe ( ( data ) => {
        this.filteredOptions = data;
        this.archAdmins      = _.cloneDeep ( this.admins );
      } )
  }

  private initForm () {
    this.wizardForm = new FormGroup ( {
      adminControl: new FormControl ( '', [] )
    } );
    this.subscribeOwnerFormChanges ();
    this.subscribeAddOwnerFormChanges ();
  }

  private manageDelete () {
    if ( !this.wizard.model.role.isLocked ) {
      this.isDeletable = true;
    }
  }

  private subscribeAddOwnerFormChanges (): void {
    this.addSubscription (
      this.addAdminControl.valueChanges
        .pipe ( debounceTime ( 300 ) )
        .subscribe ( {
          next: value => {
            this.findOwners ( this.wizard.model.role.group.id, value )
          }
        } )
    );
  }

  private subscribeOwnerFormChanges (): void {
    this.addSubscription (
      this.wizardForm.valueChanges
        .subscribe ( {
          next: value => {
            this.admins = filterByString ( this.archAdmins, value.adminControl, 'username' );
          }
        } )
    );
  }

  private successToast ( message: string ) {
    this.toast.success ( message );
  }
}
