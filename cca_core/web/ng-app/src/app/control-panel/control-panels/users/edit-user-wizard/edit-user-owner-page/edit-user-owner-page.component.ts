import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { User } from "../../../../../core/user/user";
import { FormControl, FormGroup } from "@angular/forms";
import { EditUserWizard } from "../edit-user-wizard";
import { Observable, of } from "rxjs";
import { ControlPanelUsersService } from "../../control-panel-users.service";
import { map } from "rxjs/operators";
import { Group } from "../../../../../core/auth/group";
import { SecurityService } from "../../../../../core/security/security.service";
import * as _ from "lodash";
import { ControlPanelGroupsService } from "../../../groups/control-panel-groups.service";
import { filterByString } from "../../../control-panel-utils";
import { ToastFactory } from "../../../../../toast/toast-factory.service";

@Component ( {
  selector: 'cca-edit-user-owner-page',
  templateUrl: './edit-user-owner-page.component.html',
  styleUrls: [ './edit-user-owner-page.component.scss' ]
} )
export class EditUserOwnerPageComponent extends WizardPage<EditUserWizard> implements OnInit {
  archOwners: Group[]   = [];
  key: string           = 'owners-page';
  wizardForm: FormGroup = new FormGroup ( {} );
  selectForm: FormGroup = new FormGroup ( {} );
  ownerGroups: Group[]  = [];
  masterGroups: Group[] = [];

  constructor ( private groupService: ControlPanelGroupsService,
                private securityService: SecurityService,
                private toastFactory: ToastFactory,
                private userService: ControlPanelUsersService
  ) {
    super ();
    this.isCloseable    = true;
    this.isDeletable    = false;
    this.isNextable     = true;
    this.isBackable     = true;
    this.nextButtonText = 'Next';
  }

  ngOnInit () {
    this.initForms ();
  }

  onDelete (): Observable<User> {
    return this.userService.deleteUser ( this.wizard.model.user.id );
  }

  onLoad (): Observable<any> {
    return this.userService.findAllGroups ( this.wizard.model.user.id )
      .pipe ( map ( ( group: Group[] ) => {
        this.ownerGroups = group;
        this.archOwners  = this.ownerGroups;
        this.initMasterSelect ();
      } ) );
  }

  onNext (): Observable<string> {
    return of ( 'roles-page' );
  }

  private addOwnerToGroup ( gid ): void {
    this.groupService.addOwnerToGroup ( gid, this.wizard.model.user.id )
      .subscribe ( ( group: Group ) => {
        this.toastFactory.success ( 'User added as Group Owner successfully' );
        this.ownerGroups = [ ...this.ownerGroups, group ];
        this.initMasterSelect ();
        this.clearSelect ();
        this.archOwners = this.ownerGroups;
      },
      (error) => {
        console.error(error);
      });
  }

  private initForms (): void {
    this.wizardForm = new FormGroup ( {
      filterGroupControl: new FormControl ( null )
    } );
    this.selectForm = new FormGroup ( {
      addToGroupControl: new FormControl ( null ),
    } );
    this.subscribeOwnersSelectChanges ();
    this.subscribeOwnersFilterFormChanges ()
  }

  initMasterSelect (): void {
    let masterGroups  = this.securityService.getCurrentUser ().groups;
    this.masterGroups = _.filter ( masterGroups, ( masterGroup: Group ) => {
      return !_.find ( this.ownerGroups, ( ownerGroup: Group ) => {
        return ownerGroup.id === masterGroup.id;
      } )
    } )
  }

  private subscribeOwnersSelectChanges (): void {
    this.addSubscription (
      this.selectForm.valueChanges
        .subscribe ( {
          next: value => {
            if ( value.addToGroupControl ) {
              this.addOwnerToGroup ( value.addToGroupControl );
            }
          }
        } )
    );
  }

  private subscribeOwnersFilterFormChanges (): void {
    this.addSubscription (
      this.wizardForm.valueChanges
        .subscribe ( {
          next: value => {
            this.ownerGroups = filterByString ( this.archOwners, value.filterGroupControl, 'displayName' );
          }
        } )
    );
  }

  private clearSelect (): void {
    this.selectForm.reset ()
  }

  updateGroups ( event: Group ): void {
    this.ownerGroups = _.reject ( this.ownerGroups, ( group: Group ) => {
      return group.id === event.id;
    } );
    this.archOwners  = this.ownerGroups;
    this.initMasterSelect ();
  }

}
