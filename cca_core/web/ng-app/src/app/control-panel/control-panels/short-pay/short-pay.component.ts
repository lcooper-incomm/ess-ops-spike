import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CsCoreTableColumn} from '@cscore/components';
import {MatPaginator} from '@angular/material/paginator';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';
import {ShortPay} from '../../../core/short-pay/short-pay';
import {ShortPayService} from '../../../core/short-pay/short-pay.service';
import {AddShortPayWizard} from './add-short-pay-wizard/add-short-pay-wizard';
import {EditShortPayWizard} from './edit-short-pay-wizard/edit-short-pay-wizard';

@Component ( {
  selector: 'cca-short-pay',
  templateUrl: './short-pay.component.html'
} )
export class ShortPayComponent extends CcaBaseComponent implements OnInit {

  dataSource: MatTableDataSource<ShortPay> = new MatTableDataSource<ShortPay>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('loadingSpinner')
  loadingSpinner: SpinnerComponent;

  columns: CsCoreTableColumn<ShortPay>[] = [
    {
      key: 'merchantId',
      label: 'Merchant ID',
      getValue: (shortPay: ShortPay) => shortPay.merchantId,
    },
    {
      key: 'merchantName',
      label: 'Merchant Name',
      getValue: (shortPay: ShortPay) => shortPay.merchantName,
    },
    {
      key: 'locationId',
      label: 'Location ID',
      getValue: (shortPay: ShortPay) => shortPay.locationId,
    },
    {
      key: 'locationName',
      label: 'Location Name',
      getValue: (shortPay: ShortPay) => shortPay.locationName,
    },
    {
      key: 'terminalId',
      label: 'Terminal ID',
      getValue: (shortPay: ShortPay) => shortPay.terminalId,
    },
    {
      key: 'terminalNumber',
      label: 'Terminal Number',
      getValue: (shortPay: ShortPay) => shortPay.terminalNumber,
    }
  ];

  constructor(private shortPayService: ShortPayService,
              private wizardRunner: WizardRunner) {
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.findAll();
  }

  private findAll() {
    this.loadingSpinner.start();
    this.shortPayService.findAll()
      .subscribe((shortPays: ShortPay[]) => {
        this.dataSource.data = shortPays;
        this.loadingSpinner.stop();
      });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openAddShortPay() {
    let wizard            = new AddShortPayWizard();
    wizard.model.shortPay   = new ShortPay({});

    for (let shortPay of this.dataSource.data) {
      wizard.model.merchantIds.push(shortPay.merchantId);
      wizard.model.locationIds.push(shortPay.locationId);
      wizard.model.terminalIds.push(shortPay.terminalId);
    }

    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddShortPayWizard) => {
        this.findAll();
      });
  }

  public openEditShortPay(opcode: ShortPay) {
    let wizard            = new EditShortPayWizard();
    wizard.model.shortPay   = opcode;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: EditShortPayWizard) => {
        this.findAll();
      });
  }
}
