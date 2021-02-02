import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {finalize} from 'rxjs/operators';
import {CsCoreTableColumn} from '@cscore/components';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';
import {PartnerService} from '../../../core/partner/partner.service';
import {Partner} from '../../../core/session/selection/partner';
import {AddEditPartnerWizard} from './add-edit-partner-wizard/add-edit-partner-wizard';

@Component({
  selector: 'cca-vms-partners',
  templateUrl: './vms-partners.component.html'
})
export class VmsPartnersComponent extends CcaBaseComponent implements OnInit {

  dataSource: MatTableDataSource<Partner> = new MatTableDataSource<Partner>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('loadingSpinner')
  loadingSpinner: SpinnerComponent;

  columns: CsCoreTableColumn<Partner>[] = [
    {
      key: 'name',
      label: 'Name',
      getValue: (partner: Partner) => partner.name,
    },
    {
      key: 'platform',
      label: 'Platform',
      getValue: (partner: Partner) => partner.platform,
    },
    {
      key: 'type',
      label: 'Type',
      getValue: (partner: Partner) => partner.type,
    },
    {
      key: 'ivrDnis',
      label: 'Ivr Dnis',
      getValue: (partner: Partner) => partner.ivrDnis,
    }
  ];

  constructor(private partnerService: PartnerService,
              private wizardRunner: WizardRunner) {
    super();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.findAll();
  }

  private findAll() {
    this.loadingSpinner.start();
    this.partnerService.findAll()
      .pipe(
        finalize(() => {
          this.loadingSpinner.stop();
        })
      )
      .subscribe((partners: Partner[]) => {
        this.dataSource.data = partners;
      });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openAddPartner() {
    let wizard            = new AddEditPartnerWizard();
    wizard.model.partner  = new Partner({});
    wizard.model.editMode = false;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditPartnerWizard) => {
        this.findAll();
      });
  }

  public openEditPartner(partner: Partner) {
    let wizard            = new AddEditPartnerWizard();
    wizard.model.partner  = partner;
    wizard.model.editMode = true;
    this.wizardRunner.run(wizard)
      .afterClosed()
      .subscribe((result: AddEditPartnerWizard) => {
        this.findAll();
      });
  }
}
