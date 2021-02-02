import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {WizardPage} from '../../../../../core/wizard/wizard-page';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../../core/wizard/placeholders/placeholder-dictionary';
import {ShortPayService} from '../../../../../core/short-pay/short-pay.service';
import {EditShortPayWizard} from '../edit-short-pay-wizard';

@Component({
  selector: 'cca-edit-short-pay-form-page',
  templateUrl: './edit-short-pay-form-page.component.html'
})
export class EditShortPayFormPageComponent extends WizardPage<EditShortPayWizard> implements OnInit {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup({});
  width: WizardWidth    = WizardWidth.MEDIUM;
  isDeletable: boolean  = true;
  isCloseable: boolean  = true;

  ngOnInit(): void {
    this.title = 'Edit Short Pay';

    this.buildForm();
  }

  constructor(private shortPayService: ShortPayService) {
    super();
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onDelete(): Observable<any> {
    return this.shortPayService.delete(this.wizard.model.shortPay);
  }

  private buildForm(): void {
    this.wizardForm = new FormGroup({
      merchantId: new FormControl(this.wizard.model.shortPay.merchantId),
      merchantName: new FormControl(this.wizard.model.shortPay.merchantName),
      locationId: new FormControl(this.wizard.model.shortPay.locationId),
      locationName: new FormControl(this.wizard.model.shortPay.locationName),
      terminalId: new FormControl(this.wizard.model.shortPay.terminalId),
      terminalNumber: new FormControl(this.wizard.model.shortPay.terminalNumber)
    });

    this.wizardForm.get('merchantId').disable();
    this.wizardForm.get('merchantName').disable();
    this.wizardForm.get('locationId').disable();
    this.wizardForm.get('locationName').disable();
    this.wizardForm.get('terminalId').disable();
    this.wizardForm.get('terminalNumber').disable();
  }
}
