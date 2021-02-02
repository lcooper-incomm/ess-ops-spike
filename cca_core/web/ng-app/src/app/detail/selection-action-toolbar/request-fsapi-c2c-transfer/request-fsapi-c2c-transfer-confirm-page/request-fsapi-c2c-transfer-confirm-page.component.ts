import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../core/wizard/wizard-page";
import {
  RequestFsapiC2cTransferWizard,
  RequestFsapiC2cTransferWizardPageType
} from "../request-fsapi-c2c-transfer-wizard";
import { FormGroup } from "@angular/forms";
import { Observable, of } from 'rxjs';
import { FsapiC2cTransferService } from "../../../../core/c2c-transfer/fsapi-c2c-transfer.service";
import { catchError, map } from "rxjs/operators";

@Component ( {
  selector: 'cca-request-fsapi-c2c-transfer-confirm-page',
  templateUrl: './request-fsapi-c2c-transfer-confirm-page.component.html',
  styleUrls: [ './request-fsapi-c2c-transfer-confirm-page.component.scss' ]
} )
export class RequestFsapiC2cTransferConfirmPageComponent extends WizardPage<RequestFsapiC2cTransferWizard> implements OnInit {

  key: string           = RequestFsapiC2cTransferWizardPageType.CONFIRM_PAGE;
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private c2cTransferService: FsapiC2cTransferService ) {
    super ();
    this.isBackable      = true;
    this.isNextable      = true;
    this.isCloseable     = true;
    this.backButtonText  = 'No';
    this.nextButtonText  = 'Yes';
    this.closeButtonText = 'Cancel';
  }

  ngOnInit () {
  }

  onNext (): Observable<string> {
    this.wizard.model.isFailed = false;
    return this.c2cTransferService.request ( this.wizard.model.request )
      .pipe (
        catchError ( ( err, caught ) => {
          this.wizard.model.isFailed = true;
          return of ( RequestFsapiC2cTransferWizardPageType.RESULTS_PAGE );
        } ),
        map ( () => {
          return RequestFsapiC2cTransferWizardPageType.RESULTS_PAGE;
        } )
      );
  }
}
