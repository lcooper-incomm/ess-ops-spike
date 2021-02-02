import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {WizardResultPage} from '../../../../wizard/wizard-dialog/wizard-generic-pages/wizard-result-page';
import {ChangeCardStatusWizard} from '../change-card-status-wizard';
import {PlaceholderDictionary} from '../../../../wizard/placeholders/placeholder-dictionary';

@Component({
  selector: 'cca-change-card-status-result-page',
  templateUrl: './change-card-status-result-page.component.html',
  styleUrls: ['./change-card-status-result-page.component.scss']
})
export class ChangeCardStatusResultPageComponent extends WizardResultPage<ChangeCardStatusWizard> {

  constructor () {
    super ();

    this.navigationTitle = 'Result';
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onLoad(): Observable<any> {
    this.wizard.updatePageTitles(this);
    return of();
  }

  isSuccess (): boolean {
    return this.wizard.model.success === 0;
  }
}
