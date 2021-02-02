import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { FormGroup } from "@angular/forms";
import { ControlPanelRolesService } from "../../control-panel-roles.service";
import { EditRoleWizard } from "../edit-role-wizard";
import { Observable } from "rxjs";
import { Permission } from "../../../../../core/auth/permission";

@Component ( {
  selector: 'cca-edit-role-permissions-page',
  templateUrl: './edit-role-permissions-page.component.html',
  styleUrls: [ './edit-role-permissions-page.component.scss' ]
} )
export class EditRolePermissionsPageComponent extends WizardPage<EditRoleWizard> implements OnInit {
  key: string               = 'permissions-page';
  wizardForm: FormGroup     = new FormGroup ( {} );
  permissions: Permission[] = [];

  constructor ( private rolesService: ControlPanelRolesService ) {
    super ();
    this.isBackable       = true;
    this.isCloseable      = true;
    this.isDeletable      = false;
    this.backButtonText   = 'Back';
    this.deleteButtonText = 'Delete Role';
  }

  ngOnInit () {
    this.manageDelete ()
  }

  onDelete (): Observable<any> {
    return this.rolesService.deleteRole ( this.wizard.model.role.id );
  }

  private manageDelete () {
    if ( !this.wizard.model.role.isLocked ) {
      this.isDeletable = true;
    }
  }
}
