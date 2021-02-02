import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Store} from '@ngrx/store';
import {SatPopover} from '@ncstate/sat-popover';
import {finalize} from 'rxjs/operators';
import * as moment from 'moment';
import {CsCoreAddress} from '@cscore/core-client-model';
import {CsCoreTableColumn} from '@cscore/components';
import {MaplesAccountCode, MaplesAccountStatusCodeRequest} from '@cscore/maples-client-model';
import {AppState} from '../../../app-state';
import {AppStateType} from '../../../app-state-type.enum';
import {SessionState} from '../../../core/session/session-state';
import {CcaBaseComponent} from '../../../core/cca-base-component';
import {CustomerAccountService} from '../../../core/customer-account/customer-account.service';
import {WizardRunner} from '../../../core/wizard/wizard-runner/wizard-runner.service';
import {Selection} from '../../../core/session/model/selection';
import {GenericOption} from '../../../core/model/generic-option';
import {CcaValidators} from '../../../core/validators/cca-validators';
import {SpinnerComponent} from '../../../core/spinner/spinner.component';
import {DateService} from '../../../core/date/date.service';
import {SecurityService} from "../../../core/security/security.service";
import {Permission} from "../../../core/auth/permission";

@Component({
  selector: 'cca-account-status-codes-table',
  templateUrl: './account-status-codes-table.component.html',
  styleUrls: [ '../../../core/action-toolbar/action-toolbar-button/action-toolbar-button.component.scss' ]
})
export class AccountStatusCodesTableComponent extends CcaBaseComponent implements OnInit {

  @Input()
  type: string;
  @ViewChild('addSpinner')
  addSpinner: SpinnerComponent;
  @ViewChild('deleteSpinner')
  deleteSpinner: SpinnerComponent;
  @ViewChild('editSpinner')
  editSpinner: SpinnerComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  typeDescription:String;
  selection: Selection<any>;
  dataSource: MatTableDataSource<MaplesAccountCode> = new MatTableDataSource();

  columns: CsCoreTableColumn<MaplesAccountCode>[] = [
    {
      key: 'code',
      label: 'Status Code',
      getValue: (code: MaplesAccountCode) => code.code
    },
    {
      key: 'startDate',
      label: 'Start Date',
      getValue: (code: MaplesAccountCode) => code.createdDate ? code.createdDate.displayValue : null
    },
    {
      key: 'endDate',
      label: 'End Date',
      getValue: (code: MaplesAccountCode) => code.endDate ? code.endDate.displayValue : null
    },
    {
      key: 'delete',
      label: '',
      getValue: (code: MaplesAccountCode) => undefined
    },
    {
      key: 'edit',
      label: '',
      getValue: (code: MaplesAccountCode) => undefined
    }
  ];

  selectedCode: MaplesAccountCode;
  addresses: GenericOption<any>[] = [];
  fundingSources: GenericOption<any>[] = [];
  codes: GenericOption<MaplesAccountCode>[] = [];
  statusCodeForm: FormGroup = new FormGroup({
    endDate: new FormControl(null, [Validators.required, CcaValidators.futureDate()]),
    permanent: new FormControl(false, []),
    code: new FormControl(null, []),
    targetId: new FormControl(null, [Validators.required])
  });

  constructor(private customerAccountService: CustomerAccountService,
              private dateService: DateService,
              private wizard: WizardRunner,
              private store: Store<AppState>,
              private securityService: SecurityService) {
    super();
  }

  ngOnInit(): void {
    if (this.type === 'Address') {
      this.columns = [
        {
          key: 'address',
          label: 'Address',
          getValue: (code: MaplesAccountCode) => {
            if (this.selection && code.targetId) {
              return this.addressToString(this.selection.getCustomerAccount().customer.addresses.find(
                (address: CsCoreAddress) => address.id === code.targetId
              ));
            } else {
              return null;
            }
          }
        },
        ...this.columns
      ];
    } else if (this.type === 'FundingSource') {
      this.columns = [
        {
          key: 'idFundingSource',
          label: 'Funding Source',
          getValue: (code: MaplesAccountCode) => code.targetId
        },
        ...this.columns
      ];
    }

    this.dataSource.paginator = this.paginator;
    this.subscribeToSessionState();
  }

  getTargets(): GenericOption<any>[] {
    if (this.type === 'Address') {
      return this.addresses;
    } else {
      return this.fundingSources;
    }
  }

  getTypeLabel(): string {
    return this.type === 'FundingSource' ? 'Funding Source' : this.type;
  }

  togglePermanent(event: MatSlideToggleChange): void {
    this.statusCodeForm.get('endDate').setValidators(event.checked ? [] : [Validators.required, CcaValidators.futureDate()]);
    this.statusCodeForm.get('endDate').updateValueAndValidity();
  }

  openPopover(popover: SatPopover, mode: string, code: MaplesAccountCode = null): void {
    this.selectedCode = code;
    this.statusCodeForm.get('code').setValidators([Validators.required]);

    if (mode === 'Add') {
      this.statusCodeForm.patchValue({
        endDate: null,
        permanent: false,
        code: null
      });
      if (this.type === 'Account') {
        this.statusCodeForm.patchValue({
          targetId: this.selection.getCustomerAccount().id
        });
      } else if (this.type === 'Address' && this.addresses.length === 1) {
        this.statusCodeForm.patchValue({
          targetId: this.addresses[0].value
        });
      } else if (this.type === 'FundingSource' && this.fundingSources.length === 1) {
        this.statusCodeForm.patchValue({
          targetId: this.fundingSources[0].value
        });
      }
    } else {
      this.statusCodeForm.setValue({
        endDate: (code.endDate) ? this.dateService.convertMMDDYYYYToYYYYMMDD(code.endDate.getDateOnly()) : null,
        permanent: !code.endDate,
        code: code.code,
        targetId: code.targetId
      });

      if (code.endDate) {
        // End date can only be moved back, not forward.
        this.statusCodeForm.get('endDate').setValidators([Validators.required, CcaValidators.futureDate(code.endDate.getDateOnly())]);
      }
    }

    popover.open();
  }

  reloadData(): void {
    if (this.type === 'Account') {
      this.customerAccountService.loadStatusCodesAccount(this.selection).subscribe();
    } else if (this.type === 'Address') {
      this.customerAccountService.loadStatusCodesAddress(this.selection).subscribe();
    } else if (this.type === 'FundingSource') {
      this.customerAccountService.loadStatusCodesFundingSource(this.selection).subscribe();
    }
  }

  addCode(popover: SatPopover): void {
    this.addSpinner.start();

    let days: number;
    if (this.statusCodeForm.get('permanent').value) {
      days = null;
    } else {
      let now     = moment().startOf('day');
      let endDate = moment(this.statusCodeForm.get('endDate').value).startOf('day');
      days        = endDate.diff(now, 'days');
    }

    let request: MaplesAccountStatusCodeRequest = {
      days: days ? days.toString() : null,
      targetType: this.type,
      statusCode: this.statusCodeForm.get('code').value.code,
      targetId: this.statusCodeForm.get('targetId').value,
      domain: 'RISK'
    };
    this.customerAccountService.addStatusCode(this.selection.getCustomerAccount().id, request, this.selection.getMaplesPlatform())
      .pipe(
        finalize(() => {
          this.addSpinner.stop();
          popover.close();
        })
      )
      .subscribe(() => {
        this.reloadData();
      });
  }

  deleteCode(popover: SatPopover, code: MaplesAccountCode): void {
    this.deleteSpinner.start();

    let request: MaplesAccountStatusCodeRequest = {
      days: null,
      targetType: this.type,
      statusCode: code.code,
      targetId: code.targetId,
      domain: 'RISK'
    };
    this.customerAccountService.deleteStatusCode(this.selection.getCustomerAccount().id, request, this.selection.getMaplesPlatform())
      .pipe(
        finalize(() => {
          this.deleteSpinner.stop();
          popover.close();
        })
      )
      .subscribe(() => {
        this.reloadData();
      });
  }

  editCode(popover: SatPopover, code: MaplesAccountCode): void {
    if (!this.statusCodeForm.valid) {
      return;
    }

    this.editSpinner.start();

    let days: number;
    if (this.statusCodeForm.get('permanent').value) {
      days = null;
    } else {
      let current = moment(code.endDate.getDateOnly()).startOf('day');
      let endDate = moment(this.statusCodeForm.get('endDate').value).startOf('day');
      days        = endDate.diff(current, 'days');
    }

    let request: MaplesAccountStatusCodeRequest = {
      days: days ? days.toString() : null,
      targetType: this.type,
      statusCode: code.code,
      targetId: code.targetId,
      domain: 'RISK'
    };
    this.customerAccountService.updateStatusCode(this.selection.getCustomerAccount().id, request, this.selection.getMaplesPlatform())
      .pipe(
        finalize(() => {
          this.editSpinner.stop();
          popover.close();
        })
      )
      .subscribe(() => {
        this.reloadData();
      });
  }

  getAddress(targetId: string): string {
    try {
      return this.addresses.find((address: GenericOption<any>) => address.value === targetId).displayValue;
    } catch (error) {
      return null;
    }
  }

  private buildAddresses(): void {
    this.addresses = [];
    for (let address of this.selection.getCustomerAccount().customer.addresses) {
      this.addresses.push({
        value: address.id,
        displayValue: this.addressToString(address)
      });
    }
  }

  private buildFundingSources(): void {
    this.fundingSources = [];
    for (let fundingSource of this.selection.getCustomerAccount().customer.fundingSources) {
      if (fundingSource.status === 'ACTIVE') {
        this.fundingSources.push({
          value: fundingSource.id,
          displayValue: fundingSource.id
        });
      }
    }
  }

  private addressToString(csCoreAddress: CsCoreAddress): string {
    if (!csCoreAddress) {
      return '';
    }
    let address: string = '';
    address += csCoreAddress.line1;
    address += csCoreAddress.line2 ? ' ' + csCoreAddress.line2 : '';
    address += csCoreAddress.city ? ', ' + csCoreAddress.city : '';
    address += csCoreAddress.state ? ', ' + csCoreAddress.state : '';
    address += csCoreAddress.postalCode ? ', ' + csCoreAddress.postalCode : '';
    address += csCoreAddress.country ? ', ' + csCoreAddress.country : '';
    return address;
  }

  private subscribeToSessionState(): void {
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state && state.selection) {
            this.selection = state.selection;
            if (this.type === 'Account') {
              this.dataSource.data = state.selection.accountStatusCodesAccount;
            } else if (this.type === 'Address') {
              this.dataSource.data = state.selection.accountStatusCodesAddress;
            } else if (this.type === 'FundingSource') {
              this.dataSource.data = state.selection.accountStatusCodesFundingSource;
            }

            this.buildAddresses();
            this.buildFundingSources();

            this.customerAccountService.findAccountDecisionCodes(this.selection.getMaplesPlatform(), this.type.toUpperCase())
              .subscribe((codes: MaplesAccountCode[]) => {
                this.codes = [];
                for (let code of codes) {
                  this.codes.push({
                    value: code,
                    displayValue: code.description
                  });
                }
              });
          }
        })
    );
  }

  enableAddStatusCodeButton(): boolean {
    return  this.securityService.hasPermission ( Permission.SERVE_STATUS_CODE_EDIT );
  }

  getTypeDescription(): String {
    if (this.type === 'Account') {
      this.typeDescription = "Add Account"
    }
    else if (this.type === 'Address') {
      this.typeDescription = "Add Address"
    }
    else if (this.type === 'FundingSource') {
      this.typeDescription = "Add Funding"
    }
    return this.typeDescription;

  }

}
