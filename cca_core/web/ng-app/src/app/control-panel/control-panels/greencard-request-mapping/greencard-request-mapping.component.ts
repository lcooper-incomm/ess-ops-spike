import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CsCoreTableColumn} from '@cscore/components';
import {GCRequest} from '../../../core/mapping/gc-request';
import {GCMappingService} from '../../../core/mapping/gc-mapping.service';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {AddEditGCRequestWizard} from './add-edit-gc-request-wizard/add-edit-gc-request-wizard';

@Component ( {
  selector: 'cca-greencard-request-mapping',
  templateUrl: './greencard-request-mapping.component.html'
} )
export class GreencardRequestMappingComponent extends CcaBaseComponent implements OnInit {

  dataSource: MatTableDataSource<GCRequest> = new MatTableDataSource<GCRequest>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('loadingSpinner')
  loadingSpinner: SpinnerComponent;

  columns: CsCoreTableColumn<GCRequest>[] = [
    {
      key: 'x95Code',
      label: 'X95 Code',
      getValue: (request: GCRequest) => request.x95Code,
    },
    {
      key: 'requestCode',
      label: 'Request Code',
      getValue: (request: GCRequest) => request.requestCode,
    },
    {
      key: 'requestValue',
      label: 'Request Value',
      getValue: (request: GCRequest) => request.requestValue,
    },
    {
      key: 'transactionType',
      label: 'Transaction Type',
      getValue: (request: GCRequest) => request.transactionType,
    }
  ];

  constructor(private codeService: GCMappingService,
              private wizardRunner: WizardRunner) {
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.findAll();
  }

  private findAll() {
    this.loadingSpinner.start();
    this.codeService.findAllRequest()
      .subscribe((requests: GCRequest[]) => {
        this.dataSource.data = requests;
        this.loadingSpinner.stop();
      });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openAddRequest() {
    let wizard            = new AddEditGCRequestWizard();
    wizard.model.request  = new GCRequest({});
    wizard.model.editMode = false;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditGCRequestWizard) => {
        this.findAll();
      });
  }

  public openEditRequest(request: GCRequest) {
    let wizard            = new AddEditGCRequestWizard();
    wizard.model.request  = request;
    wizard.model.editMode = true;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditGCRequestWizard) => {
        this.findAll();
      });
  }
}
