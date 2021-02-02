import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CsCoreTableColumn} from '@cscore/components';
import {MaplesDocumentAction} from '@cscore/maples-client-model';
import {CustomerAccountService} from '../../../../core/customer-account/customer-account.service';
import {SpinnerComponent} from '../../../../core/spinner/spinner.component';
import {SpinnerSize} from '../../../../core/spinner/spinner-size.enum';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {ServeDocActionHistoryWizard} from '../serve-doc-action-history-wizard';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';

@Component({
  selector: 'cca-serve-doc-action-history-form-page',
  templateUrl: './serve-doc-action-history-form-page.component.html',
  styleUrls: ['./serve-doc-action-history-form-page.component.scss']
})
export class ServeDocActionHistoryFormPageComponent extends WizardPage<ServeDocActionHistoryWizard> implements OnInit {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup({});
  spinnerSize           = SpinnerSize.LARGE;

  dataSource: MatTableDataSource<MaplesDocumentAction> = new MatTableDataSource<MaplesDocumentAction>();
  columns: CsCoreTableColumn<MaplesDocumentAction>[] = [
    {
      key: 'type',
      label: 'Type',
      getValue: (documentAction: MaplesDocumentAction) => documentAction.type,
    },
    {
      key: 'outcome',
      label: 'Outcome',
      getValue: (documentAction: MaplesDocumentAction) => documentAction.outcome,
    },
    {
      key: 'createdBy',
      label: 'Created By',
      getValue: (documentAction: MaplesDocumentAction) => documentAction.createdBy,
    },
    {
      key: 'createdDate',
      label: 'Created Date',
      getValue: (documentAction: MaplesDocumentAction) => documentAction.createdDate && documentAction.createdDate.displayValue,
    },
    {
      key: 'notes',
      label: 'Notes',
      getValue: (documentAction: MaplesDocumentAction) => documentAction.notes,
    }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(SpinnerComponent) loadingSpinner: SpinnerComponent;

  constructor(private customerAccountService: CustomerAccountService) {
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (documentAction: MaplesDocumentAction, property: string) => {
      let sortValue: any;

      switch (property) {
        case 'createdDate':
          sortValue = documentAction.createdDate ? documentAction.createdDate.getAsMilliseconds() : null;
          break;
        default:
          sortValue = documentAction[property];
          break;
      }

      return sortValue;
    };

    this.title       = 'Document Action History';
    this.isCloseable = true;
    this.width       = WizardWidth.EXTRA_LARGE;
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onLoad(): Observable<any> {
    return this.customerAccountService.getDocumentActions(this.wizard.model.accountId, this.wizard.model.documentId, this.wizard.model.platform)
      .pipe(tap((documentActions: MaplesDocumentAction[]) => {
        if (documentActions) {
          this.dataSource.data = documentActions;
        } else {
          this.dataSource.data = [];
        }
      }))
  }

}
