import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, finalize, map, switchMap} from 'rxjs/operators';
import {CsCoreAddress} from '@cscore/core-client-model';
import {WizardPage} from '../../../../../wizard/wizard-page';
import {PersonalInfoWizard} from '../personal-info-wizard';
import {WizardWidth} from '../../../../../wizard/wizard-width.enum';
import {EmailSupportRequest} from '../../../../../../user-menu/email-support-wizard/email-support-request';
import {EmailSupportService} from '../../../../../../user-menu/email-support-wizard/email-support.service';
import {PropertyType} from '../../../../../model/property-type.enum';
import {PropertyService} from '../../../../../config/property.service';
import {AuditService} from '../../../../../audit/audit.service';
import {AuditActivityType} from '../../../../../audit/audit-activity-type.enum';
import {SessionService} from '../../../../session.service';
import {SessionRequest} from '../../../../model/session-request';
import {SessionClassType} from '../../../../session-class-type.enum';
import {SessionTypeType} from '../../../../session-type-type.enum';
import {Session} from '../../../../model/session';
import {FlatPrivacyRequestComponent} from '../../../../model/privacy-request-component';

@Component({
  selector: 'cca-personal-info-confirmation-page',
  templateUrl: './personal-info-confirmation-page.component.html',
  styleUrls: ['./personal-info-confirmation-page.component.scss']
})
export class PersonalInfoConfirmationPageComponent extends WizardPage<PersonalInfoWizard> implements OnInit {
  key: string           = 'review-page';
  wizardForm: FormGroup = new FormGroup({});

  constructor(private auditService: AuditService,
              private sessionService: SessionService,
              private emailSupportService: EmailSupportService,
              private propertyService: PropertyService) {
    super();
    this.isNextable      = true;
    this.isBackable      = true;
    this.isCloseable     = true;
    this.nextButtonText  = 'Yes';
    this.backButtonText  = 'No';
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.MEDIUM;
  }

  ngOnInit() {
  }

  isSuccess(): boolean {
    return this.wizard.model.success[0] && this.wizard.model.success[1];
  }

  onNext(): Observable<string> {
    let sessionRequest: SessionRequest = this.buildSessionRequest();

    return this.sessionService.createSession(sessionRequest).pipe(
      finalize(() => {
        this.auditService.addOne(AuditActivityType.PERSONAL_INFO_REQUEST).subscribe();
      }),
      catchError((error) => {
        this.wizard.model.success[0] = false;
        return of(undefined);
      }),
      switchMap((session: Session) => {
        if (session) {
          this.wizard.model.privacyRequestSessionId = session.id;

          let url: string = window.location.href;
          url = url.substr(0, url.indexOf('/', 10));

          this.wizard.placeholderDictionary.clear();
          this.wizard.placeholderDictionary.addPlaceholder('URL', url);
          this.wizard.placeholderDictionary.addPlaceholder('CASE_ID', session.id.toString());
          let emailContent: string              = this.wizard.placeholderDictionary.applyPlaceholders(this.codexResponse.emailContent);
          let emailRequest: EmailSupportRequest = this.buildEmailRequest(session.id, emailContent);
          return this.emailSupportService.sendEmail(emailRequest)
            .pipe(
              catchError((error) => {
                this.wizard.model.success[1] = false;
                return of(undefined);
              })
            );
        } else {
          return of(null);
        }
      }),
      map(() => {
        return 'confirmation-page';
      })
    );
  }

  private buildEmailRequest(sessionId: number, emailContent: string): EmailSupportRequest {
    let request       = new EmailSupportRequest();
    request.recipient = this.getRecipient();
    request.sender    = this.getSender();
    request.subject   = 'CCA Privacy Request Notification - ' + sessionId;
    request.body      = emailContent;
    return request;
  }

  private buildSessionRequest(): SessionRequest {
    let request = new SessionRequest({
      sessionClass: SessionClassType.CASE,
      sessionType: SessionTypeType.PRIVACY_REQUEST,
      privacyRequestComponent: <FlatPrivacyRequestComponent>{
        firstName: this.wizard.model.request.firstName,
        lastName: this.wizard.model.request.lastName,
        phoneNumber: this.wizard.model.request.phoneNumber,
        line1: this.wizard.model.request.address.line1,
        line2: this.wizard.model.request.address.line2,
        city: this.wizard.model.request.address.city,
        state: this.wizard.model.request.address.state,
        postalCode: this.wizard.model.request.address.postalCode,
        email: this.wizard.model.request.email,
        jobTitle: this.wizard.model.request.jobTitle,
        account: this.wizard.model.request.account,
        comment: this.wizard.model.request.comment,
        productId: this.wizard.model.request.productId
      }
    });
    return request;
  }

  private getRecipient(): string {
    return this.propertyService.findOneValueFromSnapshot(PropertyType.INCOMM_PRIVACY_REQUEST_RECIPIENT);
  }

  private getSender(): string {
    return this.propertyService.findOneValueFromSnapshot(PropertyType.INCOMM_NO_REPLY_SENDER);
  }
}

export class PersonalInfoRequest {
  account: string;
  address: CsCoreAddress;
  comment: string;
  email: string;
  firstName: string;
  jobTitle: string;
  lastName: string;
  phoneNumber: string;
  productId: number;

  constructor(data: any = null) {
    if (data) {
      Object.assign(this, data);

      if (data.address) {
        this.address = new CsCoreAddress(data.address);
      }
    }
  }
}
