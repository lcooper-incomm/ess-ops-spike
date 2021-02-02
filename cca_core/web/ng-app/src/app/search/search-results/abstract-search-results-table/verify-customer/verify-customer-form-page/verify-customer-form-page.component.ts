import {Component, OnInit} from '@angular/core';
import {WizardPage} from "../../../../../core/wizard/wizard-page";
import {VerifyCustomerWizard} from "../verify-customer-wizard";
import {FormGroup} from "@angular/forms";
import {AuditService} from "../../../../../core/audit/audit.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {CsCoreAddress, CsCoreAddressType} from "@cscore/core-client-model";
import {AuditActivityType} from "../../../../../core/audit/audit-activity-type.enum";

@Component ( {
  selector: 'cca-verify-customer-form-page',
  templateUrl: './verify-customer-form-page.component.html',
  styleUrls: [ './verify-customer-form-page.component.scss' ]
} )
export class VerifyCustomerFormPageComponent extends WizardPage<VerifyCustomerWizard> implements OnInit {

  address: CsCoreAddress;
  closeButtonText: string = 'Not Verified';
  isCloseable: boolean    = true;
  isNextable: boolean     = true;
  key: string             = 'form-page';
  nextButtonText: string  = 'Verified';
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor ( private auditService: AuditService ) {
    super ();
  }

  ngOnInit () {
    this.extractAddress ();
    this.audit ();
  }

  onClose (): Observable<any> {
    return this.auditService.addOne(this.wizard.model.getAuditActivityType());
  }

  onNext (): Observable<string> {
    this.wizard.model.isVerified = true;
    return this.auditService.addOne(this.wizard.model.getAuditActivityType())
      .pipe ( map ( () => {
        return null;
      } ) );
  }

  private audit (): void {
    this.auditService.addOne(AuditActivityType.OPEN_VERIFY_CUSTOMER)
      .subscribe ();
  }

  private extractAddress (): void {
    if ( this.wizard.model.customer ) {
      this.address = this.wizard.model.customer.getAddressByType ( CsCoreAddressType.PHYSICAL );
    } else if ( this.wizard.model.order ) {
      this.address = this.wizard.model.order.customer.addresses.length ? this.wizard.model.order.customer.addresses[ 0 ] : null;
    }
  }

}
