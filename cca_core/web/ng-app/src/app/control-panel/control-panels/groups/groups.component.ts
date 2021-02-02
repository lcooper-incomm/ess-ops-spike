import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlPanelGroupsService } from "./control-panel-groups.service";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { WizardRunner } from "../../../core/wizard/wizard-runner/wizard-runner.service";
import { CreateGroupWizard } from "./create-group-wizard/create-group-wizard";
import { EditGroupWizard } from "./edit-group-wizard/edit-group-wizard";
import { Group } from "../../../core/auth/group";
import { CcaBaseComponent } from 'src/app/core/cca-base-component';

@Component ( {
  selector: 'cca-groups',
  templateUrl: './groups.component.html',
  styleUrls: [ './groups.component.scss' ]
} )

export class GroupsComponent extends CcaBaseComponent implements OnInit {
  dataSource: MatTableDataSource<Group> = new MatTableDataSource<Group> ();
  displayedColumns: string[]            = [ 'id', 'displayName', 'description', 'isActive' ];
  @ViewChild ( MatSort ) sort: MatSort;
  @ViewChild ( MatPaginator ) paginator: MatPaginator;

  constructor ( private groupService: ControlPanelGroupsService,
                public dialog: MatDialog,
                private wizardRunner: WizardRunner ) {
    super ();
  }

  ngOnInit () {
    this.sort.disableClear              = true;
    this.dataSource.sort                = this.sort;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.filterPredicate     = ( group: Group, filterValue: string ) => {
      if ( filterValue ) {
        filterValue = filterValue.toLowerCase ();
      }

      let status = group.isActive ? 'active' : 'inactive';

      return group.id.toString ().indexOf ( filterValue ) !== -1
        || (group.displayName && group.displayName.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (group.description && group.description.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (status.indexOf ( filterValue ) !== -1);
    };
    this.dataSource.sortingDataAccessor = ( item, property ) => {
      let sortValue: any;

      switch ( property ) {
        case 'description':
          sortValue = item.description ? item.description.toLowerCase () : null;
          break;
        case 'displayName':
          sortValue = item.displayName.toLowerCase ();
          break;
        case 'isActive':
          sortValue = item.isActive ? 'Active' : 'Inactive';
          break;
        default:
          sortValue = item[ property ];
          break;
      }

      return sortValue;
    };
    this.getGroups ( null );
  }

  public applyFilter ( filterValue: string ) {
    this.dataSource.filter = filterValue.trim ().toLowerCase ();
  }

  public openAddGroup () {
    let wizard          = new CreateGroupWizard ();
    wizard.model.groups = this.dataSource.data;
    this.addSubscription (
      this.wizardRunner.run ( wizard )
        .afterClosed ()
        .subscribe ( ( result: CreateGroupWizard ) => {
          this.getGroups ( result.model.group );
        } )
    );
  }

  public openCloneGroup () {
    let wizard           = new CreateGroupWizard ();
    wizard.model.groups  = this.dataSource.data;
    wizard.model.isClone = true;
    this.addSubscription (
      this.wizardRunner.run ( wizard )
        .afterClosed ()
        .subscribe ( ( result: CreateGroupWizard ) => {
          this.getGroups ( result.model.group );
        } )
    );
  }

  public openEditGroup ( row ) {
    let wizard         = new EditGroupWizard ();
    wizard.model.group = row;
    this.addSubscription (
      this.wizardRunner.run ( wizard )
        .afterClosed ()
        .subscribe ( ( result: EditGroupWizard ) => {
          this.getGroups ( null );
        } )
    );
  }

  private getGroups ( row ) {
    this.addSubscription (
      this.groupService.findAll ()
        .subscribe ( ( value ) => {
          this.dataSource.data = value;
          if ( row ) {
            this.openEditGroup ( row );
          }
        } )
    );
  }
}
