import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { FormControl, FormGroup } from "@angular/forms";
import { EditPermissionWizard } from "../edit-permission-wizard";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ControlPanelPermissionService } from "../../control-panel-permission.service";
import * as _ from "lodash";
import { filterByString } from "../../../control-panel-utils";
import { Group } from "../../../../../core/auth/group";
import { SecurityService } from "../../../../../core/security/security.service";
import { ControlPanelRolesService } from "../../../roles/control-panel-roles.service";
import { ControlPanelUsersService } from "../../../users/control-panel-users.service";
import { ControlPanelGroupsService } from "../../../groups/control-panel-groups.service";

@Component ( {
  selector: 'cca-edit-permission-groups-page',
  templateUrl: './edit-permission-groups-page.component.html',
  styleUrls: [ './edit-permission-groups-page.component.scss' ]
} )
export class EditPermissionGroupsPageComponent extends WizardPage<EditPermissionWizard> implements OnInit {
  addGroupForm              = new FormGroup ( {} );
  archGroups: Group[]       = [];
  archGroupsSelect: Group[] = [];
  key: string               = 'groups-page';
  masterGroups: Group[]     = [];
  groups: Group[]           = [];
  wizardForm: FormGroup     = new FormGroup ( {} );

  constructor ( private permissionService: ControlPanelPermissionService,
                private roleService: ControlPanelRolesService,
                private userService: ControlPanelUsersService,
                private groupService: ControlPanelGroupsService,
                private securityService: SecurityService ) {
    super ();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Next';
  }

  ngOnInit () {
    this.initForm ();
    this.findAdmins ();
  }

  onLoad (): Observable<any> {
    return this.groupService.findAllByPermissionId ( this.wizard.model.permission.id )
      .pipe ( map ( ( group: Group[] ) => {
        this.groups     = group;
        this.archGroups = _.cloneDeep ( this.groups );
      } ) );
  }

  onNext (): Observable<string> {
    return of ( 'roles-page' );
  }

  public updateGroups ( event: Group ) {
    this.groups     = _.reject ( this.groups, ( group: Group ) => {
      return group.id === event.id;
    } );
    this.archGroups = _.cloneDeep ( this.groups );
    this.initMasterSelect ();
  }

  private addPermissionToGroup ( groupId: number ): void {
    this.groupService.addPermission ( groupId, this.wizard.model.permission.id )
      .subscribe ( ( group: Group ) => {
        this.groups     = [ ...this.groups, group ];
        this.archGroups = _.cloneDeep ( this.groups );
        this.initMasterSelect ();
      } )
  }

  private findAdmins (): void {
    let uid = this.securityService.getCurrentUser ().id;
    this.userService.findAllGroups ( uid )
      .subscribe ( ( group: Group[] ) => {
        this.archGroupsSelect.push.apply ( this.archGroupsSelect, group );
        this.initMasterSelect ();
      } )
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      groupControl: new FormControl ( '', [] )
    } );
    this.subscribeGroupFormChanges ();

    this.addGroupForm = new FormGroup ( {
      addGroupControl: new FormControl ( '', [] )
    } );
    this.subscribeAddGroupFormChanges ();
  }

  private initMasterSelect (): void {
    let masterGroups  = this.archGroupsSelect;
    this.masterGroups = _.filter ( masterGroups, ( masterGroup: Group ) => {
      return !_.find ( this.groups, ( group: Group ) => {
        return group.id === masterGroup.id;
      } )
    } )
  }

  private subscribeAddGroupFormChanges (): void {
    this.addSubscription (
      this.addGroupForm.valueChanges
        .subscribe ( {
          next: value => {
            if ( value.addGroupControl ) {
              this.addPermissionToGroup ( value.addGroupControl );
            }
          }
        } )
    );
  }

  private subscribeGroupFormChanges (): void {
    this.addSubscription (
      this.wizardForm.valueChanges
        .subscribe ( {
          next: value => {
            this.groups = filterByString ( this.archGroups, value.groupControl, 'displayName' );
          }
        } )
    );
  }
}
