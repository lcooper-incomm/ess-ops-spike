import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../../wizard/wizard-page";
import { EditSessionDocumentWizard } from "../edit-session-document-wizard";
import { DocumentsComponentService } from "../../documents-component.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../../../app-state";
import { ToastFactory } from "../../../../../../../toast/toast-factory.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { EditSessionDocumentAction, RemoveSessionDocumentAction } from "../../../../../action/session-actions";
import { MatDialogRef } from "@angular/material";

@Component ( {
  selector: 'cca-edit-session-document-form-page',
  templateUrl: './edit-session-document-form-page.component.html',
  styleUrls: [ './edit-session-document-form-page.component.scss' ]
} )
export class EditSessionDocumentFormPageComponent extends WizardPage<EditSessionDocumentWizard> implements OnInit {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private dialogRef: MatDialogRef<any>,
                private documentsComponentService: DocumentsComponentService,
                private store: Store<AppState>,
                private toast: ToastFactory ) {
    super ();
    this.isCloseable    = true;
    this.isDeletable    = true;
    this.isNextable     = true;
    this.nextButtonText = 'Save';
  }

  ngOnInit () {
    this.initForm ();
  }

  onDelete (): Observable<any> {
    return this.documentsComponentService.deleteOneDocument ( this.wizard.model.document.id )
      .pipe ( map ( () => {
          this.toast.success ( 'Document deleted successfully' );
          this.store.dispatch ( new RemoveSessionDocumentAction ( this.wizard.model.document ) );
          this.dialogRef.close ();
        }
      ) );
  }

  onNext (): Observable<string> {
    let request = {
      id: this.wizard.model.document.id,
      link: this.wizardForm.value.link,
      name: this.wizardForm.value.name
    };

    return this.documentsComponentService.updateOneDocument ( request )
      .pipe ( map ( ( value ): string => {
        this.store.dispatch ( new EditSessionDocumentAction ( value ) );
        this.toast.success ( 'Document updated successfully' );
        return null;
      } ) );
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      name: new FormControl ( this.wizard.model.document.name, [ Validators.required ] ),
      link: new FormControl ( this.wizard.model.document.link, [ Validators.required ] )
    } );
  }

}
