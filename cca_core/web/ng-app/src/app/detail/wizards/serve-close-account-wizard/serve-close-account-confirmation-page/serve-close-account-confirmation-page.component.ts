import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, finalize, flatMap, switchMap} from 'rxjs/operators';
import {ServeCloseAccountWizard} from '../serve-close-account-wizard';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AuditActivityType} from '../../../../core/audit/audit-activity-type.enum';
import {AuditService} from '../../../../core/audit/audit.service';
import {IdentifierService} from '../../../../core/identifier/identifier.service';
import {AccountService} from '../../../../core/account/account.service';
import {IdentifierRequest} from '../../../../core/session/model/identifier';
import {PlatformType} from '../../../../core/platform/platform-type.enum';
import {IdentifierType} from '../../../../core/session/model/identifier-type.enum';

@Component({
  selector: 'cca-serve-close-account-confirmation-page',
  templateUrl: './serve-close-account-confirmation-page.component.html'
})
export class ServeCloseAccountConfirmationPageComponent extends WizardPage<ServeCloseAccountWizard> implements OnInit {

  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.title           = 'Close Account';
    this.navigationTitle = 'Confirm';
    this.isBackable      = true;
    this.isNextable      = true;
    this.isCloseable     = true;
    this.footer          = 'Are you sure you want to perform this action?';
    this.backButtonText  = 'Back';
    this.nextButtonText  = 'Yes';
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.MEDIUM;
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onNext(): Observable<any> {
    return of('progress-page');
  }
}
