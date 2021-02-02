import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { CreateRoleWizard } from "../create-role-wizard";
import { ControlPanelGroupsService } from "../../../groups/control-panel-groups.service";
import { ControlPanelRolesService } from "../../control-panel-roles.service";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ToastFactory } from "../../../../../toast/toast-factory.service";
import * as _ from "lodash";
import { Role } from "../../../../../core/auth/role";
import { Group } from "../../../../../core/auth/group";
import { ControlPanelUsersService } from "../../../users/control-panel-users.service";
import { SecurityService } from "../../../../../core/security/security.service";

@Component ( {
  selector: 'cca-create-role-form-page',
  templateUrl: './create-role-form-page.component.html',
  styleUrls: [ './create-role-form-page.component.scss' ]
} )
export class CreateRoleFormPageComponent extends WizardPage<CreateRoleWizard> {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup ( {} );
  roles: Role[]         = [];
  groups: Group[]       = [];

  constructor ( private groupService: ControlPanelGroupsService,
                private rolesService: ControlPanelRolesService,
                private securityService: SecurityService,
                private toast: ToastFactory,
                private userService: ControlPanelUsersService ) {
    super ();
    this.isNextable      = true;
    this.isCloseable     = true;
    this.nextButtonText  = 'Save';
    this.closeButtonText = 'Cancel';
  }

  ngOnInit (): void {
    this.initForms ();
  }

  onLoad (): Observable<any> {
    let userId = this.securityService.getCurrentUser ().id;
    return this.userService.findAllGroups ( userId )
      .pipe ( map ( ( groups: Group[] ) => {
        this.groups = groups;

        //Auto-select a single option
        if ( this.groups.length === 1 ) {
          let groupControl = this.wizardForm.get ( 'group' );
          groupControl.setValue ( this.groups[ 0 ] );
          groupControl.disable ();
        }
      } ) );
  }

  onNext (): Observable<string> {
    if ( this.checkForExisting () ) {
      this.toast.warn ( 'A Role already exists with this name.' );
      return of ( 'form-page' );
    } else {
      return this.rolesService.createRole ( this.wizardForm.getRawValue (), this.wizardForm.value.rolesListControl )
        .pipe ( map ( ( role: Role ) => {
          this.wizard.model.role = role;
          return null;
        } ) );
    }
  }

  private checkForExisting (): boolean {
    let match = _.find ( this.wizard.model.roles, ( role ) => {
      return this.wizardForm.value.displayName.toLowerCase () === role.displayName.toLowerCase ();
    } );
    return !!match;
  }

  private initForms (): void {
    this.wizardForm = new FormGroup ( {
      displayName: new FormControl ( '', [ Validators.required ] ),
      description: new FormControl ( '', [] ),
      active: new FormControl ( true, [] ),
      group: new FormControl ( '', [ Validators.required ] ),
      rolesListControl: new FormControl ( '' )
    } );
  }

}
