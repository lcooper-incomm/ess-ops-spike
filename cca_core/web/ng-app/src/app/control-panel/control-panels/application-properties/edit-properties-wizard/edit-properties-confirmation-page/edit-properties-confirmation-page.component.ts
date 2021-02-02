import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../core/wizard/wizard-page";
import { EditPropertiesWizard } from "../edit-properties-wizard";
import { FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { PropertyService } from "../../../../../core/config/property.service";
import { PropertyUtilityService } from "../../property-utility.service";

@Component ( {
  selector: 'cca-edit-properties-confirmation-page',
  templateUrl: './edit-properties-confirmation-page.component.html',
  styleUrls: [ './edit-properties-confirmation-page.component.scss' ]
} )
export class EditPropertiesConfirmationPageComponent extends WizardPage<EditPropertiesWizard> implements OnInit {
  key: string           = 'confirmation-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private propertyService: PropertyService,
                private propertyUtility: PropertyUtilityService ) {
    super ();
    this.closeButtonText = 'Close';
    this.isBackable      = true;
    this.isCloseable     = true;
    this.isNextable      = true;
    this.nextButtonText  = 'Update';
  }

  ngOnInit () {
  }

  onLoad (): Observable<string> {
    if ( this.wizard.model.isCsCoreLogger ) {
      this.wizard.model.pageTitle = 'Edit CS-Core Logging Level'
    } else {
      this.wizard.model.pageTitle = 'Edit Application Property'
    }
    this.wizard.placeholderDictionary.addPlaceholder ( 'PAGE_TITLE', this.wizard.model.pageTitle );

    return of ( null );
  }

  onNext (): Observable<string> {
    return this.sendRequest ()
      .pipe (
        catchError ( () => {
          this.wizard.model.isFailed = true;
          return 'results-page';
        } ),
      )
  }

  private sendRequest (): Observable<string> {

    if ( !this.wizard.model.isCsCoreLogger ) {
      return this.propertyService.update ( this.wizard.model.request.id, this.wizard.model.request )
        .pipe (
          map ( ( value ) => {
            return 'result-page';
          } )
        );
    } else {
      let endPoint = this.propertyUtility.getLoggingEndPoint ( this.wizard.model.request.systemName );
      return this.propertyService[ endPoint ] ( this.wizard.model.request.value )
        .pipe (
          map ( ( value ) => {
            return 'result-page';
          } )
        );
    }
  }
}
