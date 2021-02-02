import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlPanelRolesService } from "./control-panel-roles.service";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { SecurityService } from "../../../core/security/security.service";
import { CreateRoleWizard } from "./create-role-wizard/create-role-wizard";
import { WizardRunner } from "../../../core/wizard/wizard-runner/wizard-runner.service";
import { EditRoleWizard } from "./edit-role-wizard/edit-role-wizard";
import { Role } from "../../../core/auth/role";
import { ToastFactory } from "../../../toast/toast-factory.service";

@Component ( {
  selector: 'cca-roles',
  templateUrl: './roles.component.html',
  styleUrls: [ './roles.component.scss' ]
} )
export class RolesComponent implements OnInit {
  dataSource: MatTableDataSource<Role> = new MatTableDataSource<Role> ();
  displayedColumns: string[]           = [ 'id', 'displayName', 'description', 'isActive' ];
  @ViewChild ( MatSort ) sort: MatSort;
  @ViewChild ( MatPaginator ) paginator: MatPaginator;

  constructor ( private rolesService: ControlPanelRolesService,
                private securityService: SecurityService,
                private toastFactory: ToastFactory,
                private wizardRunner: WizardRunner ) {
  }

  ngOnInit () {
    this.sort.disableClear              = true;
    this.dataSource.sort                = this.sort;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.filterPredicate     = ( role: Role, filterValue: string ) => {
      if ( filterValue ) {
        filterValue = filterValue.toLowerCase ();
      }

      let status = role.isActive ? 'active' : 'inactive';

      return role.id.toString ().indexOf ( filterValue ) !== -1
        || (role.displayName && role.displayName.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (role.description && role.description.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (status.toLowerCase ().indexOf ( filterValue ) !== -1);
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
    }
    this.findAllAdminOfRoles ( null );
  }

  applyFilter ( filterValue: string ) {
    this.dataSource.filter = filterValue.trim ().toLowerCase ();
  }

  private findAllAdminOfRoles ( row ) {
    let user = this.securityService.getCurrentUser ();

    this.rolesService.findAllAdminOfRoles ( user.id )
      .subscribe ( ( value ) => {
        this.dataSource.data = value;
        if ( row ) {
          this.openEditRole ( row );
        }
      } )
  }

  public openAddRole () {
    let wizard         = new CreateRoleWizard ();
    wizard.model.roles = this.dataSource.data;
    this.wizardRunner.run ( wizard )
      .afterClosed ()
      .subscribe ( ( result: CreateRoleWizard ) => {
        this.toastFactory.success ( 'Role created successfully' );
        this.findAllAdminOfRoles ( result.model.role );
      } );
  }

  public openCloneRole () {
    let wizard           = new CreateRoleWizard ();
    wizard.model.roles   = this.dataSource.data;
    wizard.model.isClone = true;
    this.wizardRunner.run ( wizard )
      .afterClosed ()
      .subscribe ( ( result: CreateRoleWizard ) => {
        this.toastFactory.success ( 'Role created successfully' );
        this.findAllAdminOfRoles ( result.model.role );
      } );
  }

  public openEditRole ( role: Role ) {
    let wizard              = new EditRoleWizard ();
    wizard.model.role       = role;
    wizard.model.dataSource = this.dataSource.data;
    this.wizardRunner.run ( wizard )
      .afterClosed ()
      .subscribe ( ( result: EditRoleWizard ) => {
        this.findAllAdminOfRoles ( null );
      } );
  }
}
