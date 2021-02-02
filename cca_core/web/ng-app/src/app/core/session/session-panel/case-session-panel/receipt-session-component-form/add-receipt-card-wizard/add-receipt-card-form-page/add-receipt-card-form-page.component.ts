import { Component, OnInit } from '@angular/core';
import { WizardPage } from "../../../../../../wizard/wizard-page";
import { AddReceiptCardWizard } from "../add-receipt-card-wizard";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ReceiptComponentService } from "../../receipt-component.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../../../app-state";
import { ToastFactory } from "../../../../../../../toast/toast-factory.service";
import { map } from "rxjs/operators";
import { AddReceiptCardAction } from "../../../../../action/session-actions";
import { Observable } from "rxjs";

@Component ( {
  selector: 'cca-add-receipt-card-form-page',
  templateUrl: './add-receipt-card-form-page.component.html',
  styleUrls: [ './add-receipt-card-form-page.component.scss' ]
} )
export class AddReceiptCardFormPageComponent extends WizardPage<AddReceiptCardWizard> implements OnInit {

  isCloseable: boolean   = true;
  isNextable: boolean    = true;
  key: string            = 'form-page';
  nextButtonText: string = 'Add';
  wizardForm: FormGroup  = new FormGroup ( {} );

  constructor ( private receiptComponentService: ReceiptComponentService,
                private store: Store<AppState>,
                private toast: ToastFactory ) {
    super ();
  }

  ngOnInit () {
    this.initForm ();
  }

  onNext (): Observable<string> {
    return this.receiptComponentService.addOneCard ( this.wizard.model.session.receiptComponent.id, this.wizardForm.value )
      .pipe ( map ( ( value ): string => {
        this.store.dispatch ( new AddReceiptCardAction ( value ) );
        this.toast.success ( 'Card added successfully' );
        return null;
      } ) );
  }

  private initForm (): void {
    this.wizardForm = new FormGroup ( {
      van: new FormControl ( '', [ Validators.required, Validators.minLength ( 4 ), Validators.maxLength ( 4 ) ] ),
      serialNumber: new FormControl ( '', [] ),
      packageVan: new FormControl ( '', [] ),
      initialLoadAmount: new FormControl ( '', [] ),
      productType: new FormControl ( '', [] )
    } );
  }

}
