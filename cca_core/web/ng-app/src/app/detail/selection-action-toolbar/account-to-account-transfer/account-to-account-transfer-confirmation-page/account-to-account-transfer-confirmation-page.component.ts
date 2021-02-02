import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AccountToAccountTransferWizard} from '../account-to-account-transfer-wizard';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';

@Component({
  selector: 'cca-account-to-account-transfer-confirmation-page',
  templateUrl: './account-to-account-transfer-confirmation-page.component.html',
  styleUrls: ['./account-to-account-transfer-confirmation-page.component.scss']
})
export class AccountToAccountTransferConfirmationPageComponent extends WizardPage<AccountToAccountTransferWizard> implements OnInit {

  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup({});

  constructor() {
    super();
    this.isCloseable = true;
    this.width       = WizardWidth.SMALL;
    this.title       = 'Account To Account Transfer';
  }

  ngOnInit() {
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

}
