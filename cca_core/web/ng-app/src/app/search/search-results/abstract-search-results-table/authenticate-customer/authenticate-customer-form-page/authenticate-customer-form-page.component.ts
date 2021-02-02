import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {forkJoin, Observable, of} from "rxjs";
import {mapTo} from "rxjs/operators";
import {MaplesChallengeQuestion} from '@cscore/maples-client-model';
import * as _ from 'lodash';
import {ValidatedStatus} from 'src/app/core/status/validated-status/validated-status.component';
import {AuthenticateActionButtonsComponent} from '../authenticate-action-buttons.component';
import {AuditActivityType} from '../../../../../core/audit/audit-activity-type.enum';
import {AuditService} from "../../../../../core/audit/audit.service";
import {SecurityService} from "../../../../../core/security/security.service";
import {WizardRunner} from "../../../../../core/wizard/wizard-runner/wizard-runner.service";
import {IdentifierService} from "../../../../../core/identifier/identifier.service";
import {WizardWidth} from "../../../../../core/wizard/wizard-width.enum";
import {CustomerAccountService} from "../../../../../core/customer-account/customer-account.service";
import {CcaValidators} from "../../../../../core/validators/cca-validators";

@Component({
  selector: 'cca-authenticate-customer-form-page',
  templateUrl: './authenticate-customer-form-page.component.html',
  styleUrls: ['./authenticate-customer-form-page.component.scss']
})
export class AuthenticateCustomerFormPageComponent extends AuthenticateActionButtonsComponent implements OnInit {

  key: string              = 'form-page';
  actionButtonText: string = 'Not Verified';
  nextButtonText: string   = 'Verified';
  closeButtonText: string  = 'Cancel';
  isActionable: boolean    = true;
  isNextable: boolean      = true;
  isCloseable: boolean     = true;
  form: FormGroup          = new FormGroup({});

  email: string;
  securityQuestion: MaplesChallengeQuestion;
  showCsc3Field: boolean = false;

  constructor(
    auditService: AuditService,
    securityService: SecurityService,
    wizardRunner: WizardRunner,
    identifierService: IdentifierService,
    customerAccountService: CustomerAccountService
  ) {
    super(customerAccountService);
    this.width = WizardWidth.MEDIUM;

    this.auditService           = auditService;
    this.securityService        = securityService;
    this.wizardRunner           = wizardRunner;
    this.identifierService      = identifierService;
    this.customerAccountService = customerAccountService;
  }

  ngOnInit() {
    this.audit();
    this.initForms();
    this.validateForm();
    this.initActionButtons();
  }

  onAction(): Observable<any> {
    return of('comment-page');
  }


  onNext(): Observable<string> {
    this.wizard.model.isCancelled = false,
      this.wizard.model.isVerified = true
    return forkJoin(
      this.sendComment('verified')
    ).pipe(
      mapTo(null),
    );
  }

  onClose(): Observable<any> {
    if (this.wizard.model.isCancelled && !this.wizard.model.isVerified) {
      return this.auditService.addOne(this.wizard.model.getAuditActivityType())
        .pipe(
          mapTo(null)
        );
    } else {
      return of(null);
    }
  }

  get formHint(): string {
    if (this.form.pristine && !this.getValidatedStatus('ssnLastFour') && !this.getValidatedStatus('dateOfBirth')) {
      return '3 More Authentication Responses Required';
    } else if (this.wizardForm.get('validCount').invalid) {
      const minError     = this.wizardForm.get('validCount').getError('min');
      const itemsMissing = minError.min - minError.actual;
      return itemsMissing === 1 ?
        '1 More Authentication Responses Required' :
        `${itemsMissing} More Authentication Responses Required`;
    } else {
      return `0 More Authentication Responses Required`;
    }
  }

  getValidatedStatus(controlName: string): ValidatedStatus {
    const control = this.form.get(controlName);

    let controlVerified: boolean = false;
    if (this.wizard.model.verification) {
      switch (controlName) {
        case 'ssnLastFour':
          if (this.wizard.model.verification.isLastFourSsnVerified) {controlVerified = true; }
          break;
        case 'dateOfBirth':
          if (this.wizard.model.verification.isDateOfBirthVerified) {controlVerified = true; }
          break;
        case 'csc3CodeVerified':
          if (this.wizard.model.verification.isCardVerified) {controlVerified = true; }
          break;
      }
    }
    if ((control.value == null || control.value === '') && !controlVerified) {
      return 'none';
    } else  if (controlVerified) {
      !this.form.get(controlName).disabled ? this.form.get(controlName).disable() : null;
      return 'valid';
    } else {
      return control.valid ? 'valid' : 'invalid';
    }
  }

  private audit(): void {
    this.auditService.addOne(AuditActivityType.OPEN_VERIFY_CUSTOMER)
      .subscribe();
  }

  private getValidControls(): String[] {
    return [
      'ssnLastFour',
      'dateOfBirth',
      'securityQuestionVerified',
      'emailVerified',
    ].filter(control => this.getValidatedStatus(control) === 'valid');
  }

  private initForms(): void {
    this.securityQuestion = this.chooseSecurityQuestion();
    this.showCsc3Field    = this.wizard.model.verification && this.wizard.model.verification.isCardVerified;
    const customer        = this.wizard.model.account.customer;
    this.email            = customer && customer.getPrimaryEmailAddress() ? customer.getPrimaryEmailAddress().email : null;

    this.form = new FormGroup({
      csc3CodeVerified: new FormControl(false, Validators.requiredTrue),
      dateOfBirth: new FormControl(null, [CcaValidators.date(), CcaValidators.equals(customer.dateOfBirth)]),
      emailVerified: new FormControl(false, Validators.requiredTrue),
      securityQuestionVerified: new FormControl(null),
      ssnLastFour: new FormControl(null, [CcaValidators.lengthEquals(4), CcaValidators.equals(customer.ssnLastFour)]),
    });

    // Enable next button if we have at least 3 valid controls
    this.addSubscription(
      this.form.statusChanges.subscribe(() => {
        this.validateForm();
      })
    );
  }

  private validateForm() {
    if (this.wizardForm.get('validCount')) {
      this.wizardForm.get('validCount').setValue(this.getValidControls().length);
    }
  }

  private chooseSecurityQuestion(): MaplesChallengeQuestion {
    const securityInfo = this.wizard.model.account.securityInfo;
    const questions    = securityInfo ? securityInfo.challengeQuestions : [];
    return _.sample(questions);
  }
}
