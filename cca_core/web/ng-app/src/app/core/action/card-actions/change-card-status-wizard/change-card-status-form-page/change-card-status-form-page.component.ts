import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {getMaplesAccountCodeByDescription, MaplesCardCode} from '@cscore/maples-client-model';
import {WizardPage} from '../../../../wizard/wizard-page';
import {GenericOption} from '../../../../model/generic-option';
import {ChangeCardStatusWizard} from '../change-card-status-wizard';
import {CardService} from '../../../../card/card.service';
import {PlaceholderDictionary} from '../../../../wizard/placeholders/placeholder-dictionary';
import {CustomerAccountService} from '../../../../customer-account/customer-account.service';

@Component({
  selector: 'cca-change-card-status-form-page',
  templateUrl: './change-card-status-form-page.component.html',
  styleUrls: ['./change-card-status-form-page.component.scss']
})
export class ChangeCardStatusFormPageComponent extends WizardPage<ChangeCardStatusWizard> {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup({});

  statusOptions: GenericOption<any>[] = [];
  statusReasons: GenericOption<any>[] = [];

  constructor(private customerAccountService: CustomerAccountService,
              private cardService: CardService) {
    super();

    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
    this.navigationTitle = 'Form';
  }

  ngOnInit(): void {
    this.getCardStatusOptions();
    this.initForm();
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  onLoad(): Observable<any> {
    this.wizard.updatePageTitles(this);

    return this.getCardStatusReasons();
  }

  onNext(): Observable<string> {
    this.wizard.model.cardChangeStatusRequest.cardStatus = this.wizardForm.get('cardStatus').value;

    if (this.wizard.model.cardChangeStatusRequest.cardStatus !== 'Activate') {
      this.wizard.model.cardChangeStatusRequest.statusReason = this.wizardForm.get('statusReason').value;
    }
    if (this.wizard.model.cardChangeStatusRequest.cardStatus === 'Activate') {
      this.wizard.model.cardChangeStatusRequest.cvvCode = this.wizardForm.get('cvv').value;
    }
    this.wizard.model.comment = this.wizardForm.get('comment').value;
    return of('confirmation-page');
  }

  private getCardStatusOptions(): void {
    this.statusOptions = [];

    if (this.wizard.model.statusFixed) {
      this.statusOptions.push({
        value: this.wizard.model.cardChangeStatusRequest.cardStatus,
        displayValue: this.wizard.model.cardChangeStatusRequest.cardStatus
      });
    } else {
      this.statusOptions = this.cardService.getCardStatusOptions(this.wizard.model.currentStatus);

      if (this.statusOptions.length > 0) {
        this.wizard.model.cardChangeStatusRequest.cardStatus = this.statusOptions[0].value;
      }
    }
  }

  /**
   * Get the account status reasons for the current account status.  The card status reasons are associated with the current
   * account status.
   */
  private getCardStatusReasons(): Observable<any> {
    this.statusReasons = [];

    return this.customerAccountService.findAccountStatusReasonById(getMaplesAccountCodeByDescription(this.wizard.model.accountStatus), this.wizard.model.platform)
      .pipe(
        switchMap((codes: MaplesCardCode[]) => {
          for (let code of codes) {
            this.statusReasons.push({
              value: code.code,
              displayValue: code.code
            });
          }

          return of(null);
        })
      );
  }

  private initForm(): void {
    this.wizardForm = new FormGroup({
      comment: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(500)])
    });

    this.wizardForm.addControl('cardStatus', new FormControl(this.wizard.model.cardChangeStatusRequest.cardStatus, Validators.required));
    if (this.wizard.model.statusFixed) {
      this.wizardForm.get('cardStatus').disable();
    }

    if (this.wizard.model.cardChangeStatusRequest.cardStatus !== 'Activate') {
      this.wizardForm.addControl('statusReason', new FormControl(null, Validators.required));
    }

    if (this.wizard.model.cardChangeStatusRequest.cardStatus === 'Activate') {
      this.wizardForm.addControl('cvv', new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(4)]));
    }
  }
}
