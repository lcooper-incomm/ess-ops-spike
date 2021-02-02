import { Component } from '@angular/core';
import { UpdateDeviceStatusWizard } from '../update-device-status-wizard';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { FormGroup } from '@angular/forms';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { UpdateDeviceStatusRequest } from '../../models/vms-request-models';
import { catchError, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component ( {
  selector: 'cca-update-device-status-confirmation-page',
  templateUrl: './update-device-status-confirmation-page.component.html',
  styleUrls: [ './update-device-status-confirmation-page.component.scss' ]
} )
export class UpdateDeviceStatusConfirmationPageComponent extends WizardPage<UpdateDeviceStatusWizard> {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private customerService: CustomerService ) {
    super ();
    this.isCloseable     = true;
    this.isNextable      = true;
    this.closeButtonText = 'No';
    this.nextButtonText  = 'Yes';
  }

  onNext (): Observable<string> {
    this.wizard.model.success = true;
    return this.customerService
      .updateDeviceStatus ( this.wizard.model.customer.id, this.buildRequest () )
      .pipe (
        catchError ( () => {
          this.wizard.model.success = false;
          return of ( null );
        } ),
        mapTo ( 'result-page' ),
      );
  }

  buildRequest (): UpdateDeviceStatusRequest {
    return {
      comment: 'Status Change requested through CCA',
      status: this.wizard.model.status,
      token: this.wizard.model.token.id,
    }
  }
}
