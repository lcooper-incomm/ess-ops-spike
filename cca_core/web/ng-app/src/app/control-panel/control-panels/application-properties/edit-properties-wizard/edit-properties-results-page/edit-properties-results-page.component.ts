import { Component, OnInit } from '@angular/core';
import { EditPropertiesWizard } from "../edit-properties-wizard";
import { FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { WizardResultPage } from "../../../../../core/wizard/wizard-dialog/wizard-generic-pages/wizard-result-page";

@Component ( {
  selector: 'cca-edit-properties-results-page',
  templateUrl: './edit-properties-results-page.component.html',
  styleUrls: [ './edit-properties-results-page.component.scss' ]
} )
export class EditPropertiesResultsPageComponent extends WizardResultPage<EditPropertiesWizard> implements OnInit {
  key: string           = 'result-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor () {
    super ();
    this.closeButtonText = 'Close';
    this.isBackable      = false;
    this.isCloseable     = true;
    this.isNextable      = false;
  }

  ngOnInit () {

  }

  isSuccess (): boolean {
    return !this.wizard.model.isFailed;
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
}
