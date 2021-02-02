import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { Observable, of } from "rxjs";
import { Role } from "../../../../../core/auth/role";
import { ControlPanelRolesService } from "../../control-panel-roles.service";
import { map } from "rxjs/operators";
import { EditRoleWizard } from "../edit-role-wizard";
import { ToastFactory } from "../../../../../toast/toast-factory.service";
import * as _ from "lodash";

@Component ( {
  selector: 'cca-edit-role-page',
  templateUrl: './edit-role-page.component.html',
  styleUrls: [ './edit-role-page.component.scss' ]
} )
export class EditRolePageComponent extends WizardPage<EditRoleWizard> implements OnInit {
  key: string           = 'role-page';
  wizardForm: FormGroup = new FormGroup ( {} );
  role: Role;
  initFormData: any[];

  constructor ( private rolesService: ControlPanelRolesService,
                private toast: ToastFactory ) {
    super ();
    this.isCloseable      = true;
    this.isDeletable      = false;
    this.isNextable       = true;
    this.deleteButtonText = 'Delete Role';
    this.nextButtonText   = 'Next';
  }

  ngOnInit () {
    this.role = this.wizard.model[ 'role' ];
    this.initForm ();
    this.manageLocked ();
    this.manageDelete ();
    this.setInitFormData ();
  }

  onDelete (): Observable<Role> {
    return this.rolesService.deleteRole ( this.wizard.model.role.id );
  }

  onLoad (): Observable<any> {
    return this.rolesService.findOne ( this.wizard.model.role.id )
      .pipe ( map ( ( role: Role ) => {
        this.wizard.model.role = role;
        this.role              = role;
        this.setInitFormData ();
      } ) );

  }

  onNext (): Observable<string> {
    if ( this.formDataHasChanged () ) {
      return this.update ()
        .pipe ( map ( () => {
          return 'administrators-page';
        } ) );
    }
    return of ( 'administrators-page' );
  }

  private active () {
    this.rolesService.inactive ( this.role.id )
      .subscribe ( ( data ) => {
        this.role.isActive = data[ 'isActive' ];
        this.successToast ( 'Successfully updated Role' );
      } )
  }

  private formDataHasChanged () {
    return !_.isEqual ( this.initFormData, this.wizardForm.value );
  }

  private inactive () {
    this.rolesService.active ( this.role.id )
      .subscribe ( ( data ) => {
        this.role.isActive = data[ 'isActive' ];
        this.successToast ( 'Successfully updated Role' );
      } )
  }

  toggleActive ( isActive ) {
    return (isActive ? this.active () : this.inactive ());
  }

  private initForm () {
    this.wizardForm = new FormGroup ( {
      displayName: new FormControl ( this.role.displayName, [ Validators.required ] ),
      description: new FormControl ( this.role.description, [] )
    } );
  }

  private manageDelete () {
    if ( !this.role.isLocked ) {
      this.isDeletable = true;
    }
  }

  private manageLocked () {
    if ( this.role.isLocked ) {
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

  private update (): Observable<any> {
      let data = {
        "displayName": this.wizardForm.value.displayName,
        "description": this.wizardForm.value.description,
        "id": this.role.id,
        group: {
          id: this.role.group.id
        }
      };
    return this.rolesService.updateRole ( data )
      .pipe ( map ( () => {
        this.successToast ( 'Successfully updated Role' );
      } ) );
  }

}
