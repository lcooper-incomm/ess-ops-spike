import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {forkJoin, Observable, of} from 'rxjs';
import {mapTo, switchMap} from 'rxjs/operators';
import {IdentifierType} from '../../../../../core/session/model/identifier-type.enum';
import {PlatformType} from '../../../../../core/platform/platform-type.enum';
import {IdentifierRequest} from '../../../../../core/session/model/identifier';
import {AuthenticateActionButtonsComponent} from '../authenticate-action-buttons.component';
import {AuditService} from '../../../../../core/audit/audit.service';
import {SecurityService} from '../../../../../core/security/security.service';
import {WizardRunner} from '../../../../../core/wizard/wizard-runner/wizard-runner.service';
import {IdentifierService} from '../../../../../core/identifier/identifier.service';
import {WizardWidth} from '../../../../../core/wizard/wizard-width.enum';
import {AccountService} from '../../../../../core/account/account.service';
import {CustomerAccountService} from '../../../../../core/customer-account/customer-account.service';
import {MaplesAccountCode, MaplesPlatform, MaplesSendNotesRequest} from '@cscore/maples-client-model';

@Component({
  selector: 'cca-authenticate-customer-comment-page',
  templateUrl: './authenticate-customer-comment-page.component.html',
  styleUrls: ['./authenticate-customer-comment-page.component.scss']
})
export class AuthenticateCustomerCommentPageComponent extends AuthenticateActionButtonsComponent implements OnInit {
  nextButtonText: string = 'Submit';
  wizardForm: FormGroup  = new FormGroup({});
  isNextable: boolean    = true;
  isBackable: boolean    = true;
  key: string            = 'comment-page';

  constructor(
    auditService: AuditService,
    securityService: SecurityService,
    wizardRunner: WizardRunner,
    identifierService: IdentifierService,
    accountService: AccountService,
    customerAccountService: CustomerAccountService
  ) {
    super(customerAccountService);
    this.width = WizardWidth.MEDIUM;

    this.auditService = auditService;
    this.securityService = securityService;
    this.wizardRunner = wizardRunner;
    this.identifierService = identifierService;
    this.accountService = accountService;
    this.customerAccountService = customerAccountService;
  }

  ngOnInit() {
    this.initForms();
    this.initActionButtons();
    this.customerAccountService.findAccountNotesCodes(MaplesPlatform.SERVE);
  }

  ngAfterViewInit() {
    this.notVerified();
  }

  onNext(): Observable<string> {
    return forkJoin(
      this.updateIdentifier(),
      this.updateAudit(),
      this.sendCommentToServe()
    ).pipe(
      mapTo(null),
    );
  }

  private sendCommentToServe(): Observable<any> {
    return this.customerAccountService
      .findAccountNotesCodes(this.wizard.model.account.platform)
      .pipe(
        switchMap(codes => {
          const code = codes && codes.find((code: MaplesAccountCode) => code.code === 'AUTHORIZATIONS');
      
          const request: MaplesSendNotesRequest = {
            text : this.wizardForm.get('comment').value,
            id: code && code.id || '8',
            code: this.wizard.model.getAuditActivityType(),
            typeId: '264'
          };

          return this.customerAccountService.sendNote(this.wizard.model.account.id, request, MaplesPlatform.SERVE);
        })
      );
  }

  private updateAudit() {
    this.wizard.model.isComment = true;
    return this.auditService.addOne(this.wizard.model.getAuditActivityType());
  }

  private updateIdentifier() {
    let request: IdentifierRequest = {
      identifierType: IdentifierType.ACCOUNT_ID,
      value: this.wizard.model.account.id,
      platform: PlatformType.SERVE,
      comments: [
        {
          content: this.wizardForm.get('comment').value,
        }
      ]
    };

    return this.identifierService.addOneIdentifierWithComment(request);
  }

  onBack(): Observable<any> {
    return of('form-page');
  }

  private initForms(): void {
    this.wizardForm = new FormGroup({
      comment: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(500)])
    });
  }
}
