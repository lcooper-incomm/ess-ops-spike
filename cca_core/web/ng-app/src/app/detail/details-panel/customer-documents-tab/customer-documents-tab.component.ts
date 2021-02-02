import { Component, OnInit, ViewChild } from '@angular/core';
import { CcaBaseComponent } from "../../../core/cca-base-component";
import { Selection } from "../../../core/session/model/selection";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app-state";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { CustomerDocument } from "../../../core/customer/customer-document";
import { SpinnerComponent } from "../../../core/spinner/spinner.component";
import { AppStateType } from "../../../app-state-type.enum";
import { SessionState } from "../../../core/session/session-state";
import { Session } from "../../../core/session/model/session";
import { WizardRunner } from 'src/app/core/wizard/wizard-runner/wizard-runner.service';
import { VmsUploadDocumentWizard } from 'src/app/core/action/vms-actions/vms-upload-document-wizard/vms-upload-document-wizard';

@Component ( {
  selector: 'cca-customer-documents-tab',
  templateUrl: './customer-documents-tab.component.html',
  styleUrls: [ './customer-documents-tab.component.scss' ]
} )
export class CustomerDocumentsTabComponent extends CcaBaseComponent implements OnInit {

  dataSource                 = new MatTableDataSource<CustomerDocument> ();
  displayedColumns: string[] = [ 'id', 'type', 'date', 'name' ];
  selection: Selection<any>;

  @ViewChild ( 'documentsSpinner' )
  spinner: SpinnerComponent;
  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  private session: Session;

  constructor ( private store: Store<AppState>, private wizardRunner: WizardRunner ) {
    super ();
  }

  ngOnInit () {
    this.initDataSource ();
    this.subscribeToSessionState ();
  }

  download ( document: CustomerDocument ): void {
    let params = [];
    params.push ( "fileType=" + document.type );
    params.push ( "fileDate=" + document.date.value.getTime () );
    params.push ( "fileName=" + document.name );
    params.push ( "selectionId=" + this.selection.id );
    params.push ( "sessionId=" + this.session.id );
    params.push ( "platform=" + this.selection.platform );
    params.push ( "partner=" + this.selection.partner.type );

    let queryString      = params.join ( '&' );
    let url              = `/rest/customer/${this.selection.getCustomer ().id}/document/download?${queryString}`;
    window.location.href = encodeURI ( url );
  }

  openUploadDocumentDialog (): void {
    const wizard           = new VmsUploadDocumentWizard ();
    wizard.model.selection = this.selection;
    wizard.model.session   = this.session;
    this.wizardRunner.run ( wizard );
  }

  private initDataSource (): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store.select ( AppStateType.SESSION_STATE )
        .subscribe ( ( state: SessionState ) => {
          if ( state && state.selection ) {
            this.session   = state.session;
            this.selection = state.selection;

            if ( state.selection.getCustomer () ) {
              this.dataSource.data = state.selection.getCustomer ().documents;
            } else {
              this.dataSource.data = [];
            }
          }
        } )
    );
  }

}
