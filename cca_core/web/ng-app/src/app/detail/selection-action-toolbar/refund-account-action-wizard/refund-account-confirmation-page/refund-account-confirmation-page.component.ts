import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {MaplesFundingSource} from '@cscore/maples-client-model';
import {RefundAccountWizard} from '../refund-account-action-wizard';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {CustomerAccountService} from '../../../../core/customer-account/customer-account.service';
import {AuditService} from '../../../../core/audit/audit.service';
import {IdentifierService} from '../../../../core/identifier/identifier.service';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {IdentifierRequest} from '../../../../core/session/model/identifier';
import {PlatformType} from '../../../../core/platform/platform-type.enum';

@Component({
  selector: 'cca-refund-account-confirmation-page',
  templateUrl: './refund-account-confirmation-page.component.html'
})
export class RefundAccountConfirmationPageComponent extends WizardPage<RefundAccountWizard> implements OnInit {

  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup({});

  constructor(private customerAccountService: CustomerAccountService,
              private auditService: AuditService,
              private identifierService: IdentifierService) {
    super();

    this.title           = 'Account Withdraw';
    this.footer          = 'Are you sure you want to perform this action?';
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
  }

  ngOnInit() {
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onNext(): Observable<any> {
    return this.twoStageServiceCall(
      this,
      this.wizard.model,
      this.refundAccount,
      [
        this.updateAudit,
        this.updateIdentifier
      ]
    );
  }

  getAccountNumber(bankId: string): string {
    return this.wizard.model.linkedAccounts.find((bank: MaplesFundingSource) => {
      return bank.id === bankId;
    }).accountNumber;
  }

  refundAccount(): Observable<any> {
    return this.customerAccountService.refundAccount(
      this.wizard.model.accountId,
      this.wizard.model.request,
      this.wizard.model.platform);
  }

  private updateAudit(): Observable<any> {
    return this.auditService.addOne(this.wizard.model.auditActivityType);
  }

  private updateIdentifier(): Observable<any> {
    let request: IdentifierRequest = {
      identifierType: this.wizard.model.identifierType,
      value: this.wizard.model.accountId,
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
