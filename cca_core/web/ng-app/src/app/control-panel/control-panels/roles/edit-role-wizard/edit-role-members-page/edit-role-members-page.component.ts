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
import { ControlPanelUsersService } from "../../../users/control-panel-users.service";
import { MatAutocompleteSelectedEvent } from "@angular/material";

@Component ( {
  selector: 'cca-edit-role-members-page',
  templateUrl: './edit-role-members-page.component.html',
  styleUrls: [ './edit-role-members-page.component.scss' ]
} )
export class EditRoleMembersPageComponent extends WizardPage<EditRoleWizard> implements OnInit {
  archMembers: User[]     = [];
  addMemberControl        = new FormControl ();
  key: string             = 'members-page';
  filteredOptions: User[] = [];
  members: User[]         = [];
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor ( private groupService: ControlPanelGroupsService,
                private rolesService: ControlPanelRolesService,
                private userService: ControlPanelUsersService,
                private toast: ToastFactory ) {
    super ();
    this.isBackable       = true;
    this.isCloseable      = true;
    this.isDeletable      = false;
    this.isNextable       = true;
    this.backButtonText   = 'Back';
    this.deleteButtonText = 'Delete Role';
    this.nextButtonText   = 'Next';
  }

  ngOnInit () {
    this.initForm ();
    this.manageDelete ();
    this.members     = this.wizard.model.role.members;
    this.archMembers = _.cloneDeep ( this.members );
  }

  onDelete (): Observable<any> {
    return this.rolesService.deleteRole ( this.wizard.model.role.id );
  }

  onNext (): Observable<string> {
    return of ( 'permissions-page' );
  }

  public addMember ( event: MatAutocompleteSelectedEvent ) {
    let value: User = event.option.value;
    let user = this.getUserId ( this.filteredOptions, value );
    this.rolesService.addMemberToRole ( this.wizard.model.role.id, user.id )
      .pipe ( debounceTime ( 300 ) )
      .subscribe ( ( data ) => {
        this.members = _.cloneDeep ( data.members );
        this.successToast ( 'Successfully updated Members' );
        event.option.deselect ()
      } )
  }

  public displayNull (): null {
    return null;
  }

  public updateMembers ( event ) {
    this.members     = event.members;
    this.archMembers = _.cloneDeep ( this.members );
    this.successToast ( 'Successfully updated Members' );
  }

  private getUserId ( obj, uname ) {
    return (_.find ( obj, [ 'username', uname ] ));
  }

  private findOwners ( id, str ): void {
    this.userService.findAllWhereUsernameStartsWith ( id, str )
      .subscribe ( ( data ) => {
        this.filteredOptions = data;
        this.archMembers     = _.cloneDeep ( this.members );
      } )
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      memberControl: new FormControl ( '', [] )
    } );
    this.subscribeOwnerFormChanges ();
    this.subscribeAddOwnerFormChanges ();
  }

  private manageDelete (): void {
    if ( !this.wizard.model.role.isLocked ) {
      this.isDeletable = true;
    }
  }

  private subscribeAddOwnerFormChanges (): void {
    this.addSubscription (
      this.addMemberControl.valueChanges
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
            this.members = filterByString ( this.archMembers, value.memberControl, 'username' );
          }
        } )
    );
  }

  private successToast ( message: string ): void {
    this.toast.success ( message );
  }
}
