import {Component, OnInit, ViewChild} from '@angular/core';
import {WizardPage} from "../../../../../wizard/wizard-page";
import {RaiseCasePageType, RaiseCaseWizard} from "../raise-case-wizard";
import {FormControl, FormGroup} from "@angular/forms";
import {Selection} from "../../../../model/selection";
import * as _ from "lodash";
import {SelectionType} from "../../../../model/selection-type.enum";
import {CustomerComponent} from "../../../../model/customer-component";
import {Logger} from "../../../../../../logging/logger.service";
import {PlatformType} from "../../../../../platform/platform-type.enum";
import {UUID} from "../../../../../uuid/uuid";
import {CsCoreAddress, CsCorePhoneNumber, CsCorePhoneNumberType} from "@cscore/core-client-model";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {SessionFormBuilder} from "../../../session-form-builder.service";
import {DateService} from "../../../../../date/date.service";
import {Observable, of} from "rxjs";
import {WizardWidth} from "../../../../../wizard/wizard-width.enum";
import {MaplesEmailAddress} from '@cscore/maples-client-model/customer/response/email-address';

@Component ( {
  selector: 'cca-raise-case-customer-information-page',
  templateUrl: './raise-case-customer-information-page.component.html',
  styleUrls: [ './raise-case-customer-information-page.component.scss' ]
} )
export class RaiseCaseCustomerInformationPageComponent extends WizardPage<RaiseCaseWizard> implements OnInit {

  dataSource                 = new MatTableDataSource<CustomerOption> ();
  displayedColumns: string[] = ['selection', 'name', 'email', 'phone', 'address'];

  callbackTimeOptions: string[]     = [
    'Morning (8AM - 11AM)',
    'Afternoon (11AM - 3PM)',
    'Evening (3PM - 6PM)',
    'Night (6PM - 9PM)',
    'Outside Business Hours (9PM - 8AM)'
  ];
  contactMethodOptions: string[]    = [
    'Email',
    'Phone'
  ];
  customerOptions: CustomerOption[] = [];
  key: string                       = RaiseCasePageType.CUSTOMER_INFORMATION;
  languageOptions: string[]         = [
    'English',
    'French',
    'Spanish'
  ];
  wizardForm: FormGroup             = new FormGroup ( {} );

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  constructor ( private dateService: DateService,
                private logger: Logger,
                private sessionFormBuilder: SessionFormBuilder ) {
    super ();
    this.isNextable      = true;
    this.isBackable      = true;
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.LARGE;
  }

  ngOnInit () {
    this.buildCustomerOptions ();
    this.initForm ();
    this.subscribeToOptionChanges ();
    this.sort.disableClear              = true;
    this.dataSource.sort                = this.sort;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.data                = this.customerOptions;
    this.dataSource.sortingDataAccessor = ( option: CustomerOption, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'name':
          let name  = `${option.firstName} ${option.lastName}`;
          sortValue = name.toLowerCase ();
          break;
        case 'email':
          sortValue = option.emailAddress ? option.emailAddress.toLowerCase () : null;
          break;
        case 'phone':
          sortValue = option.phoneNumber ? option.phoneNumber.toLowerCase () : null;
          break;
        case 'address':
          if ( option.address ) {
            if ( option.address.line1 ) {
              sortValue = option.address.line1.toLowerCase ();
            } else if ( option.address.line2 ) {
              sortValue = option.address.line2.toLowerCase ();
            } else if ( option.address.city ) {
              sortValue = option.address.city.toLowerCase ();
            } else if ( option.address.state ) {
              sortValue = option.address.state.toLowerCase ();
            } else if ( option.address.postalCode ) {
              sortValue = option.address.postalCode.toLowerCase ();
            } else {
              sortValue = null;
            }
          } else {
            sortValue = null;
          }
          break;
        default:
          sortValue = option[ property ];
          break;
      }

      return sortValue;
    };
  }

  onNext (): Observable<string> {
    this.wizard.model.customerComponent = new CustomerComponent ( this.wizardForm.get ( 'customerComponent' ).value );

    // Then pick the next page to load
    let nextPage: RaiseCasePageType;
    if ( this.wizard.model.hasMerchantComponent ) {
      nextPage = RaiseCasePageType.MERCHANT_INFORMATION;
    } else if ( this.wizard.model.hasReceiptComponent ) {
      nextPage = RaiseCasePageType.RECEIPT_INFORMATION;
    } else {
      nextPage = RaiseCasePageType.CONFIRMATION;
    }
    return of ( nextPage );
  }

  private buildCustomerOptions (): void {
    this.customerOptions.length = 0;

    let candidateSelections: Selection<any>[] = [];
    if (this.wizard.model.selection && this.wizard.model.selection.type === SelectionType.MAPLES_CUSTOMER) {
       candidateSelections.push(this.wizard.model.selection);
    } else {
      // We can only build customer options for selections that potentially have customer data, and that data must be available now
      candidateSelections = this.wizard.model.session.selections.filter ( ( selection: Selection<any> ) => {
        return [ SelectionType.CUSTOMER, SelectionType.ORDER, SelectionType.CARD ].includes ( selection.type ) && !!selection.data;
      } );
    }

    let address: CsCoreAddress;
    let ani = this.wizard.model.session.callComponent ? this.wizard.model.session.callComponent.ani : null;
    let phone: CsCorePhoneNumber;
    let dateOfBirth: string;

    candidateSelections.forEach ( ( selection: Selection<any> ) => {
      let isDefault: boolean = this.wizard.model.selection && this.wizard.model.selection.id === selection.id;

      switch ( selection.type ) {
        case SelectionType.CUSTOMER:
          address         = selection.getCustomer ().getPreferredAddress ();
          phone           = selection.getCustomer ().getPreferredPhone ();
          dateOfBirth     = selection.getCustomer ().dateOfBirth;

          this.customerOptions.push ( new CustomerOption ( {
            firstName: selection.getCustomer ().firstName,
            lastName: selection.getCustomer ().lastName,
            dateOfBirth: dateOfBirth ? this.dateService.convertYYYYMMDDToMMDDYYYY ( dateOfBirth ) : null,
            emailAddress: selection.getCustomer ().emailAddress,
            address: address ? address : new CsCoreAddress (),
            phoneNumber: phone ? phone.number : null,
            ani: ani,
            isDefault: isDefault
          } ) );
          break;
        case SelectionType.MAPLES_CUSTOMER:
          address     = selection.getMaplesCustomer().getPrimaryAddress(true);
          phone       = selection.getMaplesCustomer().getPrimaryPhoneNumber(true);
          dateOfBirth = selection.getMaplesCustomer().dateOfBirth;
          let emailAddress: MaplesEmailAddress = selection.getMaplesCustomer().getPrimaryEmailAddress(true);

          this.customerOptions.push(new CustomerOption({
            firstName: selection.getMaplesCustomer().firstName,
            lastName: selection.getMaplesCustomer().lastName,
            dateOfBirth: dateOfBirth ? this.dateService.convertYYYYMMDDToMMDDYYYY(dateOfBirth) : null,
            emailAddress: emailAddress ? emailAddress.email : null,
            address: address ? address : new CsCoreAddress(),
            phoneNumber: phone ? phone.number : null,
            ani: ani,
            isDefault: isDefault
          }));
          break;
        case SelectionType.ORDER:
          address = selection.getOrder ().customer.addresses[ 0 ];
          phone   = selection.getOrder ().customer.getPhoneNumberByType ( CsCorePhoneNumberType.MOBILE );

          this.customerOptions.push ( new CustomerOption ( {
            firstName: selection.getOrder ().customer.firstName,
            lastName: selection.getOrder ().customer.lastName,
            emailAddress: selection.getOrder ().customer.emailAddress,
            phoneNumber: phone ? phone.number : null,
            address: address ? address : new CsCoreAddress (),
            isDefault: isDefault
          } ) );
          break;
        case SelectionType.CARD:
          // Only GreenCards are actually eligible for this
          if ( selection.platform === PlatformType.GREENCARD && selection.getCard ().customer && (selection.getCard ().customer.firstName || selection.getCard ().customer.lastName) ) {
            this.customerOptions.push ( new CustomerOption ( {
              address: new CsCoreAddress (),
              firstName: selection.getCard ().customer.firstName,
              lastName: selection.getCard ().customer.lastName,
              isDefault: isDefault
            } ) );
          }
          break;
        default:
          this.logger.warn ( 'Something made it through as a candidate for customer selections, that shouldn\'t have!', selection );
          break;
      }
    } );
  }

  private initForm (): void {
    let defaultOption = _.find ( this.customerOptions, ( option: CustomerOption ) => {
      return option.isDefault;
    } );

    this.wizardForm = new FormGroup ( {
      selectedOption: new FormControl ( defaultOption ),
      customerComponent: this.sessionFormBuilder.buildCustomerComponentForm ( defaultOption ? defaultOption : new CustomerComponent ( { address: new CsCoreAddress () } ) )
    } );
  }

  private subscribeToOptionChanges (): void {
    this.addSubscription (
      this.wizardForm.get ( 'selectedOption' ).valueChanges
        .subscribe ( ( value: CustomerOption ) => {
          this.wizard.model.customerComponent = _.cloneDeep ( value );
          if ( this.wizard.model.customerComponent ) {
            if ( !this.wizard.model.customerComponent.address ) {
              this.wizard.model.customerComponent.address = new CsCoreAddress ();
            }
            let newValue              = this.wizard.model.customerComponent;
            let customerComponentForm = this.wizardForm.get ( 'customerComponent' );
            customerComponentForm.get ( 'firstName' ).setValue ( newValue.firstName );
            customerComponentForm.get ( 'lastName' ).setValue ( newValue.lastName );
            customerComponentForm.get ( 'dateOfBirth' ).setValue ( newValue.dateOfBirth );
            customerComponentForm.get ( 'emailAddress' ).setValue ( newValue.emailAddress );
            customerComponentForm.get ( 'phoneNumber' ).setValue ( newValue.phoneNumber );
            customerComponentForm.get ( 'ani' ).setValue ( newValue.ani );
            customerComponentForm.get ( 'contactMethod' ).setValue ( newValue.contactMethod );
            customerComponentForm.get ( 'callbackTime' ).setValue ( newValue.callbackTime );
            customerComponentForm.get ( 'language' ).setValue ( newValue.language );

            let addressForm = customerComponentForm.get ( 'address' );
            addressForm.get ( 'line1' ).setValue ( newValue.address.line1 );
            addressForm.get ( 'line2' ).setValue ( newValue.address.line2 );
            addressForm.get ( 'city' ).setValue ( newValue.address.city );
            addressForm.get ( 'state' ).setValue ( newValue.address.state );
            addressForm.get ( 'postalCode' ).setValue ( newValue.address.postalCode );
          }
        } )
    );
  }

}

export class CustomerOption extends CustomerComponent {

  isDefault: boolean = false;
  uuid: string;

  constructor ( data: any = null ) {
    super ( data );
    this.isDefault = !!data.isDefault;
    this.uuid      = UUID.generate ();
  }
}
