import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {WrapUpCode} from '../../../core/session/model/wrap-up-code';
import {MatPaginator} from '@angular/material/paginator';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {CsCoreTableColumn} from '@cscore/components';
import {WrapUpCodeService} from '../../../core/wrap-up-code/wrap-up-code.service';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';
import {AddEditCodeWizard} from './add-edit-code-wizard/add-edit-code-wizard';

@Component ( {
  selector: 'cca-wrap-up-codes',
  templateUrl: './wrap-up-codes.component.html'
} )
export class WrapUpCodesComponent extends CcaBaseComponent implements OnInit {

  dataSource: MatTableDataSource<WrapUpCode> = new MatTableDataSource<WrapUpCode>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('loadingSpinner')
  loadingSpinner: SpinnerComponent;

  columns: CsCoreTableColumn<WrapUpCode>[] = [
    {
      key: 'i3Name',
      label: 'I3 Name',
      getValue: (code: WrapUpCode) => code.i3Name,
    },
    {
      key: 'displayName',
      label: 'Display Name',
      getValue: (code: WrapUpCode) => code.displayName,
    },
    {
      key: 'isActive',
      label: 'Is Active',
      getValue: (code: WrapUpCode) => code.isActive ? 'Active' : 'Inactive',
    },
    {
      key: 'isLocked',
      label: 'Is Locked',
      getValue: (code: WrapUpCode) => code.isLocked ? 'Locked' : 'Not Locked',
    }
  ];

  constructor(private codeService: WrapUpCodeService,
              private wizardRunner: WizardRunner) {
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.findAll();
  }

  private findAll() {
    this.loadingSpinner.start();
    this.codeService.findAll()
      .subscribe((codes: WrapUpCode[]) => {
        this.dataSource.data = codes;
        this.loadingSpinner.stop();
      });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openAddCode() {
    let wizard            = new AddEditCodeWizard();
    wizard.model.code     = new WrapUpCode({});
    wizard.model.editMode = false;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditCodeWizard) => {
        this.findAll();
      });
  }

  public openEditCode(code: WrapUpCode) {
    let wizard            = new AddEditCodeWizard();
    wizard.model.code     = code;
    wizard.model.editMode = true;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditCodeWizard) => {
        this.findAll();
      });
  }
}
