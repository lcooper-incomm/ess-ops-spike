import {Component, OnInit} from '@angular/core';
import {WizardPage} from "../../../../../wizard/wizard-page";
import {LogComplaintPageType, LogComplaintWizard} from "../log-complaint-wizard";
import {FormGroup, Validators} from "@angular/forms";
import {WizardWidth} from "../../../../../wizard/wizard-width.enum";
import {Observable, of} from "rxjs";
import {BankService} from "../../../../../complaint/bank.service";
import {tap} from "rxjs/operators";
import {Bank, BankType, ComplaintOption} from "../../../../../complaint/bank";
import * as _ from "lodash";
import {SelectionType} from "../../../../model/selection-type.enum";
import {PlatformType} from "../../../../../platform/platform-type.enum";
import {SessionFormBuilder} from "../../../session-form-builder.service";
import {FlatComplaintComponent} from "../../../../model/complaint-component";
import {GenericOption} from "../../../../../model/generic-option";
import {ComplaintPriority, complaintPriorityOptions} from '../../../../model/complaint-priority';
import {SecurityService} from 'src/app/core/security/security.service';

@Component ( {
  selector: 'cca-log-complaint-form-page',
  templateUrl: './log-complaint-form-page.component.html',
  styleUrls: [ './log-complaint-form-page.component.scss' ]
} )
export class LogComplaintFormPageComponent extends WizardPage<LogComplaintWizard> implements OnInit {

  key: string = LogComplaintPageType.FORM;
  wizardForm: FormGroup;
  priorityOptions: GenericOption<ComplaintPriority>[] = complaintPriorityOptions();

  constructor (
    private bankService: BankService,
    private securityService: SecurityService,
    private sessionFormBuilder: SessionFormBuilder,
  ) {
    super ();
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
    this.isNextable      = true;
    this.width           = WizardWidth.MEDIUM_LARGE;
  }

  ngOnInit () {
    this.setDefaultsFromBank ();
    this.setDefaultsFromSelection();
    this.initForm ();
  }

  get isMastercard(): boolean {
    return this.wizard.model.bank && this.wizard.model.bank.systemValue === BankType.MASTERCARD;
  }

 

  compareBanks ( a: Bank, b: Bank ): boolean {
    return a && b && a.id === b.id;
  }

  handleBankChanged (): void {
    this.wizard.model.bank = this.wizardForm.get ( 'bank' ).value;
    this.setDefaultsFromBank ();
    this.updateFormForBankChange ();
  }

  onLoad (): Observable<any> {
    return this.loadBanks ();
  }

  onNext (): Observable<string> {
    let formValue: any = this.wizardForm.getRawValue ();
    Object.assign ( this.wizard.model.complaintComponent, formValue );
    return of ( LogComplaintPageType.CONFIRMATION );
  }

  private initForm (): void {
    const complaintComponent: FlatComplaintComponent = {
      ...this.wizard.model.complaintComponent,
      bank: this.wizard.model.bank,
    };
    this.wizardForm = this.sessionFormBuilder.buildComplaintComponentForm(complaintComponent, true);
  }

  private updateFormForBankChange (): void {
    if ( this.wizard.model.bank ) {
      this.wizardForm.get('category').reset();
      this.updateFieldIfNull ( 'source', this.wizard.model.complaintComponent.source );
      this.updateFieldIfNull ( 'type', this.wizard.model.complaintComponent.type );
      this.updateFieldIfNull ( 'department', this.wizard.model.complaintComponent.department );

      switch ( this.wizard.model.bank.systemValue ) {
        case BankType.AMERICAN_EXPRESS:
        case BankType.BANCORP:
          this.updateFieldValidators('cause', [Validators.required]);
          this.updateFieldValidators('type', [Validators.required]);
          this.updateFieldValidators('priority', []);
          this.wizardForm.get('priority').reset();
          break;
        case BankType.MASTERCARD:
          this.updateFieldValidators('cause', []);
          this.updateFieldValidators('type', []);
          this.updateFieldValidators('priority', [Validators.required]);
          break;
        case BankType.METABANK:
          this.updateFieldValidators('cause', []);
          this.updateFieldValidators('type', []);
          this.updateFieldValidators('priority', []);
          this.wizardForm.get('priority').reset();
          break;
        default:
          break;
      }
    }
  }

  private updateFieldIfNull ( key: string, value: any ): void {
    if ( !this.wizardForm.get ( key ).value ) {
      this.wizardForm.get ( key ).setValue ( value );
    }
  }

  private updateFieldValidators ( key: string, validators: any[] ): void {
    this.wizardForm.get ( key ).setValidators ( validators );
    this.wizardForm.get(key).updateValueAndValidity();
  }

  private loadBanks (): Observable<any> {
    if ( this.wizard.model.banks.length ) {
      return of ( null );
    } else {
      return this.bankService.findAll ()
        .pipe ( tap ( ( banks: Bank[] ) => {
          this.wizard.model.banks = banks.filter(bank => this.securityService.hasPermission(`CREATE_COMPLAINT_${bank.systemValue}`));
        } ) );
    }
  }

  private setDefaultsFromBank (): void {
    if ( this.wizard.model.bank ) {
      this.wizard.model.complaintComponent.source = this.wizard.model.bank.complaintSources.find ( ( option: ComplaintOption ) => {
        return option.name === 'Phone';
      } );
      this.wizardForm.get ( 'source' ).setValue ( this.wizard.model.complaintComponent.source );
      this.wizard.model.complaintComponent.type = this.wizard.model.bank.complaintTypes.find ( ( option: ComplaintOption ) => {
        return option.name === 'Call Center';
      } );
      this.wizardForm.get ( 'type' ).setValue ( this.wizard.model.complaintComponent.type );
      this.wizard.model.complaintComponent.department = this.wizard.model.bank.complaintDepartments.find ( ( option: ComplaintOption ) => {
        return option.name === 'Call Center';
      } );
      this.wizardForm.get ( 'department' ).setValue ( this.wizard.model.complaintComponent.department );
    }
  }

  /**
  * Pull data off the current selection that should be added to the complaint component.  Account number if a selected customer
  * and serial number if a selected card.
  *
  * @param session
  */
  private setDefaultsFromSelection(): void {
    const selection = this.wizard.model.selection;
    if (selection) {
      if (selection.type === SelectionType.CARD) {
        let serialNumber: string = selection.getCard().identifiers.serialNumber;
        if (serialNumber) {
          this.wizard.model.complaintComponent.accountNumber = `Serial Number: ${serialNumber}`;
        }

        // Find Product Name - Similar logic from selection
        let productName: string = selection.getCard().productDescription;
        if (!productName) {
          productName = selection.getCard().productGroup;
        }
        if (!productName) {
          productName = selection.getCard().productType;
        }
        this.wizard.model.complaintComponent.productName = productName;
      } else if (selection.type === SelectionType.CUSTOMER) {
        // Find Account Number
        let accountNumber: string = selection.getCustomer().identifiers.accountNumber;
        if (accountNumber) {
          this.wizard.model.complaintComponent.accountNumber = `Account Number: ${accountNumber}`;
        }

        // Find Product Name
        let productName: string;
        if (selection.platform === PlatformType.VMS) {
          productName = selection.getCustomer().isVmsGiftCard ? selection.getCustomer().productType : selection.getCustomer().productName;
        } else if (selection.platform === PlatformType.CCL) {
          productName = selection.getCustomer().productName;
        }
        this.wizard.model.complaintComponent.productName = productName;
      } else if (selection.type === SelectionType.CUSTOMER_ACCOUNT) {
        // Find Account Number
        let accountNumber: string = selection.getCustomerAccount().id;
        if (accountNumber) {
          this.wizard.model.complaintComponent.accountNumber = `Account Number: ${accountNumber}`;
        }
      }
    }
  }
}
