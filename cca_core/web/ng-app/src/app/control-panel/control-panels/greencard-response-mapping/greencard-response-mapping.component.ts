import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CsCoreTableColumn} from '@cscore/components';
import {GCResponse} from '../../../core/mapping/gc-response';
import {GCMappingService} from '../../../core/mapping/gc-mapping.service';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {AddEditGCResponseWizard} from './add-edit-gc-response-wizard/add-edit-gc-response-wizard';

@Component ( {
  selector: 'cca-greencard-response-mapping',
  templateUrl: './greencard-response-mapping.component.html'
} )
export class GreencardResponseMappingComponent extends CcaBaseComponent implements OnInit {

  dataSource: MatTableDataSource<GCResponse> = new MatTableDataSource<GCResponse>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('loadingSpinner')
  loadingSpinner: SpinnerComponent;

  columns: CsCoreTableColumn<GCResponse>[] = [
    {
      key: 'responseCode',
      label: 'Response Code',
      getValue: (response: GCResponse) => response.responseCode,
    },
    {
      key: 'responseValue',
      label: 'Response Value',
      getValue: (response: GCResponse) => response.responseValue,
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
    this.codeService.findAllResponse()
      .subscribe((responses: GCResponse[]) => {
        this.dataSource.data = responses;
        this.loadingSpinner.stop();
      });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openAddResponse() {
    let wizard            = new AddEditGCResponseWizard();
    wizard.model.response  = new GCResponse({});
    wizard.model.editMode = false;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditGCResponseWizard) => {
        this.findAll();
      });
  }

  public openEditResponse(response: GCResponse) {
    let wizard            = new AddEditGCResponseWizard();
    wizard.model.response  = response;
    wizard.model.editMode = true;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditGCResponseWizard) => {
        this.findAll();
      });
  }
}
