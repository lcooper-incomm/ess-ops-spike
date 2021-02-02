import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {ServeCancelTransactionWizard} from '../serve-cancel-transaction-wizard';
import {AuditActivityType} from '../../../../core/audit/audit-activity-type.enum';
import {MaplesTransactionService} from '../../../../core/transaction/maples-transaction.service';
import {IdentifierRequest} from '../../../../core/session/model/identifier';
import {IdentifierType} from '../../../../core/session/model/identifier-type.enum';
import {PlatformType} from '../../../../core/platform/platform-type.enum';
import {AuditService} from '../../../../core/audit/audit.service';
import {IdentifierService} from '../../../../core/identifier/identifier.service';
import {CustomerAccountService} from 'src/app/core/customer-account/customer-account.service';
import {MaplesPlatform, MaplesSendNotesRequest, MaplesAccountCode} from '@cscore/maples-client-model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cca-serve-cancel-transaction-confirmation-page',
  templateUrl: './confirmation-page.component.html'
})
export class ServeCancelTransactionConfirmationPageComponent extends WizardPage<ServeCancelTransactionWizard> implements OnInit {

  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup({});
  actionCode: string;

  constructor(
    private auditService: AuditService,
    private customerAccountService: CustomerAccountService,
    private identifierService: IdentifierService,
    private maplesTransactionService: MaplesTransactionService,
  ) {
    super();
  }

  ngOnInit() {
    this.title           = 'Cancel Transaction';
    this.navigationTitle = 'Confirm';
    this.footer          = 'Are you sure you want to perform this action?';
    this.isBackable      = true;
    this.isNextable      = true;
    this.nextButtonText  = 'Yes';
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.LARGE;
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onNext(): Observable<any> {
    return this.twoStageServiceCall(
      this,
      this.wizard.model,
      this.cancelTransaction,
      [
        this.updateAudit,
        this.comment,
        this.sendNote,
      ]
    );
  }

  private cancelTransaction(): Observable<any> {
    if (this.wizard.model.isPreauth) {
      const transactionId: string = this.wizard.model.platform === MaplesPlatform.SERVE
        ? this.wizard.model.transaction.sourceRefNum
        : this.wizard.model.transaction.id;
      return this.maplesTransactionService.cancelPreauthTransaction(
        this.wizard.model.accountId,
        { preauthId: transactionId }
      );
    } else {
      return this.maplesTransactionService.cancelTransaction(
        this.wizard.model.eventId,
        this.wizard.model.request
      );
    }
  }

  private updateAudit(): Observable<any> {
    return this.auditService.addOne(this.wizard.model.auditActivityType);
  }

  private comment(): Observable<any> {
    let request: IdentifierRequest = {
      identifierType: IdentifierType.ACCOUNT_ID,
      value: this.wizard.model.accountId || this.wizard.model.request.accountId,
      platform: PlatformType.SERVE,
      comments: [
        {
          content: this.wizard.model.comment
        }
      ]
    };

    return this.identifierService.addOneIdentifierWithComment(request);
  }

  private sendNote(): Observable<any> {
    return this.customerAccountService
      .findAccountNotesCodes(MaplesPlatform.SERVE)
      .pipe(
        switchMap(codes => {
          const code = codes && codes.find((code: MaplesAccountCode) => code.code === 'CUSTOMER_SERVICE');

          const request: MaplesSendNotesRequest = {
            text: this.wizard.model.comment,
            id: code && code.id || '9',
            code: this.wizard.model.auditActivityType,
            typeId: '264'
          };
      
          return this.customerAccountService.sendNote(this.wizard.model.accountId || this.wizard.model.request.accountId, request, MaplesPlatform.SERVE);
        })
      )
  }
}
