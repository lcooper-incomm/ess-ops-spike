import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { ControlPanelGroupsService } from "../../control-panel-groups.service";
import { ToastFactory } from "../../../../../toast/toast-factory.service";
import { EditGroupWizard } from "../edit-group-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Group } from "../../../../../core/auth/group";
import { Observable, of } from "rxjs";
import * as _ from "lodash";
import { map } from "rxjs/operators";

@Component ( {
  selector: 'cca-edit-group-page',
  templateUrl: './edit-group-page.component.html',
  styleUrls: [ './edit-group-page.component.scss' ]
} )
export class EditGroupPageComponent extends WizardPage<EditGroupWizard> implements OnInit {
  key: string           = 'group-page';
  wizardForm: FormGroup = new FormGroup ( {} );
  displayName: FormControl;
  description: FormControl;
  group: Group;
  initFormData: any;

  constructor ( private groupService: ControlPanelGroupsService,
                private toast: ToastFactory ) {
    super ();
    this.isCloseable      = true;
    this.isDeletable      = false;
    this.isNextable       = true;
    this.deleteButtonText = 'Delete Group';
    this.nextButtonText   = 'Next';
  }

  ngOnInit () {
    this.group = _.cloneDeep ( this.wizard.model.group );
    this.initForm ();
    this.setInitFormData ();
    this.manageLocked ();
  }

  onDelete (): Observable<any> {
    return this.groupService.deleteGroup ( this.wizard.model.group.id );
  }

  onLoad (): Observable<string> {
    this.setInitFormData ();
    return this.findOne ( this.wizard.model.group.id );
  }

  onNext (): Observable<string> {
    if ( this.formDataHasChanged () ) {
      this.update ();
    }
    return of ( 'owners-page' );
  }

  private active () {
    this.groupService.inactive ( this.group.id )
      .subscribe ( ( data ) => {
        this.group.isActive = data[ 'isActive' ];
        this.successToast ( 'Successfully updated Group' );
      } )
  }

  private findOne ( id ): Observable<any> {
    return this.groupService.findOne ( id )
      .pipe ( map ( ( data ) => {
        this.wizard.model.group = data;
        this.group              = _.cloneDeep ( data );
        this.manageDelete ();
        this.isInitialized = true;
      } ) );
  }

  private formDataHasChanged () {
    if ( _.isEqual ( this.initFormData, this.wizardForm.value ) ) {
      return false
    } else {
      return true
    }
  }

  toggleActive ( isActive ) {
    return (isActive ? this.active () : this.inactive ());
  }

  private inactive () {
    this.groupService.active ( this.group.id )
      .subscribe ( ( data ) => {
        this.group.isActive = data[ 'isActive' ];
        this.successToast ( 'Successfully updated Group' );
      } )
  }

  private initForm () {
    this.wizardForm = new FormGroup ( {
      displayName: new FormControl ( this.group.displayName, [ Validators.required ] ),
      description: new FormControl ( this.group.description, [] ),
    } );
  }

  private manageDelete () {
    if ( !this.group.isLocked ) {
      this.isDeletable = true;
    }
  }

  private manageLocked () {
    if ( this.group.isLocked ) {
      this.wizardForm.controls.displayName.disable ();
      this.wizardForm.controls.description.disable ();
    }
  }

  private setInitFormData () {
    this.initFormData = _.cloneDeep ( this.wizardForm.value );
  }

  private successToast ( message: string ) {
    this.toast.success ( message );
  }

  private update () {
    if ( !this.wizardForm.value.displayName ) {
      this.warnToast ( 'Display Name is a required field.' )
    } else {
      let data = {
        "displayName": this.wizardForm.value.displayName,
        "description": this.wizardForm.value.description,
        "id": this.group.id
      };

      this.groupService.updateGroup ( data )
        .subscribe ( ( value ) => {
          this.successToast ( 'Successfully updated Group' );
        } )
    }
  }

  private warnToast ( message: string ) {
    this.toast.warn ( message );
  }
}
