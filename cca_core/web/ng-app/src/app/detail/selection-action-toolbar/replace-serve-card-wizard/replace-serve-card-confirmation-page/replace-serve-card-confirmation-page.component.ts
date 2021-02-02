import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {ReplaceServeCardWizard} from '../replace-serve-card-wizard';
import {CardService} from '../../../../core/card/card.service';
import {IdentifierRequest} from '../../../../core/session/model/identifier';
import {PlatformType} from '../../../../core/platform/platform-type.enum';
import {AuditActivityType} from '../../../../core/audit/audit-activity-type.enum';
import {AuditService} from '../../../../core/audit/audit.service';
import {IdentifierService} from '../../../../core/identifier/identifier.service';
import {cardReplaceReasonDisplayMap} from '../../../../core/card/card-replace-reason.enum';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {GenericOption} from '../../../../core/model/generic-option';
import {ReplaceServeCardPageComponent} from '../replace-serve-card-page.component';

@Component({
  selector: 'cca-replace-serve-card-confirmation-page',
  templateUrl: './replace-serve-card-confirmation-page.component.html',
  styleUrls: ['./replace-serve-card-confirmation-page.component.scss']
})
export class ReplaceServeCardConfirmationPageComponent extends ReplaceServeCardPageComponent implements OnInit {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup({});

  constructor(private cardService: CardService,
              private auditService: AuditService,
              private identifierService: IdentifierService) {
    super();
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.nextButtonText  = 'Yes';
    this.width           = WizardWidth.MEDIUM;
    this.title           = 'Replace Card';
  }

  ngOnInit() {
  }

  /**
   * Replace card and if successful, audit and comment.
   */
  onNext(): Observable<any> {
    if (this.wizard.model.request.isPrimaryAddressValid) {
      this.wizard.model.request.address = undefined;
    }
    if (this.wizard.model.request.shippingMethod === 'USPS') {
      this.wizard.model.request.isFeeWaived     = true;
      this.wizard.model.request.isFeeApplicable = false;
    } else {
      this.wizard.model.request.isFeeApplicable = true;
    }

    return this.twoStageServiceCall(
      this,
      this.wizard.model,
      this.replaceCard,
      [
        this.updateAudit,
        this.updateIdentifier
      ]
    );
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  replaceCard(): Observable<any> {
    return this.cardService.replaceCard(this.wizard.model.cardId, this.wizard.model.request, this.wizard.model.platform);
  }

  getShippingDisplayValue(shippingOptionValue: string): string {
    return shippingOptionValue ? this.wizard.model.shippingOptions.find((shippingOption: GenericOption<any>) => shippingOption.value === shippingOptionValue).displayValue : '';
  }

  getReasonDisplayValue(reason: string): string {
    return cardReplaceReasonDisplayMap.get(reason);
  }

  private updateAudit(): Observable<any> {
    return this.auditService.addOne(AuditActivityType.REPLACE_CARD);
  }

  private updateIdentifier(): Observable<any> {
    let request: IdentifierRequest = {
      identifierType: this.wizard.model.identifierType,
      value: this.wizard.model.identifier,
      platform: PlatformType.SERVE,
      comments: [
        {
          content: this.wizard.model.request.comment
        }
      ]
    };

    return this.identifierService.addOneIdentifierWithComment(request);
  }
}
