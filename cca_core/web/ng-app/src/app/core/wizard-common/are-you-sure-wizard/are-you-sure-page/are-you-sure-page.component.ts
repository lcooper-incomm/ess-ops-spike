import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {AreYouSureWizard} from '../are-you-sure-wizard';
import {WizardPage} from '../../../wizard/wizard-page';
import {WizardWidth} from '../../../wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../wizard/placeholders/placeholder-dictionary';

@Component({
  selector: 'cca-are-you-sure-page',
  templateUrl: './are-you-sure-page.component.html'
})
export class AreYouSurePageComponent extends WizardPage<AreYouSureWizard> implements OnInit {

  key: string             = 'page';
  wizardForm: FormGroup   = new FormGroup({});
  isActionable: boolean   = true;
  isCloseable: boolean    = true;
  closeButtonText: string = 'No';
  width: WizardWidth      = WizardWidth.MEDIUM;

  ngOnInit(): void {
    this.title            = 'Confirmation';
    this.footer           = 'Are you sure?';
    this.actionButtonText = 'Yes';
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  /**
   * If the yes button is selected modify the doAction to true.
   */
  onAction(): Observable<any> {
    this.wizard.model.doAction = true;
    return super.onAction();
  }
}
