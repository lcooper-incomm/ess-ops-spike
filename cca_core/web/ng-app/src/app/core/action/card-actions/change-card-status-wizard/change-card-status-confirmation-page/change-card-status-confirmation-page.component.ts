import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormGroup} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {WizardPage} from '../../../../wizard/wizard-page';
import {AuditService} from '../../../../audit/audit.service';
import {IdentifierService} from '../../../../identifier/identifier.service';
import {SessionState} from '../../../../session/session-state';
import {IdentifierRequest} from '../../../../session/model/identifier';
import {PlatformType} from '../../../../platform/platform-type.enum';
import {CardService} from '../../../../card/card.service';
import {ChangeCardStatusWizard} from '../change-card-status-wizard';
import {PlaceholderDictionary} from '../../../../wizard/placeholders/placeholder-dictionary';
import {AccountService} from "../../../../account/account.service";
import {CustomerAccountService} from "../../../../customer-account/customer-account.service";
import {MaplesAccountCode, MaplesPlatform, MaplesSendNotesRequest} from "@cscore/maples-client-model";
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'cca-change-card-status-confirmation-page',
  templateUrl: './change-card-status-confirmation-page.component.html',
  styleUrls: ['./change-card-status-confirmation-page.component.scss']
})
export class ChangeCardStatusConfirmationPageComponent extends WizardPage<ChangeCardStatusWizard> {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup({});

  constructor(private cardService: CardService,
              private auditService: AuditService,
              private identifierService: IdentifierService,
              private customerAccountService: CustomerAccountService,
              private accountService: AccountService,
              private store: Store<SessionState>) {
    super();

    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
    this.navigationTitle = 'Confirm';
    this.footer          = 'Are you sure you want to perform this action?';
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onLoad(): Observable<any> {
    this.wizard.updatePageTitles(this);
    return of();
  }

  /**
   * First make request to change card status, if successful, run audit and comment together.
   */
  onNext(): Observable<any> {
    return this.twoStageServiceCall(
      this,
      this.wizard.model,
      this.changeCardStatus,
      [
        this.updateAudit,
        this.updateIdentifier,
        this.sendCommentToServe
      ]
    );
  }

  private changeCardStatus(): Observable<any> {
    return this.cardService.changeCardStatus(this.wizard.model.accountId, this.wizard.model.cardChangeStatusRequest, this.wizard.model.platform);
  }

  private updateAudit(): Observable<any> {
    return this.auditService.addOne(this.wizard.model.auditActivityType);
  }

  private sendCommentToServe(): Observable<any> {
    return this.customerAccountService
      .findAccountNotesCodes(this.wizard.model.platform)
      .pipe(
        switchMap(codes => {
          const code = codes && codes.find((code: MaplesAccountCode) => code.code === 'CARDS');
      
          const request: MaplesSendNotesRequest = {
            text : this.wizard.model.comment,
            id: code && code.id || '10',
            code: this.wizard.model.auditActivityType,
            typeId: '264'
          };
          return this.customerAccountService.sendNote(this.wizard.model.accountId, request, MaplesPlatform.SERVE);
        })
      );
  }

  private updateIdentifier(): Observable<any> {
    let request: IdentifierRequest = {
      identifierType: this.wizard.model.identifierType,
      value: this.wizard.model.identifier,
      platform: PlatformType.SERVE,
      comments: [
        {
          content: this.wizard.model.comment
        }
      ]
    };

    return this.identifierService.addOneIdentifierWithComment(request);
  }
}
