import { Component, OnInit, ViewChild } from '@angular/core';
import { FsapiC2cTransferService } from "../../../core/c2c-transfer/fsapi-c2c-transfer.service";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { FsapiC2cTransferResponse } from "../../../core/c2c-transfer/fsapi-c2c-transfer-response";
import { SpinnerComponent } from "../../../core/spinner/spinner.component";
import { WizardRunner } from "../../../core/wizard/wizard-runner/wizard-runner.service";
import { ReviewC2cTransferRequestWizard } from "../../review-c2c-transfer-request-wizard/review-c2c-transfer-request-wizard";

@Component ( {
  selector: 'cca-c2c-transfer-requests-widget',
  templateUrl: './c2c-transfer-requests-widget.component.html',
  styleUrls: [ './c2c-transfer-requests-widget.component.scss' ]
} )
export class C2cTransferRequestsWidgetComponent implements OnInit {
  dataSource: MatTableDataSource<FsapiC2cTransferResponse> = new MatTableDataSource<FsapiC2cTransferResponse> ();
  displayedColumns: string[]                               = [ 'date', 'sessionId', 'csr', 'platform', 'amount' ];
  @ViewChild ( MatSort ) sort: MatSort;
  @ViewChild ( MatPaginator ) paginator: MatPaginator;
  @ViewChild ( 'requestsSpinner' )
  requestsSpinner: SpinnerComponent;

  constructor ( private c2cTransferService: FsapiC2cTransferService,
                private wizardRunner: WizardRunner ) {
  }

  ngOnInit () {
    this.sort.disableClear    = true;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;

    this.dataSource.sortingDataAccessor = ( item, property ) => {
      let sortValue: any;

      switch ( property ) {
        case 'amount':
          sortValue = item.amount ? item.amount.value : null;
          break;
        case 'sessionId':
          sortValue = item.sessionId.toString ().toLowerCase ();
          break;
        case 'csr':
          sortValue = item.createdBy.username.toLowerCase ();
          break;
        case 'platform':
          sortValue = item.platform.toString ().toLowerCase ();
          break;
        case 'date':
          sortValue = item.modifiedDate ? item.modifiedDate.value : null;
          break;
        default:
          sortValue = item[ property ];
          break;
      }
      return sortValue;
    };

    this.getRequests ();
  }

  public openReviewC2CTransferWizard ( row ) {
    const wizard          = new ReviewC2cTransferRequestWizard ();
    wizard.model.id       = row.id;
    wizard.model.platform = row.platform;
    this.wizardRunner.run ( wizard );

  }

  public getRequests () {
    this.requestsSpinner.start ();
    this.c2cTransferService.findAllPending ()
      .subscribe ( ( requests: FsapiC2cTransferResponse[] ) => {
        this.dataSource.data = requests;
        this.requestsSpinner.stop ();
      } );
  }

}
