import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Property } from "../../../../core/model/property";
import { SpinnerComponent } from "../../../../core/spinner/spinner.component";
import { PropertyService } from "../../../../core/config/property.service";
import { PropertyUtilityService } from "../property-utility.service";
import { WizardRunner } from "../../../../core/wizard/wizard-runner/wizard-runner.service";
import { EditPropertiesWizard } from "../edit-properties-wizard/edit-properties-wizard";

@Component ( {
  selector: 'cca-core-properties',
  templateUrl: './core-properties.component.html',
  styleUrls: [ './core-properties.component.scss' ]
} )
export class CorePropertiesComponent implements OnInit {
  dataSource: MatTableDataSource<Property> = new MatTableDataSource<Property> ();
  displayedColumns: string[]               = [ 'displayName', 'value' ];
  @ViewChild ( MatSort ) sort: MatSort;
  @ViewChild ( MatPaginator ) paginator: MatPaginator;
  @ViewChild ( 'loadingSpinner' )
  loadingSpinner: SpinnerComponent;

  constructor ( private propertyService: PropertyService,
                private propertyUtility: PropertyUtilityService,
                private wizardRunner: WizardRunner ) {
  }

  ngOnInit () {
    this.sort.disableClear              = true;
    this.dataSource.sort                = this.sort;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.sortingDataAccessor = ( item, property ) => {
      let sortValue: any;
      switch ( property ) {
        case 'value':
          sortValue = item.value ? item.value.toLowerCase () : null;
          break;
        case 'displayName':
          sortValue = item.displayName ? item.displayName.toLowerCase () : null;
          break;
        default:
          sortValue = item[ property ];
          break;
      }
      return sortValue;
    };
    this.findAllProperties ();
  }

  private findAllProperties () {
    this.loadingSpinner.start ();
    this.propertyService.findAll ()
      .subscribe ( ( properties: Property[] ) => {
        properties           = this.propertyUtility.addLoggingProperties ( properties );
        this.dataSource.data = properties;
        this.loadingSpinner.stop ();
      } )
  }

  public openEditProperty ( row ) {
    const wizard          = new EditPropertiesWizard ();
    wizard.model.property = row;
    this.wizardRunner.run ( wizard )
      .afterClosed ()
      .subscribe ( () => this.findAllProperties () );
  }

}
