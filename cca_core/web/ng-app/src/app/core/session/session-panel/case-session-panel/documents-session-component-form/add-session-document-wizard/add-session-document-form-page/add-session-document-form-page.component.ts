import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../../wizard/wizard-page";
import { AddSessionDocumentWizard } from "../add-session-document-wizard";
import { DocumentsComponentService } from "../../documents-component.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../../../app-state";
import { ToastFactory } from "../../../../../../../toast/toast-factory.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { map } from "rxjs/operators";
import { AddSessionDocumentAction } from "../../../../../action/session-actions";
import { Observable } from 'rxjs';

@Component ( {
  selector: 'cca-add-session-document-form-page',
  templateUrl: './add-session-document-form-page.component.html',
  styleUrls: [ './add-session-document-form-page.component.scss' ]
} )
export class AddSessionDocumentFormPageComponent extends WizardPage<AddSessionDocumentWizard> implements OnInit {

  isCloseable: boolean   = true;
  isNextable: boolean    = true;
  key: string            = 'form-page';
  nextButtonText: string = 'Add';
  wizardForm: FormGroup  = new FormGroup ( {} );

  constructor ( private documentsComponentService: DocumentsComponentService,
                private store: Store<AppState>,
                private toast: ToastFactory ) {
    super ();
  }

  ngOnInit () {
    this.initForm ();
  }

  onNext (): Observable<string> {
    let request = {
      link: this.wizardForm.value.link,
      name: this.wizardForm.value.name
    };

    let session = this.wizard.model.session;

    return this.documentsComponentService.addOneDocument ( session.documentsComponent.id, request )
      .pipe ( map ( ( value ): string => {
        this.store.dispatch ( new AddSessionDocumentAction ( value ) );
        this.toast.success ( 'Document added successfully' );
        return null;
      } ) );
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      name: new FormControl ( null, [ Validators.required ] ),
      link: new FormControl ( null, [ Validators.required ] )
    } );
  }

}
