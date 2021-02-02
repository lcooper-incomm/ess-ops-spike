import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActionToolbarButtonStatus} from "../../../../core/action-toolbar/action-toolbar-button-status";
import {Selection} from "../../../../core/session/model/selection";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../app-state";
import {AppStateType} from "../../../../app-state-type.enum";
import {SessionState} from "../../../../core/session/session-state";
import {CcaBaseComponent} from "../../../../core/cca-base-component";
import {SatPopover} from '@ncstate/sat-popover';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CcaFormBuilder} from "../../../../core/form/cca-form-builder.service";
import {CustomerAccountService} from "../../../../core/customer-account/customer-account.service";
import {CsCorePopoverComponent} from "@cscore/components";
import {SpinnerComponent} from "../../../../core/spinner/spinner.component";
import {CsCoreAddress, CsCoreAddressType, CsCorePhoneNumber, CsCorePhoneNumberType} from "@cscore/core-client-model";
import {MaplesResultMessageResponse} from "@cscore/maples-client-model";
import {finalize} from "rxjs/operators";
import {ToastFactory} from "../../../../toast/toast-factory.service";
import {LoadSelectionsWorkflow} from "../../../../core/workflow/load-selections-workflow.service";
import {RoutePath} from "../../../../core/routing/route-path.enum";
import {RoutingService} from "../../../../core/routing/routing.service";


@Component({
  selector: 'cca-account-contact-information',
  templateUrl: './account-contact-information.component.html',
  styleUrls: ['./account-contact-information.component.scss']
})
export class AccountContactInformationComponent extends CcaBaseComponent implements OnInit {
  addressForm: FormGroup               = new FormGroup({});
  form: FormGroup                      = new FormGroup({});
  actions: ActionToolbarButtonStatus[] = [];
  buildingActions: boolean             = false;
  selection: Selection<any>;
  addContactDisabled: boolean          = false;
  showDeleteConfirmation: boolean      = false;
  addresses: CsCoreAddress[];
  phones: CsCorePhoneNumber[];

  @ViewChildren('addressSpinner')
  addressSpinners: QueryList<SpinnerComponent>;
  @ViewChildren('emailSpinner')
  emailSpinners: QueryList<SpinnerComponent>;
  @ViewChildren('phoneSpinner')
  phoneSpinners: QueryList<SpinnerComponent>;

  @ViewChild('addPhoneSpinner')
  addPhoneSpinner: SpinnerComponent;
  @ViewChild('addEmailSpinner')
  addEmailSpinner: SpinnerComponent;
  @ViewChild('addAddressSpinner')
  addAddressSpinner: SpinnerComponent;

  phoneTypes: any[] = [
    {
      value: CsCorePhoneNumberType.HOME,
      displayName: 'Home'
    },
    {
      value: CsCorePhoneNumberType.MOBILE,
      displayName: 'Mobile'

    },
    {
      value: CsCorePhoneNumberType.WORK,
      displayName: 'Work'
    },
    {
      value: CsCorePhoneNumberType.OTHER,
      displayName: 'Other'
    }
  ];

  addressTypes: any[] = [
    {
      value: CsCoreAddressType.HOME,
      displayName: 'Home'

    },
    {
      value: CsCoreAddressType.WORK,
      displayName: 'Work'
    },
    {
      value: CsCoreAddressType.OTHER,
      displayName: 'Other'
    }
  ];
  constructor(private accountService: CustomerAccountService,
              private store: Store<AppState>,
              private formBuilder: CcaFormBuilder,
              private toastFactory: ToastFactory,
              private loadSelectionWorkflow: LoadSelectionsWorkflow,
              private routingService: RoutingService
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeToSessionState();
    this.initForm();

  }

  /** Start Add Elements **/

  addAddress(address: CsCoreAddress, popover: CsCorePopoverComponent) {
    const spinner = this.addAddressSpinner;
    spinner.start();
    let addressRequest = this.buildAddressRequest();
    this.accountService.addAddress(this.selection.getCustomerAccount().id, addressRequest, this.selection.platform)
      .pipe(finalize(() => spinner.stop()))
      .subscribe((response: MaplesResultMessageResponse) => {
        spinner.stop();
        this.closePopover(popover);
        this.updateAccount();
        this.toastFactory.success('Address added successfully');
      });
  }

  addEmail(email: string, popover) {
    const spinner = this.addEmailSpinner;
    spinner.start();
    let emailRequest = this.buildUpdateEmailRequest(email);
    this.accountService.addEmail(this.selection.getCustomerAccount().id, emailRequest, this.selection.platform)
      .pipe(finalize(() => spinner.stop()))
      .subscribe((response: MaplesResultMessageResponse) => {
        spinner.stop();
        this.closePopover(popover);
        this.updateAccount();
        this.toastFactory.success('Email Address added successfully');
      });
  }

  addPhone(phone: string, popover: CsCorePopoverComponent) {
    const spinner = this.addPhoneSpinner;
    spinner.start();
    let phoneRequest = this.buildAddPhoneRequest(phone);
    this.accountService.addPhone(this.selection.getCustomerAccount().id, phoneRequest, this.selection.platform)
      .pipe(finalize(() => spinner.stop()))
      .subscribe((response: MaplesResultMessageResponse) => {
        spinner.stop();
        this.closePopover(popover);
        this.updateAccount();
        this.toastFactory.success('Phone Number added successfully');
      });
  }

  /** Start Edit Elements **/

  editAddress(addressObj: CsCoreAddress, popover: CsCorePopoverComponent) {
    const spinner = this.findAddressSpinners(addressObj.id);
    spinner.start();
    let addressRequest = this.buildEditAddressRequest(addressObj);
    this.accountService.updateAddress(this.selection.getCustomerAccount().id, addressRequest, this.selection.platform)
      .pipe(finalize(() => spinner.stop()))
      .subscribe((response: MaplesResultMessageResponse) => {
        spinner.stop();
        this.closePopover(popover);
        // this.updateAddress(addressRequest);
        this.updateAccount();
        this.toastFactory.success('Address updated successfully');
      });
  }

  editEmail(emailObj: EmailAddress, popover: CsCorePopoverComponent) {
    const spinner = this.findEmailSpinners(emailObj.id);
    spinner.start();
    let emailRequest = this.buildUpdateEmailRequest(emailObj);
    this.accountService.updateEmail(this.selection.getCustomerAccount().id, emailRequest, this.selection.platform)
      .pipe(finalize(() => spinner.stop()))
      .subscribe((response: MaplesResultMessageResponse) => {
        spinner.stop();
        this.closePopover(popover);
        // this.updateEmail(emailRequest);
        this.updateAccount();
        this.toastFactory.success('Email Address updated successfully');
      });
  }


  editPhone(phoneObj: CsCorePhoneNumber, popover: CsCorePopoverComponent) {
    const spinner = this.findPhoneSpinners(phoneObj.id);
    spinner.start();
    let phoneRequest = this.buildPhoneRequest(phoneObj);
    this.accountService.updatePhone(this.selection.getCustomerAccount().id, phoneRequest, this.selection.platform)
      .pipe(finalize(() => spinner.stop()))
      .subscribe((response: MaplesResultMessageResponse) => {
        spinner.stop();
        this.closePopover(popover);
        // this.updatePhone(phoneRequest);
        this.updateAccount();
        this.toastFactory.success('Phone Number updated successfully');
      });
  }

  updateAddress(addressRequest) {
    const result = this.selection.getCustomerAccount().customer.addresses.find(({id}) => addressRequest.id === id);

    result.id         = addressRequest.id;
    result.city       = addressRequest.city;
    result.line1      = addressRequest.line1;
    result.line2      = addressRequest.line2;
    result.line3      = addressRequest.line3;
    result.postalCode = addressRequest.postalCode;
    result.state      = addressRequest.state;
    result.type       = addressRequest.type;
    result.isPrimary  = addressRequest.isPrimary;
  }

  updateEmail(emailRequest) {
    const result     = this.selection.getCustomerAccount().customer.emailAddresses.find(({id}) => emailRequest.id === id);
    result.email     = emailRequest.email_address_value;
    result.isPrimary = emailRequest.isPrimary;
  }

  updatePhone(phoneRequest) {
    const result     = this.selection.getCustomerAccount().customer.phoneNumbers.find(({id}) => phoneRequest.id === id);
    result.number    = phoneRequest.number;
    result.type      = phoneRequest.type;
    result.isPrimary = phoneRequest.isPrimary;
  }

  buildAddressRequest(): CsCoreAddress {
    let request = new CsCoreAddress();

    request.line1      = this.addressForm.get('line1').value;
    request.line2      = this.addressForm.get('line2').value;
    request.city       = this.addressForm.get('city').value;
    request.state      = this.addressForm.get('state').value;
    request.postalCode = this.addressForm.get('postalCode').value;
    request.type       = this.form.get('addressType').value;
    request.isPrimary  = this.form.get('addressIsPrimary').value;

    return request
  }

  buildEditAddressRequest(addressObj): CsCoreAddress {

    let request        = new CsCoreAddress();
    request.id         = addressObj.id;

    request.line1      = this.addressForm.get('line1').value;
    request.line2      = this.addressForm.get('line2').value;
    request.city       = this.addressForm.get('city').value;
    request.state      = this.addressForm.get('state').value;
    request.postalCode = this.addressForm.get('postalCode').value;
    request.type       = this.form.get('addressType').value;
    if (addressObj.isPrimary === true) {
      request.isPrimary = true;
    } else {
      request.isPrimary = this.form.get('addressIsPrimary').value;
    }
    return request
  }

  buildUpdateEmailRequest(emailObj): EmailAddress {
    let request                 = new EmailAddress();
    request.id                  = emailObj.id;
    request.email_address_value = this.form.get('emailAddress').value;
    if (emailObj.isPrimary === true) {
      request.isPrimary = true;
    } else {
      request.isPrimary = this.form.get('emailIsPrimary').value;
    }

    return request;
  }

  buildAddPhoneRequest(phone): CsCorePhoneNumber {
    let request    = new CsCorePhoneNumber();
    request.number = phone;
    request.type   = this.form.get('phoneType').value;


    return request
  }

  buildPhoneRequest(phoneObj): CsCorePhoneNumber {
    let request       = new CsCorePhoneNumber();
    request.id        = phoneObj.id;
    request.number    = this.form.get('phone').value;
    request.type      = this.form.get('phoneType').value;
    if (phoneObj.isPrimary === true) {
      request.isPrimary = true;
    } else {
      request.isPrimary = this.form.get('phoneIsPrimary').value;
    }
    return request
  }

  clearForm() {
    this.form.get('emailAddress').setValue(null);
    this.form.get('phone').setValue(null);
    this.form.get('addressIsPrimary').setValue(false);
    this.addressForm.get('line1').setValue(null);
    this.addressForm.get('line2').setValue(null);
    this.addressForm.get('city').setValue(null);
    this.addressForm.get('state').setValue(null);
    this.addressForm.get('postalCode').setValue(null);
  }

  openPopover(popover: SatPopover) {
    this.clearForm();
    popover.open();
  }

  closePopover(popover: CsCorePopoverComponent) {
    this.clearForm();
    popover.close();
  }

  openEditEmailPopover(popover: SatPopover, email) {
    this.form.get('emailAddress').setValue(email.email);
    popover.open()
  }

  openEditAddressPopover(popover: SatPopover, address) {

    this.addressForm.get('line1').setValue(address.line1);
    this.addressForm.get('line2').setValue(address.line2);
    this.addressForm.get('city').setValue(address.city);
    this.addressForm.get('state').setValue(address.state);
    this.addressForm.get('postalCode').setValue(address.postalCode);
    this.form.get('addressType').setValue(address.type);
    popover.open()
  }

  openEditPhonePopover(popover: SatPopover, phone) {

    this.form.get('phone').setValue(phone.number);
    this.form.get('phoneType').setValue(phone.type);
    this.form.get('phoneIsPrimary').setValue(phone.isPrimary);
    popover.open()
  }

  private findAddressSpinners(id): SpinnerComponent {
    return this.addressSpinners.find(obj => obj.id === id);
  }

  private findEmailSpinners(id): SpinnerComponent {
    return this.emailSpinners.find(obj => obj.id === id);
  }

  private findPhoneSpinners(id): SpinnerComponent {
    return this.phoneSpinners.find(obj => obj.id === id);
  }

  private subscribeToSessionState(): void {
    this.buildingActions = true;
    const complete       = () => this.buildingActions = false;
    this.addSubscription(
      this.store.select(AppStateType.SESSION_STATE)
        .subscribe((state: SessionState) => {
          if (state && state.selection) {
            this.selection = state.selection;
            this.addresses = this.filterAddresses(this.selection.getCustomerAccount().customer.addresses)
            this.phones    = this.filterPhones(this.selection.getCustomerAccount().customer.phoneNumbers)
            //TODO add actions

          }
        })
    );
  }

  private initForm(): void {
    this.addressForm = this.formBuilder.address(null, true);

    this.form = new FormGroup({
      phoneType: new FormControl(false, [Validators.required]),
      addressType: new FormControl(null, [Validators.required]),
      addressIsPrimary: new FormControl(false),
      phoneIsPrimary: new FormControl(false),
      emailIsPrimary: new FormControl(false),
    });
    this.form.addControl('phone', this.formBuilder.phoneNumber(null, true));
    this.form.addControl('emailAddress', this.formBuilder.emailAddress(null, true));
  }

  updateAccount(): void {
    this.addContactDisabled = true;
    if (this.selection && this.routingService.isOn(RoutePath.DETAIL)) {
      this.loadSelectionWorkflow.refreshSelection(this.selection)
        .subscribe(it => (
          this.addContactDisabled = false
        ));
    }
  }

  filterAddresses(addresses: CsCoreAddress[]): CsCoreAddress[] {
    const filteredAddresses: CsCoreAddress[] = [];
    addresses.forEach((address: CsCoreAddress) => {
      if (this.isAddressValid(address)) {
        filteredAddresses.push(address)
      }
    });
    return filteredAddresses;
  }

  isAddressValid(address: CsCoreAddress): boolean {
    if (address.type === CsCoreAddressType.HOME || address.type === CsCoreAddressType.OTHER || address.type === CsCoreAddressType.WORK) {
      return true;
    } else {
      return false;
    }
  }

  filterPhones(phoneNumbers: CsCorePhoneNumber[]): CsCorePhoneNumber[] {
    const filteredPhoneNumbers: CsCorePhoneNumber[] = [];
    phoneNumbers.forEach((phone: CsCorePhoneNumber) => {
      if (this.isPhoneNumberValid(phone)) {
        filteredPhoneNumbers.push(phone)
      }
    });
    return filteredPhoneNumbers;
  }

  isPhoneNumberValid(phone: CsCorePhoneNumber): boolean {
    if (phone.type === CsCorePhoneNumberType.HOME || phone.type === CsCorePhoneNumberType.MOBILE || phone.type === CsCorePhoneNumberType.OTHER || phone.type === CsCorePhoneNumberType.WORK) {
      return true;
    } else {
      return false;
    }
  }

}

export class EmailAddress {
  id: string;
  email_address_value: string;
  isPrimary: boolean;
  constructor(data: any = null) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
