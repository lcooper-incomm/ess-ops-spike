import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { EditPropertiesWizard } from "../edit-properties-wizard";
import { CcaValidators } from "../../../../../core/validators/cca-validators";
import { Property } from "../../../../../core/model/property";
import { Observable, of } from "rxjs";
import * as _ from "lodash";
import { PropertyUtilityService } from "../../property-utility.service";

@Component ( {
  selector: 'cca-edit-properties-form-page',
  templateUrl: './edit-properties-form-page.component.html',
  styleUrls: [ './edit-properties-form-page.component.scss' ]
} )
export class EditPropertiesFormPageComponent extends WizardPage<EditPropertiesWizard> implements OnInit {
  key: string           = 'form-page';
  valueControl: FormControl;
  loggingOptions: string[];
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private propertyUtility: PropertyUtilityService ) {
    super ();
    this.closeButtonText = 'Close';
    this.isBackable      = false;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.nextButtonText  = 'Next';
  }

  ngOnInit () {
    this.wizard.model.initValue      = this.wizard.model.property.value;
    this.initForm ();
  }

  onLoad (): Observable<string> {
    this.wizard.model.isCsCoreLogger = _.startsWith ( this.wizard.model.property.systemName, 'CS_CORE_LOGGING' );
    if ( this.wizard.model.isCsCoreLogger ) {
      this.loggingOptions         = this.propertyUtility.getLoggingOptions ( this.wizard.model.property.systemName );
      this.wizard.model.pageTitle = 'Edit CS-Core Logging Level'
    } else {
      this.wizard.model.pageTitle = 'Edit Application Property'
    }
    this.wizard.placeholderDictionary.addPlaceholder ( 'PAGE_TITLE', this.wizard.model.pageTitle );

    return of ( null );
  }

  onNext (): Observable<string> {
    this.wizard.model.request = this.buildRequest ();
    return of ( 'confirmation-page' );
  }

  private buildRequest (): Property {
    let request   = _.cloneDeep ( this.wizard.model.property );
    request.value = this.wizardForm.get ( 'valueControl' ).value;
    return request;
  }

  private initForm () {
    this.valueControl = new FormControl ( this.wizard.model.property.value, [ Validators.required, CcaValidators.notEquals ( this.wizard.model.initValue, 'Must be different from initial value' ) ] )
    this.wizardForm   = new FormGroup ( {
      valueControl: this.valueControl
    } );
  }
}
