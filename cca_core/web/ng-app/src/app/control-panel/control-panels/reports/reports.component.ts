import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FormGroup} from '@angular/forms';
import {CsCoreTableColumn} from '@cscore/components';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {Report} from '../../../reports/report';
import {ReportService} from '../../../reports/report.service';
import {AddEditReportsWizard} from './add-edit-reports-wizard/add-edit-reports-wizard';

@Component({
  selector: 'cca-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent extends CcaBaseComponent implements OnInit {

  form: FormGroup                        = new FormGroup({});
  dataSource: MatTableDataSource<Report> = new MatTableDataSource<Report>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('loadingSpinner')
  loadingSpinner: SpinnerComponent;

  columns: CsCoreTableColumn<Report>[] = [
    {
      key: 'name',
      label: 'Name',
      getValue: (report: Report) => report.name
    },
    {
      key: 'link',
      label: 'Link',
      getValue: (report: Report) => report.link
    },
    {
      key: 'status',
      label: 'Status',
      getValue: (report: Report) => undefined
    }
  ];

  constructor(private reportService: ReportService,
              private wizardRunner: WizardRunner) {
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.findAllReports();
  }

  private findAllReports() {
    this.loadingSpinner.start();
    this.reportService.findAll()
      .subscribe((reports: Report[]) => {
        this.dataSource.data = reports;
        this.loadingSpinner.stop();
      });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openAddReport() {
    let wizard            = new AddEditReportsWizard();
    wizard.model.report   = new Report({
      status: true,
      permission: {}
    });
    wizard.model.editMode = false;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditReportsWizard) => {
        this.findAllReports();
      });
  }

  public openEditReport(report: Report) {
    let wizard            = new AddEditReportsWizard();
    wizard.model.report   = report;
    wizard.model.editMode = true;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditReportsWizard) => {
        this.findAllReports();
      });
  }
}
