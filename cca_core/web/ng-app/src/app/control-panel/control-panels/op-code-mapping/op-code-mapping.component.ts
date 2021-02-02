import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CsCoreTableColumn} from '@cscore/components';
import {MatPaginator} from '@angular/material/paginator';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';
import {MaplesTransactionService} from '../../../core/transaction/maples-transaction.service';
import {AddEditOpCodeWizard} from './add-edit-opcode-wizard/add-edit-opcode-wizard';
import {OpCodeDescriptor} from '../../../core/transaction/op-code';

@Component({
  selector: 'cca-op-code-mapping',
  templateUrl: './op-code-mapping.component.html'
})
export class OpCodeMappingComponent extends CcaBaseComponent implements OnInit {

  dataSource: MatTableDataSource<OpCodeDescriptor> = new MatTableDataSource<OpCodeDescriptor>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('loadingSpinner')
  loadingSpinner: SpinnerComponent;

  columns: CsCoreTableColumn<OpCodeDescriptor>[] = [
    {
      key: 'code',
      label: 'code',
      getValue: (opcode: OpCodeDescriptor) => opcode.code,
    },
    {
      key: 'requestValue',
      label: 'Request Value',
      getValue: (opcode: OpCodeDescriptor) => opcode.requestValue,
    },
    {
      key: 'responseValue',
      label: 'Response Value',
      getValue: (opcode: OpCodeDescriptor) => opcode.responseValue,
    },
    {
      key: 'transactionType',
      label: 'Transaction Type',
      getValue: (opcode: OpCodeDescriptor) => opcode.transactionType,
    }
  ];

  constructor(private transactionService: MaplesTransactionService,
              private wizardRunner: WizardRunner) {
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.findAll();
  }

  private findAll() {
    this.loadingSpinner.start();
    this.transactionService.findAllOpCodes()
      .subscribe((opcodes: OpCodeDescriptor[]) => {
        this.dataSource.data = opcodes;
        this.loadingSpinner.stop();
      });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openAddOpCode() {
    let wizard            = new AddEditOpCodeWizard();
    wizard.model.opcode   = new OpCodeDescriptor({});
    wizard.model.editMode = false;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditOpCodeWizard) => {
        this.findAll();
      });
  }

  public openEditOpCode(opcode: OpCodeDescriptor) {
    let wizard            = new AddEditOpCodeWizard();
    wizard.model.opcode   = opcode;
    wizard.model.editMode = true;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditOpCodeWizard) => {
        this.findAll();
      });
  }
}
