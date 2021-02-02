import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ToastFactory } from "../../../../../toast/toast-factory.service";
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ControlPanelUsersService } from "../../control-panel-users.service";
import { User } from "../../../../../core/user/user";
import { EditUserWizard } from "../edit-user-wizard";
import * as _ from "lodash";

@Component ( {
  selector: 'cca-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: [ './edit-user-page.component.scss' ]
} )
export class EditUserPageComponent extends WizardPage<EditUserWizard> implements OnInit {
  initFormData: any[];
  key: string           = 'user-page';
  user: User;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private userService: ControlPanelUsersService,
                private toast: ToastFactory ) {
    super ();
    this.isCloseable     = true;
    this.isDeletable     = false;
    this.isNextable      = true;
    this.nextButtonText  = 'Next';
  }

  ngOnInit () {
    this.user = this.wizard.model.user;
    this.initForm ();
    this.setInitFormData ();
  }

  onDelete (): Observable<User> {
    return this.userService.deleteUser ( this.wizard.model.user.id );
  }

  onLoad (): Observable<any> {
    this.setInitFormData ();
    return of ( null );
  }

  onNext (): Observable<string> {
    if ( this.formDataHasChanged () ) {
      return this.update ()
        .pipe ( map ( () => {
          return 'owners-page';
        } ) );
    }
    return of ( 'owners-page' );
  }

  toggleActive ( isActive ) {
    return (isActive ? this.active () : this.inactive ());
  }

  private active () {
    this.userService.inactive ( this.user.id )
      .subscribe ( ( data ) => {
        this.user.isActive = data[ 'isActive' ];
        this.successToast ( 'Successfully updated Role' );
      } )
  }

  private formDataHasChanged () {
    return !_.isEqual ( this.initFormData, this.wizardForm.value );
  }

  private inactive () {
    this.userService.active ( this.user.id )
      .subscribe ( ( data ) => {
        this.user.isActive = data[ 'isActive' ];
        this.successToast ( 'Successfully updated Role' );
      } )
  }

  private initForm () {
    this.wizardForm = new FormGroup ( {
      firstName: new FormControl ( this.user.firstName, [] ),
      lastName: new FormControl ( this.user.lastName, [] ),
      email: new FormControl ( this.user.email, [] )
    } );
  }

  private setInitFormData () {
    this.initFormData = _.cloneDeep ( this.wizardForm.value );
  }

  private successToast ( message: string ) {
    this.toast.success ( message );
  }

  private update (): Observable<any> {
    let displayName = `${this.wizardForm.value.firstName} ${this.wizardForm.value.lastName}`.trim ();

    let data: any = {
      displayName: displayName,
      firstName: this.wizardForm.value.firstName,
      lastName: this.wizardForm.value.lastName,
      email: this.wizardForm.value.email,
      id: this.user.id
    };
    return this.userService.updateUser ( data )
      .pipe ( map ( () => {
        this.successToast ( 'Successfully updated User' );
      } ) );
  }
}
