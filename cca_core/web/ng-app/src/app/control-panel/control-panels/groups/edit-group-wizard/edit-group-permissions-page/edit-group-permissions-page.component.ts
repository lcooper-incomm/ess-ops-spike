import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { EditGroupWizard } from "../edit-group-wizard";
import { FormGroup } from "@angular/forms";
import { ControlPanelGroupsService } from "../../control-panel-groups.service";
import { Observable } from "rxjs";

@Component ( {
  selector: 'cca-edit-group-permissions-page',
  templateUrl: './edit-group-permissions-page.component.html',
  styleUrls: [ './edit-group-permissions-page.component.scss' ]
} )
export class EditGroupPermissionsPageComponent extends WizardPage<EditGroupWizard> implements OnInit {
  key: string           = 'permissions-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private groupService: ControlPanelGroupsService ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isDeletable     = false;
    this.backButtonText  = 'Back';
  }

  ngOnInit () {
    this.manageDelete ();
  }

  onDelete (): Observable<any> {
    return this.groupService.deleteGroup ( this.wizard.model.group.id );
  }

  private manageDelete () {
    if ( !this.wizard.model.group.isLocked ) {
      this.isDeletable = true;
    }
  }

}
