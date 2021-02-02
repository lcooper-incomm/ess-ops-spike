import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Store} from '@ngrx/store';
import {finalize} from 'rxjs/operators';
import {CsCoreTableColumn} from '@cscore/components';
import {MaplesAccountDocument} from '@cscore/maples-client-model';
import {AppState} from 'src/app/app-state';
import {CcaBaseComponent} from 'src/app/core/cca-base-component';
import {AppStateType} from '../../../app-state-type.enum';
import {SessionState} from '../../../core/session/session-state';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';
import {Session} from '../../../core/session/model/session';
import {Selection} from '../../../core/session/model/selection';
import {ServeUploadDocumentWizard} from '../../../core/action/serve-actions/serve-upload-document-wizard/serve-upload-document-wizard';
import {FileService} from '../../../core/file/file.service';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {SecurityService} from '../../../core/security/security.service';
import {Permission} from '../../../core/auth/permission';
import {FileViewerWizard} from '../../../core/file-viewer/file-viewer-wizard';
import {CustomerAccountService} from '../../../core/customer-account/customer-account.service';

@Component({
  selector: 'cca-account-documents-tab',
  templateUrl: './account-documents-tab.component.html',
  styleUrls: ['./account-documents-tab.component.scss']
})
export class AccountDocumentsTabComponent extends CcaBaseComponent implements OnInit {

  columns: CsCoreTableColumn<MaplesAccountDocument>[] = [
    {
      key: 'id',
      label: 'ID',
      getValue: (document: MaplesAccountDocument) => document.id,
    },
    {
      key: 'description',
      label: 'File Description',
      getValue: (document: MaplesAccountDocument) => document.fileDescription,
    },
    {
      key: 'type',
      label: 'Type',
      getValue: (document: MaplesAccountDocument) => document.fileType && document.fileType.name,
    },
    {
      key: 'typeDescription',
      label: 'Type Description',
      getValue: (document: MaplesAccountDocument) => {
        if (document.fileType && document.fileType.name === 'Other') {
          return document.fileType.description;
        } else {
          return '';
        }
      }
    },
    {
      key: 'fileDate',
      label: 'Date',
      getValue: (document: MaplesAccountDocument) => document.fileDate && document.fileDate.displayValue,
    },
    {
      key: 'username',
      label: 'Username',
      getValue: (document: MaplesAccountDocument) => document.modifiedBy,
    },
    {
      key: 'view',
      label: '',
      getValue: (document: MaplesAccountDocument) => undefined,
    },
    {
      key: 'download',
      label: '',
      getValue: (document: MaplesAccountDocument) => undefined,
    }
  ];

  dataSource: MatTableDataSource<MaplesAccountDocument> = new MatTableDataSource();
  displayedColumns: string[]                            = this.columns.map(column => column.key);
  filterForm: FormGroup                                 = new FormGroup({
    filter: new FormControl()
  });
  selection: Selection<any>;
  private session: Session;

  canDownload: boolean = false;
  canView: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('downloadSpinner') downloadSpinner: SpinnerComponent;

  constructor(private store: Store<AppState>,
              private securityService: SecurityService,
              private fileService: FileService,
              private customerAccountService: CustomerAccountService,
              private wizardRunner: WizardRunner) {
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    if (this.securityService.hasPermission(Permission.DOWNLOAD_DOCUMENT)) {
      this.canDownload = true;
    }
    if (this.securityService.hasPermission(Permission.VIEW_DOCUMENT)) {
      this.canView = true;
    }

    this.subscribeToFilterChanges();
    this.subscribeToSessionState();
  }

  get headerText(): string {
    const count      = this.dataSource.data.length || 0;
    const itemString = this.dataSource.data.length === 1 ? 'Account Document' : 'Account Documents';
    return `${count} ${itemString}`;
  }

  downloadDocument(document: MaplesAccountDocument): void {
    if (!this.canDownload) {
      return;
    }

    this.downloadSpinner.start();

    let params: HttpParams = new HttpParams().set('platform', this.selection.getMaplesPlatform());
    this.fileService.download(`/rest/customer-account/${this.selection.getCustomerAccount().id}/documents/${document.id}/download`, document.fileName, params)
      .pipe(finalize(() => {
        this.downloadSpinner.stop();
      }))
      .subscribe();
  }

  viewDocument(document: MaplesAccountDocument): void {
    if (!this.canView) {
      return;
    }

    this.downloadSpinner.start();

    let params: HttpParams = new HttpParams().set('platform', this.selection.getMaplesPlatform());
    this.customerAccountService.findDocument(this.selection.getCustomerAccount().id, document.id, params)
      .pipe(finalize(() => {
        this.downloadSpinner.stop();
      }))
      .subscribe((downloadedDocument: MaplesAccountDocument) => {
        let wizard: FileViewerWizard = new FileViewerWizard();
        wizard.model.file = downloadedDocument.file;
        wizard.model.fileMimeType = document.fileMimeType;
        this.wizardRunner.run(wizard);
      });
  }

  openUploadDocumentDialog(): void {
    const wizard           = new ServeUploadDocumentWizard();
    wizard.model.selection = this.selection;
    wizard.model.session   = this.session;
    this.wizardRunner.run(wizard);
  }

  private subscribeToFilterChanges(): void {
    this.addSubscription(
      this.filterForm.get('filter').valueChanges
        .subscribe((value: string) => {
          this.dataSource.filter = value && value.trim().toLowerCase();
        })
    );
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state) {
            this.selection = state.selection;
            this.session   = state.session;
          }

          if (state && state.selection && state.selection.accountDocuments) {
            this.dataSource.data = state.selection.accountDocuments;
          } else {
            this.dataSource.data = [];
          }
        })
    );
  }
}
