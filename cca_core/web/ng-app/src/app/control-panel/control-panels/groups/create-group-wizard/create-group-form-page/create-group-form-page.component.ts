import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { CreateGroupWizard } from "../create-group-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { ControlPanelGroupsService } from "../../control-panel-groups.service";
import * as _ from "lodash";
import { map } from "rxjs/operators";
import { ToastFactory } from "../../../../../toast/toast-factory.service";
import { Group } from "../../../../../core/auth/group";

@Component ( {
  selector: 'cca-create-group-form-page',
  templateUrl: './create-group-form-page.component.html',
  styleUrls: [ './create-group-form-page.component.scss' ]
} )
export class CreateGroupFormPageComponent extends WizardPage<CreateGroupWizard> implements OnInit {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private groupService: ControlPanelGroupsService,
                private toast: ToastFactory ) {
    super ();
    this.isNextable      = true;
    this.isCloseable     = true;
    this.nextButtonText  = 'Save';
    this.closeButtonText = 'Cancel';
  }

  ngOnInit () {
    this.initForm ();
  }

  onNext (): Observable<string> {
    if ( this.checkForExisting () ) {
      this.toast.warn ( 'A Group already exists with this name.' );
      return of ( 'form-page' );
    } else {
      return this.groupService.createGroup ( this.wizardForm.value, this.wizardForm.value.groupListControl )
        .pipe ( map ( ( group: Group ) => {
          this.wizard.model.group = group;
          return null;
        } ) );
    }
  }

  private checkForExisting (): boolean {
    let match = _.find ( this.wizard.model.groups, ( group ) => {
      return this.wizardForm.value.displayName.toLowerCase () === group.displayName.toLowerCase ();
    } );
    return !!match;
  }

  private initForm () {
    this.wizardForm = new FormGroup ( {
      displayName: new FormControl ( '', [ Validators.required ] ),
      description: new FormControl ( '', [] ),
      active: new FormControl ( true, [] ),
      groupListControl: new FormControl ( '' )
    } );
  }
}
