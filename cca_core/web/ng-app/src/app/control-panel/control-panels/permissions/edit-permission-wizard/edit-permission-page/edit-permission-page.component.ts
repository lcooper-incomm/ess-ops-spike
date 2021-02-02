import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EditPermissionWizard } from "../edit-permission-wizard";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Permission } from "../../../../../core/auth/permission";
import { ControlPanelPermissionService } from "../../control-panel-permission.service";
import { ToastFactory } from "../../../../../toast/toast-factory.service";
import * as _ from "lodash";
import { PermissionCategory } from "../../../../../core/auth/permission-category";

@Component ( {
  selector: 'cca-edit-permission-page',
  templateUrl: './edit-permission-page.component.html',
  styleUrls: [ './edit-permission-page.component.scss' ]
} )
export class EditPermissionPageComponent extends WizardPage<EditPermissionWizard> implements OnInit {
  categories: PermissionCategory[] = [];
  initFormData: any[];
  key: string                      = 'permission-page';
  permission: Permission;
  wizardForm: FormGroup            = new FormGroup ( {} );

  constructor ( private permissionService: ControlPanelPermissionService,
                private toast: ToastFactory ) {
    super ();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Next';
  }

  ngOnInit () {
    this.permission = this.wizard.model.permission;
    this.initForm ();
    this.setInitFormData ();
  }

  onLoad (): Observable<any> {
    return this.permissionService.findAllCategories ()
      .pipe ( map ( ( category: PermissionCategory[] ) => {
        this.categories = category;
        this.setInitFormData ();
      } ) );
  }

  onNext (): Observable<string> {
    if ( this.formDataHasChanged () ) {
      return this.update ()
        .pipe ( map ( () => {
          return 'groups-page';
        } ) );
    }
    return of ( 'groups-page' );
  }

  toggleActive ( isActive ): void {
    return (isActive ? this.active () : this.inactive ());
  }

  private active (): void {
    this.permissionService.inactive ( this.permission.id )
      .subscribe ( ( data ) => {
        this.permission.isActive = data[ 'isActive' ];
        this.successToast ( 'Successfully updated Role' );
      } )
  }

  private formDataHasChanged (): boolean {
    return !_.isEqual ( this.initFormData, this.wizardForm.value );
  }

  private inactive (): void {
    this.permissionService.active ( this.permission.id )
      .subscribe ( ( data ) => {
        this.permission.isActive = data[ 'isActive' ];
        this.successToast ( 'Successfully updated Role' );
      } )
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      displayName: new FormControl ( this.permission.displayName, [ Validators.required ] ),
      description: new FormControl ( this.permission.description, [] ),
      category: new FormControl ( this.permission.category.id, [] )
    } );
  }

  private setInitFormData (): void {
    this.initFormData = _.cloneDeep ( this.wizardForm.value );
  }

  private successToast ( message: string ) {
    this.toast.success ( message );
  }

  private update (): Observable<any> {
      let data = {
        "displayName": this.wizardForm.value.displayName,
        "description": this.wizardForm.value.description,
        "id": this.permission.id,
        category: {
          id: this.wizardForm.value.category
        }
      };

    return this.permissionService.updatePermission ( data )
      .pipe ( map ( () => {
        this.successToast ( 'Successfully updated User' );
      } ) );
  }

}
