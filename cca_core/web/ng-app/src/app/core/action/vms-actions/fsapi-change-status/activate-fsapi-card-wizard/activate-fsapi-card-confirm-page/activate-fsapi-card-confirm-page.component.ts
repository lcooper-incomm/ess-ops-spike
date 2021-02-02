import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { WizardPage } from 'src/app/core/wizard/wizard-page';
import { FsapiStatusType } from 'src/app/core/status/fsapi-status/fsapi-status-type.enum';
import { ActivateFsapiCardWizard } from '../activate-fsapi-card-wizard';
import { ModifiedUpdateCardStatusRequest } from '../../../models/vms-request-models';
import { Card } from 'src/app/core/card/card';

@Component ( {
  selector: 'cca-activate-fsapi-card-form-page',
  templateUrl: './activate-fsapi-card-confirm-page.component.html',
  styleUrls: [ './activate-fsapi-card-confirm-page.component.scss' ]
} )
export class ActivateFsapiCardConfirmPageComponent extends WizardPage<ActivateFsapiCardWizard> implements OnInit {

  closeButtonText: string = 'No';
  isCloseable: boolean    = true;
  isNextable: boolean     = true;
  key: string             = 'confirm-page';
  nextButtonText: string  = 'Yes';
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor ( private customerService: CustomerService ) {
    super ();
  }

  ngOnInit () {
  }

  onNext (): Observable<any> {
    let request = this.buildActivateCardRequest ( this.wizard.model.selection.selectedCard );
    let subject = new Subject<string> ();
    this.customerService.changeCardStatus ( this.wizard.model.customerId, request )
      .pipe (
        map ( () => {
          this.wizard.model.actionFailed = false;
          subject.next ( 'results-page' );
        } ),
        catchError ( () => {
          this.wizard.model.actionFailed = true;
          subject.next ( 'results-page' );
          return of ( null );
        } ),
        finalize ( () => {
          subject.complete ();
        } )
      ).subscribe ();

    return subject;
  }

  private buildActivateCardRequest ( card: Card ): ModifiedUpdateCardStatusRequest {
    let request           = new ModifiedUpdateCardStatusRequest ();
    request.currentStatus = card.getFsapiStatus ();
    request.isVmsGiftCard = card.isVmsGiftCard;
    request.panLastFour   = card.identifiers.panLastFour;
    request.value         = FsapiStatusType.ACTIVE;
    return request;
  }

}
