import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { DocumentsComponent } from '../../model/documents-component';
import { DocumentsComponentDocument } from '../../model/documents-component-document';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AddSessionDocumentWizard } from '../../session-panel/case-session-panel/documents-session-component-form/add-session-document-wizard/add-session-document-wizard';
import { EditSessionDocumentWizard } from '../../session-panel/case-session-panel/documents-session-component-form/edit-session-document-wizard/edit-session-document-wizard';
import * as _ from 'lodash';
import { WizardRunner } from '../../../wizard/wizard-runner/wizard-runner.service';
import { Session } from '../../model/session';
import { AppStateType } from '../../../../app-state-type.enum';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app-state';
import { CcaBaseComponent } from 'src/app/core/cca-base-component';

@Component ( {
  selector: 'cca-documents-session-component',
  templateUrl: './documents-session-component.component.html',
  styleUrls: [ './documents-session-component.component.scss' ],
} )
export class DocumentsSessionComponentComponent extends CcaBaseComponent implements AfterViewInit {
  @Input () component: DocumentsComponent;
  @Input () editable: boolean = false;

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  session: Session;
  dataSource                 = new MatTableDataSource<DocumentsComponentDocument> ();
  displayedColumns: string[] = [ 'name', 'link' ];

  constructor ( private wizardRunner: WizardRunner, private store: Store<AppState> ) {
    super ();
  }

  ngOnInit () {
    if ( this.editable ) {
      this.subscribeToSessionState ();
    } else {
      this.dataSource.data = this.component.documents;
    }
  }

  ngAfterViewInit () {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  openAddDocumentDialog (): void {
    const wizard         = new AddSessionDocumentWizard ();
    wizard.model.session = this.session;
    this.wizardRunner.run ( wizard );
  }

  openEditDocumentDialog ( document: DocumentsComponentDocument ): void {
    const wizard          = new EditSessionDocumentWizard ();
    wizard.model.session  = this.session;
    wizard.model.document = _.clone ( document );
    this.wizardRunner.run ( wizard );
  }

  private subscribeToSessionState (): void {
    this.addSubscription (
      this.store
        .select ( AppStateType.SESSION_STATE )
        .subscribe ( {
          next: sessionState => {
            this.session = sessionState.session;
            if ( this.session ) {
              this.dataSource.data = this.session.documentsComponent.documents;
            }
          }
        } )
    );
  }
}
