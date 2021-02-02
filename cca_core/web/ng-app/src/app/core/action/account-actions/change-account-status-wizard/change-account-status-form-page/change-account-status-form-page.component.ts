import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {MaplesAccountCode, MaplesAccountCodeDescription, MaplesPlatform} from '@cscore/maples-client-model';
import {WizardPage} from '../../../../wizard/wizard-page';
import {ChangeAccountStatusWizard} from '../change-account-status-wizard';
import {GenericOption} from '../../../../model/generic-option';
import {SpinnerComponent} from '../../../../spinner/spinner.component';
import {SecurityService} from '../../../../security/security.service';
import {CustomerAccountService} from '../../../../customer-account/customer-account.service';

@Component({
  selector: 'cca-change-account-status-form-page',
  templateUrl: './change-account-status-form-page.component.html',
  styleUrls: ['./change-account-status-form-page.component.scss']
})
export class ChangeAccountStatusFormPageComponent extends WizardPage<ChangeAccountStatusWizard> {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup({});

  initialized: boolean                = false;
  statusOptions: GenericOption<any>[] = [];
  statusReasons: GenericOption<any>[] = [];

  @ViewChild('spinner') spinner: SpinnerComponent;

  constructor(private customerAccountService: CustomerAccountService,
              private securityService: SecurityService) {
    super();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'Cancel';
  }

  /**
   * Three steps must be followed in order when loading.
   * First, get the account status codes.  Based on the current status, we need the full code so we can do a lookup on
   * status reasons for that code.
   * Second, get the reason codes.
   * Third, build the form with the default values, the account status code and the reason code.
   */
  onLoad(): Observable<any> {
    if (this.initialized) {
      return of(null);
    } else {
      this.statusOptions = [];

      return this.customerAccountService.findAccountStatusCodes(MaplesPlatform.SERVE)
        .pipe(
          switchMap((accountCodes: MaplesAccountCode[]) => {
            let currentCode: string;

            for (let accountCode of accountCodes) {
              if (accountCode.description === MaplesAccountCodeDescription.PERMANENTLYCLOSED
                  || accountCode.description === MaplesAccountCodeDescription.CLOSED) {
                continue;
              }

              this.statusOptions.push({
                value: accountCode,
                displayValue: accountCode.description
              });

              if (accountCode.description === this.wizard.model.currentStatus) {
                currentCode = accountCode.code;
                this.wizard.model.currentStatusCode = accountCode;
              }
            }

            return this.getAccountStatusReasons(currentCode);
          })
        )
        .pipe(
          tap(() => {
            this.initForm();
          })
        );
    }
  }

  onNext(): Observable<string> {
    this.wizard.model.accountChangeStatusRequest.accountStatus = this.wizardForm.get('accountStatus').value.description;
    this.wizard.model.accountChangeStatusRequest.statusReason  = this.wizardForm.get('statusReason').value;
    this.wizard.model.comment                                  = this.wizardForm.get('comment').value;
    return of('confirmation-page');
  }

  /**
   * Get the account status reasons for the account status code.
   */
  private getAccountStatusReasons(code: string): Observable<any> {
    if (this.spinner) {
      this.spinner.start();
    }

    return this.customerAccountService.findAccountStatusReasonById(code, this.wizard.model.platform)
      .pipe(
        switchMap((codes: MaplesAccountCode[]) => {
          this.statusReasons = [];

          for (let code of codes) {
            this.statusReasons.push({
              value: code.code,
              displayValue: code.code
            });
          }

          if (this.spinner) {
            this.spinner.stop();
          }

          return of(null);
        })
      );
  }

  private initForm(): void {
    this.wizardForm = new FormGroup({
      accountStatus: new FormControl(this.wizard.model.currentStatusCode, Validators.required),
      statusReason: new FormControl(this.wizard.model.currentReason, Validators.required),
      comment: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(500)])
    });

    this.wizardForm.get('accountStatus').valueChanges.subscribe((accountCode: MaplesAccountCode) => {
      this.addSubscription(this.getAccountStatusReasons(accountCode.code).subscribe());
    });

    this.initialized = true;
  }
}
