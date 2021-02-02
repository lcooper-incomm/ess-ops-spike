import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {AddShortPayWizard} from '../add-short-pay-wizard';
import {ShortPayService} from '../../../../../core/short-pay/short-pay.service';
import {MatTableDataSource} from '@angular/material/table';
import {ShortPay} from '../../../../../core/short-pay/short-pay';
import {MatPaginator} from '@angular/material/paginator';
import {SpinnerComponent} from '../../../../../core/spinner/spinner.component';
import {CsCoreTableColumn} from '@cscore/components';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'cca-add-short-pay-form-page',
  templateUrl: './add-short-pay-form-page.component.html'
})
export class AddShortPayFormPageComponent extends WizardPage<AddShortPayWizard> implements OnInit {

  key: string             = 'form-page';
  wizardForm: FormGroup   = new FormGroup({
    locationId: new FormControl(''),
    selected: new FormControl(null, Validators.required)
  });
  isNextable: boolean     = true;
  nextButtonText: string  = 'Save';
  isCloseable: boolean    = true;
  closeButtonText: string = 'Cancel';
  width: WizardWidth      = WizardWidth.LARGE;

  dataSource: MatTableDataSource<ShortPay> = new MatTableDataSource<ShortPay>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('loadingSpinner')
  loadingSpinner: SpinnerComponent;

  columns: CsCoreTableColumn<ShortPay>[] = [
    {
      key: 'selection',
      label: '',
      getValue: (shortPay: ShortPay) => undefined,
    },
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

  constructor(private shortPayService: ShortPayService) {
    super();
  }

  ngOnInit(): void {
    this.title                = 'Add Short Pay';
    this.dataSource.paginator = this.paginator;
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  /**
   * OnNext, save the selected short pay which is stored in the selected form control.
   */
  onNext(): Observable<any> {
    return this.shortPayService.create(this.wizardForm.get('selected').value)
      .pipe(
        switchMap(() => {
          return of(null);
        })
      );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Load a list of short pay based upon the locationId.
   */
  search(): void {
    const locationId: string = this.wizardForm.get('locationId').value;
    if (locationId && locationId.length > 1) {
      this.loadingSpinner.start();
      this.shortPayService.findByLocationId(locationId)
        .pipe(
          catchError(() => {
            this.loadingSpinner.stop();
            return of(null);
          })
        )
        .subscribe((shortPays: ShortPay[]) => {
          for (let shortPay of shortPays) {
            shortPay['valid'] = this.wizard.model.merchantIds.indexOf(shortPay.merchantId) === -1
                && this.wizard.model.locationIds.indexOf(shortPay.locationId) === -1
                && this.wizard.model.terminalIds.indexOf(shortPay.terminalId) === -1;
          }

          this.dataSource.data = shortPays;
          this.loadingSpinner.stop();
        });
    }
  }

  toggleSelect(selectedShortPay: ShortPay): void {
    let anySelected: boolean = false;

    for (let shortPay of this.dataSource.data) {
      if (shortPay.merchantId === selectedShortPay.merchantId
          && shortPay.locationId === selectedShortPay.locationId
          && shortPay.terminalId === selectedShortPay.terminalId) {
        shortPay['selected'] = !shortPay['selected'];
        anySelected = shortPay['selected'];
        this.wizardForm.get('selected').setValue(shortPay);
      } else {
        shortPay['selected'] = false;
      }
    }

    if (!anySelected) {
      this.wizardForm.get('selected').setValue(null);
    }
  }

  highlightInvalid: (row: ShortPay) => { [name: string]: boolean } = (row: ShortPay) => {
    if (!row['valid']) {
      return {
        'red': true
      };
    }

    return null;
  }
}
