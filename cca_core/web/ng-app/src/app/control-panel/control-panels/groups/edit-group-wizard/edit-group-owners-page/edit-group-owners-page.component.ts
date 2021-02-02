import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { EditGroupWizard } from "../edit-group-wizard";
import { FormControl, FormGroup } from "@angular/forms";
import { ControlPanelGroupsService } from "../../control-panel-groups.service";
import { ToastFactory } from "../../../../../toast/toast-factory.service";
import { Observable, of } from "rxjs";
import { filterByString } from "../../../control-panel-utils";
import { debounceTime } from "rxjs/operators";
import { Group } from "../../../../../core/auth/group";
import * as _ from "lodash";
import { User } from "../../../../../core/user/user";
import { ControlPanelUsersService } from "../../../users/control-panel-users.service";

@Component ( {
  selector: 'cca-edit-group-owners-page',
  templateUrl: './edit-group-owners-page.component.html',
  styleUrls: [ './edit-group-owners-page.component.scss' ]
} )
export class EditGroupOwnersPageComponent extends WizardPage<EditGroupWizard> implements OnInit {
  addOwnerControl         = new FormControl ();
  archOwners: User[];
  group: Group;
  key: string             = 'owners-page';
  filteredOptions: User[] = [];
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor ( private groupService: ControlPanelGroupsService,
                private userService: ControlPanelUsersService,
                private toast: ToastFactory ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isDeletable     = false;
    this.isNextable      = true;
    this.backButtonText  = 'Back';
    this.nextButtonText  = 'Next';
  }

  ngOnInit () {
    this.initForm ();
    this.group      = _.cloneDeep ( this.wizard.model.group );
    this.archOwners = _.cloneDeep ( this.group[ 'owners' ] );
    this.manageDelete ();
  }

  onDelete (): Observable<any> {
    return this.groupService.deleteGroup ( this.wizard.model.group.id );
  }

  onNext (): Observable<any> {
    return of ( 'roles-page' );
  }

  addOwner ( value ): void {
    let user = this.getUserId ( this.filteredOptions, value );
    this.groupService.addOwnerToGroup ( this.group.id, user.id )
      .subscribe ( ( data ) => {
        this.group.owners = _.cloneDeep ( data.owners );
        this.archOwners   = _.cloneDeep ( data.owners );
        this.successToast ( 'Successfully updated Owners' );
      } )
  }

  public updateOwners ( event ): void {
    this.group.owners = _.cloneDeep ( event.owners );
    this.archOwners   = _.cloneDeep ( this.group.owners );
    this.successToast ( 'Successfully updated Owners' );
  }

  private findOwners ( id, str ): void {
    this.userService.findAllWhereUsernameStartsWith ( id, str )
      .subscribe ( ( data ) => {
        this.filteredOptions = data;
      } )
  }

  private getUserId ( obj, uname ): any {
    return (_.find ( obj, [ 'username', uname ] ));
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      ownerControl: new FormControl ( '', [] )
    } );
    this.subscribeOwnerFormChanges ();
    this.subscribeAddOwnerFormChanges ();
  }

  private manageDelete (): void {
    if ( !this.group.isLocked ) {
      this.isDeletable = true;
    }
  }

  private subscribeAddOwnerFormChanges (): void {
    this.addSubscription (
      this.addOwnerControl.valueChanges
        .pipe ( debounceTime ( 300 ) )
        .subscribe ( {
          next: value => {
            this.findOwners ( this.group.id, value )
          }
        } )
    );
  }

  private subscribeOwnerFormChanges (): void {
    this.addSubscription (
      this.wizardForm.valueChanges
        .subscribe ( {
          next: value => {
            this.group.owners = filterByString ( this.archOwners, value.ownerControl, 'username' );
          }
        } )
    );
  }

  private successToast ( message: string ) {
    this.toast.success ( message );
  }

}
