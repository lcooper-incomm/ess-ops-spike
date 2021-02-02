import {Component, OnInit, ViewChild} from '@angular/core';
import {WizardPage} from "../../../../../wizard/wizard-page";
import {RaiseCasePageType, RaiseCaseWizard} from "../raise-case-wizard";
import {FormControl, FormGroup} from "@angular/forms";
import {UUID} from "../../../../../uuid/uuid";
import {MerchantComponent} from "../../../../model/merchant-component";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Logger} from "../../../../../../logging/logger.service";
import {SessionFormBuilder} from "../../../session-form-builder.service";
import {CsCoreAddress, CsCoreAddressType, CsCorePhoneNumber, CsCorePhoneNumberType} from "@cscore/core-client-model";
import {SelectionType} from "../../../../model/selection-type.enum";
import {Selection} from "../../../../model/selection";
import * as _ from "lodash";
import {NodeType} from "../../../../../node/node-type.enum";
import {Location} from "../../../../../node/location/location";
import {Merchant} from "../../../../../node/merchant";
import {Observable, of} from "rxjs";
import {WizardWidth} from "../../../../../wizard/wizard-width.enum";

@Component ( {
  selector: 'cca-raise-case-merchant-information-page',
  templateUrl: './raise-case-merchant-information-page.component.html',
  styleUrls: [ './raise-case-merchant-information-page.component.scss' ]
} )
export class RaiseCaseMerchantInformationPageComponent extends WizardPage<RaiseCaseWizard> implements OnInit {

  dataSource                 = new MatTableDataSource<MerchantOption> ();
  displayedColumns: string[] = [ 'selection', 'name', 'phone', 'address' ];

  isMerchantVerified: boolean       = false;
  key: string                       = RaiseCasePageType.MERCHANT_INFORMATION;
  merchantOptions: MerchantOption[] = [];
  wizardForm: FormGroup             = new FormGroup ( {} );

  @ViewChild ( MatPaginator )
  paginator: MatPaginator;
  @ViewChild ( MatSort )
  sort: MatSort;

  constructor ( private logger: Logger,
                private sessionFormBuilder: SessionFormBuilder ) {
    super ();
    this.isNextable      = true;
    this.isBackable      = true;
    this.isCloseable     = true;
    this.closeButtonText = 'Cancel';
    this.width           = WizardWidth.LARGE;
  }

  ngOnInit () {
    this.buildMerchantOptions ();
    this.initForm ();
    this.subscribeToFormChanges ();
    this.subscribeToOptionChanges ();
    this.sort.disableClear              = true;
    this.dataSource.sort                = this.sort;
    this.dataSource.paginator           = this.paginator;
    this.dataSource.data                = this.merchantOptions;
    this.dataSource.sortingDataAccessor = ( option: MerchantOption, property: string ) => {
      let sortValue: any;

      switch ( property ) {
        case 'name':
          sortValue = option.locationName ? option.locationName.toLowerCase () : null;
          break;
        case 'phone':
          sortValue = option.contactPhone ? option.contactPhone.toLowerCase () : null;
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
    this.wizard.model.merchantComponent = new MerchantComponent ( this.wizardForm.get ( 'merchantComponent' ).value );

    //Then pick the next page to load
    let nextPage: RaiseCasePageType;
    if ( this.wizard.model.hasReceiptComponent ) {
      nextPage = RaiseCasePageType.RECEIPT_INFORMATION;
    } else {
      nextPage = RaiseCasePageType.CONFIRMATION;
    }
    return of ( nextPage );
  }

  private buildMerchantOptions (): void {
    this.merchantOptions.length = 0;

    let candidateSelections: Selection<any>[] = this.wizard.model.session.selections.filter ( ( selection: Selection<any> ) => {
      return [SelectionType.CUSTOMER, SelectionType.LOCATION, SelectionType.CARD].includes(selection.type) && !!selection.data;
    } );

    candidateSelections.forEach ( ( selection: Selection<any> ) => {
      let isDefault: boolean = this.wizard.model.selection && this.wizard.model.selection.id === selection.id;
      let address: CsCoreAddress;
      let location: Location;
      let merchant: Merchant;
      let phone: CsCorePhoneNumber;

      if ( selection.hierarchy && selection.hierarchy.location ) {
        location = selection.hierarchy.location;
        merchant = _.last ( selection.hierarchy.merchants );
      } else if ( selection.purchaseLocation ) {
        location = selection.purchaseLocation;
      }

      if ( location ) {
        address = location.getAddressByType ( CsCoreAddressType.PHYSICAL );
        if ( !address ) {
          address = location.getAddressByNodeTypeName ( NodeType.LOCATION );
        }
        phone = location.getPhoneNumberByType ( CsCorePhoneNumberType.WORK );

        this.merchantOptions.push ( new MerchantOption ( {
          address: address ? address : new CsCoreAddress (),
          contactName: location.getFirstContact () ? location.getFirstContact ().name : null,
          contactPhone: phone ? phone.number : null,
          locationName: location.name,
          merchantLegacyId: merchant ? merchant.legacyId : null,
          merchantName: merchant ? merchant.name : null,
          isDefault: isDefault
        } ) );
      }
    } );
  }

  private initForm (): void {
    let defaultOption = _.find ( this.merchantOptions, ( option: MerchantOption ) => {
      return option.isDefault;
    } );

    this.wizardForm = new FormGroup ( {
      selectedOption: new FormControl ( defaultOption ),
      merchantComponent: this.sessionFormBuilder.buildMerchantComponentForm ( defaultOption ? defaultOption : new MerchantComponent ( { address: new CsCoreAddress () } ) )
    } );

    this.wizardForm.get ( 'merchantComponent' ).get ( 'merchantLegacyId' ).disable ();

    this.setIsMerchantVerified ( this.wizardForm.getRawValue () );
  }

  private setIsMerchantVerified ( formValue: any ): void {
    if ( formValue ) {
      let selectedOption: MerchantOption;
      if ( formValue.selectedOption ) {
        selectedOption = new MerchantOption ( formValue.selectedOption );
      }
      let merchantComponent: MerchantComponent;
      if ( formValue.merchantComponent ) {
        merchantComponent = new MerchantComponent ( formValue.merchantComponent );
      }

      this.isMerchantVerified = selectedOption
        && merchantComponent
        && merchantComponent.merchantLegacyId
        && merchantComponent.merchantName == selectedOption.merchantName
        && merchantComponent.locationName == selectedOption.locationName
        && merchantComponent.contactPhone == selectedOption.contactPhone
        && merchantComponent.address.line1 == selectedOption.address.line1
        && merchantComponent.address.line2 == selectedOption.address.line2
        && merchantComponent.address.city == selectedOption.address.city
        && merchantComponent.address.state == selectedOption.address.state
        && merchantComponent.address.postalCode == selectedOption.address.postalCode;
    } else {
      this.isMerchantVerified = false;
    }
  }

  private subscribeToFormChanges (): void {
    this.addSubscription (
      this.wizardForm.valueChanges
        .subscribe ( () => {
          //Send raw value, not the emitted value, because the emitted value does not include disabled fields
          this.setIsMerchantVerified ( this.wizardForm.getRawValue () );
        } )
    );
  }

  private subscribeToOptionChanges (): void {
    this.addSubscription (
      this.wizardForm.get ( 'selectedOption' ).valueChanges
        .subscribe ( ( value: MerchantOption ) => {
          this.wizard.model.merchantComponent = _.cloneDeep ( value );
          if ( this.wizard.model.merchantComponent ) {
            if ( !this.wizard.model.merchantComponent.address ) {
              this.wizard.model.merchantComponent.address = new CsCoreAddress ();
            }
            let newValue              = this.wizard.model.merchantComponent;
            let merchantComponentForm = this.wizardForm.get ( 'merchantComponent' );
            merchantComponentForm.get ( 'contactName' ).setValue ( newValue.contactName );
            merchantComponentForm.get ( 'contactPhone' ).setValue ( newValue.contactPhone );
            merchantComponentForm.get ( 'locationName' ).setValue ( newValue.locationName );
            merchantComponentForm.get ( 'merchantLegacyId' ).setValue ( newValue.merchantLegacyId );
            merchantComponentForm.get ( 'merchantName' ).setValue ( newValue.merchantName );

            let addressForm = merchantComponentForm.get ( 'address' );
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

export class MerchantOption extends MerchantComponent {

  isDefault: boolean = false;
  uuid: string;

  constructor ( data: any = null ) {
    super ( data );
    this.isDefault = !!data.isDefault;
    this.uuid      = UUID.generate ();
  }
}

