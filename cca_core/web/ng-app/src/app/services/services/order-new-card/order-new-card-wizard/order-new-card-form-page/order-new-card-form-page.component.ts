import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { OrderNewCardWizard } from "../order-new-card-wizard";
import { WizardWidth } from "../../../../../core/wizard/wizard-width.enum";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SupportState } from "../../../../../core/support/support-state";
import { snapshot } from "../../../../../core/store-utils/store-utils";
import { AppStateType } from "../../../../../app-state-type.enum";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../app-state";
import { Partner } from "../../../../../core/session/selection/partner";
import { SecurityService } from "../../../../../core/security/security.service";
import { Observable, of } from "rxjs";
import { CardService } from "../../../../../core/card/card.service";
import { CcaFormBuilder } from "../../../../../core/form/cca-form-builder.service";
import { OrderNewCardBuilderService } from "../../order-new-card-builder-service";
import { FsapiProductCodeService } from "../../../../../core/fsapi/fsapi-product-code.service";

@Component ( {
  selector: 'cca-order-new-card-form-page',
  templateUrl: './order-new-card-form-page.component.html',
  styleUrls: [ './order-new-card-form-page.component.scss' ]
} )

export class OrderNewCardFormPageComponent extends WizardPage<OrderNewCardWizard> implements OnInit {
  key: string             = 'form-page';
  partners: Partner[]     = [];
  products: ProductCode[] = [];
  types: ProductTypes[]   = [];
  wizardForm: FormGroup   = new FormGroup ( {} );

  constructor ( private cardService: CardService,
                private formBuilder: FormBuilder,
                private formBuilderService: CcaFormBuilder,
                private fsapiService: FsapiProductCodeService,
                private builderService: OrderNewCardBuilderService,
                private securityService: SecurityService,
                private store: Store<AppState> ) {
    super ();
    this.closeButtonText = 'Close';
    this.isBackable      = false;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.width           = WizardWidth.LARGE;
  }

  ngOnInit () {
    this.initForm ();
  }

  onLoad () {
    this.subscribeToPartnerFormChanges ();
    this.subscribeToProductFormChanges ();
    this.getSupportState ();
    this.disableTypeSelect ();
    return of ( null );
  }

  onNext (): Observable<any> {
    this.wizard.model.request = this.builderService.buildRequest ( this.wizardForm, null );
    return of ( 'confirmation-page' );
  }

  private disableTypeSelect () {
    this.wizardForm.get ( 'productTypeSelect' ).disable ();
  }

  private enableTypeSelect () {
    this.wizardForm.get ( 'productTypeSelect' ).enable ()
  }

  private getProductCodes ( partner ) {
    this.fsapiService.getActiveProductCodes ( partner )
      .subscribe ( ( results: ProductCode[] ) => {
        this.products = results;
        if ( this.products.length === 1 ) {
          this.wizardForm.get ( 'productCodeSelect' ).setValue ( this.products[ 0 ] )
        }
      } )
  }

  private getSupportState () {
    let supportState: SupportState = snapshot ( this.store, AppStateType.SUPPORT_STATE );
    this.partners                  = supportState.partners;
    this.setPrefDefaultPartner ();
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {

      partnerSelect: new FormControl ( null, [ Validators.required ] ),
      productCodeSelect: new FormControl ( null, [ Validators.required ] ),
      productTypeSelect: new FormControl ( null, [ Validators.required ] ),
      firstName: new FormControl ( null, [ Validators.required ] ),
      lastName: new FormControl ( null, [ Validators.required ] ),
      homePhone: this.formBuilderService.phoneNumber ( '', true ),
      mobilePhone: this.formBuilderService.phoneNumber ( '', true ),
      dateOfBirth: new FormControl ( null, [ Validators.required ] ),
      mothersMaidenName: new FormControl ( null, [ Validators.required ] ),
      email: new FormControl ( null, [ Validators.required ] ),
      isMailingSameAsPhysical: new FormControl ( true ),
      mailingAddress: this.formBuilderService.address ( null, true ),
      physicalAddress: this.formBuilderService.address ( null, true ),
      identificationType: new FormControl ( '' ),
      identificationNumber: new FormControl ( '' )
    } );
  }

  private resetForms () {
    this.wizardForm.get ( 'productTypeSelect' ).setValue ( null );
    this.disableTypeSelect ();
  }

  private subscribeToPartnerFormChanges (): void {
    this.addSubscription (
      this.wizardForm.get ( 'partnerSelect' ).valueChanges
        .subscribe ( {
          next: value => {
            this.resetForms ();
            this.getProductCodes ( value )
          }
        } )
    );
  }

  private subscribeToProductFormChanges (): void {
    this.addSubscription (
      this.wizardForm.get ( 'productCodeSelect' ).valueChanges
        .subscribe ( {
          next: value => {
            this.setProductTypes ( value )
          }
        } )
    );
  }

  private setPrefDefaultPartner () {
    let prefDefaultPartner = this.securityService.getCurrentUser ().prefDefaultPartner;

    if ( prefDefaultPartner ) {
      this.wizardForm.get ( 'partnerSelect' ).setValue ( prefDefaultPartner.type );
    }
  }

  private setProductTypes ( value ) {
    this.types = value.types;
    if ( this.types.length === 1 ) {
      this.wizardForm.get ( 'productTypeSelect' ).setValue ( this.types[ 0 ] )
    }
    this.enableTypeSelect ()
  }

}

export class ProductCode {
  code: string;
  id: number;
  name: string;
  partner: Partner[];
  types: ProductTypes[];
  vmsId: string;

  constructor ( data: any ) {
    if ( data ) {
      Object.assign ( this, data );

      if ( data.partners ) {
        this.partner.forEach ( partner => this.partner.push ( new Partner ( partner ) ) );
      }
    }
  }
}

export class ProductTypes {
  id: string;
  isEnabled: boolean;
  name: string;
  productTypeId: string;
}
