import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {flatMap, switchMap} from 'rxjs/operators';
import {getMaplesAccountCodeByDescription, MaplesCardCode} from '@cscore/maples-client-model';
import {ServeCloseAccountWizard} from '../serve-close-account-wizard';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {MaplesSimpleAccountInfo} from '../../../../core/session/model/maples-simple-account-info';
import {CustomerAccountService} from '../../../../core/customer-account/customer-account.service';
import {GenericOption} from '../../../../core/model/generic-option';
import {AccountService} from '../../../../core/account/account.service';

@Component({
  selector: 'cca-serve-close-account-form-page',
  templateUrl: './serve-close-account-form-page.component.html'
})
export class ServeCloseAccountFormPageComponent extends WizardPage<ServeCloseAccountWizard> implements OnInit {

  key: string                             = 'form-page';
  wizardForm: FormGroup                   = new FormGroup({});
  reasons: GenericOption<any>[]           = [];
  initialized: boolean                    = false;
  zeroBalance: boolean                    = true;

  constructor(private accountService: AccountService,
              private customerAccountService: CustomerAccountService) {
    super();
  }

  ngOnInit() {
    this.title           = 'Close Account';
    this.navigationTitle = 'Info';
    this.isBackable      = false;
    this.isNextable      = true;
    this.isCloseable     = true;
    this.nextButtonText  = 'Next';
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.MEDIUM;
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

  /**
   * Find all statuses and balances, then initialize the form.
   */
  onLoad(): Observable<any> {
    return this.customerAccountService.getCombinedAccountInfo(this.wizard.model.account)
      .pipe(
        flatMap((accountInfos: MaplesSimpleAccountInfo[]) => {
          // Remove closed and reserve accounts (any non zero reserve will already have the primary flagged)
          this.wizard.model.accountInfos = accountInfos.filter(
            (accountInfo: MaplesSimpleAccountInfo) => accountInfo.status && accountInfo.status.indexOf('CLOSED') === -1 && accountInfo.accountType !== 'Reserve Account'
          );
          // Make sure primary is first
          this.wizard.model.accountInfos.sort((a: MaplesSimpleAccountInfo, b: MaplesSimpleAccountInfo) => {
            return a.accountType.localeCompare(b.accountType);
          });

          // If non zero balance, force user to close wizard and deal with that
          for (let accountInfo of this.wizard.model.accountInfos) {
            if (!accountInfo.zeroBalance) {
              this.zeroBalance = false;
              this.isNextable = false;
              this.footer = undefined;
              break;
            }
          }

          return this.getReasons();
        })
      )
      .pipe(
        switchMap(() => {
          if (!this.initialized) {
            this.buildForm();
          }
          this.initialized = true;
          return of(null);
        })
      );
  }

  onNext(): Observable<any> {
    this.wizard.model.reason = this.wizardForm.get('reason').value;
    this.wizard.model.comment = this.wizardForm.get('comment').value;

    return of('confirmation-page');
  }

  /**
   * Get status reasons for the CLOSED state.
   */
  private getReasons(): Observable<any> {
    this.reasons = [];

    return this.customerAccountService.findAccountStatusReasonById(getMaplesAccountCodeByDescription('CLOSED'), this.wizard.model.platform)
      .pipe(
        switchMap((codes: MaplesCardCode[]) => {
          for (let code of codes) {
            this.reasons.push({
              value: code.code,
              displayValue: code.code
            });
          }

          return of(null);
        })
      );
  }

  private buildForm(): void {
    this.wizardForm = new FormGroup({
      reason: new FormControl(this.reasons[0].value, [Validators.required]),
      comment: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(500)])
    });
  }

}
