import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { CreateUserWizard } from "../create-user-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ToastFactory } from "../../../../../toast/toast-factory.service";
import { ControlPanelUsersService } from "../../control-panel-users.service";
import { User } from "../../../../../core/user/user";
import * as _ from "lodash";

@Component ( {
  selector: 'cca-create-user-form-page',
  templateUrl: './create-user-form-page.component.html',
  styleUrls: [ './create-user-form-page.component.scss' ]
} )
export class CreateUserFormPageComponent extends WizardPage<CreateUserWizard> implements OnInit {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private userService: ControlPanelUsersService,
                private toast: ToastFactory ) {
    super ();
    this.isNextable      = true;
    this.isCloseable     = true;
    this.nextButtonText  = 'Save';
    this.closeButtonText = 'Cancel';
  }

  ngOnInit () {
    this.initForms ();
  }

  onNext (): Observable<string> {
    if ( this.checkForExisting () ) {
      this.toast.warn ( 'A User already exists with this name.' );
      return of ( 'form-page' );
    } else {
      return this.userService.createUser ( this.wizardForm.value )
        .pipe ( map ( ( user: User ) => {
          this.wizard.model.user = user;
          return null;
        } ) );
    }
  }

  private checkForExisting (): boolean {
    let match = _.find ( this.wizard.model.users, ( user ) => {
      return this.wizardForm.value.username.toLowerCase () === user.username.toLowerCase ();
    } );
    return !!match;
  }

  private initForms (): void {
    this.wizardForm = new FormGroup ( {
      username: new FormControl ( [], [ Validators.required ] ),
      firstName: new FormControl (),
      lastName: new FormControl (),
      email: new FormControl (),
      active: new FormControl ( true )
    } );
  }
}
