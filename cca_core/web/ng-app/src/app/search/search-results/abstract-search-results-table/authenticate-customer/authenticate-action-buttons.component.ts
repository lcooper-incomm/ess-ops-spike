import {FormControl, FormGroup, Validators} from "@angular/forms";
import {flatMap} from "rxjs/operators";
import {AuthenticateCustomerWizard} from "./authenticate-customer-wizard";
import {WizardPage} from "../../../../core/wizard/wizard-page";
import {Permission} from "../../../../core/auth/permission";
import {WizardWidth} from "../../../../core/wizard/wizard-width.enum";
import {SecurityService} from "../../../../core/security/security.service";
import {AuditActivityType} from "../../../../core/audit/audit-activity-type.enum";
import {ChangeCardStatusWizard} from "../../../../core/action/card-actions/change-card-status-wizard/change-card-status-wizard";
import {AuditService} from "../../../../core/audit/audit.service";
import {WizardRunner} from "../../../../core/wizard/wizard-runner/wizard-runner.service";
import {IdentifierService} from "../../../../core/identifier/identifier.service";
import {IdentifierType} from "../../../../core/session/model/identifier-type.enum";
import {AccountService} from "../../../../core/account/account.service";
import {CustomerAccountService} from "../../../../core/customer-account/customer-account.service";
import {Observable, of} from "rxjs";
import {MaplesPlatform, MaplesSendNotesRequest} from "@cscore/maples-client-model";

/**
 * Action buttons are shown on the form and comment pages, so put action button logic here then have the two pages
 * extend this.  To prevent duplicate code.
 */
export class AuthenticateActionButtonsComponent extends WizardPage<AuthenticateCustomerWizard> {
  key: string;
  wizardForm: FormGroup = new FormGroup({
    validCount: new FormControl(false, Validators.min(3))
  });

  canBypass: boolean;
  canLockCard: boolean;

  auditService: AuditService;
  securityService: SecurityService;
  wizardRunner: WizardRunner;
  identifierService: IdentifierService;
  accountService: AccountService;
  customerAccountService: CustomerAccountService;

  constructor(
    customerAccountService: CustomerAccountService
  ) {
    super();
  }

  initActionButtons(): void {
    this.canBypass = this.securityService.hasPermission(Permission.BYPASS_SERVE_CUSTOMER_VERIFICATION);
    try {
      this.canLockCard = this.wizard.model.account.getAccountStatus().name === 'ACTIVE'
        && this.wizard.model.account.getPrimaryCard().getPlatformStatus().name === 'OPEN'
        && this.securityService.hasPermission(Permission.CHANGE_CARD_STATUS)
        && this.securityService.hasPermission(Permission.SERVE_LOCK_CARD);
    } catch (error) {
      this.canLockCard = false;
    }
    if (this.showActionButtons) {
      this.width = WizardWidth.MEDIUM_LARGE;
    }
  }

  bypass(): void {
    this.addSubscription(
      this.auditService.addOne(AuditActivityType.BYPASS_VERIFY_ACCOUNT)
        .pipe(
          flatMap(() => this.sendComment('bypass')),
          flatMap(() => {
            this.wizard.model.isVerified = true;
            return this.close(true);
          })
        )
        .subscribe()
    );
  }

  notVerified(): void {
    this.addSubscription(
      this.auditService.addOne(AuditActivityType.NOT_VERIFY_MAPLES_CUSTOMER)
        .pipe(
          flatMap(() => this.sendComment('not verified')),
          flatMap(() => {
            this.wizard.model.isVerified = false;
            return of(null)
          })
        )
        .subscribe()
    );
  }

  verified(): void {
    this.addSubscription(
      this.auditService.addOne(AuditActivityType.VERIFY_MAPLES_CUSTOMER)
        .pipe(
          flatMap(() => this.sendComment('verified')),
          flatMap(() => {
            this.wizard.model.isVerified = true;
            return of(null)
          })
        )
        .subscribe()
    );
  }

  public sendComment(str): Observable<any> {
    let request: MaplesSendNotesRequest = {
      text: str,
      id: '8',
      code: this.wizard.model.getAuditActivityType(),
      typeId: '264'
    };
    return this.customerAccountService.sendNote(this.wizard.model.account.id, request, MaplesPlatform.SERVE)
  }


  get showActionButtons(): boolean {
    return this.canBypass;
  }

  lockCard(): void {
    this.wizard.model.lockCard = true;
    this.addSubscription(
      this.close(true).subscribe()
    );

    const wizard                                    = new ChangeCardStatusWizard();
    wizard.model.statusFixed                        = true;
    wizard.model.currentStatus                      = 'Open';
    wizard.model.accountId                          = this.wizard.model.account.id;
    wizard.model.accountStatus                      = this.wizard.model.account.getAccountStatus().name;
    wizard.model.platform                           = this.wizard.model.account.platform;
    wizard.model.cardChangeStatusRequest.cardStatus = 'Locked';
    wizard.model.identifier                         = this.wizard.model.account.id;
    wizard.model.identifierType                     = IdentifierType.ACCOUNT_ID;
    wizard.model.auditActivityType                  = AuditActivityType.LOCK_CARD;

    this.addSubscription(
      this.wizardRunner.run(wizard)
        .afterClosed()
        .subscribe()
    );
  }

}
