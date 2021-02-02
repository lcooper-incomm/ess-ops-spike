import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../../wizard/wizard-page";
import { EditReceiptCardWizard } from "../edit-receipt-card-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ReceiptComponentService } from "../../receipt-component.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../../../app-state";
import { ToastFactory } from "../../../../../../../toast/toast-factory.service";
import { EditReceiptCardAction, RemoveReceiptCardAction } from "../../../../../action/session-actions";
import { MatDialogRef } from "@angular/material";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component ( {
  selector: 'cca-edit-receipt-card-form-page',
  templateUrl: './edit-receipt-card-form-page.component.html',
  styleUrls: [ './edit-receipt-card-form-page.component.scss' ]
} )
export class EditReceiptCardFormPageComponent extends WizardPage<EditReceiptCardWizard> implements OnInit {

  key: string           = 'form-page';
  wizardForm: FormGroup = new FormGroup ( {} );

  constructor ( private dialogRef: MatDialogRef<any>,
                private receiptComponentService: ReceiptComponentService,
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
    return this.receiptComponentService.deleteOneCard ( this.wizard.model.card.id )
      .pipe ( map ( () => {
          this.toast.success ( 'Card deleted successfully' );
          this.store.dispatch ( new RemoveReceiptCardAction ( this.wizard.model.card ) );
          this.dialogRef.close ();
        }
      ) );
  }

  onNext (): Observable<string> {
    let request = this.wizardForm.value;
    request.id  = this.wizard.model.card.id;

    return this.receiptComponentService.updateOneCard ( request )
      .pipe ( map ( ( value ): string => {
        this.store.dispatch ( new EditReceiptCardAction ( value ) );
        this.toast.success ( 'Card updated successfully' );
        return null;
      } ) );
  }

  private initForm (): void {
    let initialLoadAmount = this.wizard.model.card.initialLoadAmount ? new Number ( this.wizard.model.card.initialLoadAmount.value ).toFixed ( 2 ) : null;

    this.wizardForm = new FormGroup ( {
      van: new FormControl ( this.wizard.model.card.van, [ Validators.required, Validators.minLength ( 4 ), Validators.maxLength ( 4 ) ] ),
      serialNumber: new FormControl ( this.wizard.model.card.serialNumber, [] ),
      packageVan: new FormControl ( this.wizard.model.card.packageVan, [] ),
      initialLoadAmount: new FormControl ( initialLoadAmount, [] ),
      productType: new FormControl ( this.wizard.model.card.productType, [] )
    } );
  }

}
