import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ControlPanelPermissionService } from "./control-panel-permission.service";
import { Permission } from "../../../core/auth/permission";
import { WizardRunner } from "../../../core/wizard/wizard-runner/wizard-runner.service";
import { EditPermissionWizard } from "./edit-permission-wizard/edit-permission-wizard";

@Component ( {
  selector: 'cca-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: [ './permissions.component.scss' ]
} )
export class PermissionsComponent implements OnInit {
  dataSource: MatTableDataSource<Permission> = new MatTableDataSource<Permission> ();
  displayedColumns: string[]                 = [ 'displayName', 'category', 'description', 'isActive' ];
  @ViewChild ( MatSort ) sort: MatSort;
  @ViewChild ( MatPaginator ) paginator: MatPaginator;

  constructor ( private permissionService: ControlPanelPermissionService,
                private wizardRunner: WizardRunner ) {
  }

  ngOnInit () {
    this.sort.disableClear    = true;
    this.dataSource.sort      = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = ( permission: Permission, filterValue: string ) => {
      if ( filterValue ) {
        filterValue = filterValue.toLowerCase ();
      }

      let status = permission.isActive ? 'active' : 'inactive';

      return permission.id.toString ().indexOf ( filterValue ) !== -1
        || (permission.displayName && permission.displayName.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (permission.description && permission.description.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (permission.category && permission.category.displayName && permission.category.displayName.toLowerCase ().indexOf ( filterValue ) !== -1)
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
        case 'category':
          sortValue = (item.category && item.category.displayName) ? item.category.displayName.toLowerCase () : null;
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

    this.findAll ( null );
  }

  applyFilter ( filterValue: string ) {
    this.dataSource.filter = filterValue.trim ().toLowerCase ();
  }

  private findAll ( row ) {
    this.permissionService.findAll ()
      .subscribe ( ( value ) => {
        this.dataSource.data = value;
        if ( row ) {
          this.openEditPermission ( row );
        }
      } )
  }

  public openEditPermission ( row ) {
    let wizard              = new EditPermissionWizard ();
    wizard.model.permission = row;
    this.wizardRunner.run ( wizard )
      .afterClosed ()
      .subscribe ( ( result: EditPermissionWizard ) => {
        this.findAll ( null );
      } );
  }
}
