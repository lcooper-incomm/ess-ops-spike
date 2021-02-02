import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { ControlPanelUsersService } from "./control-panel-users.service";
import { WizardRunner } from "../../../core/wizard/wizard-runner/wizard-runner.service";
import { CreateUserWizard } from "./create-user-wizard/create-user-wizard";
import { User } from "../../../core/user/user";
import { EditUserWizard } from "./edit-user-wizard/edit-user-wizard";
import { CcaBaseComponent } from 'src/app/core/cca-base-component';

@Component ( {
  selector: 'cca-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.scss' ]
} )

export class UsersComponent extends CcaBaseComponent implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User> ();
  displayedColumns: string[]           = [ 'username', 'displayName', 'email', 'isActive' ];
  @ViewChild ( MatSort ) sort: MatSort;
  @ViewChild ( MatPaginator ) paginator: MatPaginator;

  constructor ( private userService: ControlPanelUsersService,
                private wizardRunner: WizardRunner ) {
    super ();
  }

  ngOnInit () {
    this.sort.disableClear              = true;
    this.dataSource.sort                = this.sort;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.filterPredicate     = ( user: User, filterValue: string ) => {
      if ( filterValue ) {
        filterValue = filterValue.toLowerCase ();
      }

      let status = user.isActive ? 'active' : 'inactive';

      return user.id.toString ().indexOf ( filterValue ) !== -1
        || (user.displayName && user.displayName.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (user.username && user.username.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (user.email && user.email.toLowerCase ().indexOf ( filterValue ) !== -1)
        || (status.indexOf ( filterValue ) !== -1);
    };
    this.dataSource.sortingDataAccessor = ( item, property ) => {
      let sortValue: any;

      switch ( property ) {
        case 'displayName':
          sortValue = item.displayName ? item.displayName.toLowerCase () : null;
          break;
        case 'email':
          sortValue = item.email ? item.email.toLowerCase () : null;
          break;
        case 'isActive':
          sortValue = item.isActive ? 'Active' : 'Inactive';
          break;
        case 'username':
          sortValue = item.username ? item.username.toLowerCase () : null;
          break;
        default:
          sortValue = item[ property ];
          break;
      }

      return sortValue;
    };

    this.getUsers ( null );
  }

  applyFilter ( filterValue: string ): void {
    this.dataSource.filter = filterValue.trim ().toLowerCase ();
  }

  private getUsers ( row ): void {
    this.addSubscription (
      this.userService.findAll ()
        .subscribe ( ( value ) => {
          this.dataSource.data = value;
          if ( row ) {
            this.openEditUser ( row );
          }
        } )
    );
  }

  public openAddUser (): void {
    let wizard         = new CreateUserWizard ();
    wizard.model.users = this.dataSource.data;
    this.addSubscription (
      this.wizardRunner.run ( wizard )
        .afterClosed ()
        .subscribe ( ( result: CreateUserWizard ) => {
          this.getUsers ( result.model.user );
        } )
    );

  }

  public openEditUser ( user: User ): void {
    let wizard        = new EditUserWizard ();
    wizard.model.user = user;
    this.addSubscription (
      this.wizardRunner.run ( wizard )
        .afterClosed ()
        .subscribe ( ( result: CreateUserWizard ) => {
          this.getUsers ( null );
        } )
    );
  }
}


