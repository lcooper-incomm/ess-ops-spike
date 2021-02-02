import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Observable, of} from 'rxjs';
import {MaplesRule} from '@cscore/maples-client-model';
import {CsCoreTableColumn} from '@cscore/components';
import {WizardPage} from '../../../../wizard/wizard-page';
import {ViewBlockedMerchantsWizard} from '../view-blocked-merchants-wizard';
import {WizardWidth} from '../../../../wizard/wizard-width.enum';
import {SelectionType} from '../../../../session/model/selection-type.enum';
import {PlaceholderDictionary} from '../../../../wizard/placeholders/placeholder-dictionary';

@Component({
  selector: 'cca-view-blocked-merchants',
  templateUrl: './view-blocked-merchants.component.html'
})
export class ViewBlockedMerchantsComponent extends WizardPage<ViewBlockedMerchantsWizard> {

  key: string                                       = 'form-page';
  title: string                                     = 'View Blocked Merchants';
  wizardForm: FormGroup                             = new FormGroup({});
  dataSource                                        = new MatTableDataSource<MaplesRule>();
  displayedColumns: CsCoreTableColumn<MaplesRule>[] = [];
  isSelectAllChecked: boolean                       = false;
  isNextable: boolean                               = false;
  nextButtonText: string                            = 'Next';

  blockedMerchantColumns: CsCoreTableColumn<MaplesRule>[] = [
    {
      key: 'selection',
      label: '',
      getValue: (merchant: MaplesRule) => undefined,
      disableSort: true
    },
    {
      key: 'merchantName',
      label: 'Merchant Name',
      getValue: (merchant: MaplesRule) => merchant.name,
    },
    {
      key: 'merchantId',
      label: 'Merchant ID',
      getValue: (merchant: MaplesRule) => merchant.merchantId,
    },
    {
      key: 'createDate',
      label: 'Date Created',
      getValue: (merchant: MaplesRule) => merchant.createDate.displayValue,
    }
  ];

  constructor() {
    super();
    this.isCloseable = true;
    this.width       = WizardWidth.LARGE;
  }

  onLoad(): Observable<any> {
    this.displayedColumns = this.setDisplayedColumns();
    this.dataSource.data  = this.loadActiveBlockedMerchants();
    return of(null);
  }

  onNext(): Observable<any> {
    this.wizard.model.unblockMerchants = [];
    for (let datum of this.dataSource.data) {
      if (datum['isSelected']) {
        this.wizard.model.unblockMerchants.push(datum);
      }
    }

    return of('confirmation-page');
  }

  toggleSelectAll(): void {
    this.isSelectAllChecked = !this.isSelectAllChecked;
    if (this.isSelectAllChecked) {
      this.isNextable = true;
    }

    for (let datum of this.dataSource.data) {
      datum['isSelected'] = this.isSelectAllChecked;
    }

    this.checkNextable();
  }

  toggleSelect(rule: MaplesRule): void {
    rule['isSelected'] = !rule['isSelected'];

    if (!rule['isSelected'] && this.isSelectAllChecked) {
      this.isSelectAllChecked = false;
    }

    this.checkNextable();
  }

  checkNextable(): void {
    this.isNextable = false;

    if (this.isSelectAllChecked) {
      this.isNextable = true;
      return;
    }
    for (let datum of this.dataSource.data) {
      if (datum['isSelected']) {
        this.isNextable = true;
        break;
      }
    }
  }

  private setDisplayedColumns(): CsCoreTableColumn<MaplesRule>[] {
    let columns: CsCoreTableColumn<MaplesRule>[] = [];
    switch (this.wizard.model.selection.type) {
      case SelectionType.CUSTOMER_ACCOUNT:
        columns = this.blockedMerchantColumns;
        break;
      default:
        break;
    }

    return columns;
  }

  private loadActiveBlockedMerchants(): MaplesRule[] {
    let blockedMerchants: MaplesRule[];
    if (this.wizard.model.selection && this.wizard.model.selection.blockedMerchants) {
      blockedMerchants = this.wizard.model.selection.blockedMerchants.filter(
        (blockedMerchants: MaplesRule) => blockedMerchants.status && blockedMerchants.status.toLowerCase() === 'active'
      );

      return blockedMerchants;
    }
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

}
