import { Component } from '@angular/core';
import { ServeAdjustTransactionWizard } from '../serve-adjust-transaction-wizard';
import { DomSanitizer } from '@angular/platform-browser';
import { PlaceholderDictionary } from '../../../../core/wizard/placeholders/placeholder-dictionary';
import { Observable } from 'rxjs';
import { AuditActivityType } from '../../../../core/audit/audit-activity-type.enum';
import { IdentifierRequest } from '../../../../core/session/model/identifier';
import { IdentifierType } from '../../../../core/session/model/identifier-type.enum';
import { getFromMaplesPlatform } from '../../../../core/platform/platform-type.enum';
import { MaplesTransactionService } from 'src/app/core/transaction/maples-transaction.service';
import { AuditService } from 'src/app/core/audit/audit.service';
import { IdentifierService } from 'src/app/core/identifier/identifier.service';
import { CustomerAccountService } from 'src/app/core/customer-account/customer-account.service';
import { switchMap } from 'rxjs/operators';
import { MaplesAccountCode, MaplesAdjustTransactionRequest, MaplesPlatform, MaplesSendNotesRequest } from '@cscore/maples-client-model';
import { WizardConfirmationPage } from 'src/app/core/wizard/wizard-dialog/wizard-generic-pages/wizard-confirmation-page';

@Component({
  templateUrl: './serve-adjust-transaction-confirmation-page.component.html',
})
export class ServeAdjustTransactionConfirmationPageComponent extends WizardConfirmationPage<ServeAdjustTransactionWizard> {
  static readonly auditActivityType: AuditActivityType = AuditActivityType.ADJUST_TRANSACTION;

  title: string = 'Adjust Transaction';
  navigationTitle: string = 'Confirm';
  footer: string = 'Are you sure you want to perform this action?';
  backButtonText: string = 'Back';

  constructor(
    private auditService: AuditService,
    private customerAccountService: CustomerAccountService,
    private identifierService: IdentifierService,
    private maplesTransactionService: MaplesTransactionService,
  ) {
    super();
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onNext(): Observable<any> {
    return this.twoStageServiceCall(
      this,
      this.wizard.model,
      this.adjustTransaction,
      [
        this.updateAudit,
        this.comment,
        this.sendNote
      ]
    );
  }

  private adjustTransaction(): Observable<any> {
    const request: MaplesAdjustTransactionRequest = {
      accountId: this.wizard.model.accountId,
      adjustmentType: this.wizard.model.transaction.adjustmentTypeCode,
      amount: this.wizard.model.amount.value.toString(),
      cardId: this.wizard.model.cardId,
      transactionType: this.wizard.model.transaction.typeCode,
      historyId: this.wizard.model.transaction.sourceRefNum,
    };
    return this.maplesTransactionService.adjustTransaction(
      this.wizard.model.transaction.id,
      request,
    );
  }

  private updateAudit(): Observable<any> {
    return this.auditService.addOne(ServeAdjustTransactionConfirmationPageComponent.auditActivityType);
  }

  private comment(): Observable<any> {
    const request: IdentifierRequest = {
      identifierType: IdentifierType.ACCOUNT_ID,
      value: this.wizard.model.accountId,
      platform: getFromMaplesPlatform(this.wizard.model.platform),
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
      .findAccountNotesCodes(this.wizard.model.platform)
      .pipe(
        switchMap(codes => {
          const code = codes && codes.find((code: MaplesAccountCode) => code.code === 'CUSTOMER_SERVICE');

          const request: MaplesSendNotesRequest = {
            text: this.wizard.model.comment,
            id: code && code.id || '9',
            code: ServeAdjustTransactionConfirmationPageComponent.auditActivityType,
            typeId: '264'
          };

          return this.customerAccountService.sendNote(this.wizard.model.accountId, request, MaplesPlatform.SERVE);
        })
      )
  }
}
