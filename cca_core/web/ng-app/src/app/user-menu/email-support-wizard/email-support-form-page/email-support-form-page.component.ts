import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../core/wizard/wizard-page";
import { EmailSupportWizard } from "../email-support-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { EmailSupportRequest } from "../email-support-request";
import { EmailSupportService } from "../email-support.service";
import { ToastFactory } from "../../../toast/toast-factory.service";
import { SecurityService } from "../../../core/security/security.service";
import { map } from "rxjs/operators";

@Component ( {
  selector: 'cca-email-support-form-page',
  templateUrl: './email-support-form-page.component.html',
  styleUrls: [ './email-support-form-page.component.scss' ]
} )
export class EmailSupportFormPageComponent extends WizardPage<EmailSupportWizard> implements OnInit {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private emailSupportService: EmailSupportService,
                private securityService: SecurityService,
                private toastFactory: ToastFactory ) {

    super ();
  }

  ngOnInit () {
    this.closeButtonText = 'Cancel';
    this.isCloseable     = true;
    this.isNextable      = true;
    this.nextButtonText  = 'Submit';
    this.initForm ();
  }

  onNext (): Observable<any> {
    this.wizard.model.emailMessage = this.wizardForm.value.emailMessage;
    this.wizard.model.emailSubject = this.wizardForm.value.emailSubject;

    let content      = this.buildEmailContent ();
    let emailRequest = this.buildEmailRequest ( content );
    return this.emailSupportService.sendEmail ( emailRequest )
      .pipe (
        map ( () => {
          this.toastFactory.success ( 'Email sent successfully.' );
        } )
      )
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      emailSubject: new FormControl ( this.wizard.model.emailSubject, [ Validators.required ] ),
      emailMessage: new FormControl ( this.wizard.model.emailMessage, [ Validators.required ] )
    } );
  }

  private buildEmailContent (): string {
    let user    = this.securityService.getCurrentUser ();
    //todo scrub user input for security threat injection
    let content = `            
<div>
    <div><div><h4>Email Generated in CCA:</h4></div></div>
    <div>${this.wizard.model.emailMessage}</div>
    <h4>From:</h4>
    <table><tbody>
        <tr><th style="text-align: left;">Username:</th><td>${user.username}</td></tr>
        <tr><th style="text-align: left;">Display Name:</th><td>${user.displayName || ''}</td></tr>
        <tr><th style="text-align: left;">Title:</th><td>${user.title || ''}</td></tr>
        <tr><th style="text-align: left;">Department:</th><td>${user.department || ''}</td></tr>
        <tr><th style="text-align: left;">Email:</th><td>${user.email || ''}</td></tr>
        <tr><th style="text-align: left;">Phone:</th><td>${user.phone || ''}</td></tr>
    </tbody></table>
</div>`;
    return content;
  }

  private buildEmailRequest ( content ): EmailSupportRequest {
    let emailRequest     = new EmailSupportRequest ();
    emailRequest.subject = this.wizardForm.value.emailSubject;
    emailRequest.body    = content;
    return emailRequest;
  }

}
