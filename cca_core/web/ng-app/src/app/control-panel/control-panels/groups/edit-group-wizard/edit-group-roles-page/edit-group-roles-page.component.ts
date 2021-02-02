import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { EditGroupWizard } from "../edit-group-wizard";
import { FormControl, FormGroup } from "@angular/forms";
import { ControlPanelGroupsService } from "../../control-panel-groups.service";
import { Observable, of } from "rxjs";
import { Group } from "../../../../../core/auth/group";
import { filterByString } from "../../../control-panel-utils";
import * as _ from "lodash";
import { Role } from "../../../../../core/auth/role";

@Component ( {
  selector: 'cca-edit-group-roles-page',
  templateUrl: './edit-group-roles-page.component.html',
  styleUrls: [ './edit-group-roles-page.component.scss' ]
} )
export class EditGroupRolesPageComponent extends WizardPage<EditGroupWizard> implements OnInit {
  key: string           = 'roles-page';
  wizardForm: FormGroup = new FormGroup ( {} );
  group: Group;
  archRoles: Role[];

  constructor ( private groupService: ControlPanelGroupsService ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isDeletable     = false;
    this.isNextable      = true;
    this.backButtonText  = 'Back';
    this.nextButtonText  = 'Next';
  }

  ngOnInit () {
    this.group     = _.cloneDeep ( this.wizard.model.group );
    this.archRoles = _.cloneDeep ( this.group.roles );
    this.initForm ();
    this.manageDelete ()
  }

  onDelete (): Observable<any> {
    return this.groupService.deleteGroup ( this.wizard.model.group.id );
  }

  onNext (): Observable<string> {
    return of ( 'permissions-page' );
  }

  private initForm () {
    this.wizardForm = new FormGroup ( {
      rolesControl: new FormControl ( '', [] ),

    } );
    this.subscribeRolesFormChanges ()
  }

  private manageDelete () {
    if ( !this.group.isLocked ) {
      this.isDeletable = true;
    }
  }

  private subscribeRolesFormChanges (): void {
    this.addSubscription (
      this.wizardForm.valueChanges
        .subscribe ( {
          next: value => {
            this.group.roles = filterByString ( this.archRoles, value.rolesControl, 'displayName' );
          }
        } )
    );
  }

}
