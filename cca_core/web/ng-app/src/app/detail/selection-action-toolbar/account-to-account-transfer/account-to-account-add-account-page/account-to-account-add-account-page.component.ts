import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {MaplesAccount} from '@cscore/maples-client-model';
import {CcaFormBuilder} from '../../../../core/form/cca-form-builder.service';
import {SpinnerSize} from '../../../../core/spinner/spinner-size.enum';
import {WizardPage} from '../../../../core/wizard/wizard-page';
import {AccountToAccountTransferWizard} from '../account-to-account-transfer-wizard';
import {WizardWidth} from '../../../../core/wizard/wizard-width.enum';
import {PlaceholderDictionary} from '../../../../core/wizard/placeholders/placeholder-dictionary';
import {CustomerAccountService} from '../../../../core/customer-account/customer-account.service';
import {PlatformType} from '../../../../core/platform/platform-type.enum';
import {SpinnerComponent} from '../../../../core/spinner/spinner.component';

@Component({
  selector: 'cca-account-to-account-add-account-page',
  templateUrl: './account-to-account-add-account-page.component.html',
  styleUrls: ['./account-to-account-add-account-page.component.scss']
})
export class AccountToAccountAddAccountPageComponent extends WizardPage<AccountToAccountTransferWizard> implements OnInit {

  key: string             = 'add-account-page';
  wizardForm: FormGroup   = new FormGroup({});
  isAccountValid: boolean = false;
  validatedAccount: MaplesAccount;
  SpinnerSize             = SpinnerSize;
  @ViewChild('validateSpinner')
  validateSpinner: SpinnerComponent;

  constructor(private formBuilder: CcaFormBuilder,
              private customerAccountService: CustomerAccountService) {
    super();
    this.isCloseable = true;
    this.isNextable  = true;
    this.isBackable  = true;
    this.width       = WizardWidth.SMALL;
    this.title       = 'Add Account';
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.wizardForm = new FormGroup({
      accountId: new FormControl(null, [Validators.required]),
      isValidated: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  onNext(): Observable<string> {
    this.wizard.model.toAccount = this.getToAccount();
    return of('review-page');
  }

  private getToAccount(): any {
    return this.getValueFromForm<any>('accountId');
  }

  public validateAccount() {
    this.validateSpinner.start();
    this.customerAccountService.findOneById(this.getToAccount(), PlatformType.SERVE)
      .pipe(finalize(() => {
        this.validateSpinner.stop();
        this.wizardForm.get('isValidated').setValue(this.isAccountValid);
      }))
      .subscribe((response: MaplesAccount | HttpErrorResponse) => {
        if (response instanceof HttpErrorResponse) {
          this.isAccountValid = false;
        } else if (response instanceof MaplesAccount) {
          if (response.id === this.getToAccount()) {
            this.validatedAccount = response;
            this.isAccountValid   = true;
          }
        }
      });
  }

  applyCodexResponse(codexResponse: any, placeholders: PlaceholderDictionary, sanitizer: DomSanitizer): void {
  }

}
